import { useState, useEffect } from 'react';

// Hook para detectar si el usuario prefiere animaciones reducidas
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook para detectar el rendimiento del dispositivo
export const useDevicePerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Detectar dispositivos de bajo rendimiento
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const deviceMemory = (navigator as any).deviceMemory || 4;

    // Considerar bajo rendimiento si:
    // - Menos de 4 núcleos de CPU
    // - Menos de 4GB de RAM
    // - Conexión lenta
    const isLowPerf = 
      hardwareConcurrency < 4 || 
      deviceMemory < 4 || 
      (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'));

    setIsLowPerformance(isLowPerf);
  }, []);

  return isLowPerformance;
};

// Hook para optimizar animaciones basado en preferencias y rendimiento
export const useOptimizedAnimations = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLowPerformance = useDevicePerformance();

  return {
    shouldReduceAnimations: prefersReducedMotion || isLowPerformance,
    animationConfig: {
      duration: prefersReducedMotion ? 0 : isLowPerformance ? 0.3 : 0.8,
      ease: isLowPerformance ? "linear" : "easeInOut",
    }
  };
};

// Hook para throttle de eventos (útil para scroll, resize, etc.)
export const useThrottle = <T>(value: T, delay: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setThrottledValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return throttledValue;
};

// Hook para detectar si un elemento está en viewport (optimizado)
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
};

// Hook para scroll fluido mejorado
export const useSmoothScroll = () => {
  const scrollToSection = (elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return { scrollToSection, scrollToTop };
};

// Hook para detectar dirección de scroll
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    const throttledUpdateScrollDirection = () => {
      requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', throttledUpdateScrollDirection);
    return () => window.removeEventListener('scroll', throttledUpdateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
}; 