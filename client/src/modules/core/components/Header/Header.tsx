import React from 'react';
import { Layout, Typography } from 'antd';

import Profile from '../Profile/Profile';

import './Header.scss';

import { useLocation } from 'react-router-dom';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const location = useLocation();

  const title =
    location.pathname === '/'
      ? 'ToolJet Demo'
      : location.pathname.charAt(1).toUpperCase() +
        location.pathname.slice(2).toLowerCase().split('/')[0];
  return (
    <Header className="flex flex-row h-12 px-4 bg-white justify-between items-center shadow-md">
      <Typography.Text className="text-xl font-semibold text-black">{title}</Typography.Text>
      <Profile />
    </Header>
  );
};

export default AppHeader;
