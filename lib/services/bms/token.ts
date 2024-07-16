// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { Base64 } from '@lib/common/base64';
import { DateTime } from 'luxon';

export interface TokenInfo {
  email: string;
  isStaff: boolean;
  tokenType: 'access';
  userId: string;
  expiresAt: DateTime;
  createdAt: DateTime;
}

interface RawToken {
  email: string;
  is_staff: boolean;
  token_type: 'access';
  user_id: string;
  exp: number;
  iat: number;
}

export function decodeToken(token: string): TokenInfo | undefined {
  let encoded = '';
  if (token.includes('.')) {
    encoded = token.split('.')[1];
  } else {
    encoded = token;
  }
  try {
    const decoded = Base64.toObject(encoded) as RawToken;
    return {
      email: decoded.email,
      isStaff: decoded.is_staff,
      tokenType: decoded.token_type,
      userId: decoded.user_id,
      expiresAt: DateTime.fromSeconds(decoded.exp),
      createdAt: DateTime.fromSeconds(decoded.iat),
    };
  } catch (error: any) {
    console.error('Failed to decode JWT token');
  }
}
