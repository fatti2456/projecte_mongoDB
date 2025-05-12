import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'Visit date is required'],
      default: Date.now,
    },
    reason: {
      type: String,
      required: [true, 'Reason for visit is required'],
      trim: true,
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Animal',
    },
    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Veterinarian',
    },
    diagnosis: {
      type: String,
      trim: true,
    },
    treatment: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    medications: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        dosage: {
          type: String,
          required: true,
          trim: true,
        },
        instructions: {
          type: String,
          trim: true,
        },
      },
    ],
    followUpNeeded: {
      type: Boolean,
      default: false,
    },
    followUpDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;