import FreeLocationMap from '@/components/ui/FreeLocationMap';
import { eventCategories } from '@/constants/event-categories';
import tw from '@/lib/tw';
import { useGetEventByIdQuery, useToggleFavouriteMutation } from '@/services/eventApi';
import { useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Linking,
    RefreshControl,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

const roleLabels: Record<string, string> = {
    chosonName: 'Choson (Groom)',
    chosonsFather: "Choson's Father",
    kallahsFather: "Kallah's Father",
    ladiesKiddush: "Ladies' Kiddush",
    chosonBenR: "Choson's Father (Ben R')",
    chosonChasanR: "Choson's Father-in-Law (Chasan R')",
    kallahName: 'Kallah (Bride)',
    kallahFatherName: "Kallah's Father",
    kallahBenR: "Kallah's Father (Ben R')",
    kallahChasanR: "Kallah's Father-in-Law (Chasan R')",
    shadchen: 'Shadchen',
    bucherName: 'Bucher (Bar Mitzvah Boy)',
    boyName: "Boy's Name",
    nifterName: 'Nifter',
    wifeOf: 'Wife of',
    sonOf: 'Son of',
    daughterOf: 'Daughter of',
    aveilim: 'Aveilim',
    sittingUntil: 'Sitting Shiva Until',
    fatherName: 'Father',
    fatherBenR: "Father's Father (Ben R')",
    fatherChasanR: "Father's Father-in-Law (Chasan R')",
    motherName: 'Mother',
    mechiten1Name: 'Mechiten #1',
    mechiten1BenR: "Mechiten #1 Father (Ben R')",
    mechiten1ChasanR: "Mechiten #1 Father-in-Law (Chasan R')",
    mechiten2Name: 'Mechiten #2',
    mechiten2BenR: "Mechiten #2 Father (Ben R')",
    mechiten2ChasanR: "Mechiten #2 Father-in-Law (Chasan R')",
    parentInLaw1FullName: 'Mechiten #1',
    parentInLaw1Son: 'Mechiten #1 Son',
    parentInLaw1SonInLaw: 'Mechiten #1 Son-in-Law',
    parentInLaw2FullName: 'Mechiten #2',
    parentInLaw2Son: 'Mechiten #2 Son',
    parentInLaw2SonInLawOfRabbi: 'Mechiten #2 Son-in-Law',
    baalSimchaName: 'Baal Simcha',
    sandekName: 'Sandek',
    mohelName: 'Mohel',
    kohenName: 'Kohen',
};

const ignoredDetailKeys = new Set([
    'lat',
    'long',
    'brisLat',
    'brisLong',
    'date',
    'time',
    'zmanShachris',
    'address',
    'venueAddress',
    'hallName',
    'venueName',
    'locationDescription',
    'brisAddress',
    'brisLocationDescription',
    'coverImage',
    'image',
    'about',
    'description',
]);

export default function EventDetail() {
    const { width: screenWidth } = useWindowDimensions();
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.token);

    const eventId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';

    const {
        data: eventResponse,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetEventByIdQuery(eventId, {
        skip: !eventId,
    });

    const [toggleFavourite, { isLoading: isToggling }] = useToggleFavouriteMutation();
    const [favorited, setFavorited] = useState(false);

    const event = eventResponse?.data;
    const details = event?.details || {};

    useEffect(() => {
        if (event) {
            setFavorited(
                Boolean(event.isFavourite ?? event.isFavorite ?? event.favorited ?? false)
            );
        }
    }, [event]);

    const handleToggleFavorite = async () => {
        if (!token) {
            toast.error('Please login to save events');
            return;
        }

        if (!eventId) {
            toast.error('Event ID not found');
            return;
        }

        const nextFav = !favorited;
        setFavorited(nextFav);

        try {
            const res = await toggleFavourite({
                id: String(eventId),
                isFavourite: nextFav,
            }).unwrap();

            toast.success(
                res?.message || (nextFav ? 'Added to favourites' : 'Removed from favourites')
            );
        } catch (err: any) {
            setFavorited(!nextFav);
            const errMsg =
                err?.data?.message || err?.message || 'Failed to update favourite';
            toast.error(errMsg);
        }
    };

    // Title resolution
    const title =
        event?.eventTitle ||
        details.chosonName ||
        details.bucherName ||
        details.boyName ||
        details.nifterName ||
        details.fatherName ||
        'Community Celebration';

    const category = event?.category || '';

    // Date & Time
    const date = details.date || details.sittingUntil || (event as any)?.date || '';
    const time =
        details.time ||
        details.zmanShachris ||
        (event as any)?.time ||
        '';
    const dateDisplay = details.sittingUntil
        ? `Sitting Shiva until: ${details.sittingUntil}`
        : date && time
            ? `${date} • ${time}`
            : details.zmanShachris
                ? `Zman Shachris: ${details.zmanShachris}`
                : date || time || 'Date TBA';

    // Venue / Location
    const hall = details.hallName || details.venueName;
    const addr = details.address || details.venueAddress || (event as any)?.location;
    const desc = details.locationDescription;

    let location = 'Location not specified';
    if (hall && addr) {
        location = `${hall}, ${addr}`;
    } else if (hall) {
        location = hall;
    } else if (addr) {
        location = addr;
    } else if (desc) {
        location = desc;
    }

    // Host Info
    const host =
        event?.submittedBy ||
        (typeof event?.createdBy === 'object' && event?.createdBy !== null
            ? (event.createdBy as any)
            : null);
    const hostName = host?.fullName || 'Community Host';
    const hostEmail = host?.email;
    const hostPicture = host?.picture;

    // Matched Category Icon & Hero Image
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

    const isCustomCover = Boolean(details.coverImage || (event as any)?.image);
    const heroImageSource = details.coverImage
        ? { uri: details.coverImage }
        : (event as any)?.image
            ? { uri: (event as any).image }
            : matchedCategory
                ? matchedCategory.icon
                : require('../../../assets/images/container.png');

    // Coordinates
    const lat = details.lat;
    const lng = details.long;

    // Celebration / Family Details List
    const celebrationDetails = Object.entries(details)
        .filter(
            ([key, val]) =>
                !ignoredDetailKeys.has(key) &&
                val !== null &&
                val !== undefined &&
                String(val).trim() !== ''
        )
        .map(([key, val]) => {
            const role =
                roleLabels[key] ||
                key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())
                    .trim();
            return {
                role,
                name: String(val),
            };
        });

    const aboutText =
        details.about ||
        details.description ||
        (desc ? `Location Note: ${desc}` : null) ||
        `Join us in celebrating this ${category || 'special occasion'} with the community. Everyone is welcome to join and share in the simcha.`;

    const handleShare = async () => {
        try {
            await Share.share({
                title,
                message: `${title}\nCategory: ${category}\nDate: ${dateDisplay}\nLocation: ${location}`,
            });
        } catch {
            // Dismissed
        }
    };

    const handleGetDirections = () => {
        let url = '';
        if (lat && lng) {
            url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        } else if (addr || hall) {
            url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                addr || hall
            )}`;
        }

        if (url) {
            Linking.openURL(url).catch(() => {
                toast.error('Unable to open map application');
            });
        } else {
            toast.error('Location coordinates or address not available');
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={tw`flex-1 bg-white items-center justify-center`}>
                <ActivityIndicator size="large" color="#f59e0b" />
                <Text style={tw`text-gray-400 mt-3 text-sm`}>Loading celebration details...</Text>
            </SafeAreaView>
        );
    }

    if (isError || (!isLoading && !event)) {
        return (
            <SafeAreaView style={tw`flex-1 bg-white items-center justify-center px-6`}>
                <Ionicons name="alert-circle-outline" size={56} color="#ef4444" />
                <Text style={tw`text-lg font-bold text-gray-900 mt-4 text-center`}>
                    Event Not Found
                </Text>
                <Text style={tw`text-gray-500 text-sm mt-1 text-center mb-6`}>
                    This event could not be loaded or may have been removed.
                </Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={tw`bg-gray-900 px-6 py-3 rounded-xl`}
                >
                    <Text style={tw`text-white font-semibold`}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <View style={tw`flex-1 bg-white`}>
            <StatusBar style="light" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={true}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching && !isLoading}
                        onRefresh={refetch}
                        tintColor="#f59e0b"
                        colors={['#f59e0b']}
                    />
                }
            >
                {/* Hero Image */}
                <View
                    style={[
                        tw`h-60 relative bg-gray-100 overflow-hidden`,
                        { width: screenWidth },
                    ]}
                >
                    <Image
                        source={heroImageSource}
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                width: screenWidth,
                                height: '100%',
                                ...(isCustomCover ? {} : { transform: [{ scale: 1.18 }] }),
                            },
                        ]}
                        contentFit="cover"
                        transition={200}
                    />

                    <SafeAreaView style={tw`absolute top-0 left-0 right-0`} edges={['top']}>
                        <View style={tw`flex-row items-center justify-between px-4 pt-2`}>
                            <TouchableOpacity
                                onPress={() => router.back()}
                                style={tw`w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm`}
                            >
                                <Ionicons name="chevron-back" size={22} color="#111827" />
                            </TouchableOpacity>

                            <View style={tw`flex-row gap-2`}>
                                <TouchableOpacity
                                    onPress={handleShare}
                                    style={tw`w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm`}
                                >
                                    <Ionicons name="share-outline" size={19} color="#111827" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    disabled={isToggling}
                                    onPress={handleToggleFavorite}
                                    style={tw`w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm`}
                                >
                                    <Ionicons
                                        name={favorited ? 'heart' : 'heart-outline'}
                                        size={19}
                                        color={favorited ? '#f59e0b' : '#111827'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>

                {/* Content */}
                <View style={tw`px-5 pt-5`}>
                    {/* Category Badge */}
                    {category ? (
                        <View style={tw`bg-primary self-start px-3 py-1 rounded-full mb-3`}>
                            <Text style={tw`text-white text-xs font-bold`}>{category}</Text>
                        </View>
                    ) : null}

                    {/* Title */}
                    <Text style={tw`text-2xl font-bold text-secondary leading-snug`}>
                        {title}
                    </Text>

                    {/* Host Info */}
                    {host ? (
                        <View
                            style={tw`flex-row items-center mt-4 border border-gray-200 rounded-xl px-3 py-2.5`}
                        >
                            {hostPicture ? (
                                <Image
                                    source={{ uri: hostPicture }}
                                    style={tw`w-10 h-10 rounded-full`}
                                />
                            ) : (
                                <View
                                    style={tw`w-10 h-10 rounded-full bg-gray-100 items-center justify-center`}
                                >
                                    <Ionicons name="person" size={18} color="#6b7280" />
                                </View>
                            )}
                            <View style={tw`ml-3 flex-1`}>
                                <Text style={tw`text-secondary font-semibold text-base`}>
                                    {hostName}
                                </Text>
                                {hostEmail ? (
                                    <Text style={tw`text-gray-500 text-xs`}>{hostEmail}</Text>
                                ) : null}
                            </View>
                        </View>
                    ) : null}

                    {/* Date & Time */}
                    <View
                        style={tw`flex-row items-center mt-4 gap-3 border border-gray-200 rounded-xl px-3 py-2.5`}
                    >
                        <View
                            style={tw`w-9 h-9 rounded-md bg-[#FEF7E8] items-center justify-center`}
                        >
                            <Ionicons name="calendar" size={16} color="#F7B115" />
                        </View>
                        <Text style={tw`text-secondary text-base flex-1`}>
                            {dateDisplay}
                        </Text>
                    </View>

                    {/* Venue */}
                    <View
                        style={tw`flex-row items-center mt-3 gap-3 border border-gray-200 rounded-xl px-3 py-2.5`}
                    >
                        <View
                            style={tw`w-9 h-9 rounded-md bg-[#FEF7E8] items-center justify-center`}
                        >
                            <Ionicons name="location" size={16} color="#F7B115" />
                        </View>
                        <Text style={tw`text-secondary text-base flex-1`}>{location}</Text>
                    </View>

                    {/* Bris Venue (for Dual Venue categories like Vach Nacht) */}
                    {details.brisAddress ? (
                        <View
                            style={tw`flex-row items-center mt-3 gap-3 border border-amber-200 bg-[#FFFDF7] rounded-xl px-3 py-2.5`}
                        >
                            <View
                                style={tw`w-9 h-9 rounded-md bg-[#FEF7E8] items-center justify-center`}
                            >
                                <Ionicons name="location" size={16} color="#F7B115" />
                            </View>
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-amber-600 text-xs font-bold`}>Bris Venue</Text>
                                <Text style={tw`text-secondary text-base`}>
                                    {details.brisLocationDescription
                                        ? `${details.brisLocationDescription}, ${details.brisAddress}`
                                        : details.brisAddress}
                                </Text>
                                {details.zmanShachris ? (
                                    <Text style={tw`text-gray-500 text-xs mt-0.5`}>
                                        Zman Shachris: {details.zmanShachris}
                                    </Text>
                                ) : null}
                            </View>
                        </View>
                    ) : null}

                    {/* About Section */}
                    <Text style={tw`text-lg font-bold text-gray-900 mt-6 mb-2`}>
                        About this Celebration
                    </Text>
                    <Text style={tw`text-[#4F4F59] text-[14px] leading-relaxed`}>
                        {aboutText}
                    </Text>

                    {/* Map Section */}
                    <View style={tw`flex-row items-center justify-between mt-6 mb-2`}>
                        <Text style={tw`text-lg font-bold text-gray-900`}>Location on Map</Text>
                        <TouchableOpacity onPress={handleGetDirections}>
                            <Text style={tw`text-amber-500 font-semibold text-sm`}>
                                Get Directions
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FreeLocationMap
                        lat={lat}
                        lng={lng}
                        address={location}
                        height={200}
                        onPress={handleGetDirections}
                    />

                    {/* Celebration Details */}
                    {celebrationDetails.length > 0 ? (
                        <>
                            <Text style={tw`text-lg font-bold text-gray-900 mt-6 mb-1`}>
                                🎉 Celebration Details
                            </Text>
                            <Text style={tw`text-gray-500 text-sm mb-3`}>
                                {category || 'Family Details'}
                            </Text>

                            <View style={tw`gap-2 mb-12`}>
                                {celebrationDetails.map((member, index) => (
                                    <View
                                        key={index}
                                        style={tw`flex-row items-start gap-3 border border-gray-100 rounded-xl p-3 bg-white`}
                                    >
                                        <View
                                            style={tw`w-8 h-8 rounded-xl bg-[#FEF7E8] items-center justify-center`}
                                        >
                                            <View style={tw`w-2 h-2 rounded-full bg-amber-500`} />
                                        </View>
                                        <View style={tw`flex-1`}>
                                            <Text style={tw`text-[#4F4F59] text-xs`}>
                                                {member.role}
                                            </Text>
                                            <Text
                                                style={tw`text-[#000000] font-semibold text-base`}
                                            >
                                                {member.name}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </>
                    ) : (
                        <View style={tw`mb-12`} />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}