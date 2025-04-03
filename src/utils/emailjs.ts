// Definición de tipos para EmailJS
declare global {
  interface Window {
    emailjs: {
      init(publicKey: string): void;
      send(serviceId: string, templateId: string, templateParams: any): Promise<any>;
    }
  }
}

// Configuración de EmailJS
const PUBLIC_KEY = "cM1U6QE7PGKxeEewo";
const SERVICE_ID = "service_qp3bchf";
const TEMPLATE_ADMIN = "template_wvgk1f2";
const TEMPLATE_CLIENT = "template_0fnlghz";
const ADMIN_EMAIL = "sebitservices@gmail.com"; // Email del administrador

// Interfaz para los datos del formulario
export interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

// Inicializar EmailJS
export const initEmailJS = () => {
  window.emailjs.init(PUBLIC_KEY);
};

// Función para enviar el formulario
export const sendForm = async (formData: FormData) => {
  try {
    // Preparar datos para la plantilla del admin
    const adminTemplateParams = {
      to_email: ADMIN_EMAIL,
      from_name: formData.nombre,
      from_email: formData.email,
      message: formData.mensaje,
      reply_to: formData.email
    };

    // Preparar datos para la plantilla del cliente
    const clientTemplateParams = {
      to_email: formData.email,
      to_name: formData.nombre,
      message: formData.mensaje
    };

    // Enviar notificación al admin
    await window.emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, adminTemplateParams);
    // Enviar confirmación al cliente
    await window.emailjs.send(SERVICE_ID, TEMPLATE_CLIENT, clientTemplateParams);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    return { success: false, error };
  }
}; 