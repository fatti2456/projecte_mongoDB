import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { Visit } from '../../types';

interface VisitFormProps {
  petId: string;
  ownerId: string;
  visit?: Visit;
  isEdit?: boolean;
}

interface FormState {
  date: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  followUpNeeded: boolean;
  followUpDate?: string;
  vetId: string;
}

interface FormErrors {
  date?: string;
  reason?: string;
  diagnosis?: string;
  treatment?: string;
  vetId?: string;
  followUpDate?: string;
}

const VisitForm: React.FC<VisitFormProps> = ({ petId, ownerId, visit, isEdit = false }) => {
  const { addVisitToPet, vets } = useAppContext();
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState<FormState>({
    date: visit?.date || new Date().toISOString().split('T')[0],
    reason: visit?.reason || '',
    diagnosis: visit?.diagnosis || '',
    treatment: visit?.treatment || '',
    notes: visit?.notes || '',
    followUpNeeded: visit?.followUpNeeded || false,
    followUpDate: visit?.followUpDate || '',
    vetId: visit?.vetId || (vets.length > 0 ? vets[0].id : '')
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formState.date) {
      newErrors.date = 'Visit date is required';
    }
    
    if (!formState.reason.trim()) {
      newErrors.reason = 'Reason for visit is required';
    }
    
    if (!formState.diagnosis.trim()) {
      newErrors.diagnosis = 'Diagnosis is required';
    }
    
    if (!formState.treatment.trim()) {
      newErrors.treatment = 'Treatment is required';
    }
    
    if (!formState.vetId) {
      newErrors.vetId = 'Veterinarian is required';
    }
    
    if (formState.followUpNeeded && !formState.followUpDate) {
      newErrors.followUpDate = 'Follow-up date is required when follow-up is needed';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormState(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
    
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
      // Since we don't have update functionality for visits in the context,
      // we'll just handle the add case
      addVisitToPet(petId, ownerId, formState);
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
            <Input
              id="date"
              name="date"
              type="date"
              label="Visit Date"
              value={formState.date}
              onChange={handleChange}
              error={errors.date}
              required
            />
            
            <Select
              id="vetId"
              name="vetId"
              label="Veterinarian"
              value={formState.vetId}
              onChange={handleChange}
              error={errors.vetId}
              options={[
                { value: '', label: 'Select veterinarian' },
                ...vets.map(vet => ({
                  value: vet.id,
                  label: `Dr. ${vet.firstName} ${vet.lastName}`
                }))
              ]}
              required
            />
            
            <div className="sm:col-span-2">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Visit
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={2}
                value={formState.reason}
                onChange={handleChange}
                className={`
                  w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                  placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none 
                  focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed 
                  disabled:opacity-50 ${errors.reason ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                `}
                required
              />
              {errors.reason && <p className="mt-1 text-sm text-red-500">{errors.reason}</p>}
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
                Diagnosis
              </label>
              <textarea
                id="diagnosis"
                name="diagnosis"
                rows={2}
                value={formState.diagnosis}
                onChange={handleChange}
                className={`
                  w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                  placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none 
                  focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed 
                  disabled:opacity-50 ${errors.diagnosis ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                `}
                required
              />
              {errors.diagnosis && <p className="mt-1 text-sm text-red-500">{errors.diagnosis}</p>}
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-1">
                Treatment
              </label>
              <textarea
                id="treatment"
                name="treatment"
                rows={2}
                value={formState.treatment}
                onChange={handleChange}
                className={`
                  w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                  placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none 
                  focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed 
                  disabled:opacity-50 ${errors.treatment ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                `}
                required
              />
              {errors.treatment && <p className="mt-1 text-sm text-red-500">{errors.treatment}</p>}
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formState.notes}
                onChange={handleChange}
                className={`
                  w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                  placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none 
                  focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed 
                  disabled:opacity-50
                `}
              />
            </div>
            
            <div className="sm:col-span-2">
              <div className="flex items-center">
                <input
                  id="followUpNeeded"
                  name="followUpNeeded"
                  type="checkbox"
                  checked={formState.followUpNeeded}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="followUpNeeded" className="ml-2 block text-sm text-gray-700">
                  Follow-up needed
                </label>
              </div>
            </div>
            
            {formState.followUpNeeded && (
              <Input
                id="followUpDate"
                name="followUpDate"
                type="date"
                label="Follow-up Date"
                value={formState.followUpDate || ''}
                onChange={handleChange}
                error={errors.followUpDate}
                required={formState.followUpNeeded}
              />
            )}
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button
            type="button"
            variant="outline"
            className="mr-3"
            onClick={() => navigate(`/owners/${ownerId}`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
          >
            {isEdit ? 'Update Visit' : 'Add Visit'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VisitForm;