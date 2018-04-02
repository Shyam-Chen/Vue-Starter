import * as admin from 'firebase-admin';
import express from 'express';

const router = express.Router();

/**
 * @return {{ data: Array<{ id: string, text: string }> }}
 *
 * @example GET /api/text-list
 * @example GET /api/text-list?text=${text}
 */
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

/**
 * @return {{ message: string }}
 *
 * @example POST /api/text-list { text: ${text} }
 */
router.post('/', (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: 'Please pass the text.' });
  }

  admin.firestore().collection('text-list')
    .add({ text })
    .then(() => res.status(200).json({ message: 'Data saved.' }));
});

/**
 * @return {{ message: string }}
 *
 * @example POST /api/text-list/${id}
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;

  admin.firestore().collection('text-list')
    .doc(id)
    .update(req.body)
    .then(() => res.status(200).json({ message: 'Data updated.' }));
});

/**
 * @return {{ message: string }}
 *
 * @example DELETE /api/text-list/${id}
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  admin.firestore().collection('text-list')
    .doc(id)
    .delete()
    .then(() => res.status(200).json({ message: 'Data deleted.' }));
});

export default router;
