package dnd.perso.playerclient.modele;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Player extends Account{
    @OneToMany(cascade = CascadeType.ALL)
    private List<DaggerheartCharacter> characters;
    public Player(Long id, String username, String password, List<DaggerheartCharacter> characters) {
        super(id, username, password);
        this.characters = characters;
    }
}
