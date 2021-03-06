package proyecto_redes.SpursNHooks;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import static com.example.bombermanserver.BomberserverApplication.numSesiones;
//import com.google.gson.Gson;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@SpringBootApplication
@EnableWebSocket
public class Controller{
	ListaJugadores Jugadores_espera = new ListaJugadores();
	ListaJugadores jugadores_conectados = new ListaJugadores();
	ListaBatallas partidas = new ListaBatallas();

	/*
	@GetMapping("/nuevo_jugador")
	public int nuevo_jugador() {
		Jugador nuevo_jugador= new Jugador();
		nuevo_jugador.setId(jugadores_conectados.id_ultimoJugador()+1);
		jugadores_conectados.anadir_lista_espera(nuevo_jugador);
		Jugadores_espera.anadir_lista_espera(nuevo_jugador);
		return nuevo_jugador.getId();
	}

	@GetMapping("/comprobar_lista")
	public DatosBatalla nuevo_jugador_espera(Jugador jugador) {
		if(Jugadores_espera.tamano_lista()>=2) {
			Jugadores_espera.Jugadores_asignarLados();
			Batalla nueva_batalla= new Batalla();
			nueva_batalla.setId_batalla(partidas.id_ultimaPartida()+1);
			nueva_batalla.setJugador1(Jugadores_espera.get().get(0));
			nueva_batalla.setJugador2(Jugadores_espera.get().get(1));
			InfoBatalla.setId_J1(nueva_batalla.getJugador1().getId());
			InfoBatalla.setId_J2(nueva_batalla.getJugador2().getId());
			InfoBatalla.setId_batalla(nueva_batalla.getId_batalla());
		}
		return InfoBatalla;

	}
	
	@GetMapping("/datos_jugadores")
	public List<Jugador> lado_jugador() {
		return jugadores_conectados.get();
	}

	@PostMapping("/objeto_creado")
	@ResponseStatus(HttpStatus.CREATED)
	public void nuevoObjeto(@RequestBody construcciones objeto) {
		//System.out.println("Objeto 1->"+ objeto.getDuenio());
		//System.out.println("Objeto 2->"+ jugadores_conectados.PosicionJugadorID(objeto.getDuenio()));
		jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(objeto.getDuenio())).addListaConstruccion(objeto);
	}
	
	@GetMapping("/cargar_objeto/{id}")
	public List<construcciones> cargar_objetos(@PathVariable int id){
		return jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(id)).getLista_Construc();
	}

	@PostMapping("/personaje_creado")
	@ResponseStatus(HttpStatus.CREATED)
	public void nuevoPersonaje(@RequestBody Personajes personaje) {
		//System.out.println("Personaje 1->"+ personaje.getDuenio());
		//System.out.println("Personaje 2->"+ jugadores_conectados.PosicionJugadorID(personaje.getDuenio()));
		jugadores_conectados.get().get(jugadoresc_onectados.PosicionJugadorID(personaje.getDuenio())).addListaPersonajes(personaje);
	}
	
	@GetMapping("/cargar_personaje/{id}")
	public List<Personajes> cargar_personaje(@PathVariable int id){
		return jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(id)).getLista_Personajes();
	}
	
	@PutMapping("/pasar_angulo_canon")
	@ResponseStatus(HttpStatus.CREATED)
	public void PasarAnguloCanon(@RequestBody Jugador jugador) {
		jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(jugador.getId())).setAnguloCanon(jugador.getAnguloCanon());
		jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(jugador.getId())).setBalaT(jugador.getBalaT());
	}
	
	@GetMapping("/cargar_angulo_canon/{id}")
	public float cargar_angulo_canon(@PathVariable int id){
		return jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(id)).getAnguloCanon();
	}
	
	@PutMapping("/pasar_bala")
	@ResponseStatus(HttpStatus.CREATED)
	public void PasarBalaVel(@RequestBody Jugador jugador) {
		jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(jugador.getId())).setBalaVelX(jugador.getBalaVelX());
		jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(jugador.getId())).setBalaVelY(jugador.getBalaVelY());
		jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(jugador.getId())).setNumeroDisparos(jugador.getNumeroDisparos());
		jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(jugador.getId())).setBalaT(jugador.getBalaT());
		System.out.println("numDis: "+ jugador.getNumeroDisparos());
		System.out.println("Angulo: "+ jugador.getAnguloCanon());
		System.out.println("ID: "+ jugador.getId());
	}
	
	@GetMapping("/cargar_numDisparos/num_dis{id}")
	public Jugador cargar_numDisparos(@PathVariable int id){
		System.out.println(jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(id)).getNumeroDisparos());
		return jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(id));
	}
	
	@DeleteMapping("/borrar_espera/borrar_espera_{id}")
	public ResponseEntity<Jugador> borraItem(@PathVariable int id) {
		Jugador borrar_jugador = Jugadores_espera.get().get(Jugadores_espera.PosicionJugadorID(id));

		if (borrar_jugador != null) {
			Jugadores_espera.get().remove(borrar_jugador);
			return new ResponseEntity<>(borrar_jugador, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	*/
}