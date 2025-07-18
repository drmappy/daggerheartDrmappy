package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.IndependentFeature;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FeatureDTO {
    private String name;
    private String description;

    public IndependentFeature toModele() {
        return new IndependentFeature(
                name,
                description
        );
    }
    public FeatureDTO(IndependentFeature independentFeature) {
        this.name = independentFeature.getName();
        this.description = independentFeature.getDescription();
    }
}
