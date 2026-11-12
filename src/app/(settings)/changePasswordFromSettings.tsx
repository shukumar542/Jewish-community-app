import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import tw from '@/lib/tw';
import { useChangePasswordMutation } from '@/services/settingsApi';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function ChangePasswordFromSettings() {
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (!oldPassword.trim()) {
      toast.error('Old password is required');
      return;
    }

    if (!newPassword.trim()) {
      toast.error('New password is required');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (oldPassword === newPassword) {
      toast.error('New password must be different from old password');
      return;
    }

    try {
      const res = await changePassword({
        oldPassword: oldPassword.trim(),
        newPassword: newPassword.trim(),
        confirmNewPassword: confirmPassword.trim(),
      }).unwrap();

      toast.success(res?.message || 'Password changed successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      router.back();
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.message ||
        'Failed to change password. Please check your old password.';
      toast.error(message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top', 'bottom']}>
      <View style={tw`flex-1 px-4`}>
        <BackButton title="Change Password" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={tw`mt-8 gap-1`}>
            <InputField
              label="Old Password"
              Icon={Lock}
              placeholder="••••••••"
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
            />
            <InputField
              label="New Password"
              Icon={Lock}
              placeholder="••••••••"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <InputField
              label="Confirm New Password"
              Icon={Lock}
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <View style={tw`mt-4`}>
              <Button
                text="Save"
                onPress={handleChangePassword}
                loading={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
