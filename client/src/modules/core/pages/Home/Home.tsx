import { Flex, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import './Home.scss';

import { useEffect } from 'react';

import AppHeader from '../../components/Header/Header';
import LeftPane from '../../components/LeftPane/LeftPane';

const { Content } = Layout;
const Home: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/applications');
  }, []);

  return (
    <Flex className="h-screen w-screen">
      <Layout>
        <LeftPane />
        <Layout className="bg-slate-100">
          <AppHeader />
          <Content className="bg-white m-1 ">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default Home;
