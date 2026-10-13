// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { Ref, readonly, ref } from 'vue';

enum Theme {
  Light = 'light',
  Dark = 'dark',
  Rainbow = 'rainbow',
  Synthwave = 'synthwave',
  Spooky = 'spooky',
  Christmas = 'christmas',
  System = 'system',
}

export interface ThemeOption {
  key: Theme;
  label: string;
}

export const ThemeOptions: ThemeOption[] = [
  {
    key: Theme.Light,
    label: 'lib.services.themeManager.themes.light',
  },
  {
    key: Theme.Dark,
    label: 'lib.services.themeManager.themes.dark',
  },
  {
    key: Theme.Rainbow,
    label: 'lib.services.themeManager.themes.rainbow',
  },
  {
    key: Theme.Synthwave,
    label: 'lib.services.themeManager.themes.synthwave',
  },
  {
    key: Theme.Spooky,
    label: 'lib.services.themeManager.themes.spooky',
  },
  {
    key: Theme.Christmas,
    label: 'lib.services.themeManager.themes.christmas',
  },
  {
    key: Theme.System,
    label: 'lib.services.themeManager.themes.system',
  },
];

class ThemeManager {
  private _theme: Theme;

  constructor(theme: Theme) {
    this._theme = theme;
    this.addTheme(this._theme);
  }

  use(newTheme: Theme): void {
    if (newTheme === this._theme) {
      return;
    }
    this.removeTheme(this._theme);
    this._theme = newTheme;
    this.addTheme(this._theme);
  }

  get theme(): Theme {
    return this._theme;
  }

  private classNameFromTheme(theme: Theme): string {
    if (theme === Theme.System) {
      theme = this.isDarkModeEnabledInBrowser() ? Theme.Dark : Theme.Light;
    }
    return `ms-theme-${theme}`;
  }

  private removeTheme(theme: Theme): void {
    document.body.classList.remove(this.classNameFromTheme(theme));
  }

  private addTheme(theme: Theme): void {
    document.body.classList.add(this.classNameFromTheme(theme));
  }

  private isDarkModeEnabledInBrowser(): boolean {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

interface _ThemeAttributes {
  isDarkTheme: Readonly<Ref<boolean>>;
}

let _isDarkTheme: Ref<boolean> | undefined;

function _bodyHasDarkTheme(): boolean {
  return document.body.classList.contains(`ms-theme-${Theme.Dark}`);
}

// Reads the theme class set by ThemeManager on the body, so it works without inject (modals, plain files)
function useTheme(): _ThemeAttributes {
  if (!_isDarkTheme) {
    const isDarkTheme = ref(_bodyHasDarkTheme());
    new MutationObserver(() => {
      isDarkTheme.value = _bodyHasDarkTheme();
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    _isDarkTheme = isDarkTheme;
  }
  return { isDarkTheme: readonly(_isDarkTheme) };
}

export { Theme, ThemeManager, useTheme };
