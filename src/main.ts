import App from './App.vue';
import { createSSRApp } from 'vue';
import uviewPlus from 'uview-plus';
import { addErrorLogs } from 'uniapp-log-sdk';
import UniOaView from 'uni-oaview';

let data = uni.getSystemInfoSync() as any;
// #ifndef H5
if (data.osName === 'android') {
  let main: any = plus.android.runtimeMainActivity();
  //为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台
  plus.runtime.quit = function () {
    main.moveTaskToBack(false);
  };
  //重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast
  plus.nativeUI.toast = function (str) {
    if (str == '再次返回退出应用') {
      plus.runtime.quit();
    } else {
      // #ifndef H5
      uni.sendNativeEvent('closeMiniProgram', {}, (ret) => {});
      // #endif
    }
  };
}
// #endif

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus).use(UniOaView);
  app.mixin({
    errorCaptured(...err) {
      addErrorLogs(err);
    },
    onError(...err: any) {
      addErrorLogs(err);
    },
  });
  return {
    app,
  };
}
