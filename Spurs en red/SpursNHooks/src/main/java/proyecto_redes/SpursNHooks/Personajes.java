package proyecto_redes.SpursNHooks;

public class Personajes {

	private float posx;
	private float posy;
	private String duenio;
	
	public Personajes() {
		this.posx=0;
		this.posy=0;
		this.duenio="0";
	}

	public float getPosx() {
		return posx;
	}

	public void setPosx(float posx) {
		this.posx = posx;
	}

	public float getPosy() {
		return posy;
	}

	public void setPosy(float posy) {
		this.posy = posy;
	}

	public String getDuenio() {
		return duenio;
	}

	public void setDuenio(String duenio) {
		this.duenio = duenio;
	}
	
	public String toString() {
		return "{\"posx\":" + posx + ",\"posy\":" + posy + ",\"duenio\":\""+ duenio + "\"}";
	}
}

