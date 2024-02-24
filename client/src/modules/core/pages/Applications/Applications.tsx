import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import noItem from '../../../../assets/no-item.png';
import { login, setUser } from '../../../authentication/reducers';
import AxiosInstance from '../../../shared/apis/AxiosInstance';
import AppCard from '../../components/AppCard/AppCard';
import { AppType } from '../../interfaces/app.interface';

import './Applications.scss';

const Applications = () => {
  const [open, setopen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [appName, setAppName] = useState<string>('');
  const [allApps, setAllApps] = useState<AppType[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showSquareModal = () => {
    setopen(true);
  };
  const handleCancel = () => {
    setopen(false);
  };
  const getAppications = async () => {
    const res = await AxiosInstance.get('/apps');
    setAllApps(res.data);
    setLoading(false);
  };
  const handleDeleteApp = async (id: String) => {
    try {
      const body = { appId: id };
      await AxiosInstance.delete('/apps', { data: body });
      getAppications();
      message.error('App deleted successfully');
    } catch (e) {
      console.error(e);
    }
  };
  const handleUpdateAppName = async (id: string, newAppName: string) => {
    try {
      if (appName.length <= 50 && !allApps.find((item) => item.name === newAppName)) {
        await AxiosInstance.post(`/apps/update`, { name: newAppName, appId: id });
        setAllApps((prevApps) =>
          prevApps.map((app) => (app.id === id ? { ...app, name: newAppName } : app))
        );
        message.success('Name updated successfully');
        getAppications();
      } else {
        if (allApps.find((item) => item.name === newAppName))
          message.error('App with same name already exist!');
        else message.error('App Name must be less than 50 characters!');
      }
    } catch (error) {
      console.error('Error updating app name:', error);
    }
  };
  const createNewApp = async () => {
    if (appName.length <= 50 && !allApps.find((item) => item.name === appName)) {
      const res = await AxiosInstance.post('/apps/create', { name: appName });
      const currApp = await AxiosInstance.post('/apps', { appId: res.data.id });
      const currentVersion = await AxiosInstance.post('/versions', {
        appId: res.data.id,
        versionId: currApp.data.versions[0].id
      });
      const currPage = await AxiosInstance.post('/pages', {
        versionId: currentVersion.data.id,
        appId: currApp.data.id,
        page: {
          name: 'home',
          route: '/'
        }
      });
      if (currPage.data.id) {
        await getAppications();
        message.success(`App ${appName} Created Successfully`);
      }
      setAppName('');
      setopen(false);
    } else {
      if (allApps.find((item) => item.name === appName))
        message.error('App with same name already exist!');
      else message.error('App Name must be less than 50 characters!');
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await AxiosInstance.get('/users');
        if (res) {
          dispatch(setUser(res.data));
          dispatch(login());
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };
    getUser();
    getAppications();
  }, []);
  if (loading)
    return (
      <div className="example w-full h-full flex justify-center items-center align-center">
        <Spin size="large" />
      </div>
    );
  return (
    <div className={`app-container gap-4 ${allApps.length === 0 ? 'center-align' : ''}`}>
      <div className="button-con">
        <Button onClick={showSquareModal} type="primary" icon={<PlusOutlined />} size="large">
          {' '}
          Create New App
        </Button>
      </div>
      <Modal
        width={400}
        centered
        title="Create a New App"
        open={open}
        onCancel={handleCancel}
        onOk={createNewApp}
        okText="Create"
        okButtonProps={{ disabled: !appName }}
      >
        <p className="font-normal text-gray1000">App Name</p>
        <Input
          placeholder="Enter app name"
          defaultValue={''}
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          onPressEnter={createNewApp}
        />
        <p style={{ fontSize: '11px', color: '#818582' }}>
          App name must be unique and max 50 characters
        </p>
      </Modal>
      {allApps.length ? (
        <div className="card-component gap-2">
          {allApps.map((item) => (
            <AppCard
              key={item.id}
              title={item.name}
              last_edit={item.owner.name}
              isDeployed={item.release}
              id={item.id}
              onDelete={handleDeleteApp}
              onUpdateTitle={handleUpdateAppName}
            />
          ))}
        </div>
      ) : (
        <>
          <img src={noItem} className="align-center" />
          <div className="text-2xl font-semibold text-blue-500 text-center">No apps yet!</div>
        </>
      )}
    </div>
  );
};
export default Applications;
