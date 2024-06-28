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

function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

function hasUppercase(value: string): boolean {
  const uppercaseRegex = /\p{Lu}/u;
  return uppercaseRegex.test(value);
}

function hasLowercase(value: string): boolean {
  const lowercaseRegex = /\p{Ll}/u;
  return lowercaseRegex.test(value);
}

function hasDigit(value: string): boolean {
  const numberRegex = /\d/;
  return numberRegex.test(value);
}

function hasSpecialCharacter(value: string): boolean {
  // \W matches non-word characters but includes `_`. We want to considere `_` as a special character.
  const specialCharacterRegex = /[\W_]/;
  return specialCharacterRegex.test(value);
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

// password validation
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

// password validation
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
    match &&= hasMinLength(password, minPasswordLength);
  }
  if (match && criteria & Criteria.Uppercase) {
    match &&= hasUppercase(password);
  }
  if (match && criteria & Criteria.Lowercase) {
    match &&= hasLowercase(password);
  }
  if (match && criteria & Criteria.Special) {
    match &&= hasSpecialCharacter(password);
  }
  if (match && criteria & Criteria.Digit) {
    match &&= hasDigit(password);
  }
  return match;
}

export const PasswordValidation = {
  getStrength,
  StrengthLevel,
  matchCriteria,
  Criteria,
};

// email validation
function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const Validation = {
  isEmailValid,
  hasLowercase,
  hasMinLength,
  hasDigit,
  hasSpecialCharacter,
};
