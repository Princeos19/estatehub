import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ListingsPage from './pages/ListingsPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import FavouritesPage from './pages/FavouritesPage'
import NotFoundPage from './pages/NotFoundPage'

// Admin
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import AdminListingsPage from './pages/admin/AdminListingsPage'
import ListingFormPage from './pages/admin/ListingFormPage'

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="listings" element={<ListingsPage />} />
        <Route path="listings/:id" element={<PropertyDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin login */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Admin panel */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="listings" element={<AdminListingsPage />} />
        <Route path="listings/new" element={<ListingFormPage />} />
        <Route path="listings/:id/edit" element={<ListingFormPage />} />
      </Route>
    </Routes>
  )
}
