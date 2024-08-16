<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useNaiveFormContext } from '@/hooks';
import { withHandleError } from '@/utils';

import useAuthStore from '../../store';

interface FormValues {
  email: string;
  password: string;
}

const router = useRouter();
const { formRef } = useNaiveFormContext();
const store = useAuthStore();
const isSubmitting = ref<boolean>(false);

const model: FormValues = reactive({
  email: 'xiaoming@test.com',
  password: 'xiaoming@test.com',
});

const submit = withHandleError(
  async () => {
    isSubmitting.value = true;
    const { email, password } = model;
    await store.signIn(email, password);
    window.$message?.success('登录成功');
    router.replace('/');
    // window.setTimeout(() => {
    //   store.getProfile();
    // }, 10000);
  },
  {
    onFinally: () => {
      isSubmitting.value = false;
    },
  },
);
</script>

<template>
  <NForm ref="formRef" size="large" :model="model" @submit.prevent="submit">
    <NFormItem label="邮箱" path="email">
      <NInput v-model:value="model.email" placeholder="邮箱" />
    </NFormItem>
    <NFormItem label="密码" path="password">
      <NInput
        v-model:value="model.password"
        placeholder="密码"
        type="password"
        show-password-on="click"
      />
    </NFormItem>
    <NButton
      type="primary"
      block
      size="large"
      attr-type="submit"
      :loading="isSubmitting"
    >
      登录
    </NButton>
    <RouterLink
      to="#"
      class="font-size-base color-primary decoration-none hover:decoration-underline"
    >
      忘记密码?
    </RouterLink>
  </NForm>
</template>
