import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { Pet } from '../../types';

interface PetFormProps {
  ownerId: string;
  pet?: Pet;
  isEdit?: boolean;
  onSubmit: (newPet: Omit<Pet, 'id' | 'ownerId' | 'visits'>) => Promise<void>;
}

interface FormState {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: 'male' | 'female' | 'unknown';
  color: string;
  weight: number;
}

interface FormErrors {
  name?: string;
  species?: string;
  breed?: string;
  birthDate?: string;
  gender?: string;
  color?: string;
  weight?: string;
}

const PetForm: React.FC<PetFormProps> = ({ ownerId, pet, isEdit = false, onSubmit }) => {
  useAppContext();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<FormState>({
    name: pet?.name || '',
    species: pet?.species || '',
    breed: pet?.breed || '',
    birthDate: pet?.birthDate || '',
    gender: pet?.gender || 'unknown',
    color: pet?.color || '',
    weight: pet?.weight || 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formState.name.trim()) newErrors.name = 'Pet name is required';
    if (!formState.species.trim()) newErrors.species = 'Species is required';
    if (!formState.breed.trim()) newErrors.breed = 'Breed is required';
    if (!formState.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formState.color.trim()) newErrors.color = 'Color is required';
    if (isNaN(formState.weight) || formState.weight <= 0) newErrors.weight = 'Please enter a valid weight';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const processedValue = type === 'number' ? parseFloat(value) : value;

    setFormState(prev => ({ ...prev, [name]: processedValue }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await onSubmit(formState);
      navigate(`/owners/${ownerId}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input id="name" name="name" label="Pet Name" value={formState.name} onChange={handleChange} error={errors.name} required />
            <Select
              id="species"
              name="species"
              label="Species"
              value={formState.species}
              onChange={handleChange}
              error={errors.species}
              options={[
                { value: '', label: 'Select species' },
                { value: 'Dog', label: 'Dog' },
                { value: 'Cat', label: 'Cat' },
                { value: 'Bird', label: 'Bird' },
                { value: 'Rabbit', label: 'Rabbit' },
                { value: 'Hamster', label: 'Hamster' },
                { value: 'Other', label: 'Other' },
              ]}
              required
            />
            <Input id="breed" name="breed" label="Breed" value={formState.breed} onChange={handleChange} error={errors.breed} required />
            <Input id="birthDate" name="birthDate" type="date" label="Birth Date" value={formState.birthDate} onChange={handleChange} error={errors.birthDate} required />
            <Select
              id="gender"
              name="gender"
              label="Gender"
              value={formState.gender}
              onChange={handleChange}
              error={errors.gender}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'unknown', label: 'Unknown' },
              ]}
              required
            />
            <Input id="color" name="color" label="Color" value={formState.color} onChange={handleChange} error={errors.color} required />
            <Input id="weight" name="weight" type="number" label="Weight (lbs)" value={formState.weight.toString()} onChange={handleChange} error={errors.weight} min="0.1" step="0.1" required />
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button type="button" variant="outline" className="mr-3" onClick={() => navigate(`/owners/${ownerId}`)}>Cancel</Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {isEdit ? 'Update Pet' : 'Add Pet'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PetForm;
