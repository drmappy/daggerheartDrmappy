package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.DaggerheartCharacter;
import dnd.perso.playerclient.modele.Player;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PlayerDTO extends AccountDTO{
    final String accountType = "player";
    private List<DaggerheartCharacterDTO> characters;
    public PlayerDTO(Long id, String username, String password) {
        super(id, username, password);
    }
    public PlayerDTO(Long id, String username, String password, List<DaggerheartCharacterDTO> characters) {
        super(id, username, password);
        this.characters = characters;
    }
    public PlayerDTO(Player player) {
        super(player.getId(), player.getUsername(), player.getPassword());
        this.characters = new ArrayList<>(
                player.getCharacters().stream()
                        .map(DaggerheartCharacterDTO::new)
                        .toList()
        );
    }
    public Player toModele(){
        return new Player(
                this.getId(),
                this.getUsername(),
                this.getPassword(),
                this.characters != null ?
                        new ArrayList<>(this.characters.stream()
                                .map(character -> character.toModele(character))
                                .toList())
                        : new ArrayList<>()
        );
    }
}
