package proyecto_redes.SpursNHooks;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import static com.example.bombermanserver.BomberserverApplication.numSesiones;
//import com.google.gson.Gson;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Controller {
	ListaJugadores Jugadores_espera = new ListaJugadores();
	ListaJugadores jugadores_conectados = new ListaJugadores();
	ListaBatallas partidas = new ListaBatallas();
	DatosBatalla InfoBatalla = new DatosBatalla();

	
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
		System.out.println("1->"+ objeto.getDuenio());
		System.out.println("2->"+ jugadores_conectados.PosicionJugadorID(objeto.getDuenio()));
		jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(objeto.getDuenio())).addListaConstruccion(objeto);
	}
	
	/*@GetMapping("/cargar_objeto/{id}")
	public List<construcciones> cargar_objetos(@PathVariable int id){
		System.out.println("Hola"+ id);
		return jugadores_conectados.get().get(id).getLista_Construc();
	}*/
	
	@GetMapping("/cargar_objeto/{id}")
	public List<construcciones> cargar_objetos(@PathVariable int id){
		System.out.println("Hola"+ id);
		return jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(id)).getLista_Construc();
	}
	
}