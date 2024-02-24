import React, { MouseEventHandler, useEffect } from 'react';
import { Button, Flex, Input, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Link } = Typography;

const Login: React.FC = () => {
  const state = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const handlesubmit: MouseEventHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  useEffect(() => {

    if (state.loggedIn) {
      navigate('/applications');
    }
  }, []);

  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };
  return (
    <Flex className="h-screen w-screen" vertical justify="center" align="center">
      <Title level={2}>Sign In</Title>
      <Text className="pb-4">
        New to Tooljet, <Link>Create an account</Link>
      </Text>
      <Button className="w-80 h-10 my-3">
        <img
          src="https://app.tooljet.com/assets/images/onboardingassets/SSO/Google.svg"
          className="pr-3 relative bottom-1 w-10"
        />{' '}
        <Text className="relative bottom-5 text-md font-semibold" onClick={handleGoogleLogin}>
          Login with Google
        </Text>
      </Button>
      <div className="my-3 flex gap-2">
        <div className="w-32 h-[1.5px] bg-slate-300 relative top-2.5" />
        OR
        <div className="w-32 h-[1.5px] bg-slate-300 relative top-2.5" />
      </div>
      <div className="py-3 flex flex-col">
        <label className="font-semibold pb-2">Email</label>
        <Input placeholder="Enter your email" className="w-80 py-2 border-slate-300 mb-2" />
        <label className="font-semibold pb-2">Password</label>
        <Input.Password
          placeholder="Enter your password"
          className="w-80 py-2 border-slate-300 mb-8"
        />
        <Button type="primary" className="font-semibold text-lg h-10" onClick={handlesubmit}>
          Login
        </Button>
      </div>
    </Flex>
  );
};

export default Login;
