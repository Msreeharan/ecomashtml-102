import express from 'express';
import estimateHandler from '../controllers/estimate.controller.js';

const router = express.Router();

router.post('/', estimateHandler);

export default router;
