import { FloatingWhatsApp } from 'react-floating-whatsapp';

const WhatsappChat = () => {
  return (
    <div className="fixed bottom-0 right-0 z-50 pointer-events-none">
      <FloatingWhatsApp
        phoneNumber="573217905526"
        accountName="Outside Zone"
        allowClickAway={true}
        notification={true}
        notificationDelay={1000}
        notificationSound={true}
        avatar="/logo.webp"
        statusMessage="Solemos responder en menos de 1 hora"
        chatMessage="Hola, Bienvenido a OutsideZone! ¿En qué podemos ayudarte?"
        darkMode={true}
        className="fixed bottom-5 right-5 z-50 w-[60px] h-[60px] pointer-events-auto bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300"
        chatboxClassName="bottom-20 right-5 w-[320px] h-[450px] z-50 bg-gray-900 rounded-lg shadow-xl border border-gray-800"
        buttonStyle={{
          backgroundColor: 'transparent', 
          padding: '0', 
        }}
        chatboxStyle={{
          fontFamily: 'inherit',
        }}
        notificationClassName="bg-purple-500 text-white rounded-full"
      />
    </div>
  );
};

export default WhatsappChat;