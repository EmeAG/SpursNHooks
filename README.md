# Spurs'n'Hooks

NOMBRES:

Miguel Ángel Arcones Ríos 

Manuel Aguado Salguero, Email: m.aguado.2016@alumnos.urjc.es , GitHub: EmeAG

Daniel Muñoz Serrano


CONCEPTO:

Nombre del Juego: Spurs ‘n’ hooks
Nombre del estudio: Piña Colada Studios
Plataforma: PC y Móvil
Versión: 1.0
Sinopsis de jugabilidad y contenido: Videojuego de estrategia y acción PvP, dividido en dos fases. La primera fase consta de la parte de construcción de las defensas, mientras que la segunda fase es la destrucción y derrota de los soldados enemigos y sus defensas. Con estética cartoon y ambientación de piratas contra vaqueros.
Categoría: Videojuego de estrategia competitivo, móvil, web.
Licencia: (se puede omitir): Apache 2.
Tecnología: JavaScript, Phaser, Gimp, tableta gráfica, Ubuntu, MySQL.
Público: Jugador casual.

HISTORIAL DE VERSIONES:

VISION GENERAL DEL JUEGO:

Es un videojuego competitivo, de partidas rápidas, que te permita jugar a él como pasatiempo en cuando lo necesites, sin necesidad de altos requisitos tecnológicos. Compite contra tus amigos (y no tan amigos) en cualquier momento o lugar, solo necesitas tu teléfono móvil. Siempre es buen momento para enviar un cañonazo a tu archienemigo.

MECÁNICA DEL JUEGO:

Cámara: de perfil, 2D plataformas. Teclado y ratón para pc y controles táctiles para móviles. 
Controles: Tanto para la fase de construcción como de combate, se utilizará el ratón para colocar los materiales y para controlar la fuerza y dirección del disparo. El juego usará botones de selección, para la fase de la construcción, para elegir la forma y el material y se pulsará en la zona que se prefiera colocar la pieza, y botones para elegir el armamento.

Durante la batalla se tendrán botones en la pantalla para elegir el tipo de bala a disparar y el disparo se regulará mediante pulsaciones y arrastre mediante ratón o pantalla táctil.

Si la batalla resulta en empate al acabar el tiempo, se elegirá aleatoriamente al ganador y se informará a los jugadores mediante un mensaje en la pantalla.

En el primer inicio del juego por un jugador nuevo, se le otorgará x monedas, que tiene para emplearlos en las partidas rápidas, que cuestan xx monedas, y los materiales y armamento dentro de las partidas. Se recompensará al jugador con una lista de diferentes botines de monedas por cada día logeado. 

****Viento que perjudique el tiro. Soldados que se muevan, 


Puntuación: Se guardará una puntuación global de todos los puntos conseguidos por cada jugador.
Guardar/Cargar: Se guardará la cuenta del usuario para poder mantener su puntuación.

ESTADOS DEL JUEGO

Pantalla de carga.
Menú de inicio.
Ajustes.
Tutorial.
Pantalla de combate.
Pantalla de marcador de puntuación. 

INTERFACES:

El estilo grafico del juego es cartoon con temática de piratas contra vaqueros. Los colores serán cálidos. Los fondos estarán difuminados para centrar la acción en el primer plano.

Nombre de la pantalla: Pantalla de carga.
Descripción de la pantalla: Pantalla en la que se detalla el tiempo que queda para que cargue la partida y los logos del juego y empresa.
Estados del juego: Invocado por: Pantalla de carga. Invoca a: Menú de inicio.

Nombre de la pantalla: Menú de inicio.
Descripción de la pantalla: pantalla con las diferentes opciones del juego, donde se encuentran los botones de acceso a otros estados.
Estados del juego: Invocado por: Pantalla de carga.  Invoca a: ajustes, Tutorial, Pantalla de marcador de puntuación, batalla offline y batalla online.

Nombre de la pantalla: Ajustes.
Descripción de la pantalla: Estado del juego que permite al jugador establecer las diferentes configuraciones del juego como volumen de la música, efectos de sonido o idioma.
Estados del juego: Invocado por: Menú de inicio. Invoca a: Ajustes.

Nombre de la pantalla: Tutorial.
Descripción de la pantalla: Se muestra al jugador un video explicando las mecánicas del videojuego.
Estados del juego: Invocado por: Menú de inicio. Invoca a: Tutorial.

Nombre de la pantalla: Pantalla de combate online.
Descripción de la pantalla: Pantalla en el que transcurre el gameplay del videojuego PvP online.
Estados del juego: Invocado por: Pantalla de combate.  Invoca a: Pantalla de marcador de puntuación. 

Nombre de la pantalla: Pantalla de combate offline.
Descripción de la pantalla: Pantalla en el que transcurre el gameplay del videojuego PvP por turnos.
Estados del juego: Invocado por: Pantalla de combate.  Invoca a: Pantalla de marcador de puntuación. 

Nombre de la pantalla: Pantalla de marcador de puntuación. 
Descripción de la pantalla: Estado en el que se muestra la puntuación global con los puntos de cada jugador registrado.
Estados del juego: Invocado por: Pantalla de combate. Invoca a: Menú de inicio.





NIVELES:

El juego consta de un único nivel en el que se compite contra otro jugador. Este nivel podrá tener obstáculos en medio del escenario de forma aleatoria, que compliquen los disparos.

Título del Nivel: War Field.
Encuentro: Es el único nivel del juego, en él se sitúa el campo de batalla, con las zonas de cada equipo.
Objetivos: Derrotar al equipo contrario.
Enemigos: El jugador contrario.
Ítems: Materiales, balas y monedas de oro.
Personajes: Vaqueros y piratas.
Música y Efectos de Sonido: sonido de disparo, sonido de golpe, música de fondo de construcción, música de fondo de batalla, música de ganar partida, música de perder partida, sonido de matar un soldado enemigo, sonido de muerte de un soldado propio.
Referencias de BGM y SFX: 

PROGESO DEL JUEGO: 

El jugador competirá en combates, compuestos de dos fases, contra su oponente.

En la primera fase, el jugador se preparará para la batalla. Para ello dispondrá de una cantidad de oro que podrá gastarse en distintos elementos, tanto de defensa, deberá construir la base que protegerá a sus soldados, como de ataque, eligiendo diferentes tipos de balas para lanzar con el cañón a su contrincante. Los jugadores tienen 1 minuto, señalado en el reloj del marcador, para esta fase. 

En la segunda fase se realiza el combate, cada jugador deberá derribar a los soldados enemigos, calculando la fuerza y la dirección del arma y utilizando los diferentes tipos de balas adquiridos para destruir las defensas del enemigo. Tiroteo de fuego a discreción, sin pausas hasta que uno de los dos jugadores consiga la victoria.

El primer contrincante que acabe con todos los soldados enemigos será el ganador del combate. La vida de cada jugador estará señalada en el marcador, en la parte superior de la pantalla, mediante una barra que se reducirá según vaya reduciéndose el número de soldados.

Cada partida consta de 3 combates, en los que se dispondrá de una cantidad de oro inicial que el jugador gestionará para invertir en las defensas y ataque de los 3 combates. Ganará el jugador que consiga más victorias en estos 3 combates. 

PERSONAJES: 

Nombre del Personaje: Bando de los vaqueros.
Descripción: Este bando tiene a vaqueros como soldados.
Concepto: son personajes sin ningún tipo de dialogo o comportamiento, actúan como la vida del equipo.
Encuentro: se encuentran en uno de los extremos del campo de batalla, en la zona del Viejo Oeste.
Armas: Revolver gigante que actúa de cañón.
Personaje No-Jugable: Los soldados. 

Nombre del Personaje: Bando de los piratas.
Descripción: Este bando tiene a piratas como soldados.
Concepto: son personajes sin ningún tipo de dialogo o comportamiento, actúan como la vida del equipo.
Encuentro: se encuentran en uno de los extremos del campo de batalla, en la zona del mar. 
Armas: Un cañón de barco pirata.
Personaje No-Jugable: Los soldados.


ENEMIGOS:

El bando de personajes que le haya tocado al jugador contrario.

HABILIDADES: 
Construcción defensiva

Para la construcción de las defensas el jugador podrá disponer de diferentes materiales y formas, una pieza defensiva será una forma de un material. 

Los materiales tienen una serie de atributos, cuyo valor varía en función del material:

-	Madera:
-	Peso: 10kg.
-	Vida: 20 puntos.
-	Coste: 10 monedas de oro.

-	Piedra:
-	Peso: 20kg.
-	Vida: 40 puntos.
-	Coste: 20 monedas de oro.

-	Hierro: 
-	Peso: 45kg.
-	Vida: 65 puntos.
-	Coste: 35 monedas de oro.

Las formas no modifican ni tienen ningún valor diferente, su cometido único es adecuarse a las necesidades de la construcción defensiva el jugador:

-	Barra
-	Cuadrado
-	Triangulo


ARMAS:
Balas

El jugador tiene la posibilidad de adquirir diferentes tipos de balas, durante la primera fase de preparación del combate. Estas balas disponen de unas habilidades especiales y podrán ser utilizadas en cualquier momento del combate.

-	Bala común: No tiene precio ni habilidad, el jugador posee infinitas.
-	Daño: 20 puntos.
-	Bala de ácido:
-	Precio: 30 monedas de oro.
-	Habilidad: Degrada los materiales con los que choca, facilitando su destrucción.
-	Daño: 10 puntos cada segundo durante 5 segundos.
-	Bala de humo:
-	Precio: 15 monedas de oro.
-	Habilidad Nubla la visión del enemigo, el disparo del enemigo se vuelve menos preciso durante 4 disparos.

ITEMS:

Monedas de oro: sirven para adquirir los elementos de defensa y de ataque en la batalla. Se consiguen ganando batallas y con conexiones diarias al propio videojuego.



GUION:

Los piratas y los vaqueros batallan para conseguir el dinero.

LOGROS:

-Aprendiz de saqueador: El jugador ha conseguido su primera victoria en combate.
-¿Qué ha pachado? : El jugador ha ganado las tres rondas de una batalla.
-El más rápido del oeste: El jugador ha ganado la partida en menos de 30 segundos.
-Pólvora mojada: El jugador ha ganado la partida de forma aleatoria tras un empate.

CODIGOS SECRETOS: no

MUSICA Y SONIDOS:

IMÁGENES DE CONCEPTO:

MIEMBROS DEL EQUIPO:

Miguel Ángel Arcones Ríos
Manuel Aguado Salguero 
Daniel Muñoz Serrano
https://app.asana.com/0/465225037996628/board

DETALLES DE PRODUCCION:

Fecha de inicio: 24 de septiembre de 2018
Fecha de Terminación: 
Presupuesto: 20 maravedíes.
