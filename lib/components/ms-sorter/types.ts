// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { MsOption } from '@lib/components/ms-types';
import { Translatable } from '@lib/services/translation';

export interface MsSorterLabels {
  asc: Translatable;
  desc: Translatable;
}

export interface MsSorterChangeEvent {
  option: MsOption;
  sortByAsc: boolean;
}
