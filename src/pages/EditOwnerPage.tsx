import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import OwnerForm from '../components/owners/OwnerForm';
import { useAppContext } from '../context/AppContext';

export interface AppContextType {
  // ...existing code...
  deleteOwner: (ownerId: string) => Promise<void>;
  // ...existing code...
}

const EditOwnerPage: React.FC = () => {
  const { ownerId } = useParams<{ ownerId: string }>();
  const { getOwnerById, deleteOwner } = useAppContext();
  const navigate = useNavigate();
  
  const owner = getOwnerById(ownerId as string);
  
  if (!owner) {
    return <Navigate to="/owners" />;
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this owner?')) {
      await deleteOwner(ownerId as string);
      navigate('/owners');
    }
  };
  
  return (
    <Layout>
      <PageHeader
        title={`Edit ${owner.firstName} ${owner.lastName}`}
        description="Update owner information"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Owners', path: '/owners' },
          { label: `${owner.firstName} ${owner.lastName}`, path: `/owners/${owner.id}` },
          { label: 'Edit', path: `/owners/${owner.id}/edit` }
        ]}
      />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <OwnerForm owner={owner} isEdit={true} onDelete={handleDelete} />
        </div>
      </div>
    </Layout>
  );
};

export default EditOwnerPage;