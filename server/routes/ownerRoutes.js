import express from 'express';
import {
  getOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner,
  searchOwnersByLastName,
} from '../controllers/ownerController.js';

const router = express.Router();

router.route('/')
  .get(getOwners)
  .post(createOwner);

router.route('/search/:lastName')
  .get(searchOwnersByLastName);

router.route('/:id')
  .get(getOwnerById)
  .put(updateOwner)
  .delete(deleteOwner);

export default router;