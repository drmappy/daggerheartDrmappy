package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    @OneToMany
    private List<Feature> foundationFeatures;
    @OneToMany
    private List<Feature> specializationFeatures;
    @OneToMany
    private List<Feature> masteryFeatures;
}
