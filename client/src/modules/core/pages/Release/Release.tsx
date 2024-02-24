import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AxiosInstance from '../../../shared/apis/AxiosInstance';
import AppHeader from '../../components/Header/Header';
import { componentType } from '../../interfaces/component.interface';

const Release = () => {
  const { id } = useParams();

  const state = useSelector(({ component }) => component);

  const [components, setComponents] = useState(state.components);

  useEffect(() => {
    const release = async () => {
      const res = await AxiosInstance.get(`/release/${id}`);
      setComponents(
        res.data.version.pages[0].components.sort(
          (a: componentType, b: componentType) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      );
    };
    release();
  }, []);

  const constantStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  return (
    <div className="bg-[#e9eff1] w-full h-[100vh]">
      <AppHeader />
      {components.map((comp: componentType) => {
        switch (comp.type) {
          case 'button':
            return (
              <span
                style={{
                  ...comp.styles,
                  ...constantStyles,
                  ...comp.layouts,
                  position: 'absolute'
                }}
                className="cursor-pointer"
                key={comp.id}
              >
                {comp.styles.content}
              </span>
            );
          case 'text':
            return (
              <Typography
                style={{
                  ...comp.styles,
                  ...constantStyles,
                  ...comp.layouts,
                  position: 'absolute'
                }}
                key={comp.id}
              >
                {comp.styles.content}
              </Typography>
            );
          case 'container':
            return (
              <div
                style={{
                  ...comp.styles,
                  ...constantStyles,
                  ...comp.layouts,
                  position: 'absolute'
                }}
              >
                {comp.styles.content}
              </div>
            );
          case 'input':
            return (
              <input
                type="text"
                style={{ ...comp.styles, ...comp.layouts, position: 'absolute' }}
                placeholder={comp.styles.content}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default Release;
