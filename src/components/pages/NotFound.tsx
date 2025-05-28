import { lazy, Suspense, useCallback } from "react";
import { loadFull } from "tsparticles";
import type { Engine } from 'tsparticles-engine';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Particles = lazy(() => import('react-particles'));

const NotFound = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative pt-20 scroll-section seamless-section" style={{ background: 'transparent' }}>
      <Helmet>
        <title>404 - Página No Encontrada | Outside Zone</title>
        <meta name="description" content="Lo sentimos, la página que buscas no existe. Regresa a la página principal de Outside Zone para explorar nuestros productos y artículos sobre vaping." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <img
        src="https://i.postimg.cc/15MNzkPf/outside-working-404.webp"
        alt="Outside no encontrado"
        className="relative items-center inset-0 max-w-2xl max-h-lvh object-cover opacity-50 rounded-3xl"
      />
      <div className="absolute bottom-1 z-10 space-y-6 text-center border-y-2 border-purple-900 p-8 bg-black bg-opacity-50 rounded-3xl mt-20">
        <h1 className="text-4xl font-bold mb-4">404 - ¡No encontrado!</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          Volver a la página principal
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: "#ffffff" },
              links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
              move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
              number: { value: 40, density: { enable: true, area: 800 } },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      </Suspense>
    </div>
  );
};

export default NotFound;