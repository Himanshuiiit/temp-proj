type component = {
  name: string;
  type: string;
  styles: any;
};
type layout = {
  appId: string;
  top: number;
  left: number;
  width: number;
  height: number;
};
export type componentType = {
  id: string; //backend se nahi aa raha
  appId: string;
  pageId: string;
  name: string;

  createdAt: Date;

  component: component;
  layouts: layout;
  page: object;
  parent?: object;
  properties?: object;
  type: string;
  styles: any;
};
