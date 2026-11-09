import { loadSession } from '@/lib/authStorage';
import { hydrate } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner-native';
import '../global.css';
import { store } from '../store/store';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const isHydrated = useAppSelector((s) => s.auth.isHydrated);
  const token = useAppSelector((s) => s.auth.token);
  const isGuest = useAppSelector((s) => s.auth.isGuest);

  const isAllowedInApp = !!token || isGuest;

  useEffect(() => {
    async function prepare() {
      try {
        const { token, user } = await loadSession();
        dispatch(hydrate({ token, user }));
      } catch (e) {
        console.warn(e);
        dispatch(hydrate({ token: null, user: null }));
      }
    }
    prepare();
  }, [dispatch]);

  const onLayoutRootView = useCallback(async () => {
    if (isHydrated) {
      await SplashScreen.hideAsync();
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <KeyboardProvider>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false }}>

              <Stack.Protected guard={isAllowedInApp}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(settings)" />
              </Stack.Protected>

              <Stack.Protected guard={!token && !isGuest}>
                <Stack.Screen name="index" />
              </Stack.Protected>

              <Stack.Protected guard={!token}>
                <Stack.Screen name="(auth)" />
              </Stack.Protected>
            </Stack>
            <Toaster position="top-center" />
          </View>
        </KeyboardProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}