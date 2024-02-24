import React, { type SyntheticEvent } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { type AuthState } from '../../../authentication/interfaces';
import { logout } from '../../../authentication/reducers';
import AxiosInstance from '../../../shared/apis/AxiosInstance';

import './Profile.scss';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState: AuthState = useSelector(({ auth }) => auth);
  const items: MenuProps['items'] = [
    {
      key: 'profile-menu-name',
      label: (
        <span className="flex flex-col">
          <span className="font-semibold">{authState.user.name}</span>
          {authState.user.email}
        </span>
      )
    },
    {
      type: 'divider'
    },
    {
      key: 'profile-settings',
      label: <span className="font-semibold">Profile Settings</span>,
      disabled:true,
    },
    {
      type: 'divider'
    },
    {
      label: <span>Log Out</span>,
      key: '2'
    }
  ];

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === 'profile-settings') {
      navigate('/profile');
    }
    if (key === '2') {
      const res = await AxiosInstance('/auth/logout');
      if (res) {
        dispatch(logout());
        navigate('/login');
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Dropdown menu={{ items, onClick }} trigger={['click']}>
        <div
          onClick={(event: SyntheticEvent) => {
            event.preventDefault();
          }}
          className="flex items-center cursor-pointer"
        >
          <Avatar
            className="hover:scale-110 transition ease-in-out delay-100"
            style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          >
            {authState.user.name?.substring(0, 1)}
          </Avatar>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
