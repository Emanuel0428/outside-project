import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Terms: React.FC = () => {
  return (
    <>
    <Helmet>
        <title>Términos y Condiciones - Outside Zone</title>
        <meta name="description" content="Lee los Términos y Condiciones de Outside Zone para entender las reglas y políticas de uso de nuestro sitio web." />
      </Helmet>
    <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg text-white"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Términos y Condiciones</h1>
        <p className="text-gray-400 mb-6 italic text-center">
          Última actualización: 20 de marzo de 2025
        </p>

        <div className="space-y-8">
          <p>
            Bienvenido(a) a <strong>Outside Zone</strong> (<a href="https://www.outside-zone.com/" className="text-purple-400 hover:underline">https://www.outside-zone.com/</a>). Al acceder y utilizar nuestro sitio web, aceptas cumplir con los siguientes Términos y Condiciones. Si no estás de acuerdo con estos términos, te pedimos que no utilices nuestro sitio.
          </p>

          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al registrarte, acceder o utilizar cualquier servicio de Outside Zone, aceptas estos Términos y Condiciones, así como nuestra Política de Privacidad. Nos reservamos el derecho de modificar estos términos en cualquier momento, y dichas modificaciones entrarán en vigor al ser publicadas en esta página. Es tu responsabilidad revisar periódicamente esta página para estar al tanto de cualquier cambio.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Uso del Sitio</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Edad mínima</strong>: Debes tener al menos 18 años o la edad legal en tu jurisdicción para utilizar este sitio. Si eres menor de edad, debes contar con el consentimiento de un tutor legal.
              </li>
              <li>
                <strong>Uso permitido</strong>: Te comprometes a utilizar el sitio únicamente para fines legales y de acuerdo con estos términos. No debes usar el sitio para actividades fraudulentas, ilegales o que infrinjan los derechos de terceros.
              </li>
              <li>
                <strong>Cuenta de usuario</strong>: Al registrarte, eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta. Notifícanos inmediatamente si sospechas de un uso no autorizado de tu cuenta.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Productos y Servicios</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Disponibilidad</strong>: Todos los productos y servicios ofrecidos en Outside Zone están sujetos a disponibilidad. Nos reservamos el derecho de modificar o descontinuar productos en cualquier momento sin previo aviso.
              </li>
              <li>
                <strong>Precios</strong>: Los precios de los productos están indicados en el sitio y pueden cambiar sin previo aviso. Nos esforzamos por garantizar que los precios sean precisos, pero en caso de error, nos reservamos el derecho de cancelar pedidos afectados.
              </li>
              <li>
                <strong>Pagos</strong>: Aceptamos los métodos de pago indicados en el sitio. Al realizar un pedido, aceptas pagar el monto total, incluidos impuestos y gastos de envío aplicables.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Propiedad Intelectual</h2>
            <p>
              Todo el contenido del sitio (textos, imágenes, logotipos, videos, etc.) es propiedad de Outside Zone o de sus licenciantes y está protegido por leyes de propiedad intelectual. No puedes reproducir, distribuir ni utilizar este contenido sin nuestro consentimiento expreso por escrito.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Política de Devoluciones y Reembolsos</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Devoluciones</strong>: Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su estado original y no haya sido usado. Consulta nuestra página de Devoluciones para más detalles.
              </li>
              <li>
                <strong>Reembolsos</strong>: Los reembolsos se procesarán dentro de los 7 días hábiles posteriores a la recepción del producto devuelto, utilizando el mismo método de pago original.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Limitación de Responsabilidad</h2>
            <p>
              Outside Zone no será responsable de daños indirectos, incidentales o consecuentes derivados del uso del sitio o de la imposibilidad de usarlo, incluso si hemos sido informados de la posibilidad de dichos daños. Nuestra responsabilidad total no excederá el monto pagado por ti por los productos o servicios adquiridos.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Privacidad</h2>
            <p>
              Tu privacidad es importante para nosotros. Consulta nuestra <Link to="/privacy" className="text-purple-400 hover:underline">Política de Privacidad</Link> para entender cómo recopilamos, usamos y protegemos tu información personal.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">8. Ley Aplicable</h2>
            <p>
              Estos Términos y Condiciones se rigen por las leyes de [inserta tu país o jurisdicción]. Cualquier disputa que surja en relación con estos términos será resuelta en los tribunales de [inserta la ciudad o jurisdicción].
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
            <p>
              Si tienes alguna pregunta sobre estos Términos y Condiciones, contáctanos en:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Correo electrónico</strong>: <a href="mailto:vapesoutside@outside-zone.com" className="text-purple-400 hover:underline">vapesoutside@outside-zone.com</a>
              </li>
              <li>
                <strong>Teléfono</strong>: +57 321 790 5526
              </li>
              <li>
                <strong>Dirección</strong>: Medellin, Colombia
              </li>
            </ul>
          </div>
        </div>

        {/* Botón para regresar */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-purple-400 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    </section>
    </> 
  );
};

export default Terms;