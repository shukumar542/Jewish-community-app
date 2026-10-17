import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import tw from '@/lib/tw';
import { useLoginMutation } from '@/services/authApi';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const [email, setEmail] = useState('jhon@example.com');
  const [password, setPassword] = useState('password123');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [login, { isLoading }] = useLoginMutation();


  const validate = () => {
    let valid = true;
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
    }
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    console.log('Login with:', { email, password });
    // router.push('/(tabs)/home' as any);

    setLoading(true);
    try {
      // API call
      const res = await login({ email, password }).unwrap();
      console.log(res)
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
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
        <Text style={tw`text-2xl font-bold text-gray-900 mb-1`}>Welcome Back</Text>
        <Text style={tw`text-gray-500 text-base mb-6`}>Sign in to your Jewish account</Text>

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

        <TouchableOpacity
          onPress={() => router.push('/(auth)/forgetPassword' as any)}
          style={tw`self-end mb-6`}
        >
          <Text style={tw`text-amber-500 font-medium`}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button text={loading ? 'Signing in...' : 'Sign In'} onPress={handleLogin} loading={loading} />

        {/* Register Link */}
        <View style={tw`flex-row items-center justify-center mt-4`}>
          <Text style={tw`text-sm text-gray-500`}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
            <Text style={tw`text-amber-500 font-medium`}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}