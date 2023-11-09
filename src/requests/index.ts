import UniRequest from 'uniapp-request-sdk';

export const requestInstance = new UniRequest({
  timeout: 5000,
  maxRetryCount: 4,
  tokenHeader: 'cookie',
  tokenPrefix: '',
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
    } else if (resData?.statusCode === 401) {
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
