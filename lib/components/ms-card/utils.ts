import { MsSummaryCardItemData } from '@lib/components/ms-card/types';
import { Translatable } from '@lib/services';

function createSummaryCardItem(
  label: Translatable,
  text: Translatable,
  error?: Translatable,
  secondLineText?: Translatable,
  secondLineError?: Translatable,
): MsSummaryCardItemData | undefined {
  if (!text) return;
  const item: MsSummaryCardItemData = {
    label,
    text,
    error,
  };

  if (secondLineText) {
    item.secondLine = {
      text: secondLineText,
      error: secondLineError,
    };
  }
  return item;
}

export { createSummaryCardItem };
