// Core types for the VetCare 360 application

export type Owner = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    pets: Pet[];
  };
  
  export type Pet = {
    id: string;
    name: string;
    species: string;
    breed: string;
    birthDate: string;
    gender: 'male' | 'female' | 'unknown';
    color: string;
    weight: number;
    ownerId: string;
    visits: Visit[];
  };
  
  export type Visit = {
    id: string;
    date: string;
    reason: string;
    diagnosis: string;
    treatment: string;
    notes: string;
    followUpNeeded: boolean;
    followUpDate?: string;
    vetId: string;
    petId: string;
  };
  
  export type Veterinarian = {
    id: string;
    firstName: string;
    lastName: string;
    specialties: string[];
    email: string;
    phone: string;
    availability: string[];
    imageUrl?: string;
  };