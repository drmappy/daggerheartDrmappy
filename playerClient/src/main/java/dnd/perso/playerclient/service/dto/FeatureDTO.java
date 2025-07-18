package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Feature;
import dnd.perso.playerclient.modele.enums.FeatureType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FeatureDTO {
    private String name;
    private String description;
    private FeatureType type;

    public Feature toModele() {
        return new Feature(
                name,
                description,
                type
        );
    }
    public FeatureDTO(Feature feature) {
        this.name = feature.getName();
        this.description = feature.getDescription();
        this.type = feature.getType();
    }
}
