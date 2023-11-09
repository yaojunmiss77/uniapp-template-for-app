import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { vitePluginUniappOaPage } from 'vite-plugin-collection';
import { ENV } from './env';

const target = ENV[process.env.VUE_APP_ENV as string];
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/proxy': {
        target,
      },
      '/prod-api': {
        target,
      },
      '/api': {
        target,
      },
    },
  },
  plugins: [
    uni(),
    commonjs(),
    vitePluginUniappOaPage(),
    babel({
      runtimeHelpers: true,
      extensions: ['.js', '.ts', '.tsx', '.vue'],
      /** uni-oaview和uview-plus中有高级的js语法，需要进行babel */
      exclude: /node_modules\/(?!(uni-oaview|uview-plus))/,
    }),
  ],
});
