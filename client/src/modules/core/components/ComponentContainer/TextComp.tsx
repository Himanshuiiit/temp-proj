import { FC } from 'react';

type Props = {
  createComponent: (id: string) => void;
};
const TextComp: FC<Props> = ({ createComponent }) => {
  return (
    <div className="component-btn text-center">
      <button className="component-button" onClick={() => createComponent('text')}>
        <div className="svg-icon bg-blue-200/30 h-15 w-15  px-2 py-2">
          <svg
            fill="#000000"
            height="30px"
            width="30px"
            version="1.1"
            id="Icons"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <g>
              <path
                d="M27,22.1V9.9c1.7-0.4,3-2,3-3.9c0-2.2-1.8-4-4-4c-1.9,0-3.4,1.3-3.9,3H9.9C9.4,3.3,7.9,2,6,2C3.8,2,2,3.8,2,6
		c0,1.9,1.3,3.4,3,3.9v12.3c-1.7,0.4-3,2-3,3.9c0,2.2,1.8,4,4,4c1.9,0,3.4-1.3,3.9-3h12.3c0.4,1.7,2,3,3.9,3c2.2,0,4-1.8,4-4
		C30,24.1,28.7,22.6,27,22.1z M22.1,25H9.9c-0.4-1.4-1.5-2.5-2.9-2.9V9.9C8.4,9.5,9.5,8.4,9.9,7h12.3c0.4,1.4,1.5,2.5,2.9,2.9v12.3
		C23.6,22.5,22.5,23.6,22.1,25z"
              />
              <path
                d="M21,10H11c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1s1-0.4,1-1v-1h3v8h-1c-0.6,0-1,0.4-1,1s0.4,1,1,1h4c0.6,0,1-0.4,1-1
		s-0.4-1-1-1h-1v-8h3v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-2C22,10.4,21.6,10,21,10z"
              />
            </g>
          </svg>
        </div>
        <p style={{ fontSize: '12px' }}>Text</p>
      </button>
    </div>
  );
};

export default TextComp;
