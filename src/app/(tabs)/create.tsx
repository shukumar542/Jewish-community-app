import { eventCategories } from '@/constants/event-categories';
import tw from '@/lib/tw';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChooseCategory() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top']}>
      <StatusBar style="dark" />
      <View style={tw`px-5 pt-4 pb-2`}>
        <Text style={tw`text-2xl font-bold text-gray-900`}>Choose Category</Text>
        <Text style={tw`text-gray-500 text-base mt-1`}>What are you celebrating?</Text>
      </View>

      <FlatList
        data={eventCategories}
        keyExtractor={(item) => item.key}
        contentContainerStyle={tw`px-5 pt-2 pb-8 gap-3`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/event-form/[category]',
                params: { category: item.key },
              })
            }
            style={tw`flex-row items-center justify-between bg-white border border-gray-200 rounded-2xl px-2 py-2 `}
          >
            <View style={tw`flex-row items-center  gap-3`}>
              <Image
                source={item.icon}
                style={tw`w-16 h-16 rounded-xl`}
                contentFit="cover"
              />
 
              <Text style={tw`text-gray-900 font-semibold text-base`}>
                {item.label}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}