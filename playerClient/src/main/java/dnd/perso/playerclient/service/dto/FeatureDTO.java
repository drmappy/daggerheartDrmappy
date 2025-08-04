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
    private Long id;
    private String name;
    private String description;
    private FeatureType type;

    public Feature toModele() {
        return new Feature(
                id,
                name,
                description,
                type
        );
    }
    public FeatureDTO(String name, String description, FeatureType type) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
    public FeatureDTO(Feature feature) {
        this.id = feature.getId();
        this.name = feature.getName();
        this.description = feature.getDescription();
        this.type = feature.getType();
    }
}
