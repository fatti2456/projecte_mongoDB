import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Mail, Phone, MapPin, Edit, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

const OwnersListPage: React.FC = () => {
  const { owners } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter owners based on search term
  const filteredOwners = searchTerm 
    ? owners.filter(owner => 
        owner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : owners;
  
  return (
    <Layout>
      <PageHeader
        title="All Pet Owners"
        description="View and manage all registered pet owners."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Owners', path: '/owners' }
        ]}
        actions={
          <Link to="/owners/new">
            <Button variant="primary">Add New Owner</Button>
          </Link>
        }
      />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="relative rounded-md shadow-sm max-w-md mx-auto md:mx-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
              placeholder="Search by owner name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredOwners.length > 0 ? (
              filteredOwners.map(owner => (
                <li key={owner.id} className="transition-colors duration-150 hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <Link to={`/owners/${owner.id}`} className="block">
                          <p className="text-lg font-medium text-teal-600 truncate">
                            {owner.firstName} {owner.lastName}
                          </p>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500 mr-6">
                              <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                              <span className="truncate">{owner.email}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                              <span>{owner.phone}</span>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                            <span>
                              {owner.address}, {owner.city}, {owner.state} {owner.zipCode}
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex overflow-hidden">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center text-sm text-gray-500">
                              <PawPrint className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                              <span>Pets: {owner.pets.length}</span>
                            </div>
                            <Link to={`/owners/${owner.id}/edit`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="inline-flex items-center"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </Link>
                            <Link to={`/owners/${owner.id}`}>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="inline-flex items-center"
                              >
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-center">
                <p className="text-gray-500">No owners found matching your search criteria.</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default OwnersListPage;