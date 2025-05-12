import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, User, FileText, ClipboardList, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';

const VisitDetailPage: React.FC = () => {
  const { ownerId, petId, visitId } = useParams<{ 
    ownerId: string; 
    petId: string;
    visitId: string;
  }>();
  
  const { getOwnerById, getVeterinarianById } = useAppContext();
  
  const owner = getOwnerById(ownerId as string);
  const pet = owner?.pets.find(p => p.id === petId);
  const visit = pet?.visits.find(v => v.id === visitId);
  
  if (!owner || !pet || !visit) {
    return <Navigate to={owner ? `/owners/${owner.id}` : "/owners"} />;
  }
  
  const vet = getVeterinarianById(visit.vetId);
  
  return (
    <Layout>
      <PageHeader
        title={`Visit Details for ${pet.name}`}
        description={`Visit on ${visit.date}`}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Owners', path: '/owners' },
          { label: `${owner.firstName} ${owner.lastName}`, path: `/owners/${owner.id}` },
          { label: 'Visit Details', path: `/owners/${owner.id}/pets/${pet.id}/visits/${visit.id}` }
        ]}
        actions={
          <Link to={`/owners/${owner.id}`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Owner
            </Button>
          </Link>
        }
      />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <CardTitle>Visit Record</CardTitle>
                <div className="mt-2 md:mt-0 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  {visit.date}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Pet Information</h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="text-sm text-gray-900">{pet.name}</dd>
                    <dt className="text-sm font-medium text-gray-500">Species</dt>
                    <dd className="text-sm text-gray-900">{pet.species}</dd>
                    <dt className="text-sm font-medium text-gray-500">Breed</dt>
                    <dd className="text-sm text-gray-900">{pet.breed}</dd>
                    <dt className="text-sm font-medium text-gray-500">Weight</dt>
                    <dd className="text-sm text-gray-900">{pet.weight} lbs</dd>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Owner Information</h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="text-sm text-gray-900">{owner.firstName} {owner.lastName}</dd>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900">{owner.phone}</dd>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{owner.email}</dd>
                  </dl>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Attending Veterinarian
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-md p-4 mb-6">
                  <p className="text-gray-900 font-medium">
                    {vet ? `Dr. ${vet.firstName} ${vet.lastName}` : 'Unknown Veterinarian'}
                  </p>
                  {vet && (
                    <p className="text-sm text-gray-500 mt-1">
                      Specialties: {vet.specialties.join(', ')}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Visit Details
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Reason for Visit</h4>
                    <p className="mt-1 text-gray-900">{visit.reason}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Diagnosis</h4>
                    <p className="mt-1 text-gray-900">{visit.diagnosis}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Treatment</h4>
                    <p className="mt-1 text-gray-900">{visit.treatment}</p>
                  </div>
                  
                  {visit.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                      <p className="mt-1 text-gray-900">{visit.notes}</p>
                    </div>
                  )}
                  
                  {visit.followUpNeeded && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <div className="flex">
                        <ClipboardList className="h-5 w-5 text-blue-400 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-800">Follow-up Required</h4>
                          {visit.followUpDate && (
                            <p className="mt-1 text-sm text-blue-700">
                              Scheduled for: {visit.followUpDate}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VisitDetailPage;