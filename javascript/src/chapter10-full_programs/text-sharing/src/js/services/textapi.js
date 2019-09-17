import axios from 'axios';

function get(textId) {
  return axios.get(`http://localhost:8080/text/${textId}`).then(res => {
    return res.data.text;
  });
}

function post(text) {
  return axios
    .post(`http://localhost:8080/text`, {
      text
    })
    .then(res => {
      return res.data.textId;
    });
}

export default {
  get,
  post
};
