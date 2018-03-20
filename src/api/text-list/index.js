import * as admin from 'firebase-admin';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const { text } = req.query;

  const coll = admin.firestore().collection('text-list');
  const query = () => (text ? coll.where('text', '==', text) : coll);

  query()
    .get()
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

router.put('/:id', (req, res) => {
  const { id } = req.params;

  admin.firestore().collection('text-list')
    .doc(id)
    .update(req.body)
    .then(() => res.status(200).json({ message: 'Data updated.' }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  admin.firestore().collection('text-list')
    .doc(id)
    .delete()
    .then(() => res.status(200).json({ message: 'Data deleted.' }));
});

export default router;
