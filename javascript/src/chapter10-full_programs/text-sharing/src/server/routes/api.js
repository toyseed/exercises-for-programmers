import express from 'express';
import storage from '../services/textstorage';

const router = express.Router();

router.get('/:textId', (req, res, next) => {
  const textId = req.params.textId;
  const text = storage.get(textId);

  return res.send({text});
});

router.post('/', (req, res, next) => {
  const text = req.body.text;
  const textId = storage.set(text);

  return res.send({textId});
});

export default router;