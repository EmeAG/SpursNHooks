package proyecto_redes.SpursNHooks;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

public class WebsocketEchoHandler extends TextWebSocketHandler{
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	
	ListaJugadores Jugadores_espera = new ListaJugadores();
	ListaJugadores jugadores_conectados = new ListaJugadores();
	ListaBatallas partidas = new ListaBatallas();
	DatosBatalla InfoBatalla = new DatosBatalla();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		Jugador nuevo_jugador= new Jugador();
		nuevo_jugador.setId(session.getId());
		jugadores_conectados.anadir_lista_espera(nuevo_jugador);
		Jugadores_espera.anadir_lista_espera(nuevo_jugador);		
		sessions.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		//Borrar jugadores_conectados
		//Borrar Jugadores_espera
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session,	TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		/*String msg = message.getPayload();
		session.sendMessage(new TextMessage(msg));*/
	}
}