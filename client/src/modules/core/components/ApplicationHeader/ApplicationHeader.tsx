import React, { useEffect, useState } from 'react';
import { Button, Input, message, Modal, Select, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';

import AxiosInstance from '../../../shared/apis/AxiosInstance';
import { VersionType } from '../../interfaces/app.interface';

type Props = {
  appId: string;
  versions: any[];
  setActiveVersion: (version: VersionType) => void;
  activeVersion: VersionType;
  getCurrentComponents: () => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  setActive: any;
};

const ApplicationHeader: React.FC<Props> = ({
  appId,
  versions,
  setActiveVersion,
  activeVersion,
  getCurrentComponents,
  setActive
}) => {
  const [versionName, setVersionName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const createNewVersion = async () => {
    setConfirmLoading(true);
    await AxiosInstance.post('/apps/create-version', {
      appId,
      versionId: activeVersion.id,
      name: versionName
    });
    setVersionName('');
    setModalVisible(false);
    setConfirmLoading(false);
    message.success('New version created!');
    getCurrentComponents();
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const handleChange = async (value: string) => {
    setActive(null);
    const newActiveVersion = versions.find((ver) => ver.name === value);
    setActiveVersion(newActiveVersion);
    localStorage.setItem('activeVersion', JSON.stringify(newActiveVersion));
  };

  useEffect(() => {
    getCurrentComponents();
  }, [activeVersion]);
  const currentVersionName = activeVersion ? activeVersion.name : 'v1';
  return (
    <Header
      className="flex flex-row h-12 px-4  bg-white justify-between items-center border-1"
      style={{ border: '1px solid #dedede' }}
    >
      <Typography.Text className="text-normal  text-black">dashboard</Typography.Text>
      <div>
        <Select
          className="w-40 text-black"
          value={activeVersion ? activeVersion.name : '...'}
          onChange={handleChange}
          options={[
            ...versions
              .sort(
                (a: VersionType, b: VersionType) =>
                  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              )
              .map((version: VersionType) => {
                return { label: version.name, value: version.name };
              }),
            { label: <Button onClick={() => openModal()}>+Create new</Button> }
          ]}
        />
        <Modal
          title="Create New Version"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={createNewVersion}
          okText="Create"
          confirmLoading={confirmLoading}
        >
          <Input
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            placeholder="Enter version name"
            onPressEnter={createNewVersion}
          />
          <p>This would have the base version as {currentVersionName}</p>
        </Modal>
      </div>
    </Header>
  );
};

export default ApplicationHeader;
