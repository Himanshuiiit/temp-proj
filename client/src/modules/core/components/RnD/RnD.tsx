import { FC, ReactNode } from 'react';
import { Rnd } from 'react-rnd';

import { componentType } from '../../interfaces/component.interface';

type Props = {
  children: ReactNode;
  comp: componentType;
  handleDragStop: (e: any, d: any, id: string) => void;
  handleResizeStop: (e: any, d: any, ref: any, delta: any, position: any, id: string) => void;
  setActive: (component: componentType) => void;
  active: componentType | null;
};

const RnD: FC<Props> = ({
  children,
  comp,
  handleResizeStop,
  handleDragStop,
  setActive,
  active
}) => {
  const handleSize = 8;
  return (
    <Rnd
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `${active && active!.id === comp.id ? '1px dashed rgb(0,0,0)' : ''}`,
      ...comp.styles,
      }}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setActive(comp);
      }}
      size={{ width: comp.layouts.width, height: comp.layouts.height }}
      position={{ x: comp.layouts.left, y: comp.layouts.top }}
      onDragStop={(e, d) => {
        handleDragStop(e, d, comp.id);
      }}
      onResizeStop={(e, d, ref, delta, position) => {
        handleResizeStop(e, d, ref, delta, position, comp.id);
      }}
      bounds="parent"
    >
      {children}
      {active && active.id === comp.id && (
        <>
          <div
            style={{
              position: 'absolute',
              top: -handleSize / 2,
              left: -handleSize / 2,
              width: handleSize,
              height: handleSize,
              borderRadius: '50%',
              backgroundColor: 'black',
              cursor: 'nwse-resize'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: -handleSize / 2,
              right: -handleSize / 2,
              width: handleSize,
              height: handleSize,
              borderRadius: '50%',
              backgroundColor: 'black',
              cursor: 'nesw-resize'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -handleSize / 2,
              left: -handleSize / 2,
              width: handleSize,
              height: handleSize,
              borderRadius: '50%',
              backgroundColor: 'black',
              cursor: 'nesw-resize'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -handleSize / 2,
              right: -handleSize / 2,
              width: handleSize,
              height: handleSize,
              borderRadius: '50%',
              backgroundColor: 'black',
              cursor: 'nwse-resize'
            }}
          />
        </>
      )}
    </Rnd>
  );
};

export default RnD;
