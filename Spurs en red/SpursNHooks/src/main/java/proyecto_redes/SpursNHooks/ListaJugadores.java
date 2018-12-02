package proyecto_redes.SpursNHooks;

import java.util.ArrayList;
import java.util.List;

public class ListaJugadores {
	
	private List<Jugador> Lista_Jugador;
	
	public ListaJugadores() {
		this.Lista_Jugador = new ArrayList<Jugador>();
	}

	public String id_ultimoJugador() {
		String ultimo_Jugador="0";
		if (this.Lista_Jugador.size()!=0) {
			ultimo_Jugador=this.Lista_Jugador.get(this.Lista_Jugador.size() - 1).getId();
		}
		return ultimo_Jugador;
	}
	
	public void anadir_lista_espera(Jugador nuevo_jugador) {
		this.Lista_Jugador.add(nuevo_jugador);
	}
	
	public int posicion_lista(Jugador _jugador) {
		return this.Lista_Jugador.indexOf(_jugador);
	}
	
	public int tamano_lista() {
		return this.Lista_Jugador.size();
	}
	
	public void Jugadores_asignarLados() {
		this.Lista_Jugador.get(0).setLado("J1");
		this.Lista_Jugador.get(1).setLado("J2");
	}
	
	public int PosicionJugadorID(String id) {
		int posicion=0;
		//System.out.println("Tamano Lista->"+ this.Lista_Jugador.size() + ";  Id: " + id);
		for (int i=0; i<this.Lista_Jugador.size(); i++) {
			if (this.Lista_Jugador.get(i).getId()==id) {
				posicion=i;
				i=this.Lista_Jugador.size();
			}
		}
		return posicion;
	}
	
	public List<Jugador> get() {
		return this.Lista_Jugador;
	}
	
}