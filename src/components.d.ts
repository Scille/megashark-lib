// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Translatable } from '@lib/services';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $msTranslate: (translatable: Translatable | undefined) => string;
  }
}
