import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import PetForm from '../components/pets/PetForm';
import { useAppContext } from '../context/AppContext';
import { Pet } from '../types';

const AddPetPage: React.FC = () => {
  const { ownerId } = useParams<{ ownerId: string }>();
  const { getOwnerById, addPetToOwner } = useAppContext();

  const owner = getOwnerById(ownerId as string);

  if (!owner) {
    return <Navigate to="/owners" />;
  }

  const handleAddPet = async (newPet: Omit<Pet, "ownerId" | "id" | "visits">) => {
    addPetToOwner(owner.id, newPet);
  };

  return (
    <Layout>
      <PageHeader
        title={`Add Pet for ${owner.firstName} ${owner.lastName}`}
        description="Enter information for a new pet"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Owners', path: '/owners' },
          { label: `${owner.firstName} ${owner.lastName}`, path: `/owners/${owner.id}` },
          { label: 'Add Pet', path: `/owners/${owner.id}/pets/new` }
        ]}
      />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <PetForm ownerId={owner.id} onSubmit={handleAddPet} />
        </div>
      </div>
    </Layout>
  );
};

export default AddPetPage;
