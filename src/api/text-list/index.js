import * as admin from 'firebase-admin';
import express from 'express';

const router = express.Router();

/**
 * @return {Object<{ data: Array<{ id: string, text: string }>, message: string }>}
 *
 * @example GET /api/text-list
 * @example GET /api/text-list?text=${text}
 */
router.get('/', (req, res) => {
  const { text } = req.query;

  admin.firestore().collection('text-list')
    .get()
    .then((snapshot) => {
      const data = [];

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      const result = text
        ? data.filter(item => item.text.toLowerCase().indexOf(text.toLowerCase()) > -1)
        : data;

      res.status(200).json({ data: result, message: 'Data obtained.' });
    });
});

/**
 * @return {Object<{ message: string }>}
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
 * @return {Object<{ message: string }>}
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
 * @return {Object<{ message: string }>}
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
