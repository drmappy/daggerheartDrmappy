package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SubClass {
    @Id
    private String name;
    private String description;
    private CharacterSpellTrait spellcastingTrait;

    private List<Feature> foundationFeatures;
    private List<Feature> specializationFeatures;
    private List<Feature> masteryFeatures;
}
