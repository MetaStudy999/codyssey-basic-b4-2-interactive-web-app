import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { EditItemPage } from './pages/EditItemPage';
import { HomePage } from './pages/HomePage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { ItemsPage } from './pages/ItemsPage';
import { NewItemPage } from './pages/NewItemPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/new" element={<NewItemPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/items/:id/edit" element={<EditItemPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
