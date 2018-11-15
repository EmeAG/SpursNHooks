package proyecto_redes.SpursNHooks;

import java.util.ArrayList;
import java.util.List;

public class ListaEsperaPartida {
	
	private List<Jugador> Lista_Espera;
	
	public ListaEsperaPartida() {
		this.Lista_Espera = new ArrayList<Jugador>();
	}

	public int ultimo_Jugador() {
		int ultimo_Jugador=0;
		if (this.Lista_Espera.size()!=0) {
			ultimo_Jugador=this.Lista_Espera.get(this.Lista_Espera.size() - 1).getId();
		}
		return ultimo_Jugador;
	}
	
	public void anadir_lista_espera(Jugador nuevo_jugador) {
		this.Lista_Espera.add(nuevo_jugador);
	}
	
	public int posicion_lista(Jugador _jugador) {
		return this.Lista_Espera.indexOf(_jugador);
	}
	
	public int tamano_lista() {
		return this.Lista_Espera.size();
	}
	
	public String Jugadores_nueva_partida() {
		String jugadores=null;
		for (int i = 0; i < 2; i++) {
			/*jugadores= "|" + String.valueOf(this.Lista_Espera.remove(0).getId());*/
			if(i==0){
				jugadores= String.valueOf(this.Lista_Espera.get(i).getId());
			}else {
				jugadores= jugadores + "|" + String.valueOf(this.Lista_Espera.get(i).getId());
			}
		}
		return jugadores;
	}
}
