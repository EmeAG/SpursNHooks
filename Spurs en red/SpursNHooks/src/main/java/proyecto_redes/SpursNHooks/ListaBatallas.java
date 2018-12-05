package proyecto_redes.SpursNHooks;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import proyecto_redes.SpursNHooks.Batalla;

public class ListaBatallas {
	
	private List<Batalla> Lista_Partidas;
	
	public ListaBatallas() {
		this.Lista_Partidas = new ArrayList<Batalla>();
	}
	
	public void add_partida(Batalla partida){
		this.Lista_Partidas.add(partida);
	}
	
	public int id_ultimaPartida() {
		int ultimo_Jugador=0;
		if (this.Lista_Partidas.size()!=0) {
			ultimo_Jugador=this.Lista_Partidas.get(this.Lista_Partidas.size() - 1).getId_batalla();
		}
		return ultimo_Jugador;
	}
	
	public int pos_partida_sinEmpezar() {
		int devolver=-1;
		for (int i=this.Lista_Partidas.size()-1; i>=0; i--) {
			System.out.println(i);
			if(this.Lista_Partidas.get(i).getJugadoresConectados()<2) {	
				devolver=i;
				//i=this.Lista_Partidas.size();
			}
		}
		return devolver;
	}

	public List<Batalla> getLista_Partidas() {
		return Lista_Partidas;
	}
}
