import AxiosInstance from '../../shared/apis/AxiosInstance';

export const createNewComponent = async (id: string, currPageId: string, type: string) => {
  await AxiosInstance.post('/components', {
    appId: id,
    pageId: currPageId,
    componentData: {
      component: {
        name: type,
        type: type,
        styles: {
          backgroundColor: (() => {
            switch (type) {
              case 'text':
                return 'transparent';
              case 'button':
                return '#3399ff';
              case 'container':
                return 'white';
              case 'input':
                return '#e8e8e8';
              default:
                return null;
            }
          })(),
          color: (() => {
            switch (type) {
              case 'text':
                return 'blue';
              case 'button':
                return 'white';
              case 'container':
                return 'blue';
              case 'input':
                return 'gray';
              default:
                return null;
            }
          })(),
          filter:
            type !== 'text' &&
            'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
          content: type === 'container' ? '' : type,
          borderRadius: type === 'input' ? '6px' : '0px',
          padding: type === 'input' && '0px 6px',
          fontSize: '16px',
          justifyContent: type === 'input' ? 'start' : 'center',
          // border: type === 'input' && '2px solid black'
        }
      },
      layout: {
        top: 400,
        left: 800,
        width: (() => {
          switch (type) {
            case 'text':
              return 60;
            case 'button':
              return 60;
            case 'container':
              return 600;
            case 'input':
              return 300;
            default:
              return null;
          }
        })(),
        height: type === 'container' ? 400 : 40
      }
    }
  });
};
