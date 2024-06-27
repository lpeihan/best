import { createApp, onBeforeUnmount, ref } from 'vue';

const instances = {};

export const showPopup = (Com, props = {}) => {
  let root = document.createElement('div');
  document.body.appendChild(root);
  let app;
  let instance = instances[Com.__name];

  const destroy = () => {
    if (app) {
      app.unmount();
      app = null;
    }

    if (root) {
      document.body.removeChild(root);
      root = null;
    }
  };

  onBeforeUnmount(() => {
    destroy();
  });

  if (!instance) {
    app = createApp(Com, {
      ...props,
      onClosed() {
        destroy();
      },
    });

    instance = app.mount(root);
    instances[Com.__name] = instance;
  }

  instance.open();
  return instance;
};

export const usePopup = () => {
  const show = ref(false);

  const open = () => {
    show.value = true;
  };

  const close = () => {
    show.value = false;
  };

  return {
    show,
    open,
    close,
  };
};
