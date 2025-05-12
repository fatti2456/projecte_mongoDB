import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Animal name is required'],
      trim: true,
    },
    species: {
      type: String,
      required: [true, 'Species is required'],
      trim: true,
    },
    breed: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Date,
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative'],
    },
    color: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Unknown'],
      default: 'Unknown',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Owner',
    },
    visits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit',
      },
    ],
    medicalHistory: {
      allergies: [String],
      chronicConditions: [String],
      currentMedications: [
        {
          name: String,
          dosage: String,
          frequency: String,
          startDate: Date,
          endDate: Date,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for animal's age
animalSchema.virtual('age').get(function() {
  if (!this.birthDate) return 'Unknown';
  
  const ageDifMs = Date.now() - this.birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
});

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;