<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useNaiveFormContext } from '~/hooks';
import { http } from '~/utils';

interface FormValues {
  email: string;
  password: string;
}

const router = useRouter();
const { formRef } = useNaiveFormContext();

const model: FormValues = reactive({
  email: 'xiaoming@test.com',
  password: 'xiaoming@test.com',
});

async function handleSubmit() {
  try {
    const result = http.get('https://jsonplaceholder.typicode.com/posts');
    // const result = http.post('/api/v1/sign-in', { data: model });
    result.abort();
    window.setTimeout(() => {
    }, 500);
    await result.unwrap();
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
