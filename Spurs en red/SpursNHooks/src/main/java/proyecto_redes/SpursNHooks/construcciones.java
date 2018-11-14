package proyecto_redes.SpursNHooks;

public class construcciones {
	private String tipo_material;
	private String forma;
	private int posx;
	private int posy;
	
	public construcciones() {
		this.tipo_material=null;
		this.forma=null;
		this.posx=0;
		this.posy=0;
	}
	public void set_tip_mater(String _tipo_material) {
		this.tipo_material=_tipo_material;
	}
	public void set_forma(String _forma) {
		this.forma=_forma;
	}
	public void set_posx(int _posx) {
		this.posx=_posx;
	}
	public void set_posy(int _posy) {
		this.posy=_posy;
	}
}


