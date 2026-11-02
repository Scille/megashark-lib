// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { ComputedRef, Ref, computed, effectScope, ref, watch } from 'vue';

enum Theme {
  Light = 'light',
  Dark = 'dark',
  Pumpkin = 'pumpkin',
  Synthwave = 'synthwave',
}

enum ThemePreference {
  Light = 'light',
  Dark = 'dark',
  Pumpkin = 'pumpkin',
  Synthwave = 'synthwave',
  System = 'system',
}

export interface ThemeOption {
  key: ThemePreference;
  label: string;
}

export const ThemeOptions: ThemeOption[] = [
  {
    key: ThemePreference.Light,
    label: 'lib.services.themeManager.themes.light',
  },
  {
    key: ThemePreference.Dark,
    label: 'lib.services.themeManager.themes.dark',
  },
  {
    key: ThemePreference.Pumpkin,
    label: 'lib.services.themeManager.themes.pumpkin',
  },
  {
    key: ThemePreference.Synthwave,
    label: 'lib.services.themeManager.themes.synthwave',
  },
  {
    key: ThemePreference.System,
    label: 'lib.services.themeManager.themes.system',
  },
];

interface _ThemeAttributes {
  themePreference: Ref<ThemePreference>;
  theme: ComputedRef<Theme>;
}

let _themeAttributes: _ThemeAttributes | undefined;

function _getSystemTheme(darkModeQuery: MediaQueryList | undefined): Theme {
  return darkModeQuery?.matches ? Theme.Dark : Theme.Light;
}

function _createThemeAttributes(): _ThemeAttributes {
  const darkModeQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
  const themePreference = ref(ThemePreference.System);
  const systemTheme = ref(_getSystemTheme(darkModeQuery));

  const theme = computed<Theme>(() => {
    switch (themePreference.value) {
      case ThemePreference.Light:
        return Theme.Light;
      case ThemePreference.Dark:
        return Theme.Dark;
      case ThemePreference.Pumpkin:
        return Theme.Pumpkin;
      case ThemePreference.Synthwave:
        return Theme.Synthwave;
      case ThemePreference.System:
        return systemTheme.value;
    }
  });

  darkModeQuery?.addEventListener('change', () => {
    systemTheme.value = _getSystemTheme(darkModeQuery);
  });

  watch(
    theme,
    (newTheme, oldTheme) => {
      if (oldTheme) {
        document.body.classList.remove(`ms-theme-${oldTheme}`);
      }
      document.body.classList.add(`ms-theme-${newTheme}`);
    },
    { immediate: true, flush: 'sync' },
  );

  return { themePreference, theme };
}

// The state is shared, so the scope is detached to outlive the component that happens to call this first
function useTheme(): _ThemeAttributes {
  if (!_themeAttributes) {
    _themeAttributes = effectScope(true).run(_createThemeAttributes)!;
  }
  return _themeAttributes;
}

export { Theme, ThemePreference, useTheme };
