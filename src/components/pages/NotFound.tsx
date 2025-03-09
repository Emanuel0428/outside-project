import { lazy, Suspense, useCallback } from "react";
import { loadFull } from "tsparticles";
import { Engine } from 'tsparticles-engine';

const Particles = lazy(() => import('react-particles'));

const NotFound = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative pt-20" >
        <img src="https://i.postimg.cc/15MNzkPf/outside-working-404.webp" 
        alt="Outside no encontrado "
        className="relative items-center inset-0 max-w-2xl max-h-lvh  object-cover opacity-50 rounded-3xl" 
        />
        <div className="absolute bottom-0 z-10 space-y-6 text-center border-y-2 border-purple-900 p-8 bg-black bg-opacity-70 rounded-3xl">
        <h1 className="text-4xl font-bold mb-4">404 - No encontrado!</h1>
        <p>Estamos trabajando en ello...</p>
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