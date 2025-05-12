import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, PawPrint, UserPlus, Loader2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { Owner } from '../types';

const SearchPage: React.FC = () => {
  const { searchOwnersByLastName } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Owner[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Trigger search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      handleSearch();
    }
  }, [debouncedSearchTerm]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      try {
        setIsLoading(true);
        setError(null);
        const results = await searchOwnersByLastName(searchTerm);
        setSearchResults(results);
        setHasSearched(true);
      } catch (error) {
        setError('Failed to search owners. Please try again.');
        console.error('Search error:', error);
        setSearchResults([]);
        setHasSearched(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Find Owner"
        description="Search for pet owners by last name"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Search', path: '/search' }
        ]}
        actions={
          <Link to="/owners/new">
            <Button variant="primary">
              <UserPlus className="h-4 w-4 mr-2" />
              New Owner
            </Button>
          </Link>
        }
      />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSearch}>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="focus:ring-teal-500 focus:border-teal-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter last name to search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {isLoading ? (
                          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                        ) : (
                          <Search className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={!searchTerm.trim() || isLoading}
                    >
                      {isLoading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </div>
              </form>
              {error && (
                <div className="mt-4 text-sm text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>

          {hasSearched && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Search Results</h2>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
                </div>
              ) : searchResults.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No owners found</h3>
                  <p className="mt-1 text-gray-500">
                    We couldn't find any owners with the last name "{searchTerm}".
                  </p>
                  <div className="mt-6">
                    <Link to="/owners/new">
                      <Button variant="primary">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add New Owner
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {searchResults.map(owner => (
                      <li key={owner.id}>
                        <Link 
                          to={`/owners/${owner.id}`}
                          className="block hover:bg-gray-50 transition duration-150"
                        >
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="text-lg font-medium text-teal-600 truncate">
                                  {owner.firstName} {owner.lastName}
                                </p>
                                <p className="mt-1 flex items-center text-sm text-gray-500">
                                  <PawPrint className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  <span>{owner.pets?.length || 0} {owner.pets?.length === 1 ? 'pet' : 'pets'}</span>
                                </p>
                              </div>
                              <div className="ml-4 flex-shrink-0 flex">
                                <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-green-100 text-green-800">
                                  View Details
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <p className="text-sm text-gray-500">
                                {owner.address}, {owner.city}, {owner.state} {owner.zipCode}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;