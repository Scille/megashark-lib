import { Base64, decodeToken } from '@lib';
import { expect, test } from 'vitest';

const EMAIL = 'gordon.freeman@blackmesa.nm';
const USER_ID = '4242';

const RAW_DATA = {
  email: EMAIL,
  // eslint-disable-next-line camelcase
  is_staff: true,
  // eslint-disable-next-line camelcase
  token_type: 'access',
  // eslint-disable-next-line camelcase
  user_id: USER_ID,
  exp: 420000,
  iat: 42,
};
const B64_DATA = Base64.fromObject(RAW_DATA);

test('Decode JWT token', () => {
  const decoded = decodeToken(B64_DATA);
  expect(decoded.email).toBe('gordon.freeman@blackmesa.nm');
  expect(decoded.isStaff).toBe(true);
  expect(decoded.userId).toBe(USER_ID);
});

test('Token with part', () => {
  const decoded = decodeToken(`aaaaaaaaaaa.${B64_DATA}`);
  expect(decoded.email).toBe('gordon.freeman@blackmesa.nm');
  expect(decoded.isStaff).toBe(true);
  expect(decoded.userId).toBe(USER_ID);
});

test('Invalid token', () => {
  // Not valid base64
  expect(decodeToken('aaaaaaaaaaaaaaaaaaaaaaaaaaa')).toBe(undefined);
});
