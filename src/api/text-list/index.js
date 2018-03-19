import * as admin from 'firebase-admin';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  admin.firestore().collection('text-list').get()
    .then((snapshot) => {
      const data = [];

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).json({ data });
    });
});

router.post('/', (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: 'Please pass the text.' });
  }

  admin.firestore().collection('text-list')
    .add({ text })
    .then(() => res.status(200).json({ message: 'Data saved.' }));
});

export default router;
