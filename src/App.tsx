import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import { ErrorBoundary } from './components/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

const HomePage = lazy(() => import('./pages/HomePage'));
const TariffPage = lazy(() => import('./pages/TariffPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const FleetPage = lazy(() => import('./pages/FleetPage'));
const FareCalculatorPage = lazy(() => import('./pages/FareCalculatorPage'));
const RoutesPage = lazy(() => import('./pages/RoutesPage'));
const RouteDetails = lazy(() => import('./pages/RouteDetails'));
const CitiesPage = lazy(() => import('./pages/CitiesPage'));
const CityPage = lazy(() => import('./pages/CityPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CancellationPolicyPage = lazy(() => import('./pages/CancellationPolicyPage'));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));

function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-secondary" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white text-slate-900">
        <Header />
        <main>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <ScrollToTop />
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/fleet" element={<FleetPage />} />
              <Route path="/tariff" element={<TariffPage />} />
              <Route path="/fare-calculator" element={<FareCalculatorPage />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/routes/:slug" element={<RouteDetails />} />
              <Route path="/cities" element={<CitiesPage />} />
              <Route path="/cities/:slug" element={<CityPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <FloatingActions />
        <SpeedInsights />
      </div>
    </BrowserRouter>
  );
}

export default App;
