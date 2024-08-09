import type { FormItemRule } from 'naive-ui';

type RuleType = FormItemRule['type'];

/**
 * 必填项规则
 * @param message
 * @param type
 * @returns FormItemRule
 */
export function createRequiredRule(
  message: string,
  type: RuleType = 'string',
): FormItemRule {
  return {
    type,
    message,
    required: true,
    trigger: ['input', 'blur'],
  };
}

export function createPatternRule(
  pattern: RegExp,
  message: string = '格式不正确',
): FormItemRule {
  return {
    type: 'string',
    pattern,
    message,
    trigger: ['input', 'blur'],
  };
}
