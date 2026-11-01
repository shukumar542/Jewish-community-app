import EventCard from '@/components/ui/EventCard';
import { useDebouncedRouter } from '@/hooks/useDebouncedRouter';
import tw from '@/lib/tw';
import { useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const timeFilters = ['Today', 'Tomorrow', 'This Week', 'All'];
const categoryFilters = ['All', 'Wedding', 'Seven Blessings', 'Engagement', 'Gift Giving'];

const events = [
  {
    id: '1',
    title: 'Bars Mitzvah of Elijah Goldstein',
    date: 'August 3, 2025',
    location: 'Temple Beth Shalom, Brooklyn',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    favorited: false,
  },
  {
    id: '2',
    title: 'Rosh Hashanah Community Dinner',
    date: 'October 2, 2025',
    location: 'Jewish Community Center, Bronx',
    category: 'Seven Blessings',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485',
    favorited: true,
  },
  {
    id: '3',
    title: 'Bar Mitzvah of Elijah Goldstein',
    date: 'August 3, 2025',
    location: 'Temple Beth Shalom, Brooklyn',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    favorited: false,
  },
];

export default function Home() {
    const { push } = useDebouncedRouter();

    const auth = useAppSelector((s) => s?.auth?.user);

    console.log("auth" , auth?.fullName)
  
  const [activeTimeFilter, setActiveTimeFilter] = useState('Today');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between px-5 pt-4 pb-2`}>
          <View>
            <Text style={tw`text-gray-500 text-base`}>{auth?.fullName ?? 'Guest'}! 👋</Text>
            <Text style={tw`text-2xl font-bold text-gray-900 mt-1`}>
              Discover Celebrations
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/search")}
            style={tw`w-11 h-11 rounded-xl border border-gray-300 items-center justify-center`}
          >
            <Ionicons name="search" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Time Filters */}
        <View style={tw`flex-row px-3 mt-2 gap-2`}>
          {timeFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveTimeFilter(filter)}
              style={tw`flex-1 py-2 rounded-full items-center ${activeTimeFilter === filter ? 'bg-amber-500' : 'bg-gray-100'
                }`}
            >
              <Text
                style={tw`text-sm font-semibold ${activeTimeFilter === filter ? 'text-white' : 'text-gray-600'
                  }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`mt-3`}
          contentContainerStyle={tw`gap-2 px-3`}
        >
          {categoryFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveCategory(filter)}
              style={tw`px-4 py-2 rounded-full border ${activeCategory === filter
                ? 'bg-gray-900 border-gray-900'
                : 'bg-white border-gray-300'
                }`}
            >
              <Text
                style={tw`text-sm font-semibold ${activeCategory === filter ? 'text-white' : 'text-gray-600'
                  }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Event Cards */}
        <View style={tw`px-5 mt-5 gap-4 pb-4`}>
          {events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}