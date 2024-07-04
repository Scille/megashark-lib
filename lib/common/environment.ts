// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

function get(name: string, defaultValue?: string): string | undefined {
  const envName = name.startsWith('VITE_') ? name : `VITE_${name}`;
  return import.meta.env[envName] ?? defaultValue;
}

export enum EnvironmentType {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export const Environment = {
  get,
};
