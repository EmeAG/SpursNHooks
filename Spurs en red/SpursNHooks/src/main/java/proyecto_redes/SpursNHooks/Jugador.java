package proyecto_redes.SpursNHooks;

/*public class Jugador {
	
	
	private int identificador;
	
	public Jugador() {
		identificador=JugadoresConectados.get();
	}

	public int getIDjugador() {
		return identificador;
	}
	
}*/
public class Jugador {

	private int identificador;
	
	public Jugador(int a) {
		setIdentificador(a);
	}

	public int getIdentificador() {
		return identificador;
	}

	public void setIdentificador(int identificador) {
		this.identificador = identificador;
	}
}