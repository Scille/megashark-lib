// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { Translatable } from '@lib/services';

export enum MsReportTheme {
  Info = 'ms-info',
  Success = 'ms-success',
  Warning = 'ms-warning',
  Error = 'ms-error',
}

export enum MsAppearance {
  Outline = 'outline',
  Clear = 'clear',
}

export enum Answer {
  Yes = 'yes',
  No = 'no',
}

export interface MsOption {
  label: Translatable;
  description?: Translatable;
  key: any;
  disabled?: boolean;
  disabledReason?: Translatable;
}

export class MsOptions {
  set: MsOption[];

  constructor(options: MsOption[]) {
    this.set = options;
  }

  at(index: number): MsOption | undefined {
    return this.set.at(index);
  }

  get(key: any): MsOption | undefined {
    return this.set.find((option) => {
      return option.key === key;
    });
  }
}
