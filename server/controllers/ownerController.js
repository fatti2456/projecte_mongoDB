import asyncHandler from 'express-async-handler';
import Owner from '../models/ownerModel.js';

// @desc    Get all owners
// @route   GET /api/owners
// @access  Private
export const getOwners = asyncHandler(async (req, res) => {
  const owners = await Owner.find({}).sort({ lastName: 1 });
  res.json(owners);
});

// @desc    Search owners by last name
// @route   GET /api/owners/search/:lastName
// @access  Private
export const searchOwnersByLastName = asyncHandler(async (req, res) => {
  const lastName = req.params.lastName;
  const owners = await Owner.find({ 
    lastName: { $regex: lastName, $options: 'i' } 
  }).sort({ lastName: 1 });
  
  res.json(owners);
});

// @desc    Get owner by ID
// @route   GET /api/owners/:id
// @access  Private
export const getOwnerById = asyncHandler(async (req, res) => {
  const owner = await Owner.findById(req.params.id).populate('animals');
  
  if (owner) {
    res.json(owner);
  } else {
    res.status(404);
    throw new Error('Owner not found');
  }
});

// @desc    Create an owner
// @route   POST /api/owners
// @access  Private
export const createOwner = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, phoneNumber, email } = req.body;
  
  const owner = await Owner.create({
    firstName,
    lastName,
    address,
    phoneNumber,
    email,
    animals: [],
  });
  
  if (owner) {
    res.status(201).json(owner);
  } else {
    res.status(400);
    throw new Error('Invalid owner data');
  }
});

// @desc    Update owner
// @route   PUT /api/owners/:id
// @access  Private
export const updateOwner = asyncHandler(async (req, res) => {
  const owner = await Owner.findById(req.params.id);
  
  if (owner) {
    owner.firstName = req.body.firstName || owner.firstName;
    owner.lastName = req.body.lastName || owner.lastName;
    owner.address = req.body.address || owner.address;
    owner.phoneNumber = req.body.phoneNumber || owner.phoneNumber;
    owner.email = req.body.email || owner.email;
    
    const updatedOwner = await owner.save();
    res.json(updatedOwner);
  } else {
    res.status(404);
    throw new Error('Owner not found');
  }
});

// @desc    Delete owner
// @route   DELETE /api/owners/:id
// @access  Private
export const deleteOwner = asyncHandler(async (req, res) => {
  const owner = await Owner.findById(req.params.id);
  
  if (owner) {
    await owner.deleteOne();
    res.json({ message: 'Owner removed' });
  } else {
    res.status(404);
    throw new Error('Owner not found');
  }
});