package proyecto_redes.SpursNHooks;

import java.util.ArrayList;
import java.util.List;

public class ListaJugadores {
	
	private List<Jugador> Lista_Jugadores;
	
	public ListaJugadores() {
		this.Lista_Jugadores = new ArrayList<Jugador>();
	}

	public int anadir() {
		int valor;
		if(this.Lista_Jugadores.size()==0) {
			this.Lista_Jugadores.add(new Jugador(1));
			valor=1;
		}else {
			valor=this.Lista_Jugadores.get(this.Lista_Jugadores.size() - 1).getIdentificador();
			valor++;
			this.Lista_Jugadores.add(new Jugador(valor));
		}
		return valor;
	}

	public List<Jugador> get() {
		return this.Lista_Jugadores;
	}

}
