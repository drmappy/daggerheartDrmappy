package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.SubClass;
import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SubClassDTO {
    private String name;
    private String description;
    private CharacterSpellTrait spellCastingTrait;
    private List<FeatureDTO> foundationFeatures;
    private List<FeatureDTO> specializationFeatures;
    private List<FeatureDTO> masteryFeatures;

    public SubClass toModele() {
        return new SubClass(
                name,
                description,
                spellCastingTrait,
                foundationFeatures.stream().map(FeatureDTO::toModele).toList(),
                specializationFeatures.stream().map(FeatureDTO::toModele).toList(),
                masteryFeatures.stream().map(FeatureDTO::toModele).toList()
        );
    }
    public SubClassDTO(SubClass subClass) {
        this.name = subClass.getName();
        this.description = subClass.getDescription();
        this.spellCastingTrait = subClass.getSpellcastingTrait();
        this.foundationFeatures = subClass.getFoundationIndependentFeatures().stream().map(FeatureDTO::new).toList();
        this.specializationFeatures = subClass.getSpecializationIndependentFeatures().stream().map(FeatureDTO::new).toList();
        this.masteryFeatures = subClass.getMasteryIndependentFeatures().stream().map(FeatureDTO::new).toList();
    }
}
