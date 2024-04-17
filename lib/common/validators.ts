// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { Translatable } from '@lib/services/translation';

export enum Validity {
  Invalid = 0,
  Intermediate = 1,
  Valid = 2,
}

export interface ValidationResult {
  validity: Validity;
  reason?: Translatable;
}

export interface IValidator {
  (value: string): Promise<ValidationResult>;
}
