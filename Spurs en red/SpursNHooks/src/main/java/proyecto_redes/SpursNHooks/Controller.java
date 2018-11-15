package proyecto_redes.SpursNHooks;


import org.springframework.web.bind.annotation.GetMapping;
//import static com.example.bombermanserver.BomberserverApplication.numSesiones;
//import com.google.gson.Gson;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Controller {
	ListaEsperaPartida Jugadores_espera = new ListaEsperaPartida();

	@GetMapping("/nuevo_jugador")
	public int nuevo_jugador() {
		Jugador nuevo_jugador= new Jugador();
		nuevo_jugador.setId(Jugadores_espera.ultimo_Jugador()+1);
		Jugadores_espera.anadir_lista_espera(nuevo_jugador);
		//return Jugadores_espera.posicion_lista(nuevo_jugador);
		return nuevo_jugador.getId();
	}

	@GetMapping("/comprobar_lista")
	public String nuevo_jugador_espera(Jugador jugador) {
		String jugadores_nueva_partida=null;
		if(Jugadores_espera.tamano_lista()>=2) {
			jugadores_nueva_partida=Jugadores_espera.Jugadores_nueva_partida();
		}
		return jugadores_nueva_partida;
	}
}