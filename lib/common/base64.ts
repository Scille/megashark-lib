// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

const KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function fromObject(obj: object): string {
  const jsonString = JSON.stringify(obj);
  return encode(jsonString);
}

function toObject(data: string): object {
  const jsonString = decode(data);
  return JSON.parse(jsonString);
}

/*
 * Base64 encode / decode
 * Taken from http://www.webtoolkit.info/
 * and updated a bit
 */

function encode(input: string): string {
  let output = '';
  let i = 0;

  input = _utf8Encode(input);

  while (i < input.length) {
    const chr1 = input.charCodeAt(i++);
    const chr2 = input.charCodeAt(i++);
    const chr3 = input.charCodeAt(i++);

    const enc1 = chr1 >> 2;
    const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    let enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output + KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) + KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
  }

  return output;
}

function decode(input: string): string {
  let output = '';
  let i = 0;

  input = input.replace(/[^A-Za-z0-9+/=]/g, '');

  while (i < input.length) {
    const enc1 = KEY_STR.indexOf(input.charAt(i++));
    const enc2 = KEY_STR.indexOf(input.charAt(i++));
    const enc3 = KEY_STR.indexOf(input.charAt(i++));
    const enc4 = KEY_STR.indexOf(input.charAt(i++));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  output = _utf8Decode(output);
  return output;
}

export const Base64 = {
  fromObject,
  toObject,
  encode,
  decode,
};

function _utf8Encode(s: string): string {
  s = s.replace(/\r\n/g, '\n');
  let utfText = '';

  for (let n = 0; n < s.length; n++) {
    const c = s.charCodeAt(n);
    if (c < 128) {
      utfText += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utfText += String.fromCharCode((c >> 6) | 192);
      utfText += String.fromCharCode((c & 63) | 128);
    } else {
      utfText += String.fromCharCode((c >> 12) | 224);
      utfText += String.fromCharCode(((c >> 6) & 63) | 128);
      utfText += String.fromCharCode((c & 63) | 128);
    }
  }

  return utfText;
}

function _utf8Decode(utfText: string): string {
  let s = '';
  let i = 0;

  while (i < utfText.length) {
    const c = utfText.charCodeAt(i);

    if (c < 128) {
      s += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      const c2 = utfText.charCodeAt(i + 1);
      s += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      const c2 = utfText.charCodeAt(i + 1);
      const c3 = utfText.charCodeAt(i + 2);
      s += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return s;
}
