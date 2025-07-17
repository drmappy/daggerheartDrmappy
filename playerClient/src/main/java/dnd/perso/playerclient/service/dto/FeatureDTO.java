package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Feature;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FeatureDTO {
    private String name;
    private String description;

    public Feature toModele() {
        return new Feature(
                name,
                description
        );
    }
    public FeatureDTO(Feature feature) {
        this.name = feature.getName();
        this.description = feature.getDescription();
    }
}
