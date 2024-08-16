<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui';

import {
  createPatternRule,
  createRequiredRule,
  getErrorMessage,
} from '@/utils';
import Regexps from '@/constants/regexps';

import useAuthStore from '../../store';

interface FormValues {
  nickname: string;
  email: string;
  password: string;
  confirm_password: string;
}

defineOptions({ name: 'TheSignUpForm', inheritAttrs: false });

const router = useRouter();
const authStore = useAuthStore();
const isSubmitting = ref<boolean>(false);
const confirmPasswordFormItemRef = ref<FormItemInst | null>(null);
const formRef = ref<FormInst | null>(null);

const formValues: FormValues = reactive({
  nickname: '',
  email: '',
  password: '',
  confirm_password: '',
});

const rules: FormRules = {
  nickname: createRequiredRule('请输入昵称'),
  email: [
    createRequiredRule('请输入邮箱'),
    createPatternRule(Regexps.email),
  ],
  password: [
    createRequiredRule('请输入密码'),
    createPatternRule(Regexps.password, '6-20个字符'),
  ],
  confirm_password: [
    createRequiredRule('请再次输入密码'),
    {
      validator(_rule: FormItemRule, value: string) {
        return value === formValues.password;
      },
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input'],
    },
  ],
};

async function submit() {
  await formRef.value?.validate();

  try {
    isSubmitting.value = true;
    await authStore.signUp(formValues);
    window.$message?.success('注册成功');
    isSubmitting.value = false;
    router.replace('/auth/sign-in');
  } catch (error) {
    isSubmitting.value = false;
    window.$message?.error(getErrorMessage(error));
  }
}

function handlePasswordInput() {
  if (formValues.confirm_password) {
    confirmPasswordFormItemRef.value?.validate({ trigger: 'password-input' });
  }
}
</script>

<template>
  <NForm
    ref="formRef"
    size="large"
    :model="formValues"
    :rules="rules"
    @submit.prevent="submit"
  >
    <NFormItem label="昵称" path="nickname">
      <NInput v-model:value="formValues.nickname" placeholder="昵称" />
    </NFormItem>
    <NFormItem label="邮箱" path="email">
      <NInput v-model:value="formValues.email" placeholder="邮箱" />
    </NFormItem>
    <NFormItem label="密码" path="password">
      <NInput
        v-model:value="formValues.password"
        placeholder="密码"
        type="password"
        @input="handlePasswordInput"
      />
    </NFormItem>
    <NFormItem
      ref="confirmPasswordFormItemRef"
      label="确认密码"
      path="confirm_password"
    >
      <NInput
        v-model:value="formValues.confirm_password"
        placeholder="确认密码"
        type="password"
      />
    </NFormItem>
    <NButton
      type="primary"
      block
      size="large"
      attr-type="submit"
      :loading="isSubmitting"
    >
      注册
    </NButton>
  </NForm>
</template>
