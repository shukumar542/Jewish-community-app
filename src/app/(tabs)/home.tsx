import EventCard from '@/components/ui/EventCard';
import { eventCategories } from '@/constants/event-categories';
import tw from '@/lib/tw';
import { DateRange, useGetEventsQuery } from '@/services/eventApi';
import { useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const timeFilterOptions: { label: string; value: DateRange }[] = [
  { label: 'All', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'This Week', value: 'this_week' },
];

const categoryFilters = ['All', ...eventCategories.map((c) => c.label.trim())];

export default function Home() {
  const auth = useAppSelector((s) => s?.auth?.user);

  const [activeTimeFilter, setActiveTimeFilter] = useState<DateRange>('all');
  const [activeCategory, setActiveCategory] = useState('All');

  const { data, isLoading, isFetching, isError, refetch } = useGetEventsQuery({
    dateRange: activeTimeFilter,
    category: activeCategory !== 'All' ? activeCategory : undefined,
  });

  const events = data?.data ?? [];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            colors={['#f59e0b']}
            tintColor="#f59e0b"
          />
        }
      >
        {/* Header */}
        <View style={tw`flex-row items-center justify-between px-5 pt-4 pb-2`}>
          <View>
        
            <Text style={tw`text-2xl font-bold text-gray-900 mt-0.5`}>
              Discover
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/search')}
            style={tw`w-11 h-11 rounded-xl border border-gray-300 items-center justify-center`}
          >
            <Ionicons name="search" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Time Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`gap-2.5 px-5 mt-2`}
        >
          {timeFilterOptions.map((filter) => {
            const isActive = activeTimeFilter === filter.value;
            return (
              <TouchableOpacity
                key={filter.value}
                onPress={() => setActiveTimeFilter(filter.value)}
                style={tw`py-2 px-5 rounded-full ${
                  isActive ? 'bg-amber-500' : 'bg-gray-100'
                }`}
              >
                <Text
                  numberOfLines={1}
                  style={tw`text-sm font-semibold ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`mt-3`}
          contentContainerStyle={tw`gap-2 px-5`}
        >
          {categoryFilters.map((category) => {
            const isActive = activeCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={tw`px-4 py-2 rounded-full border ${
                  isActive
                    ? 'bg-gray-900 border-gray-900'
                    : 'bg-white border-gray-300'
                }`}
              >
                <Text
                  style={tw`text-sm font-semibold ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Event Cards Listing */}
        <View style={tw`px-5 mt-5 gap-4 pb-6`}>
          {isLoading ? (
            <View style={tw`py-16 items-center justify-center`}>
              <ActivityIndicator size="large" color="#f59e0b" />
              <Text style={tw`text-gray-400 text-sm mt-3`}>
                Loading events...
              </Text>
            </View>
          ) : isError ? (
            <View style={tw`py-12 items-center justify-center px-4`}>
              <Ionicons name="alert-circle-outline" size={44} color="#ef4444" />
              <Text style={tw`text-gray-800 font-semibold text-base mt-2`}>
                Failed to load events
              </Text>
              <Text style={tw`text-gray-400 text-xs text-center mt-1 mb-4`}>
                Please check your network connection and try again.
              </Text>
              <TouchableOpacity
                onPress={() => refetch()}
                style={tw`bg-amber-500 px-5 py-2.5 rounded-full`}
              >
                <Text style={tw`text-white font-semibold text-sm`}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : events.length === 0 ? (
            <View style={tw`py-16 items-center justify-center px-4`}>
              <Ionicons name="calendar-outline" size={44} color="#9ca3af" />
              <Text style={tw`text-gray-800 font-semibold text-base mt-2`}>
                No events found
              </Text>
              <Text style={tw`text-gray-400 text-xs text-center mt-1`}>
                No events found for the selected date range and category.
              </Text>
            </View>
          ) : (
            events.map((event, index) => (
              <EventCard key={event._id ?? index} event={event} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}