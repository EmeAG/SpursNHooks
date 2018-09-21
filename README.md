# Spurs'n'Hooks

<h2> <strong>NOMBRES:</strong></h2>
<p>
-Miguel Ángel Arcones Ríos, Email: ma.arcones@alumnos.urjc.es, Github: <b>M-Arcones</b>

-Manuel Aguado Salguero, Email: m.aguado.2016@alumnos.urjc.es , GitHub: <b>EmeAG</b>

-Daniel Muñoz Serrano,
</p>


<h2><strong>CONCEPTO:</strong> </h2>
<p>
 <strong>Nombre del Juego:</strong>  Spurs ‘n’ hooks. 

<strong>Nombre del estudio:</strong> Piña Colada Studios.

<strong>Plataforma:</strong> PC y Móvil.

<strong>Versión:</strong> 1.0

<strong>Sinopsis de jugabilidad y contenido:</strong> Videojuego de estrategia y acción PvP, dividido en dos fases. La primera fase consta de la parte de construcción de las defensas, mientras que la segunda fase es la destrucción y derrota de los soldados enemigos y sus defensas. Con estética cartoon y ambientación de piratas contra vaqueros.

<strong>Categoría:</strong> Videojuego de estrategia competitivo, móvil, web.

<strong>Licencia:</strong> Apache 2.

<strong>Tecnología:</strong> JavaScript, Phaser, Gimp, tableta gráfica, Ubuntu, MySQL.

<strong>Público:</strong> Jugador casual.

</p>


<h2><strong>VISION GENERAL DEL JUEGO:</strong></h2>
<p>
Es un videojuego competitivo, de partidas rápidas, que te permita jugar a él como pasatiempo en cuando lo necesites, sin necesidad de altos requisitos tecnológicos. Compite contra tus amigos (y no tan amigos) en cualquier momento o lugar, solo necesitas tu teléfono móvil. Siempre es buen momento para enviar un cañonazo a tu archienemigo.
</p>


<h2><strong>MECÁNICA DEL JUEGO:</strong></h2>
<p>
<strong>Cámara:</strong> de perfil, 2D plataformas. Teclado y ratón para pc y controles táctiles para móviles. 
  
<strong>Controles:</strong> Tanto para la fase de construcción como de combate, se utilizará el ratón para colocar los materiales y para controlar la fuerza y dirección del disparo. El juego usará botones de selección, para la fase de la construcción, para elegir la forma y el material y se pulsará en la zona que se prefiera colocar la pieza, y botones para elegir el armamento.

Durante la batalla se tendrán botones en la pantalla para elegir el tipo de bala a disparar y el disparo se regulará mediante pulsaciones y arrastre mediante ratón o pantalla táctil.

En el primer inicio del juego por un jugador nuevo, se le otorgará x monedas, que tiene para emplearlos en las partidas rápidas, que cuestan xx monedas, y los materiales y armamento dentro de las partidas. Se recompensará al jugador con una lista de diferentes botines de monedas por cada día logeado. 

Para añadir dificultad a los disparos, se incluirá una mecanica de viento que modificara la trayectoria del proyectil según su velocidad y dirección. A su vez, se añadirán obstáculos, móviles o fijos, entre los dos jugadores para entorpecer los disparos.

<strong>Puntuación:</strong> Se guardará una puntuación global de todos los puntos conseguidos por cada jugador.

<strong>Guardar/Cargar:</strong> Se guardará la cuenta del usuario para poder mantener su puntuación.

</p>


<h2><strong>ESTADOS DEL JUEGO</strong></h2>
<p>
Pantalla de carga.
Menú de inicio.
Ajustes.
Tutorial.
Pantalla de combate.
Pantalla de marcador de puntuación. 
</p>

<h2><strong>INTERFACES:</strong></h2>
<p>
El estilo grafico del juego es cartoon con temática de piratas contra vaqueros. Los colores serán cálidos. Los fondos estarán difuminados para centrar la acción en el primer plano.

<strong>Nombre de la pantalla:</strong> Pantalla de carga.</br>
<strong>Descripción de la pantalla:</strong> Pantalla en la que se detalla el tiempo que queda para que cargue la partida y los logos del juego y empresa.</br>
<strong>Estados del juego:</strong> Invocado por: Pantalla de carga. <strong>Invoca a:</strong>  Menú de inicio.</br>
<strong>Nombre de la pantalla:</strong> Menú de inicio.</br>
<strong>Descripción de la pantalla:</strong> pantalla con las diferentes opciones del juego, donde se encuentran los botones de acceso a otros estados.</br>
<strong>Estados del juego: Invocado por:</strong> Pantalla de carga.  <strong>Invoca a:</strong>  ajustes, Tutorial, Pantalla de marcador de puntuación, batalla offline y batalla online.</br>

<strong>Nombre de la pantalla:</strong> Ajustes.</br>
<strong>Descripción de la pantalla:</strong> Estado del juego que permite al jugador establecer las diferentes configuraciones del juego como volumen de la música, efectos de sonido o idioma.</br>
<strong>Estados del juego:</strong> Invocado por: Menú de inicio.<strong> Invoca a:</strong>  Ajustes.</br>

<strong>Nombre de la pantalla:</strong> Tutorial.</br>
<strong>Descripción de la pantalla:</strong> Se muestra al jugador un video explicando las mecánicas del videojuego.</br>
<strong>Estados del juego:</strong> Invocado por: Menú de inicio. <strong>Invoca a:</strong>  Tutorial.</br>

<strong>Nombre de la pantalla:</strong> Pantalla de combate online.</br>
<strong>Descripción de la pantalla:</strong> Pantalla en el que transcurre el gameplay del videojuego PvP online.</br>
<strong>Estados del juego:</strong> <strong>Invocado por:</strong> Pantalla de combate.  <strong>Invoca a:</strong>  Pantalla de marcador de puntuación. </br>

<strong>Nombre de la pantalla:</strong> Pantalla de combate offline.</br>
<strong>Descripción de la pantalla:</strong> Pantalla en el que transcurre el gameplay del videojuego PvP por turnos.</br>
<strong>Estados del juego: Invocado por:</strong> Pantalla de combate. <strong> Invoca a:</strong>  Pantalla de marcador de puntuación. </br>

<strong>Nombre de la pantalla:</strong> Pantalla de marcador de puntuación. </br>
<strong>Descripción de la pantalla:</strong> Estado en el que se muestra la puntuación global con los puntos de cada jugador registrado.</br>
<strong>Estados del juego: Invocado por:</strong> Pantalla de combate. <strong>Invoca a:</strong>  Menú de inicio.</br>
</p>

<h2><strong>NIVELES:</strong></h2>

El juego consta de un único nivel en el que se compite contra otro jugador. Este nivel podrá tener obstáculos en medio del escenario de forma aleatoria, que compliquen los disparos.

<strong>Título del Nivel:</strong> War Field.</br>
<strong>Encuentro:</strong> Es el único nivel del juego, en él se sitúa el campo de batalla, con las zonas de cada equipo.</br>
<strong>Objetivos:</strong> Derrotar al equipo contrario.</br>
<strong>Enemigos:</strong> El jugador contrario.</br>
<strong>Ítems: </strong>Materiales, balas y monedas de oro.</br>
<strong>Personajes:</strong> Vaqueros y piratas.</br>
<strong>Música y Efectos de Sonido:</strong> sonido de disparo, sonido de golpe, música de fondo de construcción, música de fondo de batalla, música de ganar partida, música de perder partida, sonido de matar un soldado enemigo, sonido de muerte de un soldado propio.</br>
<strong>Referencias de BGM y SFX: </strong></br>

<h2><strong>PROGESO DEL JUEGO: </strong></h2>

El jugador competirá en combates, compuestos de dos fases, contra su oponente.

En la primera fase, el jugador se preparará para la batalla. Para ello dispondrá de una cantidad de oro que podrá gastarse en distintos elementos, tanto de defensa, deberá construir la base que protegerá a sus soldados, como de ataque, eligiendo diferentes tipos de balas para lanzar con el cañón a su contrincante. Los jugadores tienen 1 minuto, señalado en el reloj del marcador, para esta fase. 

En la segunda fase se realiza el combate, cada jugador deberá derribar a los soldados enemigos, calculando la fuerza y la dirección del arma y utilizando los diferentes tipos de balas adquiridos para destruir las defensas del enemigo. Tiroteo de fuego a discreción, sin pausas hasta que uno de los dos jugadores consiga la victoria.

El primer contrincante que acabe con todos los soldados enemigos será el ganador del combate. La vida de cada jugador estará señalada en el marcador, en la parte superior de la pantalla, mediante una barra que se reducirá según vaya reduciéndose el número de soldados.

Cada partida consta de 3 combates, en los que se dispondrá de una cantidad de oro inicial que el jugador gestionará para invertir en las defensas y ataque de los 3 combates. Ganará el jugador que consiga más victorias en estos 3 combates. 

Si la batalla resulta en empate al acabar el tiempo, se elegirá aleatoriamente al ganador y se informará a los jugadores mediante un mensaje en la pantalla.


<h2><b>PERSONAJES:</b></h2>

<b>Nombre del Personaje:</b> Bando de los vaqueros.

<b>Descripción:</b> Este bando tiene a vaqueros como soldados.

<b>Concepto:</b> son personajes sin ningún tipo de dialogo o comportamiento, actúan como la vida del equipo.

<b>Encuentro:</b> se encuentran en uno de los extremos del campo de batalla, en la zona del Viejo Oeste.

<b>Armas:</b> Revolver gigante que actúa de cañón.

<b>Personaje No-Jugable:</b> Los soldados. 

<b>Nombre del Personaje:</b> Bando de los piratas.

<b>Descripción:</b> Este bando tiene a piratas como soldados.

<b>Concepto:</b> son personajes sin ningún tipo de dialogo o comportamiento, actúan como la vida del equipo.

<b>Encuentro:</b> se encuentran en uno de los extremos del campo de batalla, en la zona del mar. 

<b>Armas:</b> Un cañón de barco pirata.

<b>Personaje No-Jugable:</b> Los soldados.


<h2><b>ENEMIGOS:</b></h2>

El bando de personajes que le haya tocado al jugador contrario.

<h2><b>HABILIDADES:</b></h2>
Construcción defensiva

Para la construcción de las defensas el jugador podrá disponer de diferentes materiales y formas, una pieza defensiva será una forma de un material. 

Los materiales tienen una serie de atributos, cuyo valor varía en función del material:

<b>Madera:</b>
-	Peso: 10kg.
-	Vida: 20 puntos.
-	Coste: 10 monedas de oro.

<b>Piedra:</b>
-	Peso: 20kg.
-	Vida: 40 puntos.
-	Coste: 20 monedas de oro.

<b>Hierro:</b>
-	Peso: 45kg.
-	Vida: 65 puntos.
-	Coste: 35 monedas de oro.

Las formas no modifican ni tienen ningún valor diferente, su cometido único es adecuarse a las necesidades de la construcción defensiva el jugador:

-	Barra
-	Cuadrado
-	Triangulo


<h2><b>ARMAS:</b></h2>
Balas

El jugador tiene la posibilidad de adquirir diferentes tipos de balas, durante la primera fase de preparación del combate. Estas balas disponen de unas habilidades especiales y podrán ser utilizadas en cualquier momento del combate.

<b>Bala común:</b> No tiene precio ni habilidad, el jugador posee infinitas.
-	<b>Daño:</b> 20 puntos.
<b>Bala de ácido:</b>
-	<b>Precio:</b> 30 monedas de oro.
-	<b>Habilidad:</b> Degrada los materiales con los que choca, facilitando su destrucción.
-	<b>Daño:</b> 10 puntos cada segundo durante 5 segundos.
<b>Bala de humo:</b>
-	<b>Precio:</b> 15 monedas de oro.
-	<b>Habilidad: </b>Nubla la visión del enemigo, el disparo del enemigo se vuelve menos preciso durante 4 disparos.

<h2><b>ITEMS:</b></h2>

<b>Monedas de oro:</b> sirven para adquirir los elementos de defensa y de ataque en la batalla. Se consiguen ganando batallas y con conexiones diarias al propio videojuego.



<h2><b>GUIÓN:</b></h2>

Los piratas y los vaqueros batallan para conseguir el dinero.

<h2><b>LOGROS:</b></h2>

- <b>Aprendiz de saqueador:</b> El jugador ha conseguido su primera victoria en combate.</br>
- <b>¿Qué ha pachado?:</b> El jugador ha ganado las tres rondas de una batalla.</br>
- <b>El más rápido del oeste:</b> El jugador ha ganado la partida en menos de 30 segundos.</br>
- <b>Pólvora mojada:</b> El jugador ha ganado la partida de forma aleatoria tras un empate.</br>

<h2><b>CODIGOS SECRETOS:</b></h2>  No

<h2><b>MUSICA Y SONIDOS:</b></h2>

<h2><b>IMÁGENES DE CONCEPTO:</b></h2>

 <img src="Bocetoescenario1-5.png" ></img>

<h2><b>MIEMBROS DEL EQUIPO:</b></h2>

Miguel Ángel Arcones Ríos</br>
Manuel Aguado Salguero </br>
Daniel Muñoz Serrano </br>
<b>Link Asana:</b> https://app.asana.com/0/465225037996628/465225037996628

<h2><b>DETALLES DE PRODUCCION:</b></h2>

Fecha de inicio: 24 de septiembre de 2018</br>
Fecha de Terminación: </br>
Presupuesto: 20 maravedíes.</br>
