import asyncHandler from 'express-async-handler';
import Veterinarian from '../models/veterinarianModel.js';

// @desc    Get all veterinarians
// @route   GET /api/vets
// @access  Public
export const getVeterinarians = asyncHandler(async (req, res) => {
  const veterinarians = await Veterinarian.find({}).sort({ lastName: 1 });
  res.json(veterinarians);
});

// @desc    Get veterinarian by ID
// @route   GET /api/vets/:id
// @access  Public
export const getVeterinarianById = asyncHandler(async (req, res) => {
  const veterinarian = await Veterinarian.findById(req.params.id);
  
  if (veterinarian) {
    res.json(veterinarian);
  } else {
    res.status(404);
    throw new Error('Veterinarian not found');
  }
});

// @desc    Create a veterinarian
// @route   POST /api/vets
// @access  Private/Admin
export const createVeterinarian = asyncHandler(async (req, res) => {
  const { firstName, lastName, specialty, email, phoneNumber, workingDays, bio } = req.body;
  
  const veterinarianExists = await Veterinarian.findOne({ email });
  
  if (veterinarianExists) {
    res.status(400);
    throw new Error('Veterinarian with this email already exists');
  }
  
  const veterinarian = await Veterinarian.create({
    firstName,
    lastName,
    specialty,
    email,
    phoneNumber,
    workingDays,
    bio,
  });
  
  if (veterinarian) {
    res.status(201).json(veterinarian);
  } else {
    res.status(400);
    throw new Error('Invalid veterinarian data');
  }
});

// @desc    Update veterinarian
// @route   PUT /api/vets/:id
// @access  Private/Admin
export const updateVeterinarian = asyncHandler(async (req, res) => {
  const veterinarian = await Veterinarian.findById(req.params.id);
  
  if (veterinarian) {
    veterinarian.firstName = req.body.firstName || veterinarian.firstName;
    veterinarian.lastName = req.body.lastName || veterinarian.lastName;
    veterinarian.specialty = req.body.specialty || veterinarian.specialty;
    veterinarian.email = req.body.email || veterinarian.email;
    veterinarian.phoneNumber = req.body.phoneNumber || veterinarian.phoneNumber;
    veterinarian.workingDays = req.body.workingDays || veterinarian.workingDays;
    veterinarian.bio = req.body.bio || veterinarian.bio;
    
    const updatedVeterinarian = await veterinarian.save();
    res.json(updatedVeterinarian);
  } else {
    res.status(404);
    throw new Error('Veterinarian not found');
  }
});

// @desc    Delete veterinarian
// @route   DELETE /api/vets/:id
// @access  Private/Admin
export const deleteVeterinarian = asyncHandler(async (req, res) => {
  const veterinarian = await Veterinarian.findById(req.params.id);
  
  if (veterinarian) {
    await veterinarian.deleteOne();
    res.json({ message: 'Veterinarian removed' });
  } else {
    res.status(404);
    throw new Error('Veterinarian not found');
  }
});