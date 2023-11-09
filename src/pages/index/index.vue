<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <u-calendar
      :show-subtitle="true"
      :show="show"
      @close="
        () => {
          show = false;
        }
      "
    ></u-calendar>
    <u-button type="primary" @click="clickHandler">打开</u-button>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  import { Message } from 'uni-oaview';

  const title = ref('Hello');
  const show = ref(false);
  onLoad((option: any) => {
    console.log(1111111, JSON.stringify(option));
  });
  const clickHandler = () => {
    Message.success('预约变更成功', '我是大开发昂啊fdsafsdafsdafdsa是范德萨发生fdsafds大');
  };
</script>
<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
