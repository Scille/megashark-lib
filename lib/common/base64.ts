// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

function fromObject(obj: object): string {
  const jsonString = JSON.stringify(obj);
  return encode(jsonString);
}

function toObject(data: string): object {
  const jsonString = decode(data);
  return JSON.parse(jsonString);
}

function encode(input: string): string {
  const encoder = new TextEncoder();
  // Encode the string to utf-8, so it's safe to use with `btoa`.
  // CF: https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa#unicode_strings
  const bytes: Uint8Array = encoder.encode(input);
  // Convert the bytes array to a string since `btoa` only accepts strings.
  const binString = Array.from(bytes, (c) => String.fromCharCode(c)).join('');
  // Replace special char to be url safe.
  return btoa(binString).replace(/\+/g, '-').replace(/\//g, '_');
}

function decode(b64url: string): string {
  // Replace back the special chars used to make base64 string url safe.
  const input = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const binString = atob(input);
  const bytes = Uint8Array.from(
    binString,
    (c) =>
      // codePointAt may return undefined if the char is outside of valid UTF-16 range,
      // But since we come from a base64 encoded string, we know that all chars are valid
      c.codePointAt(0)!,
  );
  const decoder = new TextDecoder();
  // Decode the utf-8 bytes to a string
  return decoder.decode(bytes);
}

export const Base64 = {
  fromObject,
  toObject,
  encode,
  decode,
};
