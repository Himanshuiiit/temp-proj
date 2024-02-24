import { ChangeEvent, FC } from 'react';
import { ColorPicker, Input } from 'antd';
import { Color } from 'antd/es/color-picker';

import AxiosInstance from '../../../shared/apis/AxiosInstance';
import { componentType } from '../../interfaces/component.interface';

type Props = {
  components: componentType[];
  setComponents: (components: componentType[]) => void;
  id: string;
  appId: string;
};

const StylesPane: FC<Props> = ({ setComponents, components, id, appId }) => {
  const activeComp = components.find((c) => id === c.id);
  const handleColorChange = async (e: Color, type: string) => {
    setComponents(
      components.map((comp) => {
        if (id === comp.id) {
          return {
            ...comp,
            styles: {
              ...comp.styles,
              [type]: '#' + e.toHex()
            }
          };
        } else return comp;
      })
    );
    await AxiosInstance.patch('/components', {
      appId: appId,
      componentId: id,
      componentData: {
        component: {
          styles: {
            ...activeComp!.styles,
            [type]: '#' + e.toHex()
          }
        }
      }
    });
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
    unit: string = ''
  ) => {
    setComponents(
      components.map((comp) => {
        if (id === comp.id) {
          return {
            ...comp,
            styles: {
              ...comp.styles,
              [type]: e.target.value + unit
            }
          };
        } else return comp;
      })
    );
    await AxiosInstance.patch('/components', {
      appId: appId,
      componentId: id,
      componentData: {
        component: {
          styles: {
            ...activeComp!.styles,
            [type]: e.target.value + unit
          }
        }
      }
    });
  };

  return (
    <div className=" flex flex-col items-center w-full">
      <div className="pt-3 pb-1 text-blue-500 font-semibold text-lg">Styles</div>
      <div className="w-full min-h-0.5 bg-gray-400"></div>
      <div className="flex items-center mt-6">
        <label className="mr-3">Color :</label>
        <ColorPicker
          onChange={(e) => handleColorChange(e, 'color')}
          value={activeComp?.styles.color}
          showText
        />
      </div>
      <div className="pb-4">
        <label className="pd-4">Content :</label>
        <Input onChange={(e) => handleChange(e, 'content')} value={activeComp?.styles.content} />
      </div>
      {activeComp!.type !== 'text' && (
        <div className="flex items-center">
          <label className="mr-3">BG Color :</label>
          <ColorPicker
            onChange={(e) => handleColorChange(e, 'backgroundColor')}
            value={activeComp?.styles.backgroundColor}
            showText
          />
        </div>
      )}
      <div className="pb-4">
        <label className="pd-4">Radius :</label>
        <Input
          onChange={(e) => handleChange(e, 'borderRadius', 'px')}
          value={
            activeComp?.styles.borderRadius === 'px'
              ? 0
              : parseInt(activeComp?.styles.borderRadius, 10)
          }
        />
      </div>
      <div>
        <label className="pd-4">Font Size :</label>
        <Input
          onChange={(e) => handleChange(e, 'fontSize', 'px')}
          value={
            activeComp?.styles.fontSize === 'px' ? 0 : parseInt(activeComp?.styles.fontSize, 10)
          }
        />
      </div>
    </div>
  );
};

export default StylesPane;
