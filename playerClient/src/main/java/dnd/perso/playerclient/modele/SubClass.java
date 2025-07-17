package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import jakarta.persistence.CascadeType;
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

    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> foundationFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> specializationFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> masteryFeatures;
}
