// src/constants/form-schemas/types.ts
export type FieldType = 'text' | 'textarea' | 'date' | 'time' | 'image' | 'location' | 'dropdown' | 'number';

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  latKey?: string;
  longKey?: string;
}

export interface FormSection {
  title: string;
  description?: string;
  fields: FormField[];
}

export interface EventFormSchema {
  category: string;
  title: string;
  sections: FormSection[];  
}