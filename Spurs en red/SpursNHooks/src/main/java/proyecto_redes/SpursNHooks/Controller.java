package proyecto_redes.SpursNHooks;

import org.springframework.web.bind.annotation.GetMapping;
//import static com.example.bombermanserver.BomberserverApplication.numSesiones;
//import com.google.gson.Gson;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	ListaJugadores Jugadores_online=new ListaJugadores();
	
	@GetMapping("/nuevo_jugador")
	public int nuevo_jugador() {
		return Jugadores_online.anadir();		
	}
}