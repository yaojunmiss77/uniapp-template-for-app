<script>
  import { addErrorLogs } from 'uniapp-log-sdk';
  import { requestInstance } from '@/requests';

  export default {
    onLaunch: function (options) {
      console.log('小程序启动入参：', options);
      let baseUrl = '';
      /** 如果在非H5的条件下，适用于真机调试模拟，真是调试情况下自行改动 */
      // #ifndef H5
      baseUrl = 'http://dev-oa.ge.cn';
      // #endif
      /** 代表是从客户端启动的 */
      if (options.referrerInfo.extraData.baseUrl) {
        const { cookie, userInfo, baseUrl: outBaseUrl } = options.referrerInfo.extraData;
        baseUrl = outBaseUrl;
        uni.setStorageSync('isDebug', false);
        uni.setStorageSync('cookie', cookie);
        uni.setStorageSync('userInfo', userInfo);
      } else {
        /** 代表是开发调试模式 */
        uni.setStorageSync('isDebug', true);
      }
      uni.setStorageSync('extraData', options.referrerInfo.extraData);
      uni.setStorageSync('baseUrl', baseUrl);
      requestInstance.setParams({
        baseUrl: `${baseUrl}/api/`,
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
