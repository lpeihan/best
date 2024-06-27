import { showPopup } from './helper';

export const showShareCodePopup = () => {
  showPopup(require('./ShareCodePopup.vue').default);
};

export const showSharePopup = () => {
  showPopup(require('./SharePopup.vue').default);
};

export const showQrCodePopup = () => {
  showPopup(require('./QrCodePopup.vue').default);
};

export const showBindCodePopup = () => {
  showPopup(require('./BindCodePopup.vue').default);
};
