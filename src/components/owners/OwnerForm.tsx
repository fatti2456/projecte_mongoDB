import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { Owner } from '../../types';

interface OwnerFormProps {
  owner?: Owner;
  isEdit?: boolean;
  onDelete?: () => void;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

const OwnerForm: React.FC<OwnerFormProps> = ({ owner, isEdit = false, onDelete }) => {
  const { addOwner, updateOwner } = useAppContext();
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState<FormState>({
    firstName: owner?.firstName || '',
    lastName: owner?.lastName || '',
    email: owner?.email || '',
    phone: owner?.phone || '',
    address: owner?.address || '',
    city: owner?.city || '',
    state: owner?.state || '',
    zipCode: owner?.zipCode || ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [, setIsSubmitting] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formState.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formState.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formState.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formState.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formState.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formState.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear the error for this field when the user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEdit && owner) {
        const updatedOwner = updateOwner({
          ...owner,
          ...formState
        });
        navigate(`/owners/${updatedOwner.id}`);
      } else {
        const newOwner = addOwner(formState);
        navigate(`/owners/${newOwner.id}`);
      }
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
            <Input
              id="firstName"
              name="firstName"
              label="First Name"
              value={formState.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            
            <Input
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formState.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
            
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={formState.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <Input
              id="phone"
              name="phone"
              label="Phone Number"
              value={formState.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
            
            <div className="sm:col-span-2">
              <Input
                id="address"
                name="address"
                label="Address"
                value={formState.address}
                onChange={handleChange}
                error={errors.address}
                required
              />
            </div>
            
            <Input
              id="city"
              name="city"
              label="City"
              value={formState.city}
              onChange={handleChange}
              error={errors.city}
              required
            />
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                id="state"
                name="state"
                label="State/Province"
                value={formState.state}
                onChange={handleChange}
                error={errors.state}
                required
              />
              
              <Input
                id="zipCode"
                name="zipCode"
                label="ZIP / Postal Code"
                value={formState.zipCode}
                onChange={handleChange}
                error={errors.zipCode}
                required
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button
            type="button"
            variant="outline"
            className="mr-3"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <div className="mt-4 flex justify-end space-x-3">
            {isEdit && (
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete Owner
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              {isEdit ? 'Update Owner' : 'Create Owner'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OwnerForm;