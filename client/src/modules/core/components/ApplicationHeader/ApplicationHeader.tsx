
import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Select, Typography, message } from 'antd';
import { Header } from 'antd/es/layout/layout';

import AxiosInstance from '../../../shared/apis/AxiosInstance';
import { VersionType } from '../../interfaces/app.interface';
import create from '@ant-design/icons/lib/components/IconFont';

type Props = {
  appId: string;
  versions: any[];
  setActiveVersion: (version: VersionType) => void;
  activeVersion: VersionType;
  getCurrentComponents: () => void;
};

const ApplicationHeader: React.FC<Props> = ({
  appId,
  versions,
  setActiveVersion,
  activeVersion,
  getCurrentComponents
}) => {
  const [versionName, setVersionName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const createNewVersion = async () => {
    await AxiosInstance.post('/apps/create-version', {
      appId,
      versionId: activeVersion.id,
      name: versionName
    });
    setVersionName('');
    setModalVisible(false);
    message.success("New version created!")
    getCurrentComponents();
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const handleChange = async (value: string) => {
    setActiveVersion(versions.find((ver) => ver.name === value));
  };
  useEffect(() => {
    getCurrentComponents();
  }, [activeVersion]);
  const currentVersionName = activeVersion?activeVersion.name:"v1"
  return (
    <Header
      className="flex flex-row h-12 px-4  bg-white justify-between items-center border-1"
      style={{ border: '1px solid #dedede' }}
    >
      <Typography.Text className="text-normal  text-black">dashboard</Typography.Text>
      <div>
         {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="18px" width="18px" >
          <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
        </svg>  */}
        <Select
          className="w-40 text-black"
          defaultValue='v1'
          onChange={handleChange}
          options={[...versions.map((version: VersionType) => {
            return { label: version.name, value: version.name };
          }),{label:<Button onClick={()=>openModal()}>+Create new</Button>}]}
      />
        <Modal
          title="Create New Version"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={createNewVersion}
        >
          <Input
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            placeholder="Enter version name"
            onPressEnter={createNewVersion}
          />
          <p>This would have the base version as {currentVersionName}</p>
        </Modal>
        {/* <input
          type="text"
          className="h-8 mx-3 p-2"
          value={versionName}
          onChange={(e) => setVersionName(e.target.value)}
        />
        <span
          onClick={createNewVersion}
          className="h-8 w-16 bg-blue-600 px-4 py-2 text-white rounded-md cursor-pointer"
        >
          Create
        </span> */}
      </div>
      
    </Header>
  );
};

export default ApplicationHeader;

