package proyecto_redes.SpursNHooks;

public class construcciones {
	private String tipo_material;
	private String forma;
	private float posx;
	private float posy;
	private String duenio;
	
	public construcciones() {
		this.tipo_material=null;
		this.forma=null;
		this.posx=0;
		this.posy=0;
		this.duenio="0";
	}

	public String getTipo_material() {
		return tipo_material;
	}

	public void setTipo_material(String tipo_material) {
		this.tipo_material = tipo_material;
	}

	public String getForma() {
		return forma;
	}

	public void setForma(String forma) {
		this.forma = forma;
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
		return "{\"tipo_material\":\"" + tipo_material + "\",\"forma\":\""+ forma + "\",\"posx\":" + posx + ",\"posy\":" + posy + ",\"duenio\":\""+ duenio + "\"}";
	}
}


