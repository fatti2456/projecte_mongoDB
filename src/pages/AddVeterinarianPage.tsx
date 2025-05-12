import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import { useAppContext } from '../context/AppContext';
import { Veterinarian } from '../types'; // ✅ استيراد من types

const AddVeterinarianPage: React.FC = () => {
  const { addVeterinarian } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Veterinarian, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialties: [],
    imageUrl: '',
    availability: []
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addVeterinarian(formData);
      navigate('/vets');
    } catch (error) {
      console.error('Failed to add veterinarian:', error);
      // يمكنك إضافة رسالة الخطأ هنا
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Add New Veterinarian"
        description="Add a new veterinary professional to our team."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Veterinarians', path: '/vets' },
          { label: 'Add New', path: '/vets/new' }
        ]}
      />

      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          {/* يمكنك إضافة input لاختيار التخصصات في المستقبل */}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Add Veterinarian
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddVeterinarianPage;
