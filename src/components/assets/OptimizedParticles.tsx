import { memo, lazy, Suspense } from 'react';
import { useOptimizedAnimations } from '@/lib/hooks';

// Lazy load de las partículas solo cuando sea necesario
const Particles = lazy(() => import('react-particles'));

interface OptimizedParticlesProps {
  id: string;
  init: any;
  options: any;
  className?: string;
}

const OptimizedParticles = ({ id, init, options, className }: OptimizedParticlesProps) => {
  const { shouldReduceAnimations } = useOptimizedAnimations();

  // No renderizar partículas en dispositivos de bajo rendimiento
  if (shouldReduceAnimations) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Particles
        id={id}
        init={init}
        options={options}
        className={className}
      />
    </Suspense>
  );
};

export default memo(OptimizedParticles); 