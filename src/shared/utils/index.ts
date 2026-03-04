import { nextTick } from 'vue';
import type { Rule } from '../types';
import type { QInput } from 'quasar';

export const isRulesValid = (rules: Rule[], value: string): boolean => {
  return rules.map((el) => el(value)).every((el) => el === true);
};

export const resetValidation = async (
  element: InstanceType<typeof QInput> | null,
): Promise<void> => {
  await nextTick();
  if (element) element.resetValidation();
};

export const runInputValidate = async (
  element: InstanceType<typeof QInput> | null,
): Promise<void> => {
  await nextTick();
  if (element) await element.validate();
};
