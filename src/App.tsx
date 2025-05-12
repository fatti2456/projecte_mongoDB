import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import HomePage from './pages/HomePage';
import VeterinariansPage from './pages/VeterinariansPage';
import OwnersListPage from './pages/OwnersListPage';
import SearchPage from './pages/SearchPage';
import AddOwnerPage from './pages/AddOwnerPage';
import EditOwnerPage from './pages/EditOwnerPage';
import OwnerDetailPage from './pages/OwnerDetailPage';
import AddPetPage from './pages/AddPetPage';
import EditPetPage from './pages/EditPetPage';
import AddVisitPage from './pages/AddVisitPage';
import VisitDetailPage from './pages/VisitDetailPage';
import AddVeterinarianPage from './pages/AddVeterinarianPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vets" element={<VeterinariansPage />} />
          <Route path="/owners" element={<OwnersListPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/owners/new" element={<AddOwnerPage />} />
          <Route path="/owners/:ownerId" element={<OwnerDetailPage />} />
          <Route path="/owners/:ownerId/edit" element={<EditOwnerPage />} />
          <Route path="/owners/:ownerId/pets/new" element={<AddPetPage />} />
          <Route path="/owners/:ownerId/pets/:petId/edit" element={<EditPetPage />} />
          <Route path="/owners/:ownerId/pets/:petId/visits/new" element={<AddVisitPage />} />
          <Route path="/owners/:ownerId/pets/:petId/visits/:visitId" element={<VisitDetailPage />} />
          <Route path="/vets/new" element={<AddVeterinarianPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;