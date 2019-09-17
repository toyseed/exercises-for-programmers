import route from './route';
import '../css/style.css';

if (typeof(module.hot) !== 'undefined') {
  module.hot.accept();  // eslint-disable-line no-undef
}

window.addEventListener('load', () => {
  route.init();
});