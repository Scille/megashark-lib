// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { Translatable } from '@lib/services/translation';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';

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

enum StrengthLevel {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
}

export interface PasswordStrength {
  level: StrengthLevel;
  label: Translatable;
}

zxcvbnOptions.setOptions({
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
  },
});

export function getStrength(password: string): PasswordStrength {
  if (password.length <= 0) {
    return {
      level: StrengthLevel.None,
      label: '',
    };
  }

  const result = zxcvbn(password);

  if (result.score === 0 || result.score === 1) {
    return {
      level: StrengthLevel.Low,
      label: 'lib.common.validation.passwordStrength.low',
    };
  } else if (result.score === 2 || result.score === 3) {
    return {
      level: StrengthLevel.Medium,
      label: 'lib.common.validation.passwordStrength.medium',
    };
  }
  return {
    level: StrengthLevel.High,
    label: 'lib.common.validation.passwordStrength.high',
  };
}

export const PasswordValidation = {
  getStrength,
  StrengthLevel,
};
