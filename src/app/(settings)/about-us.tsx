import BackButton from '@/components/ui/BackButton';
import HtmlView from '@/components/ui/HtmlView';
import tw from '@/lib/tw';
import { useGetAboutUsQuery } from '@/services/settingsApi';
import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutUs() {
  const { data, isLoading, isFetching, isError, refetch } = useGetAboutUsQuery();

  const content = data?.data?.content;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F6FA' }} edges={['top', 'bottom']}>
      <View style={tw`flex-1 px-4`}>
        <BackButton title="About Us" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-10`}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
              tintColor="#f59e0b"
              colors={['#f59e0b']}
            />
          }
        >
          {isLoading ? (
            <View style={tw`py-16 items-center justify-center`}>
              <ActivityIndicator size="large" color="#f59e0b" />
              <Text style={tw`text-gray-400 mt-3 text-sm font-medium`}>
                Loading About Us...
              </Text>
            </View>
          ) : isError ? (
            <View style={tw`py-16 items-center justify-center px-4`}>
              <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
              <Text style={tw`text-base font-semibold text-gray-900 mt-2`}>
                Failed to load About Us
              </Text>
              <Text style={tw`text-gray-500 text-sm text-center mt-1 mb-4`}>
                Please check your network connection and try again.
              </Text>
              <TouchableOpacity
                onPress={() => refetch()}
                style={tw`bg-gray-900 px-5 py-2.5 rounded-xl`}
              >
                <Text style={tw`text-white font-medium text-sm`}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={tw`bg-[#F1F1F2] rounded-2xl p-5 mt-2`}>
              {content ? (
                <HtmlView html={content} />
              ) : (
                <Text style={tw`text-gray-500 text-sm`}>
                  No About Us content available.
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
