import asyncHandler from 'express-async-handler';
import Animal from '../models/animalModel.js';
import Owner from '../models/ownerModel.js';

// @desc    Get all animals
// @route   GET /api/animals
// @access  Private
export const getAnimals = asyncHandler(async (req, res) => {
  const animals = await Animal.find({})
    .populate('owner', 'firstName lastName')
    .sort({ name: 1 });
  
  res.json(animals);
});

// @desc    Get animals by owner
// @route   GET /api/animals/owner/:ownerId
// @access  Private
export const getAnimalsByOwner = asyncHandler(async (req, res) => {
  const animals = await Animal.find({ owner: req.params.ownerId })
    .populate('visits')
    .sort({ name: 1 });
  
  res.json(animals);
});

// @desc    Get animal by ID
// @route   GET /api/animals/:id
// @access  Private
export const getAnimalById = asyncHandler(async (req, res) => {
  const animal = await Animal.findById(req.params.id)
    .populate('owner', 'firstName lastName')
    .populate({
      path: 'visits',
      populate: {
        path: 'veterinarian',
        select: 'firstName lastName specialty',
      },
    });
  
  if (animal) {
    res.json(animal);
  } else {
    res.status(404);
    throw new Error('Animal not found');
  }
});

// @desc    Create an animal
// @route   POST /api/animals
// @access  Private
export const createAnimal = asyncHandler(async (req, res) => {
  const {
    name, species, breed, birthDate, weight, color, gender, ownerId, medicalHistory
  } = req.body;
  
  const owner = await Owner.findById(ownerId);
  
  if (!owner) {
    res.status(404);
    throw new Error('Owner not found');
  }
  
  const animal = await Animal.create({
    name,
    species,
    breed,
    birthDate,
    weight,
    color,
    gender,
    owner: ownerId,
    medicalHistory: medicalHistory || {},
    visits: [],
  });
  
  if (animal) {
    // Add animal to owner's animals array
    owner.animals.push(animal._id);
    await owner.save();
    
    res.status(201).json(animal);
  } else {
    res.status(400);
    throw new Error('Invalid animal data');
  }
});

// @desc    Update animal
// @route   PUT /api/animals/:id
// @access  Private
export const updateAnimal = asyncHandler(async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  
  if (animal) {
    animal.name = req.body.name || animal.name;
    animal.species = req.body.species || animal.species;
    animal.breed = req.body.breed || animal.breed;
    animal.birthDate = req.body.birthDate || animal.birthDate;
    animal.weight = req.body.weight || animal.weight;
    animal.color = req.body.color || animal.color;
    animal.gender = req.body.gender || animal.gender;
    animal.medicalHistory = req.body.medicalHistory || animal.medicalHistory;
    
    const updatedAnimal = await animal.save();
    res.json(updatedAnimal);
  } else {
    res.status(404);
    throw new Error('Animal not found');
  }
});

// @desc    Delete animal
// @route   DELETE /api/animals/:id
// @access  Private
export const deleteAnimal = asyncHandler(async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  
  if (animal) {
    // Remove animal from owner's animals array
    await Owner.updateOne(
      { _id: animal.owner },
      { $pull: { animals: animal._id } }
    );
    
    await animal.deleteOne();
    res.json({ message: 'Animal removed' });
  } else {
    res.status(404);
    throw new Error('Animal not found');
  }
});