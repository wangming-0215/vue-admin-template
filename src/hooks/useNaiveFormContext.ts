import type { FormInst } from 'naive-ui';
import type { Ref } from 'vue';
import { ref } from 'vue';

type FormValidateFnArgs = Parameters<FormInst['validate']>;

interface FormContext {
  formRef: Ref<FormInst | null>;
  validate: FormInst['validate'];
  restoreValidation: FormInst['restoreValidation'];
}

export default function useNaiveFormContext(): FormContext {
  const formRef = ref<FormInst | null>(null);

  /**
   * 验证表单
   * @param args
   */
  function validate(...args: FormValidateFnArgs) {
    if (formRef.value) {
      return formRef.value.validate(...args);
    }
    return Promise.resolve({ warnings: undefined });
  }

  /**
   * 还原到未验证状态
   */
  function restoreValidation() {
    formRef.value?.restoreValidation();
  }

  return { validate, restoreValidation, formRef };
}
