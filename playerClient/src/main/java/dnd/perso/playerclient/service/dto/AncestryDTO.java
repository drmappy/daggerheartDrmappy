package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Ancestry;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AncestryDTO {
    private String name;
    private String description;
    private FeatureDTO feature1;
    private FeatureDTO feature2;
    public Ancestry toModele(){
        return new Ancestry(
                this.name,
                this.description,
                this.feature1.toModele(),
                this.feature2.toModele()
        );
    }
    public AncestryDTO(Ancestry ancestry) {
        this.name = ancestry.getName();
        this.description = ancestry.getDescription();
        this.feature1 = new FeatureDTO(ancestry.getFeature1());
        this.feature2 = new FeatureDTO(ancestry.getFeature2());
    }
}
