import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import tw from '@/lib/tw';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/services/settingsApi';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MapPin, Phone, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function ProfileSetting() {
  const {data ,error,  isLoading: isFetching, isError, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();


  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [pickedImage, setPickedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  useEffect(() => {
    const profile = data?.data;
    if (!profile) return;
    setName(profile.fullName ?? '');
    setPhone(profile.phoneNumber ?? '');
    setAddress(profile.address ?? '');
    setAvatar(profile.picture ?? null);
    setPickedImage(null);
  }, [data]);


  console.log('profile error:', data);


  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      toast.error('Photo library access is needed to change your picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]) {
      setPickedImage(result.assets[0]);
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Full name is required');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', name.trim());
    formData.append('phoneNumber', phone.trim());
    formData.append('address', address.trim());

    // Notun image select korle-i picture pathabo
    if (pickedImage) {
      const uri = pickedImage.uri;
      const ext = uri.split('.').pop()?.toLowerCase() ?? 'jpg';
      formData.append('picture', {
        uri,
        name: pickedImage.fileName ?? `profile.${ext}`,
        type: pickedImage.mimeType ?? `image/${ext === 'jpg' ? 'jpeg' : ext}`,
      } as any);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      toast.success(res.message ?? 'Profile updated');
    } catch (err: any) {
      const message =
        err?.data?.message ||
        (err?.status === 'FETCH_ERROR'
          ? 'Server e connect kora jachhe na. Network check korun.'
          : 'Profile update hoyni. Abar try korun.');
      toast.error(message);
    }
  };

  if (isFetching) {
    return (
      <SafeAreaView style={tw`flex-1 bg-white items-center justify-center`}>
        <ActivityIndicator size="large" color="#f59e0b" />
      </SafeAreaView>
    );
  }


  if (isError) {
    return (
      <SafeAreaView style={tw`flex-1 bg-white items-center justify-center px-5`}>
        <Text style={tw`text-gray-500 mb-4`}>Please try agani !!</Text>
        <Button text="Retry" onPress={refetch} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top', 'bottom']}>
      <ScrollView
        style={tw`flex-1 px-5`}
        contentContainerStyle={tw`pb-6`}
        showsVerticalScrollIndicator={false}
      >
        <BackButton title="Profile Setting" />

        {/* Avatar */}
        <View style={tw`items-center mb-8`}>
          <View style={tw`relative`}>
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                style={tw`w-24 h-24 rounded-full bg-gray-100`}
              />
            ) : (
              <View
                style={tw`w-24 h-24 rounded-full bg-gray-100 items-center justify-center`}
              >
                <Ionicons name="person" size={40} color="#9ca3af" />
              </View>
            )}
            <TouchableOpacity
              onPress={pickImage}
              style={tw`absolute bottom-0 right-0 w-8 h-8 rounded-full bg-amber-500 items-center justify-center border-2 border-white`}
            >
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <InputField
          label="Full Name"
          Icon={User}
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
        />

        <InputField
          label="Mobile Number"
          Icon={Phone}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />

        <InputField
          label="Address"
          Icon={MapPin}
          value={address}
          onChangeText={setAddress}
          placeholder="Your address"
        />
      </ScrollView>

      <View style={tw`px-5 pb-4 pt-2 border-t border-gray-100`}>
        <Button
          text={isSaving ? 'Saving...' : 'Save'}
          onPress={handleSave}
          loading={isSaving}
        />
      </View>
    </SafeAreaView>
  );
}