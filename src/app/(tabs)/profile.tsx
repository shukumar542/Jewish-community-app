import { clearSession, updateStoredUser } from '@/lib/authStorage';
import tw from '@/lib/tw';
import { authApi, useLogoutMutation } from '@/services/authApi';
import { settingsApi, useGetProfileQuery } from '@/services/settingsApi';
import { logout as logoutAction, updateUser } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

const stats = [
  { label: 'Events Saved', value: 4 },
  { label: 'Submitted', value: 3 },
  { label: 'Approved', value: 1 },
];

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isGuest = useAppSelector((state) => state.auth.isGuest);
  const isNavigating = useRef(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isFetching: isProfileFetching,
    refetch: refetchProfile,
  } = useGetProfileQuery(undefined, { skip: isGuest });

  const profile = profileData?.data;

  

  // Sync profile data to Redux user when loaded
  useEffect(() => {
    if (profile?.fullName && profile.fullName !== user?.fullName) {
      dispatch(updateUser({ fullName: profile.fullName }));
      updateStoredUser({ fullName: profile.fullName });
    }
  }, [profile?.fullName, user?.fullName, dispatch]);

  const displayName =
    profile?.fullName || user?.fullName || (isGuest ? 'Guest User' : 'User');
  const displayEmail =
    user?.email || (isGuest ? 'Browsing as Guest' : '');
  const displayAvatar = profile?.picture;

  const handleLogout = async () => {
    try {
      if (!isGuest) {
        const res = await logoutMutation().unwrap();
        toast.success(res?.message || 'Logged out successfully');
      } else {
        toast.success('Exited guest mode');
      }
    } catch (err: any) {
      console.warn('Logout API error:', err);
      const message =
        err?.data?.message ||
        (err?.status === 'FETCH_ERROR'
          ? 'Network error. Logged out locally.'
          : 'Logged out successfully');
      toast.info(message);
    } finally {
      await clearSession();
      dispatch(logoutAction());
      dispatch(authApi.util.resetApiState());
      dispatch(settingsApi.util.resetApiState());
      setShowLogoutModal(false);
      router.replace('/(auth)/login' as any);
    }
  };

  const navigateOnce = (path: string) => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    router.push(path as any);
    setTimeout(() => {
      isNavigating.current = false;
    }, 800);
  };

  const menuItems = [
    { icon: 'person-outline', label: 'Profile Setting', onPress: () => navigateOnce('/(settings)/editProfile') },
    { icon: 'lock-closed-outline', label: 'Change password', onPress: () => navigateOnce('/(settings)/changePasswordFromSettings') },
    { icon: 'information-circle-outline', label: 'About Us', onPress: () => navigateOnce('/(settings)/about-us') },
    { icon: 'document-lock-outline', label: 'Privacy Policy', onPress: () => navigateOnce('/(settings)/privacyPolicy') },
    { icon: 'document-text-outline', label: 'Terms and Conditions', onPress: () => navigateOnce('/(settings)/termsCondition') },
  ];


  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        style={tw`flex-1 px-5`}
        contentContainerStyle={tw`pb-6`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          !isGuest ? (
            <RefreshControl
              refreshing={isProfileFetching && !isProfileLoading}
              onRefresh={refetchProfile}
              tintColor="#f59e0b"
              colors={['#f59e0b']}
            />
          ) : undefined
        }
      >
        {/* Header */}
        <Text style={tw`text-2xl font-bold text-gray-900 mt-4 mb-5`}>Profile</Text>

        {/* User Info */}
        <View style={tw`flex-row items-center mb-5`}>
          {displayAvatar ? (
            <Image
              source={{ uri: displayAvatar }}
              style={tw`w-14 h-14 rounded-xl bg-gray-100`}
            />
          ) : (
            <View
              style={tw`w-14 h-14 rounded-xl bg-amber-50 items-center justify-center border border-amber-200`}
            >
              <Ionicons name="person" size={26} color="#f59e0b" />
            </View>
          )}
          <View style={tw`ml-3 flex-1`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>
              {displayName}
            </Text>
            {displayEmail ? (
              <Text style={tw`text-gray-400 text-sm`}>
                {displayEmail}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Stats */}
        {/* <View style={tw`flex-row gap-3 mb-6`}>
          {stats.map((stat) => (
            <View
              key={stat.label}
              style={tw`flex-1 border border-gray-200 rounded-2xl py-4 items-center`}
            >
              <Text style={tw`text-xl font-bold text-gray-900`}>{stat.value}</Text>
              <Text style={tw`text-gray-400 text-xs mt-1 text-center`}>{stat.label}</Text>
            </View>
          ))}
        </View> */}

        {/* Menu List */}
        <View style={tw`border border-gray-200 rounded-2xl overflow-hidden mb-6`}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              onPress={item.onPress}
              style={tw`flex-row items-center justify-between px-4 py-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <Ionicons name={item.icon as any} size={20} color="#374151" />
                <Text style={tw`text-gray-900 text-base`}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* If Guest, show Sign In option */}
        {isGuest && (
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login' as any)}
            style={tw`flex-row items-center justify-center gap-2 bg-amber-500 rounded-full py-3.5 mb-3`}
          >
            <Ionicons name="log-in-outline" size={18} color="#ffffff" />
            <Text style={tw`text-white font-semibold text-base`}>Sign In / Register</Text>
          </TouchableOpacity>
        )}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => setShowLogoutModal(true)}
          style={tw`flex-row items-center justify-center gap-2 border border-amber-400 rounded-full py-3.5`}
        >
          <Ionicons name="log-out-outline" size={18} color="#f59e0b" />
          <Text style={tw`text-amber-500 font-semibold text-base`}>
            {isGuest ? 'Exit Guest Mode' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={() => {
          if (!isLoggingOut) setShowLogoutModal(false);
        }}
      >
        <Pressable
          style={tw`flex-1 bg-black/50 justify-center items-center px-6`}
          onPress={() => {
            if (!isLoggingOut) setShowLogoutModal(false);
          }}
        >
          <Pressable
            style={tw`w-full max-w-sm bg-white rounded-3xl p-6 items-center shadow-lg`}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <View
              style={tw`w-16 h-16 rounded-full bg-amber-50 items-center justify-center mb-4 border border-amber-100`}
            >
              <Ionicons name="log-out-outline" size={30} color="#f59e0b" />
            </View>

            {/* Title & Description */}
            <Text style={tw`text-xl font-bold text-gray-900 mb-2 text-center`}>
              {isGuest ? 'Exit Guest Mode' : 'Log Out'}
            </Text>
            <Text style={tw`text-gray-500 text-sm text-center mb-6 leading-5`}>
              {isGuest
                ? 'Are you sure you want to exit guest mode and return to the welcome screen?'
                : 'Are you sure you want to log out? You will need to login again to access your account.'}
            </Text>

            {/* Action Buttons */}
            <View style={tw`flex-row gap-3 w-full`}>
              <TouchableOpacity
                disabled={isLoggingOut}
                onPress={() => setShowLogoutModal(false)}
                style={tw`flex-1 border border-gray-300 py-3.5 rounded-full items-center justify-center`}
              >
                <Text style={tw`text-gray-700 font-semibold text-base`}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={isLoggingOut}
                onPress={handleLogout}
                style={tw`flex-1 bg-amber-500 py-3.5 rounded-full items-center justify-center ${
                  isLoggingOut ? 'opacity-70' : ''
                }`}
              >
                {isLoggingOut ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={tw`text-white font-semibold text-base`}>
                    {isGuest ? 'Exit' : 'Logout'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}