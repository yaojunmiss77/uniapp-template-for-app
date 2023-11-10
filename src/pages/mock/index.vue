<template>
  <oa-login @login-success="loginSuccess"></oa-login>
</template>

<script setup lang="ts">
  const loginSuccess = (params: any) => {
    const { userInfo } = params;
    uni.setStorageSync('userInfo', userInfo);
    uni.redirectTo({
      url: '/pages/index/index',
    });
  };
</script>
