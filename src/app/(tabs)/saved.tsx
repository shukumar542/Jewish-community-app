import EventCard from '@/components/ui/EventCard';
import tw from '@/lib/tw';
import { useGetFavoriteEventsQuery } from '@/services/eventApi';
import { useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Saved() {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);

  const { data, isLoading, isFetching, isError, refetch } = useGetFavoriteEventsQuery(
    { page: 1, limit: 10 },
    { skip: !token }
  );

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  // Extract events safely from various possible backend response formats


  const responseData: any = data;

  const rawEvents: any[] = Array.isArray(responseData)
    ? responseData
    : Array.isArray(responseData?.data)
      ? responseData.data
      : Array.isArray(responseData?.data?.events)
        ? responseData.data.events
        : Array.isArray(responseData?.data?.data)
          ? responseData.data.data
          : Array.isArray(responseData?.events)
            ? responseData.events
            : [];

  const events = rawEvents.map((item) => ({
    ...item,
    isFavourite: item.isFavourite ?? item.isFavorite ?? item.favorited ?? true,
  }));

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            tintColor="#f59e0b"
            colors={['#f59e0b']}
          />
        }
      >
        <Text style={tw`text-2xl font-bold text-gray-900 px-5 mt-4 mb-2`}>
          Saved Events
        </Text>

        {!token ? (
          <View style={tw`py-16 px-6 items-center justify-center`}>
            <View style={tw`w-16 h-16 rounded-full bg-amber-50 items-center justify-center mb-4`}>
              <Ionicons name="bookmark-outline" size={32} color="#f59e0b" />
            </View>
            <Text style={tw`text-lg font-bold text-gray-900`}>Login Required</Text>
            <Text style={tw`text-gray-500 text-sm text-center mt-1 mb-5`}>
              Please log in to view and manage your saved events.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/login')}
              style={tw`bg-amber-500 px-6 py-3 rounded-xl shadow-sm`}
            >
              <Text style={tw`text-white font-semibold text-sm`}>Log In</Text>
            </TouchableOpacity>
          </View>
        ) : isLoading ? (
          <View style={tw`py-16 items-center justify-center`}>
            <ActivityIndicator size="large" color="#f59e0b" />
            <Text style={tw`text-gray-400 mt-3 text-sm font-medium`}>
              Loading saved events...
            </Text>
          </View>
        ) : isError ? (
          <View style={tw`py-16 px-6 items-center justify-center`}>
            <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
            <Text style={tw`text-base font-semibold text-gray-900 mt-2`}>
              Failed to load saved events
            </Text>
            <Text style={tw`text-gray-500 text-sm text-center mt-1 mb-4`}>
              An error occurred while fetching your favorites.
            </Text>
            <TouchableOpacity
              onPress={() => refetch()}
              style={tw`bg-gray-900 px-5 py-2.5 rounded-xl`}
            >
              <Text style={tw`text-white font-medium text-sm`}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : events.length === 0 ? (
          <View style={tw`py-16 px-6 items-center justify-center`}>
            <View style={tw`w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4`}>
              <Ionicons name="heart-outline" size={32} color="#9ca3af" />
            </View>
            <Text style={tw`text-lg font-bold text-gray-900`}>No Saved Events</Text>
            <Text style={tw`text-gray-500 text-sm text-center mt-1`}>
              Events you save or favorite will appear here for easy access.
            </Text>
          </View>
        ) : (
          <View style={tw`px-5 mt-3 gap-4 pb-6`}>
            {events.map((event, index) => (
              <EventCard
                event={event}
                key={event._id || event.id || `event-${index}`}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
