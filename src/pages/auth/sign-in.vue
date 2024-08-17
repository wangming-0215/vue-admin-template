<script lang="ts" setup>
import { SignInForm } from '@/features/auth';
import { AppIcon } from '@/components';
</script>

<template>
  <div class="flex-col gap-32px md:gap-56px">
    <div>
      <NH1 class="mb-0">
        登录
      </NH1>
      <div class="font-size-base">
        <span>还没有账号?</span>
        <RouterLink to="/auth/sign-up" class="font-size-base color-primary decoration-none hover:decoration-underline">
          注册
        </RouterLink>
      </div>
    </div>
    <div class="flex-col gap-24px">
      <div class="flex-col gap-16px">
        <SignInForm />
      </div>
      <NDivider>
        <span class="font-size-base color-text-secondary font-normal">或者</span>
      </NDivider>
      <NButton size="large" tertiary block>
        <template #icon>
          <AppIcon icon="carbon:logo-wechat" color="#2aae67" />
        </template>
        <span>微信登录</span>
      </NButton>
    </div>
  </div>
</template>
