package proyecto_redes.SpursNHooks;

import java.util.ArrayList;
import java.util.List;

public class Jugador {

	private int id=0;
	private int lado=0;
	private List<construcciones> Lista_Construc;
	private int balaT=0;
	private float anguloCanon=0;
	
	public Jugador() {
		this.id=0;
		this.lado=0;
		this.Lista_Construc=new ArrayList<construcciones>();
		this.balaT=0;
		this.anguloCanon=0;
	}

	public int getId() {
		return this.id;
	}

	public void setId(int _id) {
		this.id = _id;
	}
}