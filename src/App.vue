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
        uni.setStorageSync('cookie', opinions.cookie);
        uni.setStorageSync('userInfo', opinions.userInfo);
      } else {
        uni.setStorageSync('isDebug', true);
        opinions.userInfo = uni.getStorageSync('opinions').userInfo || {};
      }
      uni.setStorageSync('opinions', opinions);
      uni.setStorageSync('baseUrl', opinions.baseUrl);
      requestInstance.setParams({
        baseUrl: `${opinions.baseUrl}/api/`,
        token: uni.getStorageSync('cookie'),
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
