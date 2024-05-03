// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

enum Theme {
  Light = 'light',
  Dark = 'dark',
  Rainbow = 'rainbow',
  Synthwave = 'synthwave',
  Spooky = 'spooky',
  Christmas = 'christmas',
}

function getSystemTheme(): Theme {
  // For now
  return Theme.Light;
}

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
    return `ms-theme-${theme}`;
  }

  private removeTheme(theme: Theme): void {
    document.body.classList.remove(this.classNameFromTheme(theme));
  }

  private addTheme(theme: Theme): void {
    document.body.classList.add(this.classNameFromTheme(theme));
  }
}

export { Theme, ThemeManager, getSystemTheme };
