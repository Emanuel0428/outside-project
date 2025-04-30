import { memo } from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const WhatsappChatConfig = {
  phoneNumber: "573217905526",
  accountName: "Outside Zone",
  avatar: "/logo.webp",
  statusMessage: "Solemos responder en menos de 1 hora",
  chatMessage: "Hola, Bienvenido a OutsideZone! ¿En qué podemos ayudarte?",
};

const WhatsappChat = () => {
  return (
    <div className="fixed bottom-0 right-0 z-50 pointer-events-none">
      <FloatingWhatsApp
        phoneNumber={WhatsappChatConfig.phoneNumber}
        accountName={WhatsappChatConfig.accountName}
        allowClickAway={true}
        notification={true}
        notificationDelay={1000}
        notificationSound={true}
        avatar={WhatsappChatConfig.avatar}
        statusMessage={WhatsappChatConfig.statusMessage}
        chatMessage={WhatsappChatConfig.chatMessage}
        darkMode={true}
        className="fixed bottom-5 right-5 z-50 w-15 h-15 pointer-events-auto bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300"
        chatboxClassName="bottom-20 right-5 w-80 h-112 z-50 bg-gray-900 rounded-lg shadow-xl border border-gray-800"
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

export default memo(WhatsappChat);