// Coordenadas del centro del pueblo (por si el usuario no activa el GPS)


export const PUEBLO_CENTRO = {
  lat: 41.5398,
  lng: 2.2131
};

export const SITIOS_PUEBLO = [
  // 🏨 CATEGORÍA: HOTELES
  {
    id: 'hotel-mollet-01',
    nombre: 'Hotel Ibis Barcelona Mollet',
    categoria: 'hotel',
    puntuacion: 4.2,
    latitud: 41.5332,
    longitud: 2.2148,
    foto: '/assets/img/guia/hotelIbis.jpg', // Idea IA: Fachada de hotel moderno con toques rojos característicos
    descripcion: 'Alojamiento moderno y cómodo, ideal para estancias de negocios o visitas al Circuit de Catalunya.'
  },
  {
    id: 'hotel-mollet-02',
    nombre: 'B&B HOTEL Barcelona Mollet',
    categoria: 'hotel',
    puntuacion: 4.3,
    latitud: 41.5451,
    longitud: 2.2110,
    foto: '/assets/img/guia/hotelbb.jpg', // Idea IA: Edificio minimalista de hotel con diseño eco-friendly verde y blanco
    descripcion: 'Hotel funcional de diseño contemporáneo, perfecto para estancias de paso junto a la autopista AP-7.'
  },
  {
    id: 'hotel-mollet-03',
    nombre: 'Hotel HC Mollet Barcelona',
    categoria: 'hotel',
    puntuacion: 4.5,
    latitud: 41.5350,
    longitud: 2.2215,
    foto: '/assets/img/guia/hotelhc.avif',// Idea IA: Entrada de hotel ejecutivo elegante con cristales tintados y luces sutiles
    descripcion: 'Ubicado en la zona comercial de Can Flaquer, ofrece habitaciones ejecutivas amplias y un servicio excelente.'
  },

  // 🍔 CATEGORÍA: RESTAURANTES
  {
    id: 'rest-mollet-01',
    nombre: 'Cal Tapa Gastrobar',
    categoria: 'restaurante',
    puntuacion: 4.6,
    latitud: 41.5385,
    longitud: 2.2152,
    foto: '/assets/img/guia/resTapaGastrobarPiltapes.webp', // Idea IA: Mesa de masía catalana con carnes a la brasa humeantes y platos rústicos
    descripcion: 'Especialistas en tapas de alta calidad, croquetas y platillos gourme.'
  },
  {
    id: 'rest-mollet-02',
    nombre: 'Restaurant La Marieta',
    categoria: 'restaurante',
    puntuacion: 4.6,
    latitud: 41.5391,
    longitud: 2.2122,
    foto: '/assets/img/guia/resMarieta.jpg', // Idea IA: Emplatado gourmet de vanguardia, iluminación cálida y moderna de restaurante íntimo
    descripcion: 'La fusión perfecta entre gastronomía tradicional y vanguardista en plena Plaça de l\'Església.'
  },
  {
    id: 'rest-mollet-03',
    nombre: 'El Vell nou',
    categoria: 'restaurante',
    puntuacion: 4.4,
    latitud: 41.5420,
    longitud: 2.2105,
    foto: '/assets/img/guia/resVellNou.jpg', // Idea IA: Pulpo a la gallega servido sobre plato redondo de madera tradicional, con pimentón
    descripcion: 'Un clásico de Mollet, para comer platos de cocina tradicional catalana en un ambiente familiar y acogedor.'
  },

  // ☕ CATEGORÍA: CAFETERÍAS
  
  // Cómplices para tu sección de Cafeterías
{
  id: 'cafe-mollet-01',
  nombre: '365 Obrador',
  categoria: 'cafeteria',
  puntuacion: 4.4,
  latitud: 41.5391,
  longitud: 2.2137,
  foto: '/assets/img/guia/caf365Obrador.jpg',
  descripcion: 'Panadería y cafetería artesanal ideal para desayunos, famosa por sus cafés y su bollería recién horneada diaria.'
},
{
  id: 'cafe-mollet-02',
  nombre: 'Il Forno Cafetería',
  categoria: 'cafeteria',
  puntuacion: 4.5,
  latitud: 41.5358,
  longitud: 2.2098,
  foto: '/assets/img/guia/cafIlForno.jpg',
  descripcion: 'Cafetería de ambiente cálido, perfecta para disfrutar de una buena merienda con repostería selecta en Jaume I.'
},
{
    id: 'cafe-mollet-03',
  nombre: 'Vivari Cafetería',
  categoria: 'cafeteria',
  puntuacion: 4.3,
  latitud: 41.5401,
  longitud: 2.2124,
  foto: '/assets/img/guia/cafVivari.jpg',
  descripcion: 'Espacio moderno junto a la Plaça de Catalunya, excelente para un café rápido de especialidad, bocadillos y dulces.'
},

// Reemplazo para tu sección de Farmacias


// 💊 CATEGORÍA: FARMACIAS
  {
    id: 'farma-mollet-01',
    nombre: 'Farmacia Ortopedia Ana Mª Climent',
    categoria: 'farmacia',
    puntuacion: 4.7,
    latitud: 41.5415,
    longitud: 2.2135,
    foto: '/assets/img/guia/farmaciaCliment.jpg', 
    descripcion: 'Referente en el centro de Mollet, en la Rambla Pompeu Fabra. Especialistas en dermocosmética y consejo farmacéutico.'
  },
  {
    id: 'farma-mollet-02',
    nombre: 'Farmacia Masia Can Borrell',
    categoria: 'farmacia',
    puntuacion: 4.4,
    latitud: 41.5435,
    longitud: 2.2040,
    foto: '/assets/img/guia/farmaciaMasiaCanBorrell.jpeg',
    descripcion: 'Situada en la Avinguda Rívoli, ofrece atención médica rápida, productos infantiles y servicio de guardia.'
  },
  {
 id: 'farma-mollet-03',
  nombre: 'Farmacia Amado',
  categoria: 'farmacia',
  puntuacion: 4.6,
  latitud: 41.5369,
  longitud: 2.2132,
  foto: '/assets/img/guia/farmaciaAmado.jpg',
  descripcion: 'Atención farmacéutica profesional en plena Rambla Nova. Expertos en salud familiar, ortopedia y bienestar.'
}


];