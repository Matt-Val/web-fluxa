# Fluxa - Sistema de Solicitud de Proyectos Web

## Descripción 

La aplicación guía al usuario a través de un formulario interactivo de 4 pasos para definir el alcance, presupuesto y contrato de su proyecto. Utiliza una arquitectura modular de componentes para manejar distintos flujos según el tipo de proyecto seleccionado (E-Commerce - Landing Page - Blog - Sistema Corporativo)

## Características

  - *Stepper Dinámico*: Intefaz que indica el usuario en tiempo real.
  - *Cuestionarios Específicos*: Componentes dedicados para cada tipo de proyecto que recolectan detalles técnicos precisos.
  - *Validación de Datos*: Sistema verifica la integridad de la información del contacto antes del envío.
  - *Diseño Adaptativo*: Intefaz modesta con CSS.
  - *Gestión de Estado*: Uso de UseState para centralizar la información de la solicitud.

## Tecnologías Utilizadas

  - *Frontend*: React
  - *Herramienta de Construcción*: Vite
  - *Enrutamiento*: React Router DOM

## Próximos Pasos

  - *Integración con Backend*: Conectar el formulario con Supabase para el almacenamiento persistente.
  - *Notificaciones*: Implementar API de WhatsApp para avisos.
  - *Dashboard Administrativo*: Crear una vista para gestionar y visualizar solicitudes recibidas.
  


## Instalaciones

  - npm install
  - npm install @emailjs/browser