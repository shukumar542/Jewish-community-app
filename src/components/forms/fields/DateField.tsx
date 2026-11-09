import { FormField } from '@/constants/form-schemas/types';
import tw from '@/lib/tw';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  field: FormField;
  control: Control<any>;
}

export default function DateField({ field, control }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Controller
      control={control}
      name={field.key}
      rules={{ required: field.required }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Text style={tw`text-gray-700 font-medium mb-1.5`}>
            {field.label}
            {field.required && <Text style={tw`text-amber-500`}> *</Text>}
          </Text>

          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={tw`flex-row items-center justify-between border ${
              error ? 'border-red-400' : 'border-gray-300'
            } rounded-xl px-4 py-3`}
          >
            <Text style={tw`text-gray-900 ${!value ? 'text-gray-400' : ''}`}>
              {value ? value : 'Select date'}
            </Text>
            <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
          </TouchableOpacity>

          {error && <Text style={tw`text-red-500 text-xs mt-1`}>This field is required</Text>}

          {showPicker && (
            <DateTimePicker
              value={value ? new Date(value) : new Date()}
              mode="date"
              onValueChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) {
                  const y = selectedDate.getFullYear();
                  const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
                  const d = String(selectedDate.getDate()).padStart(2, '0');
                  onChange(`${y}-${m}-${d}`);
                }
              }}
              onDismiss={() => setShowPicker(false)}
            />
          )}
        </View>
      )}
    />
  );
}