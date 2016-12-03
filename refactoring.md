index.js -> inicialización de funcionalidades base (router, webworkers, firebase, etc.)
App.js -> clase base de la aplicacion: incluye componentes comunes del layout de las páginas, como cabecera, menu o pie de página.
workers: registro de serice workers (web push, pre-cache, etc.)
state: lo relacionado con la gestión del estado de la aplicación: reducer (redux)
services: llamadas a servicios de backend
pages: componentes 'containers' que incluyen el wiring del estado de la aplicación y el envio de eventos al store para mutar el estado de la aplicacion
components: componentes 'presentacion' que visualizan los datos en la pantalla.
