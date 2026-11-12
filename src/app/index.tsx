import Button from '@/components/ui/Button';
import tw from '@/lib/tw';
import { setGuest } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const dispatch = useAppDispatch();

  const handleGuestLogin = () => {
    dispatch(setGuest(true));
    router.replace('/(tabs)/home');
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Hero Image Section */}
      <View style={tw`h-62 rounded-b-3xl overflow-hidden`}>
        <Image
          source={require('../../assets/images/container.png')}
          style={tw`w-full h-full absolute`}
          resizeMode="cover"
        />
        <View style={tw`absolute inset-0 bg-black/30`} />

        <SafeAreaView style={tw`flex-1 justify-end p-6`}>
          <Text style={tw`text-white text-3xl  font-bold leading-tight`}>
            Celebrate Together,{'\n'}Always.
          </Text>
        </SafeAreaView>
      </View>

      {/* Content Section */}
      <SafeAreaView style={tw`flex-1`} edges={['bottom']}>
        <View style={tw`flex-1 px-6 pt-6  justify-between pb-8`}>
          <View>
            <Text style={tw`text-gray-600 text-base leading-relaxed`}>
              Discover, save, and share meaningful Jewish community celebrations —
              from Bar Mitzvahs to weddings and everything in between.
            </Text>
          </View>

          <View style={tw`gap-3`}>
            {/* Create Account Button */}
            <Button text="Create Account" onPress={() => router.push('(auth)/register' as any)} />

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={() => router.push('(auth)/login' as any)}
              style={tw`bg-white border border-gray-300 py-4 rounded-full items-center`}
            >
              <Text style={tw`text-gray-900 font-semibold text-base`}>Sign In</Text>
            </TouchableOpacity>

            {/* Guest User */}
            <TouchableOpacity onPress={handleGuestLogin} style={tw`items-center pt-2`}>
              <Text style={tw`text-amber-500 font-semibold text-base`}>Guest User</Text>
            </TouchableOpacity>

            {/* Terms & Privacy */}
            <View style={tw`items-center pt-1`}>
              <View style={tw`flex-row flex-wrap justify-center items-center`}>
                <Text style={tw`text-gray-400 text-xs`}>
                  By continuing you agree to our{' '}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
                  onPress={() => router.push('/(settings)/termsCondition' as any)}
                >
                  <Text style={tw`text-amber-500 font-medium text-xs`}>
                    Terms of Service
                  </Text>
                </TouchableOpacity>
                <Text style={tw`text-gray-400 text-xs`}> and </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
                  onPress={() => router.push('/(settings)/privacyPolicy' as any)}
                >
                  <Text style={tw`text-amber-500 font-medium text-xs`}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}