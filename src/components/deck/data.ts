import e30 from "@/assets/gen-e30.png";
import e36 from "@/assets/gen-e36.png";
import e46 from "@/assets/gen-e46.png";
import e92 from "@/assets/gen-e92.png";
import f82 from "@/assets/gen-f82.png";
import g82 from "@/assets/m4-side.png";
import cs from "@/assets/m4-cs.png";

export const NO_DATA = "Cifra exacta no publicada oficialmente.";

export type Generation = {
  year: string;
  code: string;
  name: string;
  image: string;
  special: string;
  production: string;
  importance: string;
  specs: { label: string; value: string }[];
};

export const generations: Generation[] = [
  {
    year: "1985",
    code: "E30",
    name: "BMW M3 E30",
    image: e30,
    special:
      "Primera generación del M3, nacida para homologar el coche de competición del Grupo A. Motor de 4 cilindros S14 y un concepto muy ligero.",
    production: "≈ 18.000 unidades (cifra aproximada habitualmente citada, coupé y cabrio).",
    importance: "Creó la base de toda la historia del M3 y unió el nombre M a la competición.",
    specs: [
      { label: "Motor", value: "2.3 L · 4 cil." },
      { label: "Potencia", value: "200 CV (versión inicial)" },
    ],
  },
  {
    year: "1992",
    code: "E36",
    name: "BMW M3 E36",
    image: e36,
    special:
      "Cambio al 6 cilindros en línea y a un enfoque más de uso diario: más cómodo, más grande y también disponible como berlina y cabrio.",
    production: "≈ 71.000 unidades (cifra aproximada habitualmente citada).",
    importance: "Convirtió al M3 en un deportivo utilizable a diario sin perder carácter.",
    specs: [
      { label: "Motor", value: "3.0–3.2 L · 6 cil." },
      { label: "Potencia", value: "286 – 321 CV" },
    ],
  },
  {
    year: "2000",
    code: "E46",
    name: "BMW M3 E46",
    image: e46,
    special:
      "Seis cilindros atmosférico S54 de alto régimen, muy apreciado por su sonido y su respuesta. Versión extrema CSL con carrocería aligerada.",
    production: "≈ 85.000 unidades (cifra aproximada habitualmente citada).",
    importance: "Para mucha gente es la referencia clásica del M3 moderno.",
    specs: [
      { label: "Motor", value: "3.2 L · 6 cil. atmosférico" },
      { label: "Potencia", value: "343 CV" },
    ],
  },
  {
    year: "2007",
    code: "E92",
    name: "BMW M3 E92",
    image: e92,
    special:
      "El único M3 con motor V8 atmosférico (S65), techo de carbono y capó de aluminio para reducir peso.",
    production: NO_DATA,
    importance: "Marcó el punto máximo de los motores atmosféricos antes de la llegada del turbo.",
    specs: [
      { label: "Motor", value: "4.0 L · V8 atmosférico" },
      { label: "Potencia", value: "420 CV" },
    ],
  },
  {
    year: "2014",
    code: "F82",
    name: "BMW M4 F82",
    image: f82,
    special:
      "Aquí nace el nombre M4: el coupé pasa a llamarse M4 y el nombre M3 se queda con la berlina. Vuelve el 6 cilindros, ahora con doble turbo.",
    production: NO_DATA,
    importance: "Separó las carrocerías en dos nombres y abrió la era turbo del M4.",
    specs: [
      { label: "Motor", value: "3.0 L · 6 cil. biturbo" },
      { label: "Potencia", value: "431 CV · 450 CV Competition" },
    ],
  },
  {
    year: "2020",
    code: "G82",
    name: "BMW M4 G82",
    image: g82,
    special:
      "Generación actual: motor S58 biturbo, frontal con la parrilla vertical y, por primera vez en el M4, tracción total M xDrive opcional.",
    production: NO_DATA,
    importance: "Es el M4 más potente y más rápido de serie hasta la fecha.",
    specs: [
      { label: "Motor", value: "3.0 L · 6 cil. biturbo" },
      { label: "Potencia", value: "510 – 530 CV" },
    ],
  },
];

export type Version = {
  id: string;
  name: string;
  image: string;
  power: string;
  drive: string;
  accel: string;
  weight: string;
  focus: string;
};

export const versions: Version[] = [
  {
    id: "comp",
    name: "M4 Competition",
    image: g82,
    power: "510 CV · 650 Nm",
    drive: "Trasera",
    accel: "3,9 s",
    weight: "≈ 1.725 kg (según homologación)",
    focus: "La versión más pura: toda la potencia va al eje trasero.",
  },
  {
    id: "xdrive",
    name: "M4 Competition xDrive",
    image: g82,
    power: "530 CV · 650 Nm",
    drive: "Total M xDrive (con modo 2WD)",
    accel: "3,5 s",
    weight: "≈ 1.780 kg (según homologación)",
    focus: "Más tracción en salida: es la variante más rápida de 0 a 100.",
  },
  {
    id: "cs",
    name: "M4 CS",
    image: cs,
    power: "550 CV · 650 Nm",
    drive: "Total M xDrive",
    accel: "3,4 s",
    weight: "Aligerado con carbono respecto al Competition",
    focus: "Serie especial orientada al circuito: menos peso y más potencia.",
  },
];

export const sources = [
  "BMW Group PressClub / BMW M — fichas técnicas oficiales del BMW M4 (G82) y del M4 CS.",
  "BMW Group Classic — material histórico de las generaciones M3 E30, E36, E46 y E92.",
  "Cifras de producción históricas: valores aproximados ampliamente citados por fuentes del sector; cuando no hay dato oficial se indica expresamente.",
];
