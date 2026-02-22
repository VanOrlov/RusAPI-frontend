import type { Rule } from '../types';

export const isRulesValid = (rules: Rule[], value: string): boolean => {
  return rules.map((el) => el(value)).every((el) => el === true);
};
