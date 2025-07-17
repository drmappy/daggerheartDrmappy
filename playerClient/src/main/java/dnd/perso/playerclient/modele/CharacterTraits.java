package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CharacterTraits {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int agility;
    private int strength;
    private int finesse;
    private int instinct;
    private int presence;
    private int knowledge;
    public CharacterTraits(int agility, int strength, int finesse, int instinct, int presence, int knowledge) {
        this.agility = agility;
        this.strength = strength;
        this.finesse = finesse;
        this.instinct = instinct;
        this.presence = presence;
        this.knowledge = knowledge;
    }
}
