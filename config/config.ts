// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'toolhub',
    locale: true,
    siderWidth: 208,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/welcome',
      name: '欢迎',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/camera',
      name: '调用设备摄像头',
      icon: 'crown',
      component: './Camera',
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   icon: 'crown',
    //   access: 'canAdmin',
    //   component: './Admin',
    //   routes: [
    //     {
    //       path: '/admin/sub-page',
    //       name: 'sub-page',
    //       icon: 'smile',
    //       component: './Welcome',
    //     },
    //   ],
    // },
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
