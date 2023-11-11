<template>
  <oa-login @login-success="loginSuccess" type="cookie"></oa-login>
</template>

<script setup lang="ts">
  const loginSuccess = (params: any) => {
    const { userInfo, session } = params;
    uni.setStorageSync('cookie', `session=${session};`);
    uni.setStorageSync('userInfo', userInfo);
    uni.redirectTo({
      url: '/pages/index/index',
    });
  };
</script>
