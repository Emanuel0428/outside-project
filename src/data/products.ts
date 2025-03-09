import { Product } from '@/types';


interface ExtendedVariant {
  name: string;
  image: string;
  alt?: string;
}

interface ExtendedProduct extends Product {
  alt?: string; 
  metaTitle?: string;
  metaDescription?: string; 
  keywords?: string[]; 
  width?: number; 
  height?: number; 
  variants: string[] | ExtendedVariant[];
}

export const products: ExtendedProduct[] = [
  {
    id: 1,
    name: "RifBar Turbo X 15k puffs",
    price: 80000,
    description:
      "El Rifbar Turbo X de iJOY es un excepcional vaporizador desechable con pantalla táctil y modo Boost. Su innovadora pantalla te permite ajustar la potencia de salida y monitorear el estado del dispositivo con facilidad. En modo normal, ofrece hasta 15,000 puffs, mientras que en modo Boost alcanza las 10,000. Gracias a sus bobinas de malla doble, garantiza un sabor intenso y una producción de vapor abundante. Si buscas un vaporizador desechable confiable, con gran autonomía y funciones intuitivas, esta es la elección ideal.",
    image: "https://i.postimg.cc/VLC8V1ht/outside-portada-ritfbar-turbo-x.png",
    category: "vaporizers",
    variants: [
      { name: "Alaskan Mint", image: "https://i.postimg.cc/rms6CLWK/outside-rifbar-turbo-x-Alaskan-Mint.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Alaskan Mint con diseño vibrante" },
      { name: "Black Ice", image: "https://i.postimg.cc/0jKLFdVv/outside-Rifbar-Turbo-X-black-ice.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Black Ice con pantalla táctil" },
      { name: "Blue Razz", image: "https://i.postimg.cc/FF2RRP5j/outside-Rifbar-Turbo-X-blue-razz.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Blue Razz con modo Boost" },
      { name: "Blueberry Mint", image: "https://i.postimg.cc/fbBn9bVG/outside-rifbar-turbo-x-Blueberry-Mint.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Blueberry Mint con diseño elegante" },
      { name: "Mint Ice", image: "https://i.postimg.cc/7bvpkGR2/outside-rifbar-turbo-x-mint-ice.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Mint Ice con bobinas de malla doble" },
      { name: "Peach", image: "https://i.postimg.cc/15wzNpsb/outside-Rifbar-Turbo-X-peach.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Peach con diseño moderno" },
      { name: "Piña Colada", image: "https://i.postimg.cc/wB6YMNj5/outside-rifbar-turbo-x-pina-colada.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Piña Colada con pantalla táctil" },
      { name: "Sour Apple", image: "https://i.postimg.cc/6pVNBct5/outside-rifbar-turbo-x-sour-apple.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Sour Apple con diseño elegante" },
      { name: "Sour Grape Cotton Candy", image: "https://i.postimg.cc/FHxsTNfZ/outside-Rifbar-Turbo-X-sour-grape-cotton-candy.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Sour Grape Cotton Candy con modo Boost" },
      { name: "Strawberry Watermelon", image: "https://i.postimg.cc/sfBxsk8j/outside-rifbar-turbo-x-strawberry-watermelon.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Strawberry Watermelon con pantalla táctil" },
      { name: "Strazz", image: "https://i.postimg.cc/B6VrmwcN/outside-rifbar-turbo-x-Strazz.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Strazz con diseño moderno" },
      { name: "Watermelon Bubble Gum", image: "https://i.postimg.cc/sgzgPv2x/outside-Rifbar-Turbo-X-watermelon-bubble-gum.png", alt: "Vaporizador RifBar Turbo X 15k puffs sabor Watermelon Bubble Gum con diseño elegante" },
    ],
    alt: "Imagen del vaporizador RifBar Turbo X de 25.000 caladas con diseño vibrante y acabado en cuero sintético. Destaca por sus botones de turbo boost y watts ajustables de 15 a 25, ofreciendo sabores top. Sabor: Black Ice.",
    metaTitle: "RifBar Turbo X 25k Puffs - Vaporizador Desechable iJOY con Pantalla Táctil",
    metaDescription:
      "Descubre el RifBar Turbo X de iJOY, un vaporizador desechable con 25k puffs, pantalla táctil y modo Boost. Sabores intensos y diseño innovador. ¡Compra ahora!",
    keywords: ["vaporizador desechable", "RifBar Turbo X", "25k puffs", "iJOY vape", "sabores vape", "pantalla táctil vape"],
    width: 300,
    height: 300,
  },
  {
    id: 6,
    name: "AirMez Mars 20k puffs",
    price: 40000,
    description:
      "El AirMez Mars 20K es un excepcional vaporizador desechable con pantalla táctil y modo Boost. Su innovadora pantalla te permite ajustar la potencia de salida y monitorear el estado del dispositivo con facilidad. En modo normal, ofrece hasta 20,000 puffs, mientras que en modo Boost alcanza las 10,000. Gracias a sus bobinas de malla doble, garantiza un sabor intenso y una producción de vapor abundante. Si buscas un vaporizador desechable confiable, con gran autonomía y funciones intuitivas, esta es la elección ideal.",
    image: "https://i.postimg.cc/525jD8r8/outside-portada-Ai-RMEZ-Mars.webp",
    category: "vaporizers",
    variants: [
      { name: "Berry Lemonade", image: "https://i.postimg.cc/mDkDcJgS/outside-Ai-RMEZ-Mars-berry-lemonade.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Berry Lemonade con diseño vibrante" },
      { name: "Blue Razz Shiver", image: "https://i.postimg.cc/cC8Lh3Yg/outside-Ai-RMEZ-Mars-blue-razz-shiver.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Blue Razz Shiver con pantalla táctil" },
      { name: "Fabuluxe", image: "https://i.postimg.cc/23R8K5FH/outside-Ai-RMEZ-Mars-fabuluxe.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Fabuluxe con modo Boost" },
      { name: "Frosty Apple Zing", image: "https://i.postimg.cc/qMy8MhYv/outside-Ai-RMEZ-Mars-frosty-apple-zing.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Frosty Apple Zing con diseño elegante" },
      { name: "Hollywood Cherry", image: "https://i.postimg.cc/gcwVQBHR/outside-Ai-RMEZ-Mars-hollywood-cherry.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Hollywood Cherry con bobinas de malla doble" },
      { name: "Mars", image: "https://i.postimg.cc/cJs6Wrq2/outside-Ai-RMEZ-Mars-mars.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Mars con diseño moderno" },
      { name: "Mars Pop", image: "https://i.postimg.cc/y6wmHXLG/outside-Ai-RMEZ-Mars-mars-pop.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Mars Pop con pantalla táctil" },
      { name: "Miami Mint", image: "https://i.postimg.cc/pdqrLRRT/outside-Ai-RMEZ-Mars-miami-mint.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Miami Mint con diseño elegante" },
      { name: "Peachy Ice Splash", image: "https://i.postimg.cc/0Q4N7n61/outside-Ai-RMEZ-Mars-peachy-ice-splash.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Peachy Ice Splash con modo Boost" },
      { name: "Purple Dream Pop", image: "https://i.postimg.cc/g2K839G9/outside-Ai-RMEZ-Mars-purple-dream-pop.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Purple Dream Pop con pantalla táctil" },
      { name: "Snowy Gummy Chill", image: "https://i.postimg.cc/LXJPdnLR/outside-Ai-RMEZ-Mars-snowy-gummy-chill.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Snowy Gummy Chill con diseño moderno" },
      { name: "Strawberry Mango", image: "https://i.postimg.cc/W4WZfMDX/outside-Ai-RMEZ-Mars-strawberry-mango.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Strawberry Mango con diseño elegante" },
      { name: "Tropic Color Storm", image: "https://i.postimg.cc/tgCP5rgs/outside-Ai-RMEZ-Mars-tropic-color-storm.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Tropic Color Storm con pantalla táctil" },
      { name: "Tropic Tango", image: "https://i.postimg.cc/fRsY3Wnj/outside-Ai-RMEZ-Mars-tropic-tango.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Tropic Tango con diseño moderno" },
      { name: "Watermelon Ice", image: "https://i.postimg.cc/JnSkRM5X/outside-Ai-RMEZ-Mars-watermelon-ice.webp", alt: "Vaporizador AirMez Mars 20k puffs sabor Watermelon Ice con diseño elegante " },
    ],
    alt: "Imagen del vaporizador AirMez Mars de 20.000 caladas con diseño vibrante y acabado en cuero sintético. Destaca por sus botones de turbo boost y watts ajustables de 15 a 25, ofreciendo sabores top. Sabor: Black Ice.",
    metaTitle: "AirMez Mars 20k Puffs - Vaporizador Desechable con Pantalla Táctil",
    metaDescription:
      "Explora el AirMez Mars 20K, un vaporizador desechable con 20k puffs, pantalla táctil y modo Boost. Sabores intensos y diseño innovador. ¡Adquiere el tuyo!",
    keywords: ["vaporizador desechable", "AirMez Mars", "20k puffs", "sabores vape", "pantalla táctil vape"],
    width: 300,
    height: 300,
  },
  {
    id: 2,
    name: "Taijizen JuDo 24k puffs",
    price: 45000,
    description:
      "El TaijiZen Judo 24K de iJOY es un excepcional vaporizador desechable con pantalla táctil y modo Boost. Su innovadora pantalla te permite ajustar la potencia de salida y monitorear el estado del dispositivo con facilidad. En modo normal, ofrece hasta 24,000 puffs, mientras que en modo Boost alcanza las 12,000. Gracias a sus bobinas de malla doble, garantiza un sabor intenso y una producción de vapor abundante. Si buscas un vaporizador desechable confiable, con gran autonomía y funciones intuitivas, esta es la elección ideal.",
    image: "https://i.postimg.cc/WpdtnSdM/outside-taijizen-judo.webp",
    category: "vaporizers",
    variants: [
      { name: "Blackberry Cherry", image: "https://i.postimg.cc/BZRbwDFR/outside-blackberry-cherry-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Blackberry Cherry con diseño vibrante" },
      { name: "Sour Strawberry Grape", image: "https://i.postimg.cc/PJ0j3mFy/outside-sour-strawberry-grape-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Sour Strawberry Grape con pantalla táctil" },
      { name: "Pineapple Lime", image: "https://i.postimg.cc/B6YsDWTd/outside-pineapple-lime-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Pineapple Lime con modo Boost" },
      { name: "Cool Mint", image: "https://i.postimg.cc/ZK3nkRFn/outside-cool-mint-Taiji-Zen-Judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Cool Mint con diseño elegante" },
      { name: "Cranberry Soda", image: "https://i.postimg.cc/43wTkCSm/outside-cranberry-soda-Taiji-Zen-Judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Cranberry Soda con bobinas de malla doble" },
      { name: "Blueberry BubbleGum", image: "https://i.postimg.cc/Bbj3BhNt/outside-blueberry-bubblegum-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Blueberry BubbleGum con diseño moderno" },
      { name: "Triple Mango", image: "https://i.postimg.cc/D099d78Y/outside-triple-mango-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Triple Mango con pantalla táctil" },
      { name: "Mango Lime Pineapple", image: "https://i.postimg.cc/0N9qB5ZT/outside-mango-lime-pineapple-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Mango Lime Pineapple con modo Boost" },
      { name: "Lemon Peach Passion Fruit", image: "https://i.postimg.cc/mgYsj133/outside-lemon-peach-passion-fruit-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Lemon Peach Passion Fruit con diseño vibrante" },
      { name: "Chilled Watermelon", image: "https://i.postimg.cc/rmm2qhBg/coutside-hilled-watermelon-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Chilled Watermelon con pantalla táctil" },
      { name: "Blue Strawberry Coconut", image: "https://i.postimg.cc/FzktLYsL/outside-blue-strawberry-coconut-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Blue Strawberry Coconut con diseño elegante" },
      { name: "Blue Raspberry Ice", image: "https://i.postimg.cc/850QcRDG/outside-blue-raspberry-ice-taijizen-judo.webp", alt: "Vaporizador Taijizen JuDo 24k puffs sabor Blue Raspberry Ice con modo Boost" },
    ],
    alt: "Imagen del vaporizador Taijizen JuDo de 24.000 caladas con diseño vibrante y acabado en cuero sintético. Destaca por sus botones de turbo boost y watts ajustables de 15 a 25, ofreciendo sabores top. Sabor: Blackberry Cherry.",
    metaTitle: "Taijizen JuDo 24k Puffs - Vaporizador Desechable iJOY con Modo Boost",
    metaDescription:
      "Explora el Taijizen JuDo 24K de iJOY, un vaporizador desechable con 24k puffs, pantalla táctil y modo Boost. Disfruta de sabores intensos y un diseño único. ¡Adquiérelo hoy!",
    keywords: ["vaporizador desechable", "Taijizen JuDo", "24k puffs", "iJOY vape", "sabores vape", "pantalla táctil vape"],
    width: 300,
    height: 300,
  },
  /*{
    id: 5,
    name: "MTRX",
    price: 45000,
      
  },*/
  {
    id: 3,
    name: "Priv Bar Turbo 15k puffs",
    price: 35000,
    description: "Un vape innovador con 15,000 puffs y sabores intensos, ideal para quienes buscan una experiencia de vapeo duradera y de alta calidad.",
    image: "https://i.postimg.cc/BQJk372F/outside-priv-bar-smok-1.png",
    category: "vaporizers",
    variants: [
      { name: "Alaskan Mint", image: "https://i.postimg.cc/8PH8rgTw/outside-alaskan-mint-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Alaskan Mint con diseño compacto" },
      { name: "Blackberry Peach Lemon", image: "https://i.postimg.cc/rm6ZPf8K/outside-blackberry-peach-lemon-smok-priv-bar.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Blackberry Peach Lemon con diseño moderno" },
      { name: "Blue Razz Lemon", image: "https://i.postimg.cc/52NhBK0J/outside-blue-razz-lemon-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Blue Razz Lemon con diseño elegante" },
      { name: "Blue Razz Watermelon", image: "https://i.postimg.cc/MpFFyWN0/outside-blue-razz-watermelon-smok-priv-bar.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Blue Razz Watermelon con diseño vibrante" },
      { name: "Cherry Paradise", image: "https://i.postimg.cc/mZ7WBFqv/outside-cherry-paradise-PRIV-BAR-TURBO-BOX.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Cherry Paradise con diseño innovador" },
      { name: "Dr Cherry", image: "https://i.postimg.cc/6qrk0DnW/outside-dr-cherry-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Dr Cherry con diseño compacto" },
      { name: "Florida Lemonade", image: "https://i.postimg.cc/7YD86Zrf/outside-florida-lemonade-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Florida Lemonade con diseño moderno" },
      { name: "Honolulu Blue", image: "https://i.postimg.cc/B6DkSdhT/outside-honolulu-blue-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Honolulu Blue con diseño elegante" },
      { name: "Kiwi Straw Bubble Gum", image: "https://i.postimg.cc/MGfr5CJC/outside-kiwi-straw-bubble-gum-smok-priv-bar.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Kiwi Straw Bubble Gum con diseño vibrante" },
      { name: "Peach Berry Ice", image: "https://i.postimg.cc/PqC0cLYF/outside-peach-berry-ice-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Peach Berry Ice con diseño innovador" },
      { name: "Raspberry Pomegranate", image: "https://i.postimg.cc/kXwZgNyp/outside-raspberry-pomegranate-smok-priv-bar.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Raspberry Pomegranate con diseño compacto" },
      { name: "Strawberry Mint Candy", image: "https://i.postimg.cc/Gp661cj3/outside-strawberry-mint-candy-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Strawberry Mint Candy con diseño moderno" },
      { name: "Triple Apple Ice", image: "https://i.postimg.cc/gjW5nN5f/outside-triple-apple-ice-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Triple Apple Ice con diseño elegante" },
      { name: "Triple Mango", image: "https://i.postimg.cc/yxyG90CW/outside-triple-mango-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Triple Mango con diseño vibrante" },
      { name: "Tropical Rainbow Blast", image: "https://i.postimg.cc/7Z6RGCsY/outside-tropical-rainbow-blast-priv-bar.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Tropical Rainbow Blast con diseño innovador" },
      { name: "Watermelon Chill", image: "https://i.postimg.cc/bwCK30Dt/outside-watermelon-chill-smok-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Watermelon Chill con diseño compacto" },
      { name: "Watermelon Kiwi", image: "https://i.postimg.cc/ZY821zvZ/outside-watermelon-kiwi-priv-bar-turbo.png", alt: "Vaporizador Priv Bar Turbo 15k puffs sabor Watermelon Kiwi con diseño moderno" },
    ],
    alt: "Imagen del vaporizador Priv Bar Turbo de 15.000 caladas con diseño vibrante y acabado en cuero sintético. Destaca por sus botones de turbo boost y watts ajustables de 15 a 25, ofreciendo sabores top. Sabor: Alaskan Mint.",
    metaTitle: "Priv Bar Turbo 15k Puffs - Vaporizador Desechable con Sabores Intensos",
    metaDescription:
      "El Priv Bar Turbo 15k puffs ofrece una experiencia de vapeo única con sabores intensos y hasta 15,000 caladas. Perfecto para los amantes del vapeo. ¡Cómpralo ahora!",
    keywords: ["vaporizador desechable", "Priv Bar Turbo", "15k puffs", "sabores vape", "vapeo de calidad"],
    width: 300,
    height: 300,
  },
  {
    id: 4,
    name: "Lost Orion Bar 10k puffs",
    price: 30000,
    description:
      "El Lost Vape Orion Bar 10000 destaca en el competitivo mercado de los vaporizadores desechables gracias a su diseño, durabilidad y excelente sabor. Ofrece un equilibrio inteligente entre la practicidad de los dispositivos desechables y la intención de minimizar el desperdicio. Para quienes buscan una experiencia de vapeo con gran sabor, larga vida útil y facilidad de uso, sin duda es una opción a tener en cuenta.",
    image: "https://i.postimg.cc/tg62WFhy/outside-Lost-Vape-Orion-Bar-10000-Disposable-Vape.webp",
    category: "vaporizers",
    variants: [
      { name: "Blue Razz Ice", image: "https://i.postimg.cc/NFs43VZf/outside-lost-vape-orion-bar-blue-razz-ice.webp", alt: "Vaporizador Lost Orion Bar 10k puffs sabor Blue Razz Ice con diseño elegante" },
      { name: "Grape Burst", image: "https://i.postimg.cc/7hKVw9y1/outside-lost-vape-orion-bar-grape-burst.webp", alt: "Vaporizador Lost Orion Bar 10k puffs sabor Grape Burst con diseño moderno" },
      { name: "Lush Ice", image: "https://i.postimg.cc/ydznPWPR/outside-lost-vape-orion-bar-lush-ice3.webp", alt: "Vaporizador Lost Orion Bar 10k puffs sabor Lush Ice con diseño compacto" },
      { name: "Peach Mango Watermelon", image: "https://i.postimg.cc/PxzyFh3R/outside-lost-vape-orion-bar-peach-mango-watermelon.webp", alt: "Vaporizador Lost Orion Bar 10k puffs sabor Peach Mango Watermelon con diseño vibrante" },
      { name: "Pineapple Lemonade", image: "https://i.postimg.cc/FFpGyrJf/outside-lost-vape-orion-bar-Pineapple-Lemonade.webp", alt: "Vaporizador Lost Orion Bar 10k puffs sabor Pineapple Lemonade con diseño innovador" },
      { name: "Raspberry Sour Apple Ice", image: "https://i.postimg.cc/BQvpNrxm/outside-lost-vape-orion-bar-Raspberry-Sour-Apple-Ice.webp", alt: "Vaporizador Lost Orion Bar 10k puffs sabor Raspberry Sour Apple Ice con diseño elegante" },
      { name: "Strawberry-Summertime", image: "https://i.postimg.cc/Wbfny58T/outside-lost-vape-orion-bar-strawberry-chew.webp", alt: "Vaporizador Lost Orion Bar 10k puffs sabor Strawberry-Summertime con diseño moderno" },
      { name: "Strawberry Chew", image: "https://i.postimg.cc/L8YTFjQf/outside-lost-vape-orion-bar-strawberry-summertime.webp", alt: "Vaporizador Lost Orion Bar 10k puffs sabor Strawberry Chew con diseño vibrante" },
    ],
    alt: "Imagen del vaporizador Lost Orion Bar de 10.000 caladas con diseño vibrante y acabado en cuero sintético. Destaca por sus botones de turbo boost y watts ajustables de 15 a 25, ofreciendo sabores top. Sabor: Blue Razz Ice.",
    metaTitle: "Lost Orion Bar 10k Puffs - Vaporizador Desechable de Alta Calidad",
    metaDescription:
      "El Lost Orion Bar 10k puffs de Lost Vape combina diseño, durabilidad y sabor excepcional. Ideal para una experiencia de vapeo duradera. ¡Hazte con el tuyo!",
    keywords: ["vaporizador desechable", "Lost Orion Bar", "10k puffs", "Lost Vape", "sabores vape", "vapeo duradero"],
    width: 300,
    height: 300,
  },
  // Ropa
  {
    id: 10,
    name: "Urban Hoodie",
    price: 120000,
    description: "Comfortable cotton blend hoodie with minimalist design, perfect for casual wear and urban style.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    category: "clothing",
    variants: ["S", "M", "L", "XL"], // Remains a string[] for clothing
    alt: "Sudadera Urban Hoodie de algodón con diseño minimalista, ideal para un estilo urbano y casual.",
    metaTitle: "Urban Hoodie - Sudadera Minimalista de Algodón para Estilo Urbano",
    metaDescription:
      "Compra la Urban Hoodie, una sudadera de algodón cómoda y minimalista, perfecta para un look urbano y casual. Disponible en tallas S a XL. ¡Adquiérela ahora!",
    keywords: ["sudadera minimalista", "Urban Hoodie", "ropa urbana", "estilo casual", "sudadera de algodón"],
    width: 300,
    height: 300,
  },
  {
    id: 11,
    name: "Street Tech Jacket",
    price: 180000,
    description: "Water-resistant jacket with modern cut and hidden pockets, designed for urban adventures.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    category: "clothing",
    variants: ["S", "M", "L", "XL"], // Remains a string[] for clothing
    alt: "Chaqueta Street Tech Jacket resistente al agua con corte moderno y bolsillos ocultos, perfecta para aventuras urbanas.",
    metaTitle: "Street Tech Jacket - Chaqueta Resistente al Agua para Estilo Urbano",
    metaDescription:
      "La Street Tech Jacket ofrece resistencia al agua, corte moderno y bolsillos ocultos. Ideal para aventuras urbanas. Disponible en tallas S a XL. ¡Cómprala ahora!",
    keywords: ["chaqueta resistente al agua", "Street Tech Jacket", "ropa urbana", "chaqueta moderna", "estilo urbano"],
    width: 300,
    height: 300,
  },
];