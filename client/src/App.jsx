import { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import ComparisonToolPage from './pages/ComparisonToolPage'
import CareerTestPage from './pages/CareerTestPage'
import AllPathways from './pages/AllPathways'
import { Toaster } from 'sonner'
import PathwayDetails from './pages/PathwayDetails'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'
import AllResources from './pages/AllResources'
import ResourceDetails from './pages/ResourceDetails'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Dashboard from './pages/Dashboard'
import AboutPage from './pages/AboutPage'
import AdminHome from './pages/admin/AdminHome'
import AdminDashboard from './pages/admin/AdminDashboard'
import { RoadmapPage } from './pages/roadmap/RoadmapPage'
import RoadmapGenerator from './pages/roadmap/RoadmapGenerator'
import LearningPage from './pages/LearningPage'
import BlurCircle from './components/BlurCircle';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/my-dashboard");
  const isAboutPage = location.pathname.startsWith("/about");
  const isCartPaymentPage = location.pathname === "/cart/payment";
  const isAdminPage = location.pathname.startsWith("/admin");
  const isRoadMapPage = location.pathname === "/roadmap-generator";

  useEffect(() => {
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#09090B] z-50">
        <BlurCircle top='200px' left='200px' />
        <BlurCircle top='-100px' right='100px' />
        <BlurCircle bottom='100px' right='100px' />
        <BlurCircle bottom='-100px' left='100px' />
        <BlurCircle right='600px' top='300px' />
        

        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isDashboard && !isAboutPage && !isCartPaymentPage && !isAdminPage && !isRoadMapPage && <Navbar />}
      <Toaster richColors position="top-center" />
      <ScrollToTopButton />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/comparison-tool-page' element={<ComparisonToolPage />} />
        <Route path='/career-test' element={<CareerTestPage />} />
        <Route path='/pathways' element={<AllPathways />} />
        <Route path='/resources' element={<AllResources />} />
        <Route path='/resources/:resourceId' element={<ResourceDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart/:payment' element={<Payment />} />
        <Route path='/my-dashboard' element={<Dashboard />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/admin/:dashboard' element={<AdminDashboard />} />
        <Route path='/roadmap' element={<RoadmapPage />} />
        <Route path='/roadmap-generator' element={<RoadmapGenerator />} />
        <Route path='/resources/:learning-page/:resourceId' element={<LearningPage />} />
       
        <Route 
          path='/pathways/:pathwayId' 
          element={
            <ErrorBoundary fallback={<div className="text-white p-4">Error loading pathway details</div>}>
              <PathwayDetails />
            </ErrorBoundary>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminPage && !isDashboard && !isCartPaymentPage && !isRoadMapPage && <Footer />}
    </>
  );
};

export default App;
