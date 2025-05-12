import React from 'react';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import OwnerForm from '../components/owners/OwnerForm';

const AddOwnerPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader
        title="Add New Owner"
        description="Enter information for a new pet owner"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Owners', path: '/owners' },
          { label: 'Add New Owner', path: '/owners/new' }
        ]}
      />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <OwnerForm />
        </div>
      </div>
    </Layout>
  );
};

export default AddOwnerPage;