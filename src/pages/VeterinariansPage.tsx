import React from 'react';
import { Mail, Phone, Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';

const VeterinariansPage: React.FC = () => {
  const { vets } = useAppContext();
  const navigate = useNavigate();
  
  return (
    <Layout>
      <PageHeader
        title="Our Veterinarians"
        description="Meet our team of experienced veterinary professionals."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Veterinarians', path: '/vets' }
        ]}
        actions={
          <button
            onClick={() => navigate('/vets/new')}
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Veterinarian
          </button>
        }
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vets.map(vet => (
            <Card key={vet.id} className="overflow-hidden transform transition duration-300 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                {vet.imageUrl ? (
                  <img 
                    src={vet.imageUrl} 
                    alt={`Dr. ${vet.firstName} ${vet.lastName}`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Dr. {vet.firstName} {vet.lastName}
                </h3>
                
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {vet.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{vet.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{vet.phone}</span>
                  </div>
                  
                  <div className="flex items-start text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2 mt-0.5" />
                    <span>Available: {vet.availability.join(', ')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default VeterinariansPage;