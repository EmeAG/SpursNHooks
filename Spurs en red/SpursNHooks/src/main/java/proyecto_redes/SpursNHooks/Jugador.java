package proyecto_redes.SpursNHooks;

import java.util.ArrayList;
import java.util.List;

public class Jugador {

	private String id="0";
	private String lado="Sin asignar";
	private List<construcciones> Lista_Construc;
	private List<Personajes> Lista_Personajes;
	private String balaT="comun";
	private float anguloCanon=0;
	private float BalaVelX=0;
	private float BalaVelY=0;
	private int numeroDisparos=0;
	
	public Jugador() {
		this.id="0";
		this.lado="Sin asignar";
		this.Lista_Construc=new ArrayList<construcciones>();
		this.Lista_Personajes=new ArrayList<Personajes>();
		this.balaT="comun";
		this.anguloCanon=0;
		this.BalaVelX=0;
		this.BalaVelY=0;
		this.numeroDisparos=0;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLado() {
		return lado;
	}

	public void setLado(String lado) {
		this.lado = lado;
	}

	public List<construcciones> getLista_Construc() {
		return Lista_Construc;
	}

	public void setLista_Construc(List<construcciones> lista_Construc) {
		Lista_Construc = lista_Construc;
	}

	public String getBalaT() {
		return balaT;
	}

	public void setBalaT(String balaT) {
		this.balaT = balaT;
	}

	public float getAnguloCanon() {
		return anguloCanon;
	}

	public void setAnguloCanon(float anguloCanon) {
		this.anguloCanon = anguloCanon;
	}
	public void addListaConstruccion(construcciones nueva_contr) {
		Lista_Construc.add(nueva_contr);
	}
	
	public List<Personajes> getLista_Personajes() {
		return Lista_Personajes;
	}

	public void setLista_Personajes(List<Personajes> lista_Personajes) {
		Lista_Personajes = lista_Personajes;
	}
	
	public void addListaPersonajes(Personajes nueva_pers) {
		Lista_Personajes.add(nueva_pers);
	}

	public float getBalaVelX() {
		return BalaVelX;
	}

	public void setBalaVelX(float balaVelX) {
		BalaVelX = balaVelX;
	}

	public float getBalaVelY() {
		return BalaVelY;
	}

	public void setBalaVelY(float balaVelY) {
		BalaVelY = balaVelY;
	}

	public int getNumeroDisparos() {
		return numeroDisparos;
	}

	public void setNumeroDisparos(int numeroDisparos) {
		this.numeroDisparos = numeroDisparos;
	}
	
	public String toString() {
		String Construc="\"Construc\":[";
		for(int i=0;i<Lista_Construc.size();i++) {
			if(i!=0) {
				Construc=Construc + ",";
			}
			Construc=Construc + Lista_Construc.get(i).toString();
		}
		Construc=Construc+ "]";
		System.out.println("Constr :" + Construc);
		
		return "{\"id\":\"" + id + "\","+ Construc + ",\"lado\":\""+ lado + "\",\"balaT\":\"" + balaT + "\",\"anguloCanon\":" + anguloCanon + ",\"BalaVelX\":" + BalaVelX + ",\"BalaVelY\":" + BalaVelY + ",\"numeroDisparos\":" + numeroDisparos + "}";
	}
}