import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import tw from '@/lib/tw';
import { useResetPasswordMutation } from '@/services/authApi';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function ResetNewPassword() {
  const { email, resetPasswordToken } = useLocalSearchParams<{
    email?: string;
    resetPasswordToken?: string;
  }>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const validate = () => {
    let valid = true;

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password is required');
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const handleResetPassword = async () => {
    if (!validate()) return;

    if (!resetPasswordToken) {
      toast.error('Reset token is missing. Please restart forgot password.');
      return;
    }

    try {
      const res = await resetPassword({
        resetPasswordToken,
        newPassword: password.trim(),
        confirmNewPassword: confirmPassword.trim(),
      }).unwrap();

      toast.success(res?.message || 'Password reset successfully');
      router.replace('/(auth)/login');
    } catch (e: any) {
      const errMsg = e?.data?.message || e?.message || 'Failed to reset password';
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

        <Text style={tw`text-2xl font-bold text-gray-900 mb-1`}>Reset Password</Text>
        <Text style={tw`text-gray-500 text-base mb-6`}>
          Create a new password for your account
        </Text>

        <InputField
          label="New Password"
          Icon={Lock}
          placeholder="••••••••"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (passwordError) setPasswordError('');
          }}
          secureTextEntry
        />
        {passwordError ? (
          <Text style={tw`text-red-500 text-xs mb-2 -mt-2`}>{passwordError}</Text>
        ) : null}

        <InputField
          label="Confirm Password"
          Icon={Lock}
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={(val) => {
            setConfirmPassword(val);
            if (confirmPasswordError) setConfirmPasswordError('');
          }}
          secureTextEntry
        />
        {confirmPasswordError ? (
          <Text style={tw`text-red-500 text-xs mb-4 -mt-2`}>{confirmPasswordError}</Text>
        ) : null}

        <Button
          text={isLoading ? 'Resetting...' : 'Reset Password'}
          onPress={handleResetPassword}
          loading={isLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
