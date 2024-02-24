import React, { useEffect, useState } from 'react';
import { Layout, Menu, type MenuProps } from 'antd';

import './leftPane.scss';

import { AlignCenterOutlined } from '@ant-design/icons';
import { useMatches, useNavigate } from 'react-router-dom';

const COMPANY_LOGO_URL_LARGE: string = import.meta.env.VITE_COMPANY_LOGO_URL_LARGE;
const COMPANY_LOGO_URL_SMALL: string = import.meta.env.VITE_COMPANY_LOGO_URL_SMALL;
const { Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

const getItem: (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
) => MenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  const returnableMenuItem: MenuItem = {
    key,
    icon,
    children,
    label
  } satisfies MenuItem;
  return returnableMenuItem;
};

const menuItems: MenuItem[] = [
  getItem('Applications', '/applications', <AlignCenterOutlined />) //change icon
];

const LeftPane: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [routeMatchPath, setRouteMatchPath] = useState('/');
  const navigate = useNavigate();
  const matches = useMatches();
  useEffect(() => {
    setRouteMatchPath(matches[matches.length - 1].pathname);
  }, [matches]);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => {
        setCollapsed(value);
      }}
      className="h-screen "
    >
      <div className="h-14 flex items-center justify-center">
        <img
          src={collapsed ? COMPANY_LOGO_URL_SMALL : COMPANY_LOGO_URL_LARGE}
          className="object-contain w-4/5 h-6"
          alt="Maximl Logo"
        />
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={[routeMatchPath]}
        selectedKeys={[routeMatchPath]}
        onClick={(event) => {
          navigate(`${event.key}`);
        }}
        mode="inline"
        items={menuItems}
      />
    </Sider>
  );
};

export default LeftPane;
