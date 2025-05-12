import { Owner, Pet, Veterinarian, Visit } from '../types';

// Generate unique IDs
const generateId = (): string => Math.random().toString(36).substring(2, 9);

// Mock veterinarians data
export const veterinarians: Veterinarian[] = [
  {
    id: generateId(),
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialties: ['General Practice', 'Surgery'],
    email: 'sarah.johnson@vetcare360.com',
    phone: '(555) 123-4567',
    availability: ['Monday', 'Tuesday', 'Wednesday'],
    imageUrl: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: generateId(),
    firstName: 'Michael',
    lastName: 'Chen',
    specialties: ['Cardiology', 'Internal Medicine'],
    email: 'michael.chen@vetcare360.com',
    phone: '(555) 234-5678',
    availability: ['Wednesday', 'Thursday', 'Friday'],
    imageUrl: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: generateId(),
    firstName: 'Emily',
    lastName: 'Rodriguez',
    specialties: ['Dermatology', 'Preventive Care'],
    email: 'emily.rodriguez@vetcare360.com',
    phone: '(555) 345-6789',
    availability: ['Monday', 'Thursday', 'Friday'],
    imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: generateId(),
    firstName: 'David',
    lastName: 'Williams',
    specialties: ['Dentistry', 'Exotic Animals'],
    email: 'david.williams@vetcare360.com',
    phone: '(555) 456-7890',
    availability: ['Tuesday', 'Wednesday', 'Saturday'],
    imageUrl: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

// Create some visits
const createVisits = (petId: string): Visit[] => {
  const visits: Visit[] = [];
  const reasons = [
    'Annual checkup',
    'Vaccination',
    'Illness',
    'Injury',
    'Follow-up appointment'
  ];
  
  // Generate 0-3 random visits per pet
  const numberOfVisits = Math.floor(Math.random() * 4);
  
  for (let i = 0; i < numberOfVisits; i++) {
    const randomVet = veterinarians[Math.floor(Math.random() * veterinarians.length)];
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    
    const today = new Date();
    const randomPastDate = new Date(today);
    randomPastDate.setDate(today.getDate() - Math.floor(Math.random() * 365));
    
    visits.push({
      id: generateId(),
      date: randomPastDate.toISOString().split('T')[0],
      reason: randomReason,
      diagnosis: randomReason === 'Annual checkup' ? 'Healthy' : 'Requires treatment',
      treatment: randomReason === 'Annual checkup' ? 'None' : 'Medication prescribed',
      notes: 'Pet is doing well overall.',
      followUpNeeded: Math.random() > 0.5,
      followUpDate: Math.random() > 0.5 ? new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0] : undefined,
      vetId: randomVet.id,
      petId
    });
  }
  
  return visits;
};

// Create pets for each owner
const createPets = (ownerId: string): Pet[] => {
  const pets: Pet[] = [];
  const numberOfPets = 1 + Math.floor(Math.random() * 3); // 1-3 pets per owner
  
  const species = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster'];
  const dogBreeds = ['Labrador', 'Golden Retriever', 'German Shepherd', 'Beagle', 'Poodle'];
  const catBreeds = ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll', 'Bengal'];
  const colors = ['Black', 'White', 'Brown', 'Gray', 'Tan', 'Mixed'];
  
  for (let i = 0; i < numberOfPets; i++) {
    const petSpecies = species[Math.floor(Math.random() * species.length)];
    let breed = 'Mixed';
    
    if (petSpecies === 'Dog') {
      breed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
    } else if (petSpecies === 'Cat') {
      breed = catBreeds[Math.floor(Math.random() * catBreeds.length)];
    }
    
    const petId = generateId();
    const pet: Pet = {
      id: petId,
      name: ['Max', 'Bella', 'Charlie', 'Luna', 'Cooper', 'Lucy', 'Milo', 'Daisy'][Math.floor(Math.random() * 8)],
      species: petSpecies,
      breed,
      birthDate: `2018-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      color: colors[Math.floor(Math.random() * colors.length)],
      weight: Math.floor(Math.random() * 70) + 5, // 5-75 pounds
      ownerId,
      visits: []
    };
    
    // Add visits to the pet
    pet.visits = createVisits(petId);
    
    pets.push(pet);
  }
  
  return pets;
};

// Mock owners data
export const owners: Owner[] = [
  {
    id: generateId(),
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    pets: []
  },
  {
    id: generateId(),
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@example.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave',
    city: 'Riverside',
    state: 'CA',
    zipCode: '92501',
    pets: []
  },
  {
    id: generateId(),
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 345-6789',
    address: '789 Elm Blvd',
    city: 'Liberty',
    state: 'MO',
    zipCode: '64068',
    pets: []
  },
  {
    id: generateId(),
    firstName: 'Jennifer',
    lastName: 'Williams',
    email: 'jennifer.williams@example.com',
    phone: '(555) 456-7890',
    address: '101 Pine Lane',
    city: 'Oakville',
    state: 'WA',
    zipCode: '98568',
    pets: []
  },
  {
    id: generateId(),
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    phone: '(555) 567-8901',
    address: '202 Cedar St',
    city: 'Maplewood',
    state: 'MN',
    zipCode: '55109',
    pets: []
  }
];

// Add pets to each owner
owners.forEach(owner => {
  owner.pets = createPets(owner.id);
});

// Create a flattened list of all pets for easier access
export const allPets: Pet[] = owners.flatMap(owner => owner.pets);

// Create a flattened list of all visits for easier access
export const allVisits: Visit[] = allPets.flatMap(pet => pet.visits);