import { showToast } from 'vant';
import useClipboard from 'vue-clipboard3';

export const copyText = async (val, successText = '复制成功') => {
  const { toClipboard } = useClipboard();
  await toClipboard(val);

  successText && showToast(successText);
};

export function getQueryString(name, url) {
  const res = (url || location.href).match(new RegExp('[?&]' + name + '=([^&#]+)', 'i'));

  if (res === null || res.length < 1) {
    return null;
  }

  return decodeURIComponent(res[1]);
}

export function shuffle(array) {
  const items = array.slice();
  let t, r, i;

  for (i = items.length - 1; i > 0; i--) {
    r = Math.round(Math.random() * i);

    t = items[i];
    items[i] = items[r];
    items[r] = t;
  }

  return items;
}

export function getUUID() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';

  const uuid = s.join('');
  return uuid.slice(0, 8);
}

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function parseParams(data) {
  let url = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? '?' + url.substring(1) : '';
}

export function openQQ(qq) {
  location.href = `mqq://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web&web_src=oicqzone.com`;
}

export function openQQGroup(qqGroup) {
  location.href = `mqqapi://card/show_pslcard?src_type=internal&version=1&uin=${qqGroup}&card_type=group&source=external`;
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
