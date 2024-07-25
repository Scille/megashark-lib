// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

// string validation functions
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

function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export const StringValidation = { hasMinLength, hasUppercase, hasLowercase, hasDigit, hasSpecialCharacter, isValidEmail };
