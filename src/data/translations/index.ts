import type { SupportedLanguage, TranslationDictionary } from '../../types/translations';
import { enTranslations } from './en';
import { taTranslations } from './ta';
import { hiTranslations } from './hi';
import { frTranslations } from './fr';

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: enTranslations,
  ta: taTranslations,
  hi: hiTranslations,
  fr: frTranslations,
};

export const languageOptions = [
  { code: 'en' as SupportedLanguage, label: 'English', native: 'English' },
  { code: 'ta' as SupportedLanguage, label: 'Tamil', native: 'தமிழ்' },
  { code: 'hi' as SupportedLanguage, label: 'Hindi', native: 'हिन्दी' },
  { code: 'fr' as SupportedLanguage, label: 'French', native: 'Français' },
];

export function getTranslations(lang: SupportedLanguage): TranslationDictionary {
  return translations[lang] || translations.en;
}
