import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import tw from '@/lib/tw';
import { useForgotPasswordMutation } from '@/services/authApi';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const validate = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email');
      return false;
    }
    return true;
  };

  const handleSendCode = async () => {
    if (!validate()) return;

    try {
      const res = await forgotPassword({ email: email.trim().toLowerCase() }).unwrap();
      toast.success(res?.message || 'Verification code sent to your email');

      const tokenValue =
        res?.data?.token ||
        (typeof res?.data === 'string' ? res?.data : null) ||
        res?.token;

      router.push({
        pathname: '/(auth)/OtpVerification',
        params: {
          email: email.trim().toLowerCase(),
          purpose: 'forgot-password',
          token: tokenValue || '',
        },
      });
    } catch (e: any) {
      const errMsg =
        e?.data?.message || e?.message || 'Failed to send verification code';
      setEmailError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        bottomOffset={50}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`w-10 h-10 rounded-full border border-gray-200 items-center justify-center mt-4 mb-6`}
        >
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold text-gray-900 mb-1`}>Email Confirmation</Text>
        <Text style={tw`text-gray-500 text-base mb-8`}>Enter your email for verification.</Text>

        <InputField
          label="Email Address"
          Icon={Mail}
          placeholder="your.email@example.com"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (emailError) setEmailError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? (
          <Text style={tw`text-red-500 text-xs mb-2 -mt-2`}>{emailError}</Text>
        ) : null}

        <Button
          text={isLoading ? 'Sending...' : 'Send Verification Code'}
          onPress={handleSendCode}
          loading={isLoading}
          style={tw`mt-10`}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
