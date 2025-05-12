import React, { createContext, useContext, ReactNode } from 'react';
import { useOwners, useVeterinarians } from '../services/dataService';
import { Owner, Pet, Veterinarian, Visit } from '../types';

interface AppContextType {
  // Owners
  owners: Owner[];
  fetchOwners: () => Promise<void>;
  getOwners: () => Owner[];
  getOwnerById: (id: string) => Owner | undefined;
  searchOwnersByLastName: (lastName: string) => Owner[];
  addOwner: (owner: Omit<Owner, 'id' | 'pets'>) => Owner;
  updateOwner: (updatedOwner: Owner) => Owner;

  // Pets
  addPetToOwner: (ownerId: string, pet: Omit<Pet, 'id' | 'ownerId' | 'visits'>) => Pet;
  updatePet: (updatedPet: Pet) => Pet;

  // Visits
  addVisitToPet: (petId: string, ownerId: string, visit: Omit<Visit, 'id' | 'petId'>) => Visit;

  // Veterinarians
  vets: Veterinarian[];
  fetchVets: () => Promise<void>;
  getVeterinarians: () => Veterinarian[];
  getVeterinarianById: (id: string) => Veterinarian | undefined;
  addVeterinarian: (vet: Omit<Veterinarian, 'id'>) => Promise<Veterinarian>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ownerService = useOwners();
  const vetService = useVeterinarians();

  const value: AppContextType = {
    ...ownerService,
    ...vetService,
    fetchOwners: ownerService.fetchOwners,
    fetchVets: vetService.fetchVets,
    addVeterinarian: vetService.addVeterinarian,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export type { Veterinarian };
