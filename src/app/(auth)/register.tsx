import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import tw from '@/lib/tw';
import { useRegisterMutation } from '@/services/authApi';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [register, { isLoading }] = useRegisterMutation();

  const validate = () => {
    let valid = true;

    // purono error clear kora
    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!fullName.trim()) {
      setFullNameError('Full name is required');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const res = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      }).unwrap();

      console.log('Register success:', res);

      router.push({
        pathname: '/(auth)/OtpVerification',
        params: { email: email.trim(), purpose: 'register' },
      });
    } catch (err: any) {
      console.log('Register error:', err);

      const message =
        err?.data?.message ||
        (err?.status === 'FETCH_ERROR'
          ? 'Server e connect kora jachhe na. Network check korun.'
          : 'Registration failed. Abar try korun.');

      // email already exist type error hole email field e dekhano
      if (/email/i.test(message)) {
        setEmailError(message);
      } else {
        Alert.alert('Error', message);
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
        bottomOffset={20}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`w-10 h-10 rounded-xl border border-gray-200 items-center justify-center mt-4 mb-6`}
        >
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={tw`text-2xl font-bold text-gray-900 mb-1`}>Create Account</Text>
        <Text style={tw`text-gray-500 text-base mb-6`}>Join the Jewish community today</Text>

        <InputField
          label="Full Name"
          Icon={User}
          placeholder="Sarah Goldstein"
          value={fullName}
          onChangeText={(val) => {
            setFullName(val);
            if (fullNameError) setFullNameError('');
          }}
        />
        {fullNameError ? (
          <Text style={tw`text-red-500 text-xs mb-2 -mt-2`}>{fullNameError}</Text>
        ) : null}

        <InputField
          label="Email"
          Icon={Mail}
          placeholder="sarah@example.com"
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

        <InputField
          label="Password"
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
        ) : (
          <Text style={tw`mb-4`} />
        )}

        <Button
          text={isLoading ? 'Creating account...' : 'Create Account'}
          onPress={handleRegister}
          loading={isLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}