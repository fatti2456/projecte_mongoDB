import { useState } from 'react';
import { Owner, Pet, Veterinarian, Visit } from '../types';
import { owners as initialOwners, veterinarians as initialVets } from '../data/mockData';

export const useOwners = () => {
  const [owners, setOwners] = useState<Owner[]>([...initialOwners]);

  const fetchOwners = async () => {
    // Placeholder for mockData
    return;
  };

  const getOwners = () => owners;

  const getOwnerById = (id: string) => owners.find(owner => owner.id === id);

  const searchOwnersByLastName = (lastName: string) =>
    owners.filter(owner =>
      owner.lastName.toLowerCase().includes(lastName.toLowerCase())
    );

  const addOwner = (owner: Omit<Owner, 'id' | 'pets'>) => {
    const newOwner: Owner = {
      ...owner,
      id: Math.random().toString(36).substring(2, 9),
      pets: []
    };
    setOwners([...owners, newOwner]);
    return newOwner;
  };

  const updateOwner = (updatedOwner: Owner) => {
    setOwners(owners.map(owner =>
      owner.id === updatedOwner.id ? updatedOwner : owner
    ));
    return updatedOwner;
  };

  const addPetToOwner = (ownerId: string, pet: Omit<Pet, 'id' | 'ownerId' | 'visits'>) => {
    const newPet: Pet = {
      ...pet,
      id: Math.random().toString(36).substring(2, 9),
      ownerId,
      visits: []
    };
    setOwners(owners.map(owner => {
      if (owner.id === ownerId) {
        return {
          ...owner,
          pets: [...owner.pets, newPet]
        };
      }
      return owner;
    }));
    return newPet;
  };

  const updatePet = (updatedPet: Pet) => {
    setOwners(owners.map(owner => {
      if (owner.id === updatedPet.ownerId) {
        return {
          ...owner,
          pets: owner.pets.map(pet =>
            pet.id === updatedPet.id ? updatedPet : pet
          )
        };
      }
      return owner;
    }));
    return updatedPet;
  };

  const addVisitToPet = (petId: string, ownerId: string, visit: Omit<Visit, 'id' | 'petId'>) => {
    const newVisit: Visit = {
      ...visit,
      id: Math.random().toString(36).substring(2, 9),
      petId
    };
    setOwners(owners.map(owner => {
      if (owner.id === ownerId) {
        return {
          ...owner,
          pets: owner.pets.map(pet => {
            if (pet.id === petId) {
              return {
                ...pet,
                visits: [...pet.visits, newVisit]
              };
            }
            return pet;
          })
        };
      }
      return owner;
    }));
    return newVisit;
  };

  return {
    owners,
    fetchOwners,
    getOwners,
    getOwnerById,
    searchOwnersByLastName,
    addOwner,
    updateOwner,
    addPetToOwner,
    updatePet,
    addVisitToPet
  };
};

export const useVeterinarians = () => {
  const [vets, setVets] = useState<Veterinarian[]>([...initialVets]);

  const fetchVets = async () => {
    // Placeholder for mockData
    return;
  };

  const getVeterinarians = () => vets;

  const getVeterinarianById = (id: string) => vets.find(vet => vet.id === id);

  const addVeterinarian = async (vet: Omit<Veterinarian, 'id'>): Promise<Veterinarian> => {
    const newVet: Veterinarian = {
      ...vet,
      id: Math.random().toString(36).substring(2, 9)
    };
    setVets(prev => [...prev, newVet]);
    return newVet;
  };

  return {
    vets,
    fetchVets,
    getVeterinarians,
    getVeterinarianById,
    addVeterinarian
  };
};
