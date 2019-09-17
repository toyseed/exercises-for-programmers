import crypto from 'crypto';

const map = new Map();

function get(textId) {
  return map.get(textId);
}

function set(text) {
  const md5 = crypto.createHash('md5').update(text).digest('hex');
  map.set(md5, text);

  return md5;
}

export default {
  get, set
}
