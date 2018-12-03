package proyecto_redes.SpursNHooks;

public class DatosBatalla {
	private String id_J1;
	private String id_J2;
	private int id_batalla;
	
	public DatosBatalla() {
		id_J1="";
		id_J2="";
		id_batalla=0;
	}

	public String getId_J1() {
		return id_J1;
	}

	public void setId_J1(String id_J1) {
		this.id_J1 = id_J1;
	}

	public String getId_J2() {
		return id_J2;
	}

	public void setId_J2(String id_J2) {
		this.id_J2 = id_J2;
	}

	public int getId_batalla() {
		return id_batalla;
	}

	public void setId_batalla(int id_batalla) {
		this.id_batalla = id_batalla;
	}
}
