package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.CharacterTraits;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CharacterTraitsDTO {
    private Long id;
    private int agility;
    private int strength;
    private int finesse;
    private int instinct;
    private int presence;
    private int knowledge;
    public CharacterTraits toModele(){
        return new CharacterTraits(
                agility,
                strength,
                finesse,
                instinct,
                presence,
                knowledge
        );
    }
    public CharacterTraitsDTO(CharacterTraits characterTraits) {
        this.id = characterTraits.getId();
        this.agility = characterTraits.getAgility();
        this.strength = characterTraits.getStrength();
        this.finesse = characterTraits.getFinesse();
        this.instinct = characterTraits.getInstinct();
        this.presence = characterTraits.getPresence();
        this.knowledge = characterTraits.getKnowledge();
    }
}
