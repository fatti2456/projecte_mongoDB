import express from 'express';
import {
  getVisits,
  getVisitById,
  createVisit,
  updateVisit,
  deleteVisit,
  getVisitsByAnimal,
} from '../controllers/visitController.js';

const router = express.Router();

router.route('/')
  .get(getVisits)
  .post(createVisit);

router.route('/animal/:animalId')
  .get(getVisitsByAnimal);

router.route('/:id')
  .get(getVisitById)
  .put(updateVisit)
  .delete(deleteVisit);

export default router;