import { create } from 'zustand'
import { settingsApi } from '../api/client'
import type { Settings } from '../types'
import { getApiErrorMessage } from '../types'
import { SUPPORTED_LANGUAGE_CODES } from '../i18n/supportedLanguages'

interface SettingsState {
  settings: Settings
  isLoaded: boolean

  loadSettings: () => Promise<void>
  updateSetting: (key: keyof Settings, value: Settings[keyof Settings]) => Promise<void>
  setLanguageLocal: (lang: string) => void
  setLanguageTransient: (lang: string) => void
  updateSettings: (settingsObj: Partial<Settings>) => Promise<void>
}

// Returns true when the user has explicitly chosen a language (persisted in localStorage).
// Use this instead of reading localStorage directly so the key stays encapsulated here.
export const hasStoredLanguage = (): boolean =>
  typeof localStorage !== 'undefined' && !!localStorage.getItem('app_language')

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: {
    map_tile_url: '',
    default_lat: 48.8566,
    default_lng: 2.3522,
    default_zoom: 10,
    dark_mode: 'dark',
    default_currency: 'USD',
    language: localStorage.getItem('app_language') || 'en',
    temperature_unit: 'fahrenheit',
    time_format: '12h',
    show_place_description: false,
    map_provider: 'leaflet',
    mapbox_access_token: '',
    mapbox_style: 'mapbox://styles/mapbox/standard',
    mapbox_3d_enabled: true,
    mapbox_quality_mode: false,
  },
  isLoaded: false,

  loadSettings: async () => {
    try {
      const data = await settingsApi.get()
      set((state) => ({
        settings: { ...state.settings, ...data.settings, dark_mode: 'dark' },
        isLoaded: true,
      }))
    } catch (err: unknown) {
      set({ isLoaded: true })
      console.error('Failed to load settings:', err)
    }
  },

  updateSetting: async (key: keyof Settings, value: Settings[keyof Settings]) => {
    const nextValue = key === 'dark_mode' ? 'dark' : value
    set((state) => ({
      settings: { ...state.settings, [key]: nextValue },
    }))
    if (key === 'language') localStorage.setItem('app_language', nextValue as string)
    try {
      await settingsApi.set(key, nextValue)
    } catch (err: unknown) {
      console.error('Failed to save setting:', err)
      throw new Error(getApiErrorMessage(err, 'Error saving setting'))
    }
  },

  setLanguageLocal: (lang: string) => {
    localStorage.setItem('app_language', lang)
    set((state) => ({ settings: { ...state.settings, language: lang } }))
  },

  // Applies a language for the current session without persisting to localStorage.
  // Used for automatic detection (browser/server default) — only explicit user
  // choices via the UI should be persisted.
  setLanguageTransient: (lang: string) => {
    if (!SUPPORTED_LANGUAGE_CODES.includes(lang)) return
    set((state) => ({ settings: { ...state.settings, language: lang } }))
  },

  updateSettings: async (settingsObj: Partial<Settings>) => {
    const nextSettings = { ...settingsObj, dark_mode: 'dark' as Settings['dark_mode'] }
    set((state) => ({
      settings: { ...state.settings, ...nextSettings },
    }))
    try {
      await settingsApi.setBulk(nextSettings)
    } catch (err: unknown) {
      console.error('Failed to save settings:', err)
      throw new Error(getApiErrorMessage(err, 'Error saving settings'))
    }
  },
}))
