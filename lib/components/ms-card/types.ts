import { Translatable } from '@lib/services';

interface MsSummaryCardItemData {
  label: Translatable;
  text: Translatable;
  error?: Translatable;
  secondLine?: {
    text: Translatable;
    error?: Translatable;
  };
}

interface MsSummaryCardRowData {
  item: MsSummaryCardItemData;
  secondItem?: MsSummaryCardItemData;
}

export type { MsSummaryCardItemData, MsSummaryCardRowData };
