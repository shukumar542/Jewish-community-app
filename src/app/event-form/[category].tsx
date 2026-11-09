import DynamicForm from '@/components/forms/DynamicForm';
import BackButton from '@/components/ui/BackButton';
import { formSchemas } from '@/constants/form-schemas';
import tw from '@/lib/tw';
import { useCreateEventMutation } from '@/services/eventApi';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function EventForm() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const schema = formSchemas[category];

  const [createEvent, { isLoading }] = useCreateEventMutation();

  if (!schema || !schema.sections) {
    return (
      <SafeAreaView style={tw`flex-1 bg-white items-center justify-center`}>
        <Text style={tw`text-gray-400`}>Form not found for "{category}"</Text>
      </SafeAreaView>
    );
  }

  const handleCreateEvent = async (payload: any) => {
    try {
      // console.log('Submitting event payload:', payload);
      const res = await createEvent(payload).unwrap();
      toast.success(res.message || 'Event created successfully');
      router.replace('/(tabs)/home');
    } catch (err: any) {
      console.warn('Create event error:', err);
      const message =
        err?.data?.message ||
        (err?.status === 'FETCH_ERROR'
          ? 'Network error. Please check your connection.'
          : 'Failed to create event. Please try again.');
      toast.error(message);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAwareScrollView
        style={tw`flex-1 px-5`}
        contentContainerStyle={tw`pb-4`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={0}
      >
        <BackButton title={schema.title} />
        <DynamicForm
          schema={schema}
          onSubmit={handleCreateEvent}
          isLoading={isLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}