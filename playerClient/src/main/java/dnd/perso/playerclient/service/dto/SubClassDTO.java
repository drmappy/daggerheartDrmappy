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
    private Long id;
    private String name;
    private String description;
    private DaggerheartClassDTO daggerheartClass;
    private CharacterSpellTrait spellCastingTrait;
    private List<FeatureDTO> foundationFeatures;
    private List<FeatureDTO> specializationFeatures;
    private List<FeatureDTO> masteryFeatures;

    public SubClass toModele() {
        return new SubClass(
                id,
                name,
                description,
                spellCastingTrait,
                daggerheartClass != null ? daggerheartClass.toModele() : null,
                foundationFeatures.stream().map(FeatureDTO::toModele).toList(),
                specializationFeatures.stream().map(FeatureDTO::toModele).toList(),
                masteryFeatures.stream().map(FeatureDTO::toModele).toList()
        );
    }
    public SubClassDTO(SubClass subClass) {
        this.id = subClass.getId();
        this.name = subClass.getName();
        this.description = subClass.getDescription();
        this.spellCastingTrait = subClass.getSpellcastingTrait();
        this.foundationFeatures = subClass.getFoundationFeatures().stream().map(FeatureDTO::new).toList();
        this.specializationFeatures = subClass.getSpecializationFeatures().stream().map(FeatureDTO::new).toList();
        this.masteryFeatures = subClass.getMasteryFeatures().stream().map(FeatureDTO::new).toList();
        if (subClass.getDaggerheartClass() != null) {
            this.daggerheartClass = new DaggerheartClassDTO(subClass.getDaggerheartClass());
        } else {
            this.daggerheartClass = null;
        }
    }
}
