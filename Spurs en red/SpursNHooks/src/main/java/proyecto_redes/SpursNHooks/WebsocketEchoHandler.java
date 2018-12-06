package proyecto_redes.SpursNHooks;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketEchoHandler extends TextWebSocketHandler{
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	
	ListaJugadores Jugadores_espera = new ListaJugadores();
	ListaJugadores jugadores_conectados = new ListaJugadores();
	ListaBatallas partidas = new ListaBatallas();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		Jugador nuevo_jugador= new Jugador();
		nuevo_jugador.setId(session.getId());
		jugadores_conectados.anadir_lista_espera(nuevo_jugador);
		sessions.put(session.getId(), session);
		
		ObjectNode json = mapper.createObjectNode();
		json.put("id", session.getId());
		json.put("type", "ConexionCreada");
		session.sendMessage(new TextMessage(json.toString()));
		
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode json = mapper.createObjectNode();

			switch (node.get("type").asText()) {
				case "Anadir_espera":
					Jugadores_espera.anadir_lista_espera(jugadores_conectados.get().get(jugadores_conectados.PosicionJugadorID(node.get("id").asText())));
				break;
				case "EsperarJugador":
					if(Jugadores_espera.tamano_lista()>=2) {
						//ObjectNode jsonBatalla = mapper.createObjectNode();
						if(partidas.pos_partida_sinEmpezar()<0) {
							System.out.println("Crea partida");
							Jugadores_espera.Jugadores_asignarLados();
							Batalla nueva_batalla= new Batalla();
							nueva_batalla.setId_batalla(partidas.id_ultimaPartida()+1);
							nueva_batalla.setJugador1(Jugadores_espera.get().get(0));
							nueva_batalla.setJugador2(Jugadores_espera.get().get(1));
							partidas.add_partida(nueva_batalla);
						}
						json.put("type", "Batalla");
						json.putPOJO("Batalla", partidas.getLista_Partidas().get(partidas.pos_partida_sinEmpezar()));
						session.sendMessage(new TextMessage(json.toString()));
					}			
				break;
				case "Datos_jugadores":
					partidas.borrar_jugadoresEspera(node.get("id_batalla").asInt(), Jugadores_espera);
					json.put("type", "Datos_jugadores");
					json.putPOJO("Batalla", partidas.getLista_Partidas().get(partidas.pos_partidaID(node.get("id_batalla").asInt())));
					session.sendMessage(new TextMessage(json.toString()));
				break;
			}
		}
	}
}