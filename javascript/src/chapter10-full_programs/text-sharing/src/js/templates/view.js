import api from '../services/textapi';

function init(elId, textId) {
  const el = document.getElementById(elId);

  if (!textId) {
    el.innerText = `wrong textId: ${textId}`;
  } else {
    api.get(textId).then(text => {
      const content = parseContent({textId, text});
      showPage(el, content);
    })
  }
}

function parseContent({textId, text}) {
  const template = `
  <div>${text}</div>
  <a href="/edit/${textId}">edit</a>
  `;

  return template;
}

function showPage(el, content) {
  el.innerHTML = content;
}

export default {
  init
}
