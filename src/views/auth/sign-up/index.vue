<script lang="ts" setup>
import TheSignUpForm from './TheSignUpForm.vue';
</script>

<template>
  <div class="flex-col gap-32px md:gap-56px">
    <div>
      <NH1 class="mb-0">
        注册
      </NH1>
      <div class="font-size-base">
        <span>已经有账号了?</span>
        <RouterLink to="/auth/sign-in" class="color-primary decoration-none hover:decoration-underline font-size-base">
          登录
        </RouterLink>
      </div>
    </div>
    <div class="flex-col gap-16px">
      <TheSignUpForm />
    </div>
  </div>
</template>
