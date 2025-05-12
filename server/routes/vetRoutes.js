import express from 'express';
import {
  getVeterinarians,
  getVeterinarianById,
  createVeterinarian,
  updateVeterinarian,
  deleteVeterinarian,
} from '../controllers/veterinarianController.js';

const router = express.Router();

router.route('/')
  .get(getVeterinarians)
  .post(createVeterinarian);

router.route('/:id')
  .get(getVeterinarianById)
  .put(updateVeterinarian)
  .delete(deleteVeterinarian);

export default router;