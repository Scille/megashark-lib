// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

enum AllowedInput {
  Numeric = 'numeric',
  Alpha = 'alpha',
  AlphaNumeric = 'alpha-numeric',
  UpperAlphaNumeric = 'upper-alpha-numeric',
  Any = 'any',
}

const checkAllowedFunctions: Record<AllowedInput, (input: string) => boolean> = {
  [AllowedInput.Numeric]: (input: string): boolean => /^\d+$/.test(input),
  [AllowedInput.Alpha]: (input: string): boolean => /^[a-zA-Z]+$/.test(input),
  [AllowedInput.AlphaNumeric]: (input: string): boolean => /^[A-Za-z\d]+$/.test(input),
  [AllowedInput.UpperAlphaNumeric]: (input: string): boolean => /^[A-Z\d]+$/.test(input),
  [AllowedInput.Any]: (_input: string): boolean => true,
};

function isCharacterAllowed(input: string, authInput: AllowedInput): boolean {
  return checkAllowedFunctions[authInput](input);
}

export { AllowedInput, isCharacterAllowed };
