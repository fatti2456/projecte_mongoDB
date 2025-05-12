import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Calendar, Edit, Plus, 
  Clipboard, Heart, PlusCircle, Eye 
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';

const OwnerDetailPage: React.FC = () => {
  const { ownerId } = useParams<{ ownerId: string }>();
  const { getOwnerById, getVeterinarianById } = useAppContext();
  const navigate = useNavigate();
  
  const owner = getOwnerById(ownerId as string);
  
  if (!owner) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Owner not found</h2>
          <p className="mt-2 text-gray-500">The owner you are looking for does not exist.</p>
          <div className="mt-6">
            <Link to="/owners">
              <Button variant="primary">Back to Owners</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <PageHeader
        title={`${owner.firstName} ${owner.lastName}`}
        description="Owner details and pet information"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Owners', path: '/owners' },
          { label: `${owner.firstName} ${owner.lastName}`, path: `/owners/${owner.id}` }
        ]}
        actions={
          <div className="flex space-x-3">
            <Link to={`/owners/${owner.id}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Owner
              </Button>
            </Link>
            <Link to={`/owners/${owner.id}/pets/new`}>
              <Button variant="primary">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Pet
              </Button>
            </Link>
          </div>
        }
      />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Owner Information Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Owner Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{owner.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{owner.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p>{owner.address}</p>
                      <p>{owner.city}, {owner.state} {owner.zipCode}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <Link to={`/owners/${owner.id}/edit`} className="text-teal-600 hover:text-teal-700 font-medium flex items-center">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Information
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Pets Section */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Pets</h2>
              <Link to={`/owners/${owner.id}/pets/new`}>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Pet
                </Button>
              </Link>
            </div>
            
            {owner.pets.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <Heart className="h-12 w-12 text-gray-300 mx-auto" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No pets yet</h3>
                <p className="mt-1 text-gray-500">
                  Add a pet to track their medical history and visits.
                </p>
                <div className="mt-6">
                  <Link to={`/owners/${owner.id}/pets/new`}>
                    <Button variant="primary">
                      <Plus className="h-4 w-4 mr-1" />
                      Add First Pet
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {owner.pets.map(pet => (
                  <Card key={pet.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <div className="flex justify-between items-center">
                        <CardTitle>{pet.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Link to={`/owners/${owner.id}/pets/${pet.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Link to={`/owners/${owner.id}/pets/${pet.id}/visits/new`}>
                            <Button variant="primary" size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Visit
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-medium text-gray-500 text-sm mb-1">Basic Information</h4>
                          <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <dt className="text-sm font-medium text-gray-500">Species</dt>
                            <dd className="text-sm text-gray-900">{pet.species}</dd>
                            <dt className="text-sm font-medium text-gray-500">Breed</dt>
                            <dd className="text-sm text-gray-900">{pet.breed}</dd>
                            <dt className="text-sm font-medium text-gray-500">Birth Date</dt>
                            <dd className="text-sm text-gray-900">{pet.birthDate}</dd>
                            <dt className="text-sm font-medium text-gray-500">Gender</dt>
                            <dd className="text-sm text-gray-900 capitalize">{pet.gender}</dd>
                          </dl>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500 text-sm mb-1">Physical Attributes</h4>
                          <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <dt className="text-sm font-medium text-gray-500">Color</dt>
                            <dd className="text-sm text-gray-900">{pet.color}</dd>
                            <dt className="text-sm font-medium text-gray-500">Weight</dt>
                            <dd className="text-sm text-gray-900">{pet.weight} lbs</dd>
                          </dl>
                        </div>
                      </div>
                      
                      {/* Visit History */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-700">Visit History</h4>
                          <Link to={`/owners/${owner.id}/pets/${pet.id}/visits/new`}>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              New Visit
                            </Button>
                          </Link>
                        </div>
                        
                        {pet.visits.length === 0 ? (
                          <div className="bg-gray-50 rounded p-4 text-center">
                            <Clipboard className="h-8 w-8 text-gray-300 mx-auto" />
                            <p className="mt-2 text-sm text-gray-500">No visit records yet.</p>
                            <Link to={`/owners/${owner.id}/pets/${pet.id}/visits/new`} className="mt-2 inline-block text-sm text-teal-600 hover:text-teal-700">
                              Schedule a visit
                            </Link>
                          </div>
                        ) : (
                          <div className="overflow-hidden border border-gray-200 rounded-md">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                  </th>
                                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Reason
                                  </th>
                                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Veterinarian
                                  </th>
                                  <th scope="col" className="relative px-4 py-3">
                                    <span className="sr-only">Actions</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {pet.visits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(visit => {
                                  const vet = getVeterinarianById(visit.vetId);
                                  return (
                                    <tr key={visit.id} className="hover:bg-gray-50">
                                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {visit.date}
                                      </td>
                                      <td className="px-4 py-3 text-sm text-gray-900">
                                        {visit.reason}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {vet ? `Dr. ${vet.firstName} ${vet.lastName}` : 'Unknown'}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                          onClick={() => {
                                            navigate(`/owners/${owner.id}/pets/${pet.id}/visits/${visit.id}`);
                                          }}
                                          className="text-teal-600 hover:text-teal-900 flex items-center justify-end"
                                        >
                                          <Eye className="h-4 w-4 mr-1" />
                                          View
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerDetailPage;