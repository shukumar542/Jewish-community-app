import { eventCategories } from '@/constants/event-categories';
import { useDebouncedRouter } from '@/hooks/useDebouncedRouter';
import tw from '@/lib/tw';
import { useToggleFavouriteMutation } from '@/services/eventApi';
import { useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { toast } from 'sonner-native';

export default function EventCard({ event }: { event: any }) {
    const { push } = useDebouncedRouter();
    const token = useAppSelector((state) => state.auth.token);
    const [toggleFavourite, { isLoading: isToggling }] = useToggleFavouriteMutation();

    const eventId = event._id ?? event.id;

    const initialFav = Boolean(
        event.isFavourite ?? event.isFavorite ?? event.favorited ?? false
    );
    const [isFav, setIsFav] = useState(initialFav);

    useEffect(() => {
        setIsFav(
            Boolean(event.isFavourite ?? event.isFavorite ?? event.favorited ?? false)
        );
    }, [event.isFavourite, event.isFavorite, event.favorited]);

    const handleToggleFavorite = async () => {
        if (!token) {
            toast.error('Please login to save events');
            return;
        }

        if (!eventId) {
            toast.error('Event ID not found');
            return;
        }

        const nextFav = !isFav;
        setIsFav(nextFav);
        

        try {
            const res = await toggleFavourite({
                id: String(eventId),
                isFavourite: nextFav,
            }).unwrap();

            toast.success(
                res?.message || (nextFav ? 'Added to favourites' : 'Removed from favourites')
            );
        } catch (err: any) {
            setIsFav(!nextFav);
            const errMsg =
                err?.data?.message || err?.message || 'Failed to update favourite';
            toast.error(errMsg);
        }
    };

    const title =
        event.eventTitle ||
        event.title ||
        event.details?.chosonName ||
        event.details?.bucherName ||
        event.details?.boyName ||
        event.details?.nifterName ||
        event.details?.fatherName ||
        'Community Event';

    const date = event.details?.date || event.details?.sittingUntil || event.date || '';
    const time =
        event.details?.time ||
        event.details?.zmanShachris ||
        event.time ||
        '';
    const dateDisplay = event.details?.sittingUntil
        ? `Until ${event.details.sittingUntil}`
        : date && time
            ? `${date} • ${time}`
            : event.details?.zmanShachris
                ? `Zman: ${event.details.zmanShachris}`
                : date || time;

    const hall = event.details?.hallName || event.details?.venueName;
    const addr = event.details?.address || event.details?.venueAddress || event.location;
    const desc = event.details?.locationDescription;

    let location = 'Location not specified';
    if (hall && addr) {
        location = `${hall}, ${addr.split(',')[0]}`;
    } else if (hall) {
        location = hall;
    } else if (addr) {
        location = addr;
    } else if (desc) {
        location = desc;
    }

    const category = event.category || '';

    // Match category to official icon from eventCategories
    const cleanCat = category.toLowerCase().replace(/[\s-_]+/g, '');
    const matchedCategory = eventCategories.find((c) => {
        const cleanKey = c.key.toLowerCase().replace(/[\s-_]+/g, '');
        const cleanLabel = c.label.toLowerCase().replace(/[\s-_]+/g, '');
        return (
            cleanLabel === cleanCat ||
            cleanKey === cleanCat ||
            (cleanCat.includes('sheva') && (cleanLabel.includes('sheva') || cleanKey.includes('sheva'))) ||
            (cleanCat.includes('zocher') && (cleanLabel.includes('zucher') || cleanKey.includes('zachar')))
        );
    });

    const imageSource = event.image
        ? { uri: event.image }
        : event.details?.coverImage
            ? { uri: event.details.coverImage }
            : matchedCategory
                ? matchedCategory.icon
                : require('../../../assets/images/container.png');

    return (
        <TouchableOpacity
            onPress={() =>
                push({
                    pathname: '/event/[id]',
                    params: { id: eventId },
                })
            }
            style={tw`rounded-2xl px-1 overflow-hidden bg-white shadow-sm border flex-row border-gray-100`}
        >
            <View style={tw`w-32 h-36 relative `}>
                <Image
                    source={imageSource}
                    style={tw`w-full h-full`}
                    transition={200}
                />
            </View>

            <View style={tw`p-4 flex-1`}>
                {/* Category Badge */}
                {category ? (
                    <View style={tw` py-1`}>
                        <Text style={tw`text-amber-500 text-xs font-bold`}>{category}</Text>
                    </View>
                ) : null}
                {/* Favorite Icon */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={isToggling}
                    onPress={handleToggleFavorite}
                    style={tw`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 items-center justify-center`}
                >
                    <Ionicons
                        name={isFav ? 'heart' : 'heart-outline'}
                        size={18}
                        color={isFav ? '#f59e0b' : '#374151'}
                    />
                </TouchableOpacity>

                <Text style={tw`text-gray-900 text-base font-bold`} numberOfLines={1}>
                    {title}
                </Text>
                {dateDisplay ? (
                    <View style={tw`flex-row items-center mt-2 gap-1.5`}>
                        <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
                        <Text style={tw`text-gray-500 text-sm`} numberOfLines={1}>
                            {dateDisplay}
                        </Text>
                    </View>
                ) : null}
                <View style={tw`flex-row items-center mt-1 gap-1.5`}>
                    <Ionicons name="location-outline" size={14} color="#9ca3af" />
                    <Text style={tw`text-gray-500 text-sm flex-1`} numberOfLines={1} ellipsizeMode="tail">
                        {location}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}