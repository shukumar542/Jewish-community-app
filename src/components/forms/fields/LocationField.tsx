import { FormField } from '@/constants/form-schemas/types';
import tw from '@/lib/tw';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  field: FormField;
  control: Control<any>;
  setValue?: UseFormSetValue<any>;
}

interface Suggestion {
  place_id: number | string;
  display_name: string;
  lat: string;
  lon: string;
}

export default function LocationField({ field, control, setValue }: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; long: number } | null>(null);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchAddress = (text: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!text || text.trim().length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            text.trim()
          )}&format=json&addressdetails=1&limit=5`,
          {
            headers: {
              'User-Agent': 'CommunityCelebrationApp/1.0',
              'Accept-Language': 'en',
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setSuggestions(data);
          setIsOpen(data.length > 0);
        }
      } catch (err) {
        console.warn('Location suggestion error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  const handleSelect = (
    item: Suggestion,
    onChange: (val: string) => void
  ) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    const address = item.display_name;

    onChange(address);
    setCoordinates({ lat, long: lon });
    setIsOpen(false);
    setSuggestions([]);

    if (setValue) {
      const latKey = field.latKey || (field.key.startsWith('bris') ? 'brisLat' : 'lat');
      const longKey = field.longKey || (field.key.startsWith('bris') ? 'brisLong' : 'long');
      setValue(field.key, address, { shouldValidate: true });
      setValue(latKey, lat, { shouldValidate: true });
      setValue(longKey, lon, { shouldValidate: true });
    }
  };

  return (
    <Controller
      control={control}
      name={field.key}
      rules={{ required: field.required }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={tw`relative z-20`}>
          <Text style={tw`text-gray-700 font-medium mb-1.5`}>
            {field.label}
            {field.required && <Text style={tw`text-amber-500`}> *</Text>}
          </Text>

          {/* Input Box */}
          <View
            style={tw`flex-row items-center border ${
              error ? 'border-red-400' : 'border-gray-300'
            } rounded-xl px-4 bg-white`}
          >
            <Ionicons name="location-outline" size={18} color="#9ca3af" />
            <TextInput
              value={value}
              onChangeText={(text) => {
                onChange(text);
                searchAddress(text);
              }}
              placeholder={field.placeholder ?? 'Full address'}
              placeholderTextColor="#9ca3af"
              style={tw`flex-1 py-3 px-2 text-gray-900`}
            />

            {isLoading && (
              <ActivityIndicator size="small" color="#f59e0b" style={tw`mr-1`} />
            )}

            {value ? (
              <TouchableOpacity
                onPress={() => {
                  onChange('');
                  setCoordinates(null);
                  setSuggestions([]);
                  setIsOpen(false);
                  if (setValue) {
                    setValue(field.key, '');
                    setValue('lat', undefined);
                    setValue('long', undefined);
                  }
                }}
              >
                <Ionicons name="close-circle" size={18} color="#9ca3af" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Coordinates captured indicator */}
          {coordinates && (
            <View style={tw`flex-row items-center gap-1.5 mt-1.5`}>
              <Ionicons name="checkmark-circle" size={14} color="#10b981" />
              <Text style={tw`text-emerald-600 text-xs font-medium`}>
                Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.long.toFixed(4)}
              </Text>
            </View>
          )}

          {error && (
            <Text style={tw`text-red-500 text-xs mt-1`}>This field is required</Text>
          )}

          {/* Suggestions Dropdown */}
          {isOpen && suggestions.length > 0 && (
            <View
              style={tw`mt-1 border border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden`}
            >
              {suggestions.map((item, index) => {
                const parts = item.display_name.split(',');
                const mainName = parts[0];
                const subName = parts.slice(1).join(',').trim();

                return (
                  <TouchableOpacity
                    key={item.place_id ?? index}
                    onPress={() => handleSelect(item, onChange)}
                    style={tw`flex-row items-start gap-2.5 px-3.5 py-3 ${
                      index !== suggestions.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <Ionicons
                      name="location-sharp"
                      size={18}
                      color="#f59e0b"
                      style={tw`mt-0.5`}
                    />
                    <View style={tw`flex-1`}>
                      <Text
                        style={tw`text-gray-900 text-sm font-semibold`}
                        numberOfLines={1}
                      >
                        {mainName}
                      </Text>
                      {subName ? (
                        <Text
                          style={tw`text-gray-400 text-xs mt-0.5`}
                          numberOfLines={1}
                        >
                          {subName}
                        </Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      )}
    />
  );
}