<script>
  import { addErrorLogs } from 'uniapp-log-sdk';
  import { requestInstance } from '@/requests';

  export default {
    onLaunch: function (options) {
      console.log('小程序启动入参：', options);
      let baseUrl = '';
      /** 如果在非H5的条件下，适用于真机调试模拟，真机调试情况下环境自行改动 */
      // #ifndef H5
      baseUrl = 'http://dev-oa.ge.cn';
      // #endif
      /** 代表是从客户端启动的 */
      if (options.referrerInfo.extraData.baseUrl) {
        const { cookie, userInfo, baseUrl: outBaseUrl } = options.referrerInfo.extraData;
        baseUrl = outBaseUrl;
        uni.setStorageSync('isDebug', false);
        /** H5调式环境中，无需塞入cookie，浏览器自动管理cookie;真机调试模式下由登录页面塞入cookie到storage中 */
        uni.setStorageSync('cookie', cookie);
        /** 在开发调试模式下，userInfo会由登录页面塞入到storage中 */
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
