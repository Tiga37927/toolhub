import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 一个很帅的男人出品"
    links={[
      {
        key: 'toolhub',
        title: 'toolhub',
        href: 'https://github.com/youngauto/toolhub',
        blankTarget: true,
      },
    ]}
  />
);
