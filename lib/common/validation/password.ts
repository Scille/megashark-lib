// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { StringValidation } from '@lib/common/validation/string';
import { Translatable } from '@lib/services';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';

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

function getStrength(password: string): PasswordStrength {
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

enum Criteria {
  None = 0,
  Length = 1 << 0,
  Uppercase = 1 << 1,
  Lowercase = 1 << 2,
  Digit = 1 << 3,
  Special = 1 << 4,
  All = Length | Uppercase | Lowercase | Digit | Special,
}

const MIN_PASSWORD_LENGTH = 12;

export function matchCriteria(password: string, criteria: number, minPasswordLength: number = MIN_PASSWORD_LENGTH): boolean {
  let match = true;

  if (match && criteria & Criteria.Length) {
    match &&= StringValidation.hasMinLength(password, minPasswordLength);
  }
  if (match && criteria & Criteria.Uppercase) {
    match &&= StringValidation.hasUppercase(password);
  }
  if (match && criteria & Criteria.Lowercase) {
    match &&= StringValidation.hasLowercase(password);
  }
  if (match && criteria & Criteria.Special) {
    match &&= StringValidation.hasSpecialCharacter(password);
  }
  if (match && criteria & Criteria.Digit) {
    match &&= StringValidation.hasDigit(password);
  }
  return match;
}

export const PasswordValidation = {
  getStrength,
  StrengthLevel,
  matchCriteria,
  Criteria,
};
