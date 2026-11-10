import tw from '@/lib/tw';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  LayoutChangeEvent,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface FreeLocationMapProps {
  lat?: number | null;
  lng?: number | null;
  address?: string;
  height?: number;
  initialZoom?: number;
  onPress?: () => void;
}

function getTilePixelOffset(lat: number, lon: number, zoom: number) {
  const n = Math.pow(2, zoom);
  const xExact = ((lon + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const yExact =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;

  const tileX = Math.floor(xExact);
  const tileY = Math.floor(yExact);

  const offsetX = (xExact - tileX) * 256;
  const offsetY = (yExact - tileY) * 256;

  return { tileX, tileY, offsetX, offsetY };
}

export default function FreeLocationMap({
  lat,
  lng,
  address,
  height = 220,
  initialZoom = 14,
  onPress,
}: FreeLocationMapProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const [viewportWidth, setViewportWidth] = useState(350);

  if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) {
    return (
      <View
        style={[
          tw`rounded-2xl bg-gray-50 border border-gray-200 items-center justify-center p-4`,
          { height },
        ]}
      >
        <Ionicons name="location-outline" size={32} color="#9ca3af" />
        <Text style={tw`text-gray-400 text-xs mt-2 text-center`}>
          Map coordinates not available
        </Text>
        {address ? (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address
                )}`
              );
            }}
            style={tw`mt-2 bg-amber-500 px-3 py-1.5 rounded-lg flex-row items-center gap-1`}
          >
            <Ionicons name="map-outline" size={14} color="#ffffff" />
            <Text style={tw`text-white text-xs font-semibold`}>
              Search Address on Google Maps
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  const numLat = Number(lat);
  const numLng = Number(lng);

  const { tileX, tileY, offsetX, offsetY } = getTilePixelOffset(
    numLat,
    numLng,
    zoom
  );

  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    if (width > 0) {
      setViewportWidth(width);
    }
  };

  const centerPointX = 256 + offsetX;
  const centerPointY = 256 + offsetY;

  const gridLeft = viewportWidth / 2 - centerPointX;
  const gridTop = height / 2 - centerPointY;

  const rows = [-1, 0, 1];
  const cols = [-1, 0, 1];

  const handleOpenMap = () => {
    if (onPress) {
      onPress();
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&destination=${numLat},${numLng}`;
    Linking.openURL(url);
  };

  return (
    <View
      onLayout={onLayout}
      style={[
        tw`rounded-2xl bg-gray-100 overflow-hidden border border-gray-200 relative`,
        { height },
      ]}
    >
      {/* 3x3 Tile Grid */}
      <View
        style={{
          position: 'absolute',
          width: 768,
          height: 768,
          left: gridLeft,
          top: gridTop,
        }}
      >
        {rows.map((dy, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row', height: 256 }}>
            {cols.map((dx, colIndex) => {
              const tx = tileX + dx;
              const ty = tileY + dy;
              const tileUrl = `https://tile.openstreetmap.de/${zoom}/${tx}/${ty}.png`;

              return (
                <Image
                  key={`osm-de-${zoom}-${tx}-${ty}`}
                  source={{
                    uri: tileUrl,
                  }}
                  cachePolicy="none"
                  style={{ width: 256, height: 256 }}
                  contentFit="cover"
                  transition={100}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* Map Pin Marker at Exact Center */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: viewportWidth / 2 - 16,
          top: height / 2 - 32,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <Ionicons name="location" size={32} color="#ef4444" />
        <View
          style={{
            width: 8,
            height: 3,
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.3)',
            marginTop: -2,
          }}
        />
      </View>

      {/* Zoom In / Out Controls */}
      <View
        style={tw`absolute top-3 right-3 bg-white/95 rounded-xl border border-gray-200 shadow-sm overflow-hidden z-20`}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={zoom >= 18}
          onPress={() => setZoom((z) => Math.min(18, z + 1))}
          style={tw`w-8 h-8 items-center justify-center border-b border-gray-100`}
        >
          <Ionicons name="add" size={18} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={zoom <= 10}
          onPress={() => setZoom((z) => Math.max(10, z - 1))}
          style={tw`w-8 h-8 items-center justify-center`}
        >
          <Ionicons name="remove" size={18} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Attribution Badge */}
      <View
        style={tw`absolute top-3 left-3 bg-white/80 px-2 py-0.5 rounded-md z-20`}
      >
        <Text style={tw`text-[10px] text-gray-500 font-medium`}>
          © OpenStreetMap
        </Text>
      </View>

      {/* Bottom Bar: Tap to open directions */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleOpenMap}
        style={tw`absolute bottom-2 left-2 right-2 bg-white/95 px-3 py-2 rounded-xl flex-row items-center justify-between shadow-sm border border-gray-200/80 z-20`}
      >
        <View style={tw`flex-row items-center gap-1.5 flex-1 mr-2`}>
          <Ionicons name="navigate-circle" size={16} color="#f59e0b" />
          <Text
            style={tw`text-xs text-gray-700 font-medium flex-1`}
            numberOfLines={1}
          >
            {address || `${numLat.toFixed(4)}, ${numLng.toFixed(4)}`}
          </Text>
        </View>
        <View style={tw`flex-row items-center gap-0.5`}>
          <Text style={tw`text-xs text-amber-600 font-bold`}>Open Map</Text>
          <Ionicons name="chevron-forward" size={12} color="#d97706" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
