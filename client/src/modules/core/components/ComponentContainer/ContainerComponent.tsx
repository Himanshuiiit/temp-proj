import { FC } from 'react';
import { BorderOuterOutlined } from '@ant-design/icons';

type props = {
  createComponent: (type: string) => void;
};

const ContainerComponent: FC<props> = ({ createComponent }) => {
  return (
    <div className="component-btn text-center">
      <button
        className="component-button hover-border"
        onClick={() => {
          createComponent('container');
        }}
      >
        <div className="svg-icon bg-blue-200/30 h-12 w-12 px-2 py-2">
          <BorderOuterOutlined className='text-3xl'/>
        </div>
        <p style={{ fontSize: '12px' }}>Container</p>
      </button>
    </div>
  );
};

export default ContainerComponent;
