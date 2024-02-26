import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Input, Modal, Tooltip } from 'antd';

import './AppCard.scss';

import {
  AppstoreTwoTone,
  DeleteOutlined,
  EditOutlined,
  EnterOutlined,
  RocketOutlined,
  RocketTwoTone
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import AxiosInstance from '../../../shared/apis/AxiosInstance';
import { VersionType } from '../../interfaces/app.interface';

interface AppCardProps {
  title: string;
  last_edit: string;
  isDeployed: boolean;
  id: string;
  onDelete: (id: string) => void;
  onUpdateTitle: (id: string, newTitle: string) => void; // New prop to handle title updates
  confirmLoading: boolean;
}
const AppCard: React.FC<AppCardProps> = ({
  title,
  last_edit,
  isDeployed,
  id,
  onDelete,
  onUpdateTitle,
  confirmLoading
}) => {
  const navigate = useNavigate();
  const [isHover, setisHover] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newAppName, setNewAppName] = useState<string>('');
  const [versionId, setVersionId] = useState<string>('');
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleMouseOver = () => {
    setisHover(true);
  };
  const handleMouseOut = () => {
    setisHover(false);
  };
  const handleClick = () => {
    navigate(`/application/${id}`);
  };
  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAppName(e.target.value);
  };
  const handleSave = async () => {
    try {
      onUpdateTitle(id, newAppName); // Update the title in the parent component
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating app name:', error);
    }
  };

  useEffect(() => {
    const getAppData = async () => {
      const currApp = await AxiosInstance.post('/apps', { appId: id });
      setVersionId(currApp.data.versions.find((version: VersionType) => version.released).id);
    };
    getAppData();
  }, []);

  return (
    <div className="app-card" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {!isHover && (
        <Card bordered={true} style={{ width: 300 }}>
          <div className="iconApp">
            <AppstoreTwoTone style={{ fontSize: '30px' }} />
          </div>
          <div className="content">
            <h3>{title}</h3>
            <p>owner: {last_edit} </p>
          </div>
        </Card>
      )}
      {isHover && (
        <Card bordered={true} style={{ width: 300 }}>
          <div className="iconApp">
            <AppstoreTwoTone style={{ fontSize: '30px' }} />
            <h3>
              {title}
              <Button type="link" onClick={showModal}>
                <EditOutlined style={{ color: '#00000', fontSize: '15px' }} />
              </Button>
            </h3>
            <Modal
              width={400}
              centered
              title="Rename App"
              open={isModalVisible}
              onCancel={handleCancel}
              confirmLoading={confirmLoading}
              footer={[
                <Button key="cancel" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                  Save
                </Button>
              ]}
            >
              <p>App Name</p>
              <Input
                value={newAppName}
                placeholder="Enter app name"
                defaultValue={title}
                onChange={handleAppNameChange}
                onPressEnter={handleSave}
              />
              <p style={{ fontSize: '11px', color: '#818582' }}>
                App name must be unique and max 50 characters
              </p>
            </Modal>
          </div>
          <div className="btn-grp">
            <Flex gap="small" wrap="wrap">
              <Button type="primary" onClick={handleClick}>
                <EnterOutlined />
                Edit
              </Button>
              <Tooltip
                placement="bottomLeft"
                title={!isDeployed ? 'App does not have a deployed version' : ''}
              >
                <Button
                  disabled={!isDeployed}
                  onClick={() => navigate(`/release/${id}?versionId=${versionId}`)}
                >
                  {isDeployed ? <RocketTwoTone /> : <RocketOutlined color="black" />}Launch
                </Button>
              </Tooltip>
              <Button danger shape="circle" onClick={() => onDelete(id)}>
                <DeleteOutlined />
              </Button>
            </Flex>
          </div>
        </Card>
      )}
    </div>
  );
};
export default AppCard;
