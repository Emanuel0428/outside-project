import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad - Outside Zone</title>
        <meta
          name="description"
          content="Lee la Política de Privacidad de Outside Zone para entender cómo recopilamos, usamos y protegemos tu información personal."
        />
      </Helmet>
      <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg text-white"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidad</h1>
          <p className="text-gray-400 mb-6 italic text-center">
            Última actualización: 20 de marzo de 2025
          </p>

          <div className="space-y-8">
            <p>
              En <strong>Outside Zone</strong> (<a href="https://www.outside-zone.com/" className="text-purple-400 hover:underline">https://www.outside-zone.com/</a>), valoramos tu privacidad y estamos comprometidos a proteger tu información personal. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos tu información cuando visitas nuestro sitio web o utilizas nuestros servicios. Al acceder a nuestro sitio, aceptas las prácticas descritas en esta política.
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
              <p>
                Recopilamos diferentes tipos de información para ofrecer y mejorar nuestros servicios:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Información que proporcionas directamente</strong>:
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li><strong>Datos de registro</strong>: Cuando creas una cuenta, recopilamos tu nombre, dirección de correo electrónico y contraseña.</li>
                    <li><strong>Datos de compra</strong>: Si realizas un pedido, recopilamos información como tu dirección de envío, datos de facturación y detalles de pago (procesados a través de proveedores de pago seguros).</li>
                    <li><strong>Comunicaciones</strong>: Si contactas con nuestro equipo de soporte, recopilamos la información que nos proporcionas, como tu email y el contenido de tu mensaje.</li>
                  </ul>
                </li>
                <li>
                  <strong>Información recopilada automáticamente</strong>:
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li><strong>Datos de uso</strong>: Recopilamos información sobre cómo interactúas con nuestro sitio, como las páginas que visitas, los productos que ves y el tiempo que pasas en el sitio.</li>
                    <li><strong>Datos técnicos</strong>: Recopilamos información como tu dirección IP, tipo de navegador, sistema operativo y dispositivo utilizado.</li>
                    <li><strong>Cookies y tecnologías similares</strong>: Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido. Puedes gestionar tus preferencias de cookies en la configuración de tu navegador.</li>
                  </ul>
                </li>
                <li>
                  <strong>Información de terceros</strong>:
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li>Si inicias sesión con Google u otros servicios de terceros, podemos recibir información como tu nombre y correo electrónico, según lo que permitas compartir.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Cómo Usamos tu Información</h2>
              <p>
                Utilizamos tu información para los siguientes propósitos:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Proveer y mejorar nuestros servicios</strong>:
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li>Procesar tus pedidos y gestionar tu cuenta.</li>
                    <li>Personalizar tu experiencia en el sitio, como recomendarte productos.</li>
                    <li>Enviarte actualizaciones sobre tu pedido o cambios en nuestros servicios.</li>
                  </ul>
                </li>
                <li>
                  <strong>Comunicaciones</strong>:
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li>Enviarte correos electrónicos promocionales o boletines (puedes darte de baja en cualquier momento).</li>
                    <li>Responder a tus consultas o solicitudes de soporte.</li>
                  </ul>
                </li>
                <li>
                  <strong>Análisis y seguridad</strong>:
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li>Analizar el uso del sitio para mejorar nuestro contenido y servicios.</li>
                    <li>Proteger nuestro sitio contra fraudes, accesos no autorizados y otras actividades ilegales.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Cómo Compartimos tu Información</h2>
              <p>
                No vendemos tu información personal a terceros. Sin embargo, podemos compartir tu información en los siguientes casos:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Proveedores de servicios</strong>: Compartimos información con terceros que nos ayudan a operar el sitio, como procesadores de pagos, servicios de envío y proveedores de análisis (por ejemplo, Google Analytics).</li>
                <li><strong>Cumplimiento legal</strong>: Podemos divulgar tu información si así lo exige la ley o para proteger nuestros derechos, seguridad o propiedad, o los de otros usuarios.</li>
                <li><strong>Transferencias comerciales</strong>: Si Outside Zone se fusiona, adquiere o vende parte de sus activos, tu información puede ser transferida como parte de la transacción.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Tus Derechos y Opciones</h2>
              <p>
                Dependiendo de tu jurisdicción, puedes tener los siguientes derechos sobre tu información personal:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Acceso y corrección</strong>: Puedes acceder y actualizar tu información personal desde tu cuenta o contactándonos.</li>
                <li><strong>Eliminación</strong>: Puedes solicitar la eliminación de tu cuenta y datos personales, sujeto a ciertas excepciones legales.</li>
                <li><strong>Darse de baja</strong>: Puedes optar por no recibir correos promocionales haciendo clic en el enlace de "darse de baja" en nuestros emails.</li>
                <li><strong>Cookies</strong>: Puedes desactivar las cookies a través de la configuración de tu navegador, aunque esto puede afectar la funcionalidad del sitio.</li>
              </ul>
              <p className="mt-2">
                Si resides en la Unión Europea, tienes derechos adicionales bajo el GDPR, como el derecho a la portabilidad de datos y el derecho a presentar una queja ante una autoridad de protección de datos.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Seguridad de tu Información</h2>
              <p>
                Tomamos medidas razonables para proteger tu información, como el uso de cifrado para datos sensibles y la implementación de controles de acceso. Sin embargo, ningún sistema es completamente seguro, y no podemos garantizar la seguridad absoluta de tu información.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Retención de Datos</h2>
              <p>
                Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política, a menos que la ley exija un período de retención más largo. Por ejemplo, conservamos los datos de tu cuenta mientras mantengas tu cuenta activa y los datos de transacciones durante el tiempo requerido por las leyes fiscales.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">7. Transferencias Internacionales</h2>
              <p>
                Si accedes a nuestro sitio desde fuera de Colombia, tu información puede ser transferida a servidores ubicados en Estados Unidos. Nos aseguramos de que dichas transferencias cumplan con las leyes de protección de datos aplicables.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Cambios en esta Política</h2>
              <p>
                Podemos actualizar esta Política de Privacidad periódicamente. Publicaremos los cambios en esta página y, si son significativos, te notificaremos por correo electrónico o mediante un aviso en el sitio. Te recomendamos revisar esta página regularmente.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos, contáctanos en:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Correo electrónico</strong>: <a href="mailto:soporte@outside-zone.com" className="text-purple-400 hover:underline">soporte@outside-zone.com</a>
                </li>
                <li>
                  <strong>Teléfono</strong>: +57 3043621891
                </li>
                <li>
                  <strong>Dirección</strong>: Medellín, Colombia
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

export default Privacy;