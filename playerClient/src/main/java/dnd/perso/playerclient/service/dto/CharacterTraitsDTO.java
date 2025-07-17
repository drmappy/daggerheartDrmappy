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

    public CharacterTraitsDTO(int agility, int strength, int finesse, int instinct, int presence, int knowledge) {
        this.agility = agility;
        this.strength = strength;
        this.finesse = finesse;
        this.instinct = instinct;
        this.presence = presence;
        this.knowledge = knowledge;
    }
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
