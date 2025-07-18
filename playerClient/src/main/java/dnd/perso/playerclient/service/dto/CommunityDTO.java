package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Community;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommunityDTO {
    private String name;
    private String description;
    private FeatureDTO feature;
    public Community toModele() {
        return new Community(
                name,
                description,
                feature.toModele()
        );
    }
    public CommunityDTO(Community community) {
        this.name = community.getName();
        this.description = community.getDescription();
        this.feature = new FeatureDTO(community.getIndependentFeature());
    }
}
