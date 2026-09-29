import { createContext, useCallback, useContext } from "react";

export type Lang = "es" | "eu";

export const LangContext = createContext<Lang>("es");

export function useLang() {
  return useContext(LangContext);
}

/** Devuelve el texto en el idioma elegido. Las claves son el texto original en español. */
export function useTr() {
  const lang = useLang();
  return useCallback((s: string) => (lang === "eu" ? (eu[s] ?? s) : s), [lang]);
}

const eu: Record<string, string> = {
  // Navegación
  Introducción: "Sarrera",
  "Qué es el M4": "Zer da M4-a",
  Historia: "Historia",
  Diseño: "Diseinua",
  Motor: "Motorra",
  Prestaciones: "Prestazioak",
  Transmisión: "Transmisioa",
  Ajustes: "Doikuntzak",
  Interior: "Barrualdea",
  Versiones: "Bertsioak",
  Balance: "Alde onak eta txarrak",
  Conclusión: "Amaiera",
  "Salir de pantalla completa": "Pantaila osotik irten",
  "Pantalla completa": "Pantaila osoa",
  Anterior: "Atzera",
  Siguiente: "Hurrengoa",

  // 1
  Presentación: "Aurkezpena",
  "Hola, me llamo Moon y hoy voy a presentaros el BMW M4 Competition. Voy a hablar sobre su historia, diseño, motor, prestaciones, tecnología y algunas de sus características principales.":
    "Kaixo, Moon naiz eta gaur BMW M4 Competition-a aurkeztuko dizuet. Bere historiaz, diseinuaz, motorraz, prestazioez eta teknologiaz hitz egingo dut. Bere ezaugarri nagusi batzuk ere erakutsiko ditut.",
  "Arrastra para inspeccionar": "Arrastatu begiratzeko",

  // 2
  "02 · Qué es": "02 · Zer da",
  "De Serie 4 a M4": "4 Serietik M4-ra",
  "El BMW M4 es la versión deportiva del BMW Serie 4. La M viene de BMW Motorsport, la parte de BMW encargada de crear sus coches más deportivos y potentes.":
    "BMW M4 BMW 4 Seriearen bertsio kirola da. M hori BMW Motorsport-etik dator. BMWren zati horrek kotxe kirolenak eta indartsuenak egiten ditu.",
  "Serie 4": "4 Seriea",
  Carrocería: "Karrozeria",
  "El M4 ensancha los pasos de rueda para alojar una vía más ancha.":
    "M4-ak gurpil-zulo zabalagoak ditu. Horrela, gurpilak zabalago daude.",
  Paragolpes: "Talka-barra",
  "Entradas de aire mucho mayores para refrigerar motor y frenos.":
    "Aire-sarrera askoz handiagoak ditu, motorra eta balaztak hozteko.",
  "Ruedas y frenos": "Gurpilak eta balaztak",
  "Llantas M específicas y frenos de mayor tamaño con pinzas pintadas.":
    "M llanta bereziak eta balazta handiagoak ditu, pinza margotuekin.",
  Escapes: "Ihes-hodiak",
  "Cuatro salidas de escape, la firma visual más clara del M4.":
    "Lau ihes-hodi ditu. Hori da M4-aren ikurrik argiena.",

  // 3
  "03 · Historia": "03 · Historia",
  "Seis generaciones": "Sei belaunaldi",
  "De la homologación de carreras del E30 al M4 actual. Selecciona una generación.":
    "Lasterketetarako sortu zen E30etik gaurko M4-ra. Aukeratu belaunaldi bat.",
  Especial: "Berezia",
  Producción: "Ekoizpena",
  Importancia: "Garrantzia",
  "Cifras históricas aproximadas ampliamente citadas; cuando no existe dato oficial se indica.":
    "Datu historikoak gutxi gorabeherakoak dira. Datu ofizialik ez badago, hala esaten da.",
  Potencia: "Potentzia",
  "Primera generación del M3, nacida para homologar el coche de competición del Grupo A. Motor de 4 cilindros S14 y un concepto muy ligero.":
    "M3-aren lehen belaunaldia da. A Taldeko lasterketetan lehiatzeko sortu zen. 4 zilindroko S14 motorra zuen, eta oso arina zen.",
  "≈ 18.000 unidades (cifra aproximada habitualmente citada, coupé y cabrio).":
    "≈ 18.000 unitate (gutxi gorabeherako kopurua, coupé eta kabrioa).",
  "Creó la base de toda la historia del M3 y unió el nombre M a la competición.":
    "M3-aren historia osoaren oinarria da. M izena lasterketekin lotu zuen.",
  "2.3 L · 4 cil.": "2.3 L · 4 zil.",
  "200 CV (versión inicial)": "200 CV (lehen bertsioa)",
  "Cambio al 6 cilindros en línea y a un enfoque más de uso diario: más cómodo, más grande y también disponible como berlina y cabrio.":
    "6 zilindroko motorra ekarri zuen. Egunerokorako hobea zen: erosoagoa eta handiagoa. Berlina eta kabrio moduan ere bazegoen.",
  "≈ 71.000 unidades (cifra aproximada habitualmente citada).":
    "≈ 71.000 unitate (gutxi gorabeherako kopurua).",
  "Convirtió al M3 en un deportivo utilizable a diario sin perder carácter.":
    "M3-a egunero erabiltzeko kirol-kotxe bihurtu zuen, bere izaera galdu gabe.",
  "3.0–3.2 L · 6 cil.": "3.0–3.2 L · 6 zil.",
  "Seis cilindros atmosférico S54 de alto régimen, muy apreciado por su sonido y su respuesta. Versión extrema CSL con carrocería aligerada.":
    "S54 motorra zuen: 6 zilindro, turborik gabe. Bere soinua eta erantzuna asko gustatzen dira. CSL bertsioa arinagoa zen.",
  "≈ 85.000 unidades (cifra aproximada habitualmente citada).":
    "≈ 85.000 unitate (gutxi gorabeherako kopurua).",
  "Para mucha gente es la referencia clásica del M3 moderno.":
    "Jende askorentzat, hau da M3 moderno klasikoa.",
  "3.2 L · 6 cil. atmosférico": "3.2 L · 6 zil. turborik gabe",
  "El único M3 con motor V8 atmosférico (S65), techo de carbono y capó de aluminio para reducir peso.":
    "V8 motorra zuen M3 bakarra da (S65, turborik gabe). Karbonozko teilatua eta aluminiozko kapoa zituen, arinagoa izateko.",
  "Cifra exacta no publicada oficialmente.": "Kopuru zehatza ez da ofizialki argitaratu.",
  "Marcó el punto máximo de los motores atmosféricos antes de la llegada del turbo.":
    "Turborik gabeko motorren gailurra izan zen, turboa iritsi baino lehen.",
  "4.0 L · V8 atmosférico": "4.0 L · V8 turborik gabe",
  "Aquí nace el nombre M4: el coupé pasa a llamarse M4 y el nombre M3 se queda con la berlina. Vuelve el 6 cilindros, ahora con doble turbo.":
    "Hemen jaio zen M4 izena. Coupéari M4 deitzen zaio, eta M3 izena berlinarentzat geratzen da. 6 zilindroak itzuli ziren, orain bi turborekin.",
  "Separó las carrocerías en dos nombres y abrió la era turbo del M4.":
    "Bi karrozeriak bi izenetan banatu zituen, eta M4-aren turbo garaia hasi zuen.",
  "3.0 L · 6 cil. biturbo": "3.0 L · 6 zil. biturbo",
  "Generación actual: motor S58 biturbo, frontal con la parrilla vertical y, por primera vez en el M4, tracción total M xDrive opcional.":
    "Gaurko belaunaldia da. S58 biturbo motorra eta parrilla bertikala ditu. Lehen aldiz, M4-ak lau gurpileko trakzioa izan dezake (M xDrive).",
  "Es el M4 más potente y más rápido de serie hasta la fecha.":
    "Orain arteko M4 indartsuena eta azkarrena da.",

  // 4
  "04 · Diseño": "04 · Diseinua",
  "Un coche inspeccionable": "Kotxea gertutik",
  "Toca cualquier punto para acercarte a esa zona. Arrastra sobre el coche para girarlo ligeramente.":
    "Ukitu puntu bat zona hori gertutik ikusteko. Arrastatu kotxea pixka bat biratzeko.",
  "← Ver coche entero": "← Kotxe osoa ikusi",
  Parrilla: "Parrilla",
  "Uno de los elementos más reconocibles del diseño del M4: la parrilla vertical de gran tamaño, que además mejora la entrada de aire al motor.":
    "M4-aren gauzarik ezagunenetako bat da: parrilla bertikal handia. Gainera, motorrari aire gehiago sartzen laguntzen dio.",
  Faros: "Argiak",
  "Faros LED estrechos que estilizan el frontal y refuerzan la sensación de anchura del coche.":
    "LED argi estuak ditu. Aurrealdea politagoa egiten dute, eta kotxea zabalagoa dirudi.",
  "Aletas ensanchadas respecto al Serie 4 para alojar una vía más ancha y neumáticos de mayor tamaño.":
    "4 Seriea baino zabalagoa da, gurpil handiagoak sartzeko.",
  "Entradas de aire": "Aire-sarrerak",
  "Grandes aberturas laterales que llevan aire a los radiadores y a la refrigeración de los frenos.":
    "Alboetan zulo handiak ditu. Aire hori erradiadoreetara eta balaztetara doa, hozteko.",
  "Llantas M específicas y frenos de gran diámetro, con pinzas pintadas visibles a través de los radios.":
    "M llanta bereziak eta balazta handiak ditu. Pinza margotuak llanten artean ikusten dira.",
  "Cuatro escapes": "Lau ihes-hodi",
  "Las cuatro salidas de escape son la firma visual clásica de un BMW M.":
    "Lau ihes-hodiak BMW M baten ikur klasikoa dira.",

  // 5
  "05 · Motor": "05 · Motorra",
  Cilindrada: "Zilindrada",
  "Cilindros en línea": "Zilindro lerroan",
  Sobrealimentación: "Turboa",
  "Potencia máxima": "Potentzia maximoa",
  "Par máximo": "Indar-momentu maximoa",
  "530 CV corresponden al M4 Competition xDrive; el M4 Competition de tracción trasera declara 510 CV. El par máximo es de 650 Nm en ambos.":
    "530 CV M4 Competition xDrive-arenak dira. Atzeko trakzioko M4 Competition-ak 510 CV ditu. Biek 650 Nm dituzte.",
  "Bloque de 3.0 litros con seis cilindros en línea, la configuración clásica de BMW. Es compacto, equilibrado y sube de vueltas con suavidad.":
    "3.0 litroko motorra da, sei zilindro lerroan dituena. Hori BMWren motor klasikoa da. Txikia eta orekatua da, eta leun igotzen da.",
  Turbo: "Turboa",
  "Dos turbocompresores aprovechan los gases de escape para meter más aire en los cilindros. Más aire significa más combustible quemado y más potencia.":
    "Bi turbo ditu. Ihes-gasak erabiltzen dituzte zilindroetan aire gehiago sartzeko. Aire gehiago denean, potentzia gehiago dago.",
  Intercooler: "Intercoolerra",
  "El aire se calienta al comprimirse en el turbo. El intercooler lo enfría antes de entrar al motor, de modo que entra más oxígeno en el mismo espacio.":
    "Turboan airea berotu egiten da. Intercoolerrak airea hozten du motorrera sartu baino lehen. Horrela, oxigeno gehiago sartzen da.",
  Refrigeración: "Hozketa",
  "Varios radiadores mantienen la temperatura del motor, del aceite y de la transmisión, algo imprescindible cuando se usa el coche con exigencia.":
    "Erradiadore batzuek motorra, olioa eta transmisioa hotz mantentzen dituzte. Hori oso garrantzitsua da kotxea gogor erabiltzen denean.",

  // 6
  "06 · Prestaciones": "06 · Prestazioak",
  "Acelerando…": "Azeleratzen…",
  Repetir: "Berriro",
  "de 0 a 100 km/h": "0tik 100 km/h-ra",
  "Velocidad máxima según versión y equipamiento": "Abiadura maximoa, bertsioaren arabera",
  "La velocidad está limitada electrónicamente a 250 km/h; sube hasta unos 290 km/h con el M Driver's Package. El M4 Competition de tracción trasera declara 3,9 s.":
    "Abiadura 250 km/h-ra mugatuta dago. M Driver's Package-arekin 290 km/h ingurura igotzen da. Atzeko trakzioko M4 Competition-ak 3,9 s behar ditu.",

  // 7
  "07 · Transmisión y tracción": "07 · Transmisioa eta trakzioa",
  "Cómo llega la fuerza al suelo": "Nola iristen da indarra lurrera",
  "Caja automática M Steptronic de 8 velocidades. La tracción total M xDrive está disponible según versión y puede pasar a modo 2WD (solo eje trasero).":
    "8 abiadurako M Steptronic kutxa automatikoa. M xDrive lau gurpileko trakzioa bertsio batzuetan dago. 2WD modura ere pasa daiteke (atzeko ardatza bakarrik).",
  Caja: "Kutxa",
  Ruedas: "Gurpilak",
  "El motor de 3.0 litros genera la potencia y la entrega en forma de giro al volante motor.":
    "3.0 litroko motorrak potentzia sortzen du, eta biraka ematen du.",
  "Caja automática M Steptronic de 8 velocidades con convertidor de par. Adapta la relación de marcha para mantener el motor en su zona útil y permite cambiar con las levas.":
    "8 abiadurako M Steptronic kutxa automatikoa da. Martxa egokia aukeratzen du motorra ondo ibiltzeko. Bolanteko palekin ere alda daiteke.",
  "El árbol de transmisión lleva el giro hacia el diferencial trasero, que reparte la fuerza entre las dos ruedas del mismo eje.":
    "Transmisio-ardatzak bira atzeko diferentzialera eramaten du. Diferentzialak indarra bi gurpilen artean banatzen du.",
  "Las ruedas convierten ese giro en avance. El diferencial M activo decide cuánta fuerza recibe cada rueda trasera según el agarre.":
    "Gurpilek bira hori aurrera egiteko erabiltzen dute. M diferentzial aktiboak erabakitzen du atzeko gurpil bakoitzak zenbat indar jasotzen duen.",
  "M xDrive · modos de tracción": "M xDrive · trakzio moduak",
  "Elige un modo para ver cómo se reparte la fuerza (valores orientativos).":
    "Aukeratu modu bat indarra nola banatzen den ikusteko (gutxi gorabeherako balioak).",
  "Eje delantero": "Aurreko ardatza",
  "Eje trasero": "Atzeko ardatza",
  "Modo 4WD: el sistema reparte la fuerza entre ambos ejes para máxima tracción y estabilidad, con prioridad trasera.":
    "4WD modua: indarra bi ardatzen artean banatzen da, ondo heltzeko eta egonkorra izateko. Atzekoak indar gehiago jasotzen du.",
  "Modo 4WD Sport: envía más fuerza al eje trasero para un comportamiento más deportivo, manteniendo la ayuda delantera.":
    "4WD Sport modua: indar gehiago bidaltzen du atzera, kirolagoa izateko. Aurrekoak laguntzen jarraitzen du.",
  "Modo 2WD: toda la fuerza va al eje trasero, como un propulsión clásico. Pensado para circuito y conductores expertos.":
    "2WD modua: indar guztia atzeko ardatzera doa, kotxe klasiko batean bezala. Zirkuiturako eta gidari adituentzat da.",

  // 8
  "08 · Ajustes de conducción": "08 · Gidatzeko doikuntzak",
  "Tú decides cómo se comporta.": "Zuk erabakitzen duzu nola ibiltzen den.",
  "El M4 permite modificar diferentes ajustes del coche para adaptar su comportamiento a la forma de conducir.":
    "M4-ean kotxearen doikuntza batzuk alda daitezke. Horrela, kotxea zure gidatzeko modura egokitzen da.",
  Personaliza: "Pertsonalizatu",
  Reiniciar: "Hasieratu",
  "Tu configuración": "Zure konfigurazioa",
  "Configuración muy deportiva: respuesta directa y chasis firme.":
    "Oso konfigurazio kirola: erantzun zuzena eta txasis gogorra.",
  "Configuración de uso diario: suave, cómoda y fácil de conducir.":
    "Egunerokorako konfigurazioa: leuna, erosoa eta gidatzeko erraza.",
  "Configuración mixta: puedes endurecer solo lo que te interesa.":
    "Konfigurazio mistoa: nahi duzuna bakarrik gogortu dezakezu.",
  "Toca uno de los cinco mandos que rodean el volante.":
    "Ukitu bolantearen inguruko bost botoietako bat.",
  Dirección: "Bolantea",
  Suspensión: "Esekidura",
  Cambio: "Aldagailua",
  Tracción: "Trakzioa",
  Confort: "Erosoa",
  "En Confort el acelerador responde de forma más progresiva: la potencia entra suave y el coche es más fácil de conducir por ciudad.":
    "Erosoa moduan, azeleragailuak leunago erantzuten du. Potentzia poliki sartzen da, eta hirian errazago gidatzen da.",
  "En Sport el motor responde de inmediato al acelerador y mantiene más revoluciones. La misma potencia, entregada de forma más directa.":
    "Sport moduan, motorrak berehala erantzuten du. Potentzia bera da, baina zuzenago ematen du.",
  "La dirección pide menos esfuerzo: cómoda para maniobrar y para trayectos largos.":
    "Bolantea errazago mugitzen da. Erosoa da maniobratzeko eta bidaia luzeetarako.",
  "La dirección se endurece y transmite mejor lo que hacen las ruedas delanteras, con una sensación más precisa.":
    "Bolantea gogorragoa da. Aurreko gurpilak zer egiten duten hobeto sentitzen da.",
  "Los amortiguadores adaptativos se ablandan y absorben mejor los baches del día a día.":
    "Motelgailuak leunagoak dira, eta egunerokoko zuloak hobeto hartzen dituzte.",
  "Los amortiguadores se endurecen: la carrocería se inclina menos en curva y el coche se apoya mejor.":
    "Motelgailuak gogortu egiten dira. Bihurguneetan kotxea gutxiago makurtzen da.",
  "La caja automática de 8 velocidades cambia de marcha de forma suave y sube pronto para ir más relajado.":
    "8 abiadurako kutxak leun aldatzen ditu martxak, lasaiago joateko.",
  "La caja retrasa los cambios, los ejecuta de forma más seca y sostiene la marcha al frenar y entrar en curva.":
    "Kutxak beranduago eta azkarrago aldatzen ditu martxak. Bihurguneetan martxa mantentzen du.",
  "M xDrive reparte la fuerza entre los dos ejes cuando hace falta, lo que da más agarre al acelerar.":
    "M xDrive-k indarra bi ardatzen artean banatzen du behar denean. Horrela, hobeto heltzen da azeleratzean.",
  "En modo 2WD toda la fuerza va al eje trasero, como en un BMW de propulsión clásico.":
    "2WD moduan, indar guztia atzeko ardatzera doa, BMW klasiko batean bezala.",

  // 9
  "09 · Interior": "09 · Barrualdea",
  "Un puesto de conducción": "Gidatzeko lekua",
  "Toca cualquier zona para acercarte y ver qué es.": "Ukitu zona bat gertutik ikusteko.",
  "Asientos deportivos": "Kirol-eserlekuak",
  "Asientos M con laterales muy marcados que sujetan el cuerpo en curva. En opción existen los asientos de carbono, más ligeros.":
    "M eserlekuek gorputza ondo eusten dute bihurguneetan. Karbonozko eserlekuak ere badaude, arinagoak.",
  Pantallas: "Pantailak",
  "Dos pantallas unidas bajo un mismo cristal curvo: una para la instrumentación y otra para el sistema central.":
    "Bi pantaila ditu kristal kurbatu baten azpian. Bata abiadura eta datuentzat da, eta bestea sistema nagusiarentzat.",
  "Volante M": "M bolantea",
  "Volante de base plana con levas de cambio y los botones rojos M1 y M2, que guardan dos configuraciones completas del coche.":
    "Bolantea behealdean laua da, eta martxak aldatzeko palak ditu. M1 eta M2 botoi gorriek bi konfigurazio gordetzen dituzte.",
  "Sistema multimedia": "Multimedia sistema",
  "Sistema operativo BMW con navegación, conectividad y control por voz, manejable desde la pantalla táctil o el mando giratorio.":
    "BMWren sistemak nabigatzailea, konexioa eta ahots-kontrola ditu. Pantaila ukituz edo botoi birakariarekin erabiltzen da.",
  Controles: "Kontrolak",
  "En la consola central están los mandos físicos del cambio, los modos de conducción y el volumen: se usan sin mirar.":
    "Erdiko kontsolan aldagailua, gidatzeko moduak eta bolumena daude. Begiratu gabe erabil daitezke.",

  // 10
  "10 · Versiones": "10 · Bertsioak",
  "Tres formas del mismo coche": "Kotxe bera, hiru modutan",
  Peso: "Pisua",
  Trasera: "Atzekoa",
  "Total M xDrive (con modo 2WD)": "Lau gurpilekoa, M xDrive (2WD moduarekin)",
  "Total M xDrive": "Lau gurpilekoa, M xDrive",
  "≈ 1.725 kg (según homologación)": "≈ 1.725 kg (homologazioaren arabera)",
  "≈ 1.780 kg (según homologación)": "≈ 1.780 kg (homologazioaren arabera)",
  "Aligerado con carbono respecto al Competition": "Competition baino arinagoa, karbonoari esker",
  "La versión más pura: toda la potencia va al eje trasero.":
    "Bertsio puruena: potentzia guztia atzeko ardatzera doa.",
  "Más tracción en salida: es la variante más rápida de 0 a 100.":
    "Hobeto heltzen da irteeran. Oso azkarra da 0tik 100era.",
  "Serie especial orientada al circuito: menos peso y más potencia.":
    "Zirkuiturako serie berezia: pisu gutxiago eta potentzia gehiago.",
  "Las tres comparten el mismo motor de 3.0 L biturbo con distinta puesta a punto. Los pesos dependen de la homologación y del equipamiento elegido.":
    "Hirurek 3.0 L biturbo motor bera dute, baina doikuntza desberdinarekin. Pisua homologazioaren eta ekipamenduaren araberakoa da.",

  // 11
  "11 · Balance": "11 · Alde onak eta txarrak",
  "Lo bueno y lo que hay que asumir": "Onena eta txarrena",
  "Toca cada punto para ver la explicación.": "Ukitu puntu bakoitza azalpena ikusteko.",
  Ventajas: "Abantailak",
  Desventajas: "Desabantailak",
  Tecnología: "Teknologia",
  "Amortiguación adaptativa, diferencial M activo, modos de conducción configurables y dos memorias M1/M2 en el volante.":
    "Esekidura moldagarria, M diferentzial aktiboa, gidatzeko moduak eta M1/M2 memoriak bolantean.",
  "Carrocería ensanchada, proporciones de coupé y detalles propios de BMW M como los cuatro escapes.":
    "Karrozeria zabala, coupé itxura eta BMW M-ren xehetasunak, lau ihes-hodiak adibidez.",
  "Hasta 530 CV y 3,5 s de 0 a 100 km/h en la versión Competition xDrive.":
    "530 CV arte, eta 0tik 100 km/h-ra 3,5 segundotan Competition xDrive bertsioan.",
  "Comportamiento deportivo": "Kirol-portaera",
  "Chasis muy equilibrado y reglable: puede ser cómodo en carretera y muy preciso en circuito.":
    "Txasisa oso orekatua da eta alda daiteke. Errepidean erosoa da, eta zirkuituan oso zehatza.",
  "Precio elevado": "Prezio altua",
  "Es un deportivo de gama alta y su precio está muy por encima del de un Serie 4 normal. El equipamiento opcional lo encarece aún más.":
    "Goi-mailako kirol-kotxea da, eta 4 Serie normal bat baino askoz garestiagoa. Aukerako gauzekin, are garestiagoa da.",
  Consumo: "Kontsumoa",
  "Un motor de 3.0 L biturbo con estas prestaciones consume bastante, sobre todo si se aprovecha su potencia.":
    "3.0 L biturbo motor honek dezente kontsumitzen du, batez ere potentzia erabiltzen baduzu.",
  "Costes de mantenimiento": "Mantentze-gastuak",
  "Neumáticos anchos, frenos de gran tamaño y revisiones de un coche M: todo cuesta más que en un coche normal.":
    "Gurpil zabalak, balazta handiak eta M kotxe baten errebisioak: dena garestiagoa da kotxe normal batean baino.",

  // 12
  "En conclusión, el BMW M4 combina potencia y deportividad, pero también se puede utilizar en el día a día.":
    "Amaitzeko, BMW M4-ak potentzia eta kirola dauzka, baina egunerokoan ere erabil daiteke.",
  "Lo que más destaca es su motor, aceleración, tecnología y diseño.":
    "Gehien nabarmentzen direnak bere motorra, azelerazioa, teknologia eta diseinua dira.",
  "Gracias por escucharme.": "Eskerrik asko entzuteagatik.",
  "Ocultar fuentes": "Iturriak ezkutatu",
  Fuentes: "Iturriak",
  "BMW Group PressClub / BMW M — fichas técnicas oficiales del BMW M4 (G82) y del M4 CS.":
    "BMW Group PressClub / BMW M — BMW M4 (G82) eta M4 CS-aren fitxa tekniko ofizialak.",
  "BMW Group Classic — material histórico de las generaciones M3 E30, E36, E46 y E92.":
    "BMW Group Classic — M3 E30, E36, E46 eta E92 belaunaldien material historikoa.",
  "Cifras de producción históricas: valores aproximados ampliamente citados por fuentes del sector; cuando no hay dato oficial se indica expresamente.":
    "Ekoizpen-kopuru historikoak: sektoreko iturriek askotan aipatzen dituzten gutxi gorabeherako balioak. Datu ofizialik ez dagoenean, argi esaten da.",
};

export const euKeys = Object.keys(eu);
