<script lang="ts" setup>
import { reactive } from 'vue';
// import { useRouter } from 'vue-router';
import { StorageKeys } from '@/constants';

import { useNaiveFormContext } from '@/hooks';
import { http, storage } from '@/utils';

interface FormValues {
  email: string;
  password: string;
}

// const router = useRouter();
const { formRef } = useNaiveFormContext();

const model: FormValues = reactive({
  email: 'xiaoming@test.com',
  password: 'xiaoming@test.com',
});

async function handleSubmit() {
  try {
    const result = await http.post<{ data: string }>('/api/v1/sign-in', { data: model });
    // const result = http.get('https://jsonplaceholder.typicode.com/posts');
    // result.abort();
    // window.setTimeout(() => {
    // }, 500);
    window.console.log(result);
    storage.set(StorageKeys.AccessToken, result.data);

    window.setTimeout(async () => {
      await http.get('/api/v1/profile');
    }, 1000);
  } catch (error) {
    window.console.log('error: ', error);
  }
  // const response = await fetch('/api/v1/sign-in', {
  //   method: 'POST',
  //   body: JSON.stringify(model),
  // });
  // if (!response.ok) {
  //   const json = await response.json();
  //   window.$message.error(json.message);
  // } else {
  //   router.replace('/');
  // }
}
</script>

<template>
  <NForm ref="formRef" size="large" :model="model" @submit.prevent="handleSubmit">
    <NFormItem label="邮箱" path="email">
      <NInput v-model:value="model.email" placeholder="邮箱" />
    </NFormItem>
    <NFormItem label="密码" path="password">
      <NInput v-model:value="model.password" placeholder="密码" type="password" show-password-on="click" />
    </NFormItem>
    <NButton type="primary" block size="large" attr-type="submit">
      登录
    </NButton>
    <RouterLink to="#" class="color-primary decoration-none hover:decoration-underline font-size-base">
      忘记密码?
    </RouterLink>
  </NForm>
</template>
