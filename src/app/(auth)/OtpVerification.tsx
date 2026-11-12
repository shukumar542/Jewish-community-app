import Button from '@/components/ui/Button';
import OTPInput, { OTPInputHandle } from '@/components/ui/OtpInput';
import { saveSession } from '@/lib/authStorage';
import tw from '@/lib/tw';
import {
  useResendForgotPasswordOtpMutation,
  useResendOtpMutation,
  useVerifyForgotPasswordOtpMutation,
  useVerifyOtpMutation,
} from '@/services/authApi';
import { setCredentials } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function OtpVerification() {
  const { email, purpose, token: initialToken } = useLocalSearchParams<{
    email: string;
    purpose?: string;
    token?: string;
  }>();

  const otpRef = useRef<OTPInputHandle>(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [currentToken, setCurrentToken] = useState(initialToken || '');
  const dispatch = useAppDispatch();

  const [verifyOtp, { isLoading: isVerifyingStandard }] = useVerifyOtpMutation();
  const [verifyForgotPasswordOtp, { isLoading: isVerifyingForgot }] =
    useVerifyForgotPasswordOtpMutation();

  const [resendOtp, { isLoading: isResendingStandard }] = useResendOtpMutation();
  const [resendForgotPasswordOtp, { isLoading: isResendingForgot }] =
    useResendForgotPasswordOtpMutation();

  const isVerifying = isVerifyingStandard || isVerifyingForgot;
  const isResending = isResendingStandard || isResendingForgot;

  useEffect(() => {
    if (initialToken) {
      setCurrentToken(initialToken);
    }
  }, [initialToken]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    setError('');

    try {
      if (purpose === 'forgot-password') {
        const res = await verifyForgotPasswordOtp({
          token: currentToken,
          otp: otp.trim(),
        }).unwrap();

        toast.success(res?.message || 'OTP verified successfully');

        const resetPasswordToken =
          res?.data?.resetPasswordToken ||
          res?.resetPasswordToken ||
          (typeof res?.data === 'string' ? res?.data : null) ||
          res?.data?.token ||
          res?.token ||
          '';

        router.replace({
          pathname: '/(auth)/resetNewPassword',
          params: {
            email,
            resetPasswordToken,
          },
        });
      } else {
        const res = await verifyOtp({ email, otp: otp.trim() }).unwrap();
        const { accessToken, user } = res.data;
        await saveSession(accessToken, user);
        dispatch(setCredentials({ token: accessToken, user }));
        toast.success(res?.message || 'OTP verified successfully');
        router.replace('/(tabs)/home');
      }
    } catch (e: any) {
      const errMsg = e?.data?.message || e?.message || 'OTP verification failed';
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  const handleResend = async () => {
    try {
      if (purpose === 'forgot-password') {
        const res = await resendForgotPasswordOtp({
          token: currentToken,
        }).unwrap();

        toast.success(res?.message || 'Verification code resent successfully');

        const newToken =
          res?.data?.token ||
          (typeof res?.data === 'string' ? res?.data : null) ||
          res?.token;

        if (newToken) {
          setCurrentToken(newToken);
        }
      } else {
        const res = await resendOtp({ email }).unwrap();
        toast.success(res?.message || 'Verification code resent successfully');
      }

      otpRef.current?.clear();
      setOtp('');
      setError('');
    } catch (e: any) {
      const errMsg = e?.data?.message || e?.message || 'Failed to resend code';
      toast.error(errMsg);
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
          <TouchableOpacity onPress={handleResend} disabled={isResending}>
            <Text style={tw`text-sm text-amber-500 font-semibold`}>
              {isResending ? 'Sending...' : 'Resend'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`py-4`}>
          <Button
            text={isVerifying ? 'Verifying...' : 'Verify'}
            onPress={handleVerify}
            loading={isVerifying}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
