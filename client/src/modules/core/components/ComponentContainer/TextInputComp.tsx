import { FC } from 'react';
import { PicCenterOutlined } from '@ant-design/icons';

type Props = {
  createComponent: (id: string) => void;
};

const TextInputComp: FC<Props> = ({ createComponent }) => {
  return (
    <div className="component-btn text-center">
      <button className="component-button" onClick={() => createComponent('input')}>
        <div className="svg-icon bg-blue-200/30 h-15 w-15  px-2 py-2">
          <PicCenterOutlined className="text-3xl" />
        </div>
        <p style={{ fontSize: '12px' }}>Text Input</p>
      </button>
    </div>
  );
};

export default TextInputComp;
