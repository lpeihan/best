import { createApp } from 'vue';

let root;
let app;
let instance;

const Loading = (message = '') => {
  if (root) {
    app.unmount();
  } else {
    root = document.createElement('div');
    document.body.appendChild(root);
  }

  app = createApp(require('./Loading.vue').default, {
    message,
    destroy() {
      if (app) {
        app.unmount();
        app = null;
      }

      if (root) {
        document.body.removeChild(root);
        root = null;
      }
    },
  });

  instance = app.mount(root);

  return instance;
};

Loading.open = (message) => Loading(message).open();
Loading.close = () => instance?.close();

export default Loading;
