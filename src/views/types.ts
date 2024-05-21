// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { MsItemModel } from '@lib/components';
import { DateTime } from 'luxon';

interface VideoGameOptions {
  isDisabled?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
}

export class VideoGame implements MsItemModel {
  name: string;
  releaseDate: DateTime;
  developer: string;
  id: number;
  isSelected: boolean;
  isSelectable: boolean;
  isDisabled: boolean;

  constructor(name: string, releaseDate: DateTime, developer: string, id: number, options?: VideoGameOptions) {
    this.isSelected = options?.isSelected === true;
    this.isSelectable = options?.isSelectable === true;
    this.isDisabled = options?.isDisabled === true;
    this.name = name;
    this.releaseDate = releaseDate;
    this.developer = developer;
    this.id = id;
  }

  getUniqueId(): string | number {
    return this.id;
  }
}
