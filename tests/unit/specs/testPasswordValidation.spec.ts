import { PasswordValidation } from '@lib';
import { expect, test } from 'vitest';

test.each([
  ['C00l-P@ssw0rd', PasswordValidation.Criteria.All, true],
  // Each one individually
  ['C00l-P@ssw0rd', PasswordValidation.Criteria.Length, true],
  ['C00l-P@ssw0rd', PasswordValidation.Criteria.Uppercase, true],
  ['C00l-P@ssw0rd', PasswordValidation.Criteria.Lowercase, true],
  ['C00l-P@ssw0rd', PasswordValidation.Criteria.Special, true],
  ['C00l-P@ssw0rd', PasswordValidation.Criteria.Digit, true],
  // No digits
  ['Cool-P@ssword', PasswordValidation.Criteria.Digit, false],
  ['Cool-P@ssword', PasswordValidation.Criteria.All, false],
  // No uppercase
  ['c00l-p@ssw0rd', PasswordValidation.Criteria.Uppercase, false],
  ['c00l-p@ssw0rd', PasswordValidation.Criteria.All, false],
  // Not long enough
  ['-P@ssw0rd', PasswordValidation.Criteria.Length, false],
  ['-P@ssw0rd', PasswordValidation.Criteria.All, false],
  // No lowercase
  ['C00L-P@SSW0RD', PasswordValidation.Criteria.Lowercase, false],
  ['C00L-P@SSW0RD', PasswordValidation.Criteria.All, false],
  // No special
  ['C00lP@ssw0rd', PasswordValidation.Criteria.Special, true],
  ['C00lP@ssw0rd', PasswordValidation.Criteria.All, true],
  // Only lowercase
  ['coolpassword', PasswordValidation.Criteria.Lowercase, true],
  ['coolpassword', PasswordValidation.Criteria.All, false],
  ['coolpassword', PasswordValidation.Criteria.Uppercase, false],
  // Lowercase and something else
  ['coolpassword', PasswordValidation.Criteria.Lowercase | PasswordValidation.Criteria.Uppercase, false],
  // Only uppercase
  ['COOLPASSWORD', PasswordValidation.Criteria.Uppercase, true],
  ['COOLPASSWORD', PasswordValidation.Criteria.All, false],
  ['COOLPASSWORD', PasswordValidation.Criteria.Lowercase, false],
  // Uppercase and something else
  ['COOLPASSWORD', PasswordValidation.Criteria.Uppercase | PasswordValidation.Criteria.Lowercase, false],
  // Only digits
  ['0123456789', PasswordValidation.Criteria.Digit, true],
  ['0123456789', PasswordValidation.Criteria.All, false],
  ['0123456789', PasswordValidation.Criteria.Special, false],
  // Digit and something else
  ['0123456789', PasswordValidation.Criteria.Digit | PasswordValidation.Criteria.Lowercase, false],
  // Only special
  ['-*&$£+!#~@.<>', PasswordValidation.Criteria.Special, true],
  ['-*&$£+!#~@.<>', PasswordValidation.Criteria.All, false],
  ['-*&$£+!#~@.<>', PasswordValidation.Criteria.Digit, false],
  // Special and something else
  ['-*&$£+!#~@.<>', PasswordValidation.Criteria.Special | PasswordValidation.Criteria.Digit, false],
  // Special with digits
  ['-1337', PasswordValidation.Criteria.Special | PasswordValidation.Criteria.Digit, true],
])('Validates password %s (%#)', (password, criteria, expected) => {
  expect(PasswordValidation.matchCriteria(password, criteria)).toBe(expected);
});

test('Checks password length', () => {
  expect(PasswordValidation.matchCriteria('short', PasswordValidation.Criteria.Length, 4)).toBe(true);
  expect(PasswordValidation.matchCriteria('short', PasswordValidation.Criteria.Length, 5)).toBe(true);
  expect(PasswordValidation.matchCriteria('short', PasswordValidation.Criteria.Length, 6)).toBe(false);
});
