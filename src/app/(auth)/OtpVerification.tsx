import Button from '@/components/ui/Button';
import OTPInput, { OTPInputHandle } from '@/components/ui/OtpInput';
import { saveSession } from '@/lib/authStorage';
import tw from '@/lib/tw';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/services/authApi';
import { setCredentials } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OtpVerification() {
  const { email, purpose } = useLocalSearchParams<{ email: string; purpose: string }>();
  const otpRef = useRef<OTPInputHandle>(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const dispatch = useAppDispatch();

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    setError('');
    setLoading(true);
    try {

      const res = await verifyOtp({ email, otp }).unwrap();
      const { accessToken, user } = res.data;
      await saveSession(accessToken, user);
      dispatch(setCredentials({ token: accessToken, user }));
      console.log('OTP verified:', res);
      if (purpose === 'forgot-password') {
        router.replace({
          pathname: '/(auth)/resetNewPassword',
          params: { email },
        });
      } else {
        router.replace('/(auth)/login');
      }
    } catch (e: any) {
      console.log(e)
      setError(e?.data?.message ?? 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await resendOtp({ email }).unwrap();
      console.log("res", res)
      otpRef.current?.clear();
      setOtp('');
    } catch (e) {
      console.warn(e);
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        style={tw`flex-1 px-5`}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`w-10 h-10 rounded-full border border-gray-200 items-center justify-center absolute top-4 left-0`}
        >
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>

        <View style={tw`items-center px-8`}>
          <Text style={tw`text-3xl font-bold text-gray-900 text-center leading-9 mb-2`}>
            OTP Verification
          </Text>
          <Text style={tw`text-gray-500 text-base text-center leading-6 pb-4`}>
            Enter the 6 digits code that you received on your email address
          </Text>
        </View>

        <View style={tw`items-center py-2`}>
          <OTPInput
            ref={otpRef}
            length={6}
            onChange={(digits) => setOtp(digits.join(''))}
            onComplete={setOtp}
          />
        </View>

        {error ? <Text style={tw`text-red-500 text-sm text-center mt-3`}>{error}</Text> : null}

        <View style={tw`flex-row items-center justify-center py-4 mt-16`}>
          <Text style={tw`text-gray-500 text-sm`}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResend} disabled={resending}>
            <Text style={tw`text-sm text-amber-500 font-semibold`}>
              {resending ? 'Sending...' : 'Resend'}
            </Text>
          </TouchableOpacity>
        </View>

        <Button text={loading ? 'Verifying...' : 'Verify OTP'} onPress={handleVerify} loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
}