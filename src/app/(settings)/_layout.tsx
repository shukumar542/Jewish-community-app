import { useAppSelector } from "@/store/hooks";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const token = useAppSelector((s) => s.auth.token);
  const isGuest = useAppSelector((s) => s.auth.isGuest);
  const isAllowedInApp = !!token || isGuest;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Protected guard={isAllowedInApp}>
        <Stack.Screen name="editProfile" />
        <Stack.Screen name="changePasswordFromSettings" />
      </Stack.Protected>

      <Stack.Screen name="about-us" />
      <Stack.Screen name="privacyPolicy" />
      <Stack.Screen name="termsCondition" />
    </Stack>
  );
}
