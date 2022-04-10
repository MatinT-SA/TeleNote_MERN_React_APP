import express from 'express';

const router = express.Router();

import { signup, signin } from '../controllers/user.js';

router.post('/signin', signin);
router.post('/signup', signup);

export default router;