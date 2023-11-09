# 项目安装

请使用yarn安装node_modules包，使用的是yarn.lock文件锁定版本的，用npm可能会导致问题
```
yarn install
```

# 项目运行
运行项目有dev和test运行脚本运行方式，代表着两种不同的服务环境
```
yarn run dev 或者
yarn run test
```
# 项目打包构建发布
1. 在mainifest.json文件中修改小程序的版本号，默认逐级递增，否则由于客户端限制，会导致拉包失败。
2. 在构建的时候，build脚本依赖jq，请电脑提前安装jq，mac安装命令```brew install jq```。
2. 运行```yarn run build```，这个脚本会使得*.wgt.zip包下载到你的Downloads文件夹
3. 登录[开放平台](https://dev-mashangban.ge.cn/#/login)（以dev环境为例），选中对应的小程序（如果新的小程序，则需要自己创建），把之前构建打包完成的zip包上传，并发布，这样就完成了小程序的发布，手机打开抱抱即可看到最新的打包小程序。

# 注意事项
小程序存在两种网关代理到服务器，本模板使用的是最新的代理网关，主要api前缀进行代理，通过客户端传入cookie，后面把这个cookie塞入到小程序的请求头里面，这个uni-request包已经封装好了；
还有一种方式是后端称之为小网关的代理方式，使用的是proxy前缀，通过客户端传入token，后面把token塞入到小程序请求头里面，这个这个uni-request包已经封装好了，具体的改造方式（只要把这个三个文件整体替换即可改造完成）：
```
src/requests/index.ts改造

import UniRequest from 'uniapp-request-sdk';

export const requestInstance = new UniRequest({
  timeout: 5000,
  maxRetryCount: 4,
  onErrorHandler: (resData) => {
    if (resData?.data?.errno === 2002) {
      setTimeout(() => {
        uni.showToast({
          title: resData.data.errmsg ?? '用户无权限',
          icon: 'none',
        });
      }, 500);
      setTimeout(() => {
        uni.sendNativeEvent('closeMiniProgram', {}, () => {});
      }, 1000);
    } else if (resData?.statusCode === 403) {
      if (uni.getStorageSync('isDebug')) {
        uni.navigateTo({
          url: '/pages/mock/index',
        });
      } else {
        uni.showToast({
          title: '用户登录信息失效，请退出后重试',
          icon: 'none',
        });
      }
    } else {
      setTimeout(() => {
        uni.showToast({
          title: resData?.data?.errmsg ?? '网络异常，请退出重新进入',
          icon: 'none',
        });
      }, 500);
    }
  },
});

```

```
App.vue文件改造

<script>
  import { addErrorLogs } from 'uniapp-log-sdk';
  import { requestInstance } from '@/requests';
  export default {
    onLaunch: function (options) {
      console.log('小程序启动入参：', options);
      let opinions = {
        // #ifdef H5
        baseUrl: '',
        // #endif
        /** 如果在非H5的条件下，适用于真机调试模拟 */
        // #ifndef H5
        baseUrl: 'http://dev-oa.ge.cn',
        // #endif
        userInfo: {},
      };
      /** 代表是从客户端启动的 */
      if (options.referrerInfo.extraData.baseUrl) {
        uni.setStorageSync('isDebug', false);
        opinions = options.referrerInfo.extraData;
        uni.setStorageSync('token', opinions.token);
        uni.setStorageSync('userInfo', opinions.userInfo);
      } else {
        uni.setStorageSync('isDebug', true);
        opinions.userInfo = uni.getStorageSync('opinions').userInfo || {};
      }
      uni.setStorageSync('opinions', opinions);
      uni.setStorageSync('baseUrl', opinions.baseUrl);
      requestInstance.setParams({
        baseUrl: `${opinions.baseUrl}/proxy/`,
        token: uni.getStorageSync('token'),
      });
    },
    onError: (...err) => {
      addErrorLogs(err);
    },
    onUnhandledRejection: (...err) => {
      addErrorLogs(err);
    },
    onPageNotFound: (...err) => {
      addErrorLogs(err);
    },
    onHide: function () {},
  };
</script>

<style lang="scss">
  @import 'node_modules/uview-plus/index.scss';
</style>

```

```
src/pages/mock/index.vue文件改造

<template>
  <oa-login @login-success="loginSuccess"></oa-login>
</template>

<script setup lang="ts">
  import { requestInstance } from '@/requests';
  const loginSuccess = (params: any) => {
    const { userInfo, token } = params;
    uni.setStorageSync('token', token);
    requestInstance.setParams({ token });
    uni.setStorageSync('opinions', { ...uni.getStorageSync('opinions'), userInfo });
    uni.setStorageSync('userInfo', userInfo);
    uni.redirectTo({
      url: '/pages/index/index',
    });
  };
</script>

```