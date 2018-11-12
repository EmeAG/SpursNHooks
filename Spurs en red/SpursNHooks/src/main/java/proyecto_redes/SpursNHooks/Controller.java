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
	ListaJugadores Jugadores_online=new ListaJugadores();
	ListaEsperaPartida Jugadores_espera = new ListaEsperaPartida();

	@GetMapping("/nuevo_jugador")
	public int nuevo_jugador() {
		return Jugadores_online.anadir();
	}

	@PostMapping("/jugador_lista_espera")
	@ResponseStatus(HttpStatus.CREATED)
	public void nuevo_jugador_espera(int identificador) {
		Jugadores_espera.anadir_lista_espera(identificador, Jugadores_online);
	}
}