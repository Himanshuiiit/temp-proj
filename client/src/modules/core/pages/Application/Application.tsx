import { useEffect, useState } from 'react';
import { DoubleRightOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import AxiosInstance from '../../../shared/apis/AxiosInstance.ts';
import ApplicationHeader from '../../components/ApplicationHeader/ApplicationHeader.tsx';
import RightPane from '../../components/RightPane/RightPane.tsx';
import RnD from '../../components/RnD/RnD.tsx';
import StylesPane from '../../components/StylesPane/StylesPane.tsx';
import { VersionType } from '../../interfaces/app.interface.ts';
import { componentType } from '../../interfaces/component.interface.ts';
import { setComponentsState } from '../../reducers/core.reducer.ts';
import { createNewComponent } from '../../utils/componentFunctions.ts';

const { Content, Sider } = Layout;

const Application: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [components, setComponents] = useState<componentType[]>([]);
  const [versions, setVersions] = useState([]);
  const [activeVersion, setActiveVersion] = useState<VersionType>(
    localStorage.getItem('activeVersion')
      ? JSON.parse(localStorage.getItem('activeVersion')!)
      : null
  );
  const [currPageId, setCurrPageId] = useState('');
  const [active, setActive] = useState<componentType | null>(null);
  const dispatch = useDispatch();

  const getCurrentComponents = async () => {
    setLoading(true);
    const currApp = await AxiosInstance.post('/apps', { appId: id });
    setVersions(currApp.data.versions);

    const currentVersion = await AxiosInstance.post('/versions', {
      appId: id,
      versionId: activeVersion ? activeVersion.id : currApp.data.versions[0].id
    });
    if (!localStorage.getItem('activeVersion')) {
      console.log('again inside');

      setActiveVersion(currApp.data.versions[0]);
      localStorage.setItem('activeVersion', JSON.stringify(currApp.data.versions[0]));
    }
    setCurrPageId(currentVersion.data.pages[0].id);
    setComponents(
      currentVersion.data.pages[0].components.sort(
        (a: componentType, b: componentType) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );
    setLoading(false);
  };

  onkeydown = async (e: KeyboardEvent) => {
    if (e.key === 'Delete') {
      if (active) {
        setLoading(true);
        await AxiosInstance.delete('/components', {
          data: { componentId: active.id, appId: id }
        });
        setActive(null);
        getCurrentComponents();
      }
    }
  };

  const handleDragStop = async (e: any, d: any, compId: string) => {
    setComponents((prev) => {
      const newComponents = prev.map((comp) => {
        return comp.id !== compId
          ? comp
          : {
              ...comp,
              layouts: {
                ...comp.layouts,
                left: d.x,
                top: d.y
              }
            };
      });
      return newComponents;
    });
    await AxiosInstance.patch('/components', {
      appId: id,
      componentId: compId,
      componentData: {
        layout: {
          left: d.x,
          top: d.y
        }
      }
    });
  };
  const handleResizeStop = async (
    e: any,
    d: any,
    ref: any,
    delta: any,
    position: any,
    compId: string
  ) => {
    setComponents((prev) => {
      const newComponents = prev.map((comp) => {
        return comp.id !== compId
          ? comp
          : {
              ...comp,
              layouts: {
                ...comp.layouts,
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10)
              }
            };
      });
      return newComponents;
    });
    await AxiosInstance.patch('/components', {
      appId: id,
      componentId: compId,
      componentData: {
        layout: {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10)
        }
      }
    });
  };

  useEffect(() => {
    getCurrentComponents();
  }, []);

  const createCompnent = async (type: string) => {
    await createNewComponent(id!, currPageId, type);

    getCurrentComponents();
  };

  useEffect(() => {
    dispatch(setComponentsState(components));
  }, [components]);

  return (
    <Flex className="h-screen overflow-hidden">
      <Layout>
        <Layout>
          <ApplicationHeader
            appId={id!}
            versions={versions}
            setActiveVersion={setActiveVersion}
            activeVersion={activeVersion!}
            getCurrentComponents={getCurrentComponents}
            setLoading={setLoading}
          />
          {!loading ? (
            <Content onClick={() => setActive(null)} className="bg-[#e9eff1]">
              {components.map((comp) => (
                <RnD
                  comp={comp}
                  key={comp.id}
                  handleDragStop={handleDragStop}
                  handleResizeStop={handleResizeStop}
                  setActive={setActive}
                  active={active}
                >
                  {comp.styles.content}
                </RnD>
              ))}
            </Content>
          ) : (
            <div className="example w-full h-full flex justify-center items-center align-center">
              <Spin size="large" />
            </div>
          )}
        </Layout>
        <Sider theme="light" className="h-screen" width={290}>
          <Header
            className="flex flex-row h-12 px-4  bg-white justify-center items-center gap-6"
            style={{ border: '1px solid #dedede' }}
          >
            <Button
              type="default"
              onClick={() => navigate(`/preview/${id}?versionId=${activeVersion?.id}`)}
            >
              Preview
              <EyeOutlined />
            </Button>
            <Button
              type="primary"
              onClick={async () => {
                await AxiosInstance.post('/apps/release', {
                  appId: id,
                  versionId: activeVersion?.id
                });
                navigate(`/release/${id}?versionId=${activeVersion?.id}`);
              }}
            >
              Release
              <DoubleRightOutlined />
            </Button>
          </Header>
          {active ? (
            <StylesPane
              components={components}
              setComponents={setComponents}
              id={active.id}
              appId={id!}
            />
          ) : (
            <RightPane createComponent={createCompnent} />
          )}
        </Sider>
      </Layout>
    </Flex>
  );
};

export default Application;
