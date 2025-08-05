package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Community;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommunityDTO {
    private Long id;
    private String name;
    private String description;
    private FeatureDTO feature;
    public Community toModele() {
        return new Community(
                id,
                name,
                description,
                feature.toModele()
        );
    }
    public CommunityDTO(Community community) {
        this.id = community.getId();
        this.name = community.getName();
        this.description = community.getDescription();
        this.feature = new FeatureDTO(community.getFeature());
    }
}
