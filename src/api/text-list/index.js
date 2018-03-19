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

export default router;
