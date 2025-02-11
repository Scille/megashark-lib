import { Base64 } from '@lib';
import { expect, test } from 'vitest';

test('Base64 encode/decode', () => {
  // From data Parsec uses when logging in
  const obj = {
    handle: 1,
    data: {
      route: 'workspaces',
      params: {
        handle: 1,
      },
      query: {
        fileLink:
          // eslint-disable-next-line max-len
          'parsec3://saas-demo-v3-mightyfairy.parsec.cloud/Max11022025?a=path&p=k9gCnaGFRs9cTlC6zLR2YOIH4gLcADPM-syHJcz2V8yezOAfzO1DzODMtsyhRcy3zMp8IszBdzdReczozPTMwFFHPBjM7UJgzJTM18ySzK5XNjcdzNEazPXMlczSAEDM9syRBw',
      },
    },
  };

  /* eslint-disable max-len */
  const expected =
    'eyJoYW5kbGUiOjEsImRhdGEiOnsicm91dGUiOiJ3b3Jrc3BhY2VzIiwicGFyYW1zIjp7ImhhbmRsZSI6MX0sInF1ZXJ5Ijp7ImZpbGVMaW5rIjoicGFyc2VjMzovL3NhYXMtZGVtby12My1taWdodHlmYWlyeS5wYXJzZWMuY2xvdWQvTWF4MTEwMjIwMjU_YT1wYXRoJnA9azlnQ25hR0ZSczljVGxDNnpMUjJZT0lINGdMY0FEUE0tc3lISmN6MlY4eWV6T0Fmek8xRHpPRE10c3loUmN5M3pNcDhJc3pCZHpkUmVjem96UFRNd0ZGSFBCak03VUpnekpUTTE4eVN6SzVYTmpjZHpORWF6UFhNbGN6U0FFRE05c3lSQncifX19';
  /* eslint-enable max-len */

  const asBase64 = Base64.fromObject(obj);
  expect(asBase64).toEqual(expected);

  const asObj = Base64.toObject(asBase64);
  expect(asObj).toEqual(obj);
});
