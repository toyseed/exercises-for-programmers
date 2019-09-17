import form from './templates/form';
import view from './templates/view';

function init() {
  const path = window.location.pathname;
  const elId = 'app';
  const textId = findId(path);

  if (path.startsWith('/edit') || !textId) {
    form.init(elId, textId);
  } else if (textId) {
    view.init(elId, textId);
  }
}

const idPattern = /\/([\d\w]+)$/;

function findId(str = '') {
  const match = idPattern.exec(str);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}

export default {
  init
};
