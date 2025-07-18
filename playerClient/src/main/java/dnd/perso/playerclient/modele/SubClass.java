package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import jakarta.persistence.*;
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

    @OneToMany(cascade = CascadeType.ALL)
    private List<DependantFeature> foundationIndependentFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<DependantFeature> specializationIndependentFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<DependantFeature> masteryIndependentFeatures;
}
