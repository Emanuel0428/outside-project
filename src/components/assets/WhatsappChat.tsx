import { FloatingWhatsApp } from 'react-floating-whatsapp';

const WhatsappChat = () => {
  return (



    <FloatingWhatsApp
      phoneNumber="573217905526"
      accountName="Outside Zone"
      allowClickAway={true}
      notification={true}
      notificationDelay={1000}
      notificationSound={true}
      avatar="outside-logo.svg"
      statusMessage="Solemos responder en menos de 1 hora"
      chatMessage="Hola, Bienvenido a OutsideZone! ¿En qué podemos ayudarte?"
      chatboxStyle={{
        width: '300px',
        height: '400px',
      }}
      darkMode={true}
      style={{
        position: 'fixed',
        bottom: '20px', 
        right: '20px', 
        zIndex: 50,
      }}
      className="whatsapp-button"
    />

  );
};

export default WhatsappChat;