import './RightPane.scss';

import ButtonComp from '../ComponentContainer/ButtonComp';
import ContainerComponent from '../ComponentContainer/ContainerComponent';
import TextComp from '../ComponentContainer/TextComp';
import TextInputComp from '../ComponentContainer/TextInputComp';

type props = {
  createComponent: (id: string) => void;
};

const RightPane: React.FC<props> = ({ createComponent }) => {
  return (
    <div
      className="component-container h-screen flex  flex-col px-3 py-3 justify-top gap-2 overflow-scroll"
      style={{ border: '1px solid #dedede' }}
    >
      <p>Components</p>
      <div className="h-auto available-components flex flex-row px-2 py-2 justify-start gap-5">
        <ButtonComp createComponent={createComponent} />
        <TextComp createComponent={createComponent} />
        <ContainerComponent createComponent={createComponent} />
        <TextInputComp createComponent={createComponent} />
      </div>
      <p>Other Components</p>
      <div className="coming-soon flex justify-center item-center" style={{ textAlign: 'center' }}>
        Coming Soon....
      </div>
    </div>
  );
};
export default RightPane;
