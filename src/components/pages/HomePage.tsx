import { lazy, Suspense } from 'react';
import Loader from '@/components/assets/Loader';

const Hero = lazy(() => import('@/components/sections/Hero'));
const FeatureCardsAnimation = lazy(() => import('@/components/assets/FeatureCards'));
const AboutUs = lazy(() => import('@/components/assets/AboutUs'));

const HomePage = () => {
  return (
    <div className="seamless-page">
      <Suspense fallback={<Loader />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <FeatureCardsAnimation />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <AboutUs />
      </Suspense>
    </div>
  );
};

export default HomePage; 