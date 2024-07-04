// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { Translatable } from '@lib/services';

// common validation types
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

export * from '@lib/common/validation/password';
export * from '@lib/common/validation/string';
