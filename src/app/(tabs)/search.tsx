import EventCard from '@/components/ui/EventCard';
import tw from '@/lib/tw';
import { useSearchEventsQuery } from '@/services/eventApi';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Search() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query to prevent excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useSearchEventsQuery(debouncedQuery, {
    skip: !debouncedQuery,
  });

  const events = data?.data || [];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top']}>
      <StatusBar style="dark" />

      <View style={tw`px-5 pt-4`}>
        <Text style={tw`text-2xl font-bold text-gray-900 mb-4`}>Search</Text>

        {/* Search Input */}
        <View style={tw`flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4`}>
          <Ionicons name="search" size={18} color="#9ca3af" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search celebrations, categories..."
            placeholderTextColor="#9ca3af"
            style={tw`flex-1 py-3 px-2 text-gray-900`}
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          debouncedQuery ? (
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
              tintColor="#f59e0b"
              colors={['#f59e0b']}
            />
          ) : undefined
        }
      >
        <View style={tw`px-5 mt-4 gap-4 pb-6`}>
          {query.trim().length === 0 ? (
            <View style={tw`items-center justify-center py-16`}>
              <Ionicons name="search-outline" size={48} color="#d1d5db" />
              <Text style={tw`text-gray-400 text-center mt-3 text-base`}>
                Start typing to search celebrations
              </Text>
            </View>
          ) : isLoading ? (
            <View style={tw`py-16 items-center justify-center`}>
              <ActivityIndicator size="large" color="#f59e0b" />
              <Text style={tw`text-gray-400 text-sm mt-3`}>
                Searching celebrations...
              </Text>
            </View>
          ) : isError ? (
            <View style={tw`items-center justify-center py-16`}>
              <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
              <Text style={tw`text-red-500 text-center mt-3 text-base font-semibold`}>
                Failed to load search results
              </Text>
              <Text style={tw`text-gray-400 text-center text-sm mt-1`}>
                Please try again later
              </Text>
            </View>
          ) : events.length === 0 ? (
            <View style={tw`items-center justify-center py-16`}>
              <Ionicons name="folder-open-outline" size={48} color="#d1d5db" />
              <Text style={tw`text-gray-400 text-center mt-3 text-base`}>
                No results found for "{debouncedQuery}"
              </Text>
            </View>
          ) : (
            <>
              <Text style={tw`text-xs text-gray-400 font-semibold mb-1`}>
                FOUND {events.length} {events.length === 1 ? 'EVENT' : 'EVENTS'}
              </Text>
              {events.map((event, index) => (
                <EventCard
                  key={event._id ?? (event as any).id ?? index}
                  event={event}
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}