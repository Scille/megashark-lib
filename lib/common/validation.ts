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
  const uppercaseRegex = /[A-Z]/;
  return uppercaseRegex.test(value);
}

function hasLowercase(value: string): boolean {
  const lowercaseRegex = /[a-z]/;
  return lowercaseRegex.test(value);
}

function hasNumber(value: string): boolean {
  const numberRegex = /\d/;
  return numberRegex.test(value);
}

function hasSpecialCharacter(value: string): boolean {
  const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
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
enum PasswordCriteria {
  ConfirmPassword = 'confirmPassword',
  Length = 'length',
  Uppercase = 'uppercase',
  Lowercase = 'lowercase',
  Number = 'number',
  Special = 'special',
}

export const strengthCriteria = [
  PasswordCriteria.Length,
  PasswordCriteria.Uppercase,
  PasswordCriteria.Lowercase,
  PasswordCriteria.Number,
  PasswordCriteria.Special,
];

const MIN_PASSWORD_LENGTH = 12;

export function doPasswordMatch(
  password: string,
  confirmPassword: string,
  criteria: PasswordCriteria[] = Object.values(PasswordCriteria),
  minPasswordLength: number = MIN_PASSWORD_LENGTH,
): boolean {
  return criteria.every((criterion) => {
    switch (criterion) {
      case PasswordCriteria.ConfirmPassword:
        return confirmPassword === password;
      case PasswordCriteria.Length:
        return hasMinLength(password, minPasswordLength);
      case PasswordCriteria.Uppercase:
        return hasUppercase(password);
      case PasswordCriteria.Lowercase:
        return hasLowercase(password);
      case PasswordCriteria.Number:
        return hasNumber(password);
      case PasswordCriteria.Special:
        return hasSpecialCharacter(password);
      default:
        return false;
    }
  });
}

export const PasswordValidation = {
  getStrength,
  StrengthLevel,
  doPasswordMatch,
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
  hasNumber,
  hasSpecialCharacter,
};
