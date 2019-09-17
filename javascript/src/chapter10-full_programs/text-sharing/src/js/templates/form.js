import api from '../services/textapi';

function init(elId, textId) {
  const el = document.getElementById(elId);

  if (!textId) {
    const content = parseContent({});
    showPage(el, content);
    addEventHandler(el);
  } else {
    api.get(textId).then(text => {
      const content = parseContent({text});
      showPage(el, content);
      addEventHandler(el);
    })
  }
}

function parseContent({text = ''}) {
  const template = `
    <textarea class="text">${text}</textarea>
    <button class="submit">submit</button>
  `;

  return template;
}

function showPage(el, content) {
  el.innerHTML = content;
}

function addEventHandler(el) {
  const submitButton = el.querySelector('.submit');
  submitButton.addEventListener('click', (event) => {
    const text = el.querySelector('.text').value;
    api.post(text).then(textId => {
      window.location.href = `/${textId}`;
    })
  });
}

export default {
  init
}
