import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import PetForm from '../components/pets/PetForm';
import { useAppContext } from '../context/AppContext';

const EditPetPage: React.FC = () => {
  const { ownerId, petId } = useParams<{ ownerId: string; petId: string }>();
  const { getOwnerById } = useAppContext();
  
  const owner = getOwnerById(ownerId as string);
  const pet = owner?.pets.find(p => p.id === petId);
  
  if (!owner || !pet) {
    return <Navigate to={owner ? `/owners/${owner.id}` : "/owners"} />;
  }
  
  return (
    <Layout>
      <PageHeader
        title={`Edit ${pet.name}`}
        description={`Update information for ${owner.firstName} ${owner.lastName}'s pet`}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Owners', path: '/owners' },
          { label: `${owner.firstName} ${owner.lastName}`, path: `/owners/${owner.id}` },
          { label: `Edit ${pet.name}`, path: `/owners/${owner.id}/pets/${pet.id}/edit` }
        ]}
      />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <PetForm ownerId={owner.id} pet={pet} isEdit={true} onSubmit={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } } />
        </div>
      </div>
    </Layout>
  );
};

export default EditPetPage;