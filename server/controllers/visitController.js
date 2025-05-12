import asyncHandler from 'express-async-handler';
import Visit from '../models/visitModel.js';
import Animal from '../models/animalModel.js';

// @desc    Get all visits
// @route   GET /api/visits
// @access  Private
export const getVisits = asyncHandler(async (req, res) => {
  const visits = await Visit.find({})
    .populate('animal', 'name species breed')
    .populate('veterinarian', 'firstName lastName specialty')
    .sort({ date: -1 });
  
  res.json(visits);
});

// @desc    Get visits by animal
// @route   GET /api/visits/animal/:animalId
// @access  Private
export const getVisitsByAnimal = asyncHandler(async (req, res) => {
  const visits = await Visit.find({ animal: req.params.animalId })
    .populate('veterinarian', 'firstName lastName specialty')
    .sort({ date: -1 });
  
  res.json(visits);
});

// @desc    Get visit by ID
// @route   GET /api/visits/:id
// @access  Private
export const getVisitById = asyncHandler(async (req, res) => {
  const visit = await Visit.findById(req.params.id)
    .populate('animal', 'name species breed')
    .populate('veterinarian', 'firstName lastName specialty');
  
  if (visit) {
    res.json(visit);
  } else {
    res.status(404);
    throw new Error('Visit not found');
  }
});

// @desc    Create a visit
// @route   POST /api/visits
// @access  Private
export const createVisit = asyncHandler(async (req, res) => {
  const {
    date,
    reason,
    animalId,
    veterinarianId,
    diagnosis,
    treatment,
    notes,
    medications,
    followUpNeeded,
    followUpDate,
  } = req.body;
  
  const animal = await Animal.findById(animalId);
  
  if (!animal) {
    res.status(404);
    throw new Error('Animal not found');
  }
  
  const visit = await Visit.create({
    date: date || new Date(),
    reason,
    animal: animalId,
    veterinarian: veterinarianId,
    diagnosis,
    treatment,
    notes,
    medications: medications || [],
    followUpNeeded: followUpNeeded || false,
    followUpDate,
  });
  
  if (visit) {
    // Add visit to animal's visits array
    animal.visits.push(visit._id);
    await animal.save();
    
    res.status(201).json(visit);
  } else {
    res.status(400);
    throw new Error('Invalid visit data');
  }
});

// @desc    Update visit
// @route   PUT /api/visits/:id
// @access  Private
export const updateVisit = asyncHandler(async (req, res) => {
  const visit = await Visit.findById(req.params.id);
  
  if (visit) {
    visit.date = req.body.date || visit.date;
    visit.reason = req.body.reason || visit.reason;
    visit.diagnosis = req.body.diagnosis || visit.diagnosis;
    visit.treatment = req.body.treatment || visit.treatment;
    visit.notes = req.body.notes || visit.notes;
    visit.medications = req.body.medications || visit.medications;
    visit.followUpNeeded = req.body.followUpNeeded !== undefined 
      ? req.body.followUpNeeded 
      : visit.followUpNeeded;
    visit.followUpDate = req.body.followUpDate || visit.followUpDate;
    
    const updatedVisit = await visit.save();
    res.json(updatedVisit);
  } else {
    res.status(404);
    throw new Error('Visit not found');
  }
});

// @desc    Delete visit
// @route   DELETE /api/visits/:id
// @access  Private
export const deleteVisit = asyncHandler(async (req, res) => {
  const visit = await Visit.findById(req.params.id);
  
  if (visit) {
    // Remove visit from animal's visits array
    await Animal.updateOne(
      { _id: visit.animal },
      { $pull: { visits: visit._id } }
    );
    
    await visit.deleteOne();
    res.json({ message: 'Visit removed' });
  } else {
    res.status(404);
    throw new Error('Visit not found');
  }
});