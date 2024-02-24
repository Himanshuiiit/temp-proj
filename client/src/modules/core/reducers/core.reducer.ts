import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { componentType } from '../interfaces/component.interface';

const componentSlice = createSlice({
  reducerPath: 'component',
  name: 'component',
  initialState: {
    components: []
  },
  reducers: {
    setComponentsState: (state: { components: componentType[] }, action: PayloadAction<any>) => {
      state.components = action.payload;
    },
    addNewComponent: (state: { components: componentType[] }, action: PayloadAction<any>) => {
      state.components.push(action.payload);
    },
    updateComponent: (state: { components: componentType[] }, action: PayloadAction<any>) => {
      const newComponents = state.components.map((el: componentType) => {
        return el.id !== action.payload.id
          ? el
          : {
              ...el,
              layout: {
                ...action.payload.content
              }
            };
      });
      state.components = newComponents;
    }
  }
});

export const { setComponentsState, addNewComponent, updateComponent } = componentSlice.actions;
export default componentSlice;
