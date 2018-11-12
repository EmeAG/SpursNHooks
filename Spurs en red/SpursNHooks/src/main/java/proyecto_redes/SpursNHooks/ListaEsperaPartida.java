package proyecto_redes.SpursNHooks;

import java.util.ArrayList;
import java.util.List;

public class ListaEsperaPartida {
	
	private List<Jugador> Lista_Espera;
	
	public ListaEsperaPartida() {
		this.Lista_Espera = new ArrayList<Jugador>();
	}

	public void anadir_lista_espera(int identificador, ListaJugadores Jugadores_online) {
		this.Lista_Espera.add(Jugadores_online.Devuelve_jugador(identificador));
	}
}
