import * as React from 'react';
import { render } from 'react-dom';
import { ContextMenu, IMenuObject, ContextMenuFactory } from '../src/';

const { ContextMenuWithStore, client } = ContextMenuFactory();


const menu: IMenuObject = {
  id: 'component-tree',
  name: '组件树右键菜单',
  children: [
    { id: 'newFile', name: '创建新页面', icon: 'file'},
    { id: 'copy', name: '复制', icon: 'copy', shortcut: '⌘+C' },
    { id: 'paste', name: '粘贴', icon: 'switcher', shortcut: '⌘+V', disabled: true },
    {
      id: 'divider',
      name: '分割线',
      icon: 'file',
      type: 'separator'
    },
    { id: 'preview', name: '预览', icon: 'eye'},
    { id: 'delete', name: '删除', icon: 'delete', shortcut: '⌘+Delete' },
  ]
};

function onClickItem(key: string, keyPath: Array<string>, item: any) {
  console.log(`当前点击项的 id: ${key}`);
}

render(
  <ContextMenu
    visible={true}
    menu={menu}
    width={200}
    left={100}
    top={100}
    onClickItem={onClickItem}
  />,
  document.getElementById('example') as HTMLElement
);

//  ======== store ===========
render(
  <ContextMenuWithStore onClickItem={onClickItem} />,
  document.getElementById('example-store') as HTMLElement
);
client.post('/menu', { menu: menu });
client.put('/menu', { name: 'visible', value: true }); // 让菜单可见
client.put('/menu', { name: 'top', value: 500 }); // 更改位置

