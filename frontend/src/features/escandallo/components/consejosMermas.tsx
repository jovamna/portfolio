import React, { useMemo } from 'react';

const CONSEJOS_MERMAS: Record<string, string> = {
  // Frutas
  limon: "En partida fría es un clásico: cuando tocaba mousse de chocolate, se guardaba la piel del limón para rallar un poquito por encima y darle ese toque ácido que lo levanta todo. También se usa en ensaladas, solo una pizca, para un punto refrescante.",
  naranja: "La piel de naranja se ralla y se congela antes de exprimirla. Luego se usa para perfumar masas, chocolate o hacer sugar dust en el último momento.",
  manzana: "Las peladuras y los corazones tienen mucha pectina, así que en algunas partidas se aprovechan para hacer un brillo de tarta casero o gelatinas.",
  platano: "Cuando se pasa de maduro, en vez de tirarlo se aplasta y se usa como endulzante natural en bizcochos, pancakes o batidos.",
  fresa: "Las hojas y el pedúnculo verde no se tiran, se usan para infusionar almíbares, aguas aromáticas o vinagres.",
  kiwi: "La piel se puede dejar y comer, o secarla para hacer chips. La pulpa muy madura es perfecta para smoothies.",
  pina: "La piel y el corazón dan para un agua de piña muy rica, o un sirope concentrado si se reduce.",
  mango: "La piel y el hueso sirven para infusionar aguardientes o dar un toque dulce a caldos.",
  pera: "Las peladuras de pera aportan un sabor elegante a siropes y mermeladas.",

  // Verduras
  zanahoria: "Cuando llega demasiada zanahoria y está a punto de estropearse, en algunas cocinas se rallan todas y sale un bizcocho de zanahoria buenísimo — mejor que tirarlas.",
  cebolla: "Las pieles de cebolla, bien limpias, se guardan para dar color dorado y sabor a los caldos oscuros.",
  ajo: "Las pieles de ajo se pueden tostar un poco y usar para aromatizar aceites o caldos.",
  pimiento: "Los pedúnculos y las semillas no se desechan del todo, se usan en caldos o reducciones de sabor.",
  tomate: "Las pieles y semillas dan para una salsa concentrada o un fondo de tomate con mucho sabor.",
  patata: "Cuando se pasan de cocción y quedan demasiado blandas, es habitual reciclarlas: aplastadas en la sartén con un poco de aceite, y encima pasta al dente con ajo y picante — sale un plato distinto y nada se pierde.",
  calabacin: "Las peladuras se pueden saltear o meter en tortillas y revueltos, tienen más sabor del que parece.",
  berenjena: "La piel se asa y se aprovecha para cremas o para dar color a salsas.",
  apio: "Las hojas de apio tienen más sabor que el propio tallo. Se usan mucho en caldos y sofritos.",
  puerro: "La parte verde, la que casi todo el mundo tira, es perfecta para caldos y fondos.",
  espinaca: "Los tallos se pican fino y se saltean aparte. Tienen bastante más sabor de lo que se piensa.",
  brocoli: "El tallo se pela y se aprovecha en cremas o salteados. Queda muy tierno una vez pelado.",
  coliflor: "Las hojas exteriores, que casi siempre acaban en la basura, se pueden cocinar y están muy buenas.",

  // Proteínas
  huevo: "Si solo hacen falta las yemas, las claras se guardan para merengues o macarons. Se congelan sin problema.",
  pollo: "La carcasa y las pieles casi nunca se tiran: dan un caldo de pollo con mucho más cuerpo. La piel, tostada, hace unos chicharrones estupendos.",
  cerdo: "Los huesos y recortes se reservan para fondos y caldos potentes, dan mucho sabor.",
  ternera: "Los huesos de ternera, si se asan antes, dan un fondo oscuro que marca la diferencia en cualquier salsa.",
  pescado: "Las espinas y la cabeza no se tiran, se usan para un fumet o consomé base — es de lo más aprovechado en cualquier cocina.",
  merluza: "Con las espinas y la cabeza sale un fumet de pescado blanco excelente, muy suave.",
  salmon: "Los recortes de grasa y la piel se usan para aceites aromatizados o caldos con más cuerpo.",
  bacalao: "Las espinas y la piel dan un caldo con mucha fuerza, ideal para arroces o un buen suquet.",
  gambas: "Esto es casi una norma en cualquier cocina: cabezas y cáscaras de gamba nunca se tiran. Con ellas (y a veces con espinas de pescado) sale un consomé que luego da mucho juego, hasta para el arroz de una paella.",
  langostino: "Igual que con la gamba, las cabezas y cáscaras dan un caldo rojizo y potente que merece la pena guardar.",
  mejillon: "El agua de cocción de los mejillones es un caldo natural que se aprovecha muy bien en arroces y pastas.",

  // Otros
  pan: "El pan del día anterior se seca al horno y se convierte en pan rallado, o se usa en budines y torrijas.",
  chocolate: "Los recortes de cobertura se funden para ganaches, o se rallan para hacer virutas de decoración.",
  galleta: "Los trozos rotos del fondo del paquete se trituran y hacen una base crujiente perfecta para tartas o cheesecakes.",
  queso: "Las cortezas de queso, si no están enceradas, se guardan para dar sabor a caldos y cremas.",
  cafe: "Los posos de café tienen más vida de la que parece: sirven para marinar carnes, e incluso como abono para plantas.",
  hierbas: "Los tallos de perejil, cilantro o albahaca tienen mucho sabor, no solo las hojas. Se usan en caldos y aceites.",
  setas: "Los tallos de las setas se pueden secar y triturar para un polvo con mucho umami.",
};





interface IngredienteBasico {
  name: string;
  mermaKg: string;
}

interface ConsejosMermasProps {
  ingredients: IngredienteBasico[];
}

interface Tip {
  ingrediente: string;
  consejo: string;
}

export default function ConsejosMermas({ ingredients }: ConsejosMermasProps) {
  const tips = useMemo<Tip[]>(() => {
    const lista: Tip[] = [];

    ingredients.forEach((ing) => {
      const merma = parseFloat(ing.mermaKg) || 0;
      if (merma <= 0) return;

      const nombre = (ing.name || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // quita acentos

      const clave = Object.keys(CONSEJOS_MERMAS).find((key) =>
        new RegExp(`\\b${key}\\b`).test(nombre)
        //nombre.includes(key)
      );

      if (clave) {
        lista.push({
          ingrediente: ing.name || 'Ingrediente',
          consejo: CONSEJOS_MERMAS[clave],
        });
      }
    });

    // Evitar consejos duplicados
    return lista.filter(
      (tip, index, self) =>
        index === self.findIndex((t) => t.consejo === tip.consejo)
    );
  }, [ingredients]);

  if (tips.length === 0) return null;

  return (
    <div className="mt-8 mb-12 bg-emerald-50 border-y border-mauve-800 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-mauve-800 mb-4 flex items-center gap-2 uppercase ">
        💡 Aprovechamiento de mermas
      </h3>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-emerald-100 shadow-sm"
          >
            <details>
               <summary className="text-sm font-bold text-mauve-700 mb-1">
              {tip.ingrediente}
            </summary>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {tip.consejo}
            </p>

            </details>


          </div>
        ))}
      </div>
    </div>
  );
}

