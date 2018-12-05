package proyecto_redes.SpursNHooks;

import java.util.ArrayList;

import proyecto_redes.SpursNHooks.Jugador;

public class Batalla {
	private int id_batalla;
	private Jugador jugador1;
	private Jugador jugador2;
	private int jugadoresConectados;
	
	public Batalla() {
		this.jugador1 = new Jugador();
		this.jugador2 = new Jugador();
		this.id_batalla=0;
		this.jugadoresConectados=0;
	}

	public int getId_batalla() {
		return id_batalla;
	}

	public void setId_batalla(int id_batalla) {
		this.id_batalla = id_batalla;
	}

	public Jugador getJugador1() {
		return jugador1;
	}

	public void setJugador1(Jugador jugador1) {
		this.jugador1 = jugador1;
	}

	public Jugador getJugador2() {
		return jugador2;
	}

	public void setJugador2(Jugador jugador2) {
		this.jugador2 = jugador2;
	}

	public int getJugadoresConectados() {
		return jugadoresConectados;
	}

	public void setJugadoresConectados(int jugadoresConectados) {
		this.jugadoresConectados = jugadoresConectados;
	}
	
	public String toString() {
		return "{\"id_batalla\":" + id_batalla + ",\"jugador1\":"+ jugador1.toString() + ",\"jugador2\":" + jugador2.toString() + ",\"jugadoresConectados\":" + jugadoresConectados +"}";
	}
}
