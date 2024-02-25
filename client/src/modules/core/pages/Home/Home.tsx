import { Flex, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import './Home.scss';

import { useEffect } from 'react';

import AxiosInstance from '../../../shared/apis/AxiosInstance';
import useQuery from '../../../shared/hooks/useQuery';
import AppHeader from '../../components/Header/Header';
import LeftPane from '../../components/LeftPane/LeftPane';

const { Content } = Layout;
const Home: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();
  useEffect(() => {
    const setSession = async (token: string) => {
      await AxiosInstance(`/auth/getsession/${token}`);
      navigate('/applications');
    };
    if (query.get('token')) {
      setSession(query.get('token')!);
    } else if(localStorage.getItem("user")) {
      navigate('/applications');
    } else  navigate('/login');
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
