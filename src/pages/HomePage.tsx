import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Search, UserPlus, Calendar, PawPrint } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Heart className="h-16 w-16 text-teal-600" />
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              VetCare 360
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Complete veterinary clinic management system for tracking animals, appointments, and veterinarians.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link to="/search">
                  <Button variant="primary" size="lg" className="px-8">
                    <Search className="mr-2 h-5 w-5" aria-hidden="true" />
                    Find Patient
                  </Button>
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link to="/owners/new">
                  <Button variant="outline" size="lg" className="px-8">
                    <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                    New Owner
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need in one place
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our comprehensive solution helps you manage your veterinary practice efficiently.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                    <Users className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Owner Management</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Keep track of pet owners with comprehensive profiles and contact information.
                  </p>
                  <div className="mt-4">
                    <Link to="/owners" className="text-teal-600 hover:text-teal-700 font-medium">
                      View Owners →
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                    <PawPrint className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Pet Records</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Maintain detailed health records for every pet, including medical history and treatments.
                  </p>
                  <div className="mt-4">
                    <Link to="/search" className="text-teal-600 hover:text-teal-700 font-medium">
                      Search Records →
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                    <Calendar className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Visit Tracking</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Schedule and track visits, diagnoses, treatments, and follow-ups.
                  </p>
                  <div className="mt-4">
                    <Link to="/vets" className="text-teal-600 hover:text-teal-700 font-medium">
                      View Veterinarians →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-teal-200">Begin managing your veterinary practice today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/owners/new">
                <Button className="py-4 px-6 bg-white text-teal-600 hover:bg-teal-50">
                  Add New Owner
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/search">
                <Button variant="secondary" className="py-4 px-6">
                  Search Records
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;