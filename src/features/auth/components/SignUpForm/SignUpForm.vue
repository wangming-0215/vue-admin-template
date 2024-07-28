<script lang="ts" setup>
defineOptions({ name: 'TheSignUpForm', inheritAttrs: false });
</script>

<template>
  <NForm size="large">
    <NFormItem label="昵称">
      <NInput placeholder="昵称" />
    </NFormItem>
    <NFormItem label="邮箱">
      <NInput placeholder="邮箱" />
    </NFormItem>
    <NFormItem label="密码">
      <NInput placeholder="密码" type="password" show-password-on="click" />
    </NFormItem>
    <NFormItem label="确认密码">
      <NInput placeholder="确认密码" type="password" show-password-on="click" />
    </NFormItem>
    <NButton type="primary" block size="large" attr-type="submit">
      注册
    </NButton>
  </NForm>
</template>
