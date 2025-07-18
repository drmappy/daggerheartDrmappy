package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Creator;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CreatorDTO extends AccountDTO {
    private List<ArmorDTO> armors;
    private List<AncestryDTO> ancestries;
    private List<CommunityDTO> communities;
    private List<DaggerheartClassDTO> daggerheartClasses;
    private List<SubClassDTO> subclasses;
    private List<FeatureDTO> features;
    private List<WeaponDTO> weapons;
    public CreatorDTO(String username, String password) {
        super(username, password);
    }
    public CreatorDTO(String username, String password, List<ArmorDTO> armors, List<AncestryDTO> ancestries, List<CommunityDTO> communities, List<DaggerheartClassDTO> daggerheartClasses, List<FeatureDTO> features, List<WeaponDTO> weapons) {
        super(username, password);
        this.armors = armors;
        this.ancestries = ancestries;
        this.communities = communities;
        this.daggerheartClasses = daggerheartClasses;
        this.features = features;
        this.weapons = weapons;
    }
    public CreatorDTO(Creator creator) {
        super(creator.getUsername(), creator.getPassword());
        this.armors = creator.getArmors().stream().map(ArmorDTO::new).toList();
        this.ancestries = creator.getAncestries().stream().map(AncestryDTO::new).toList();
        this.communities = creator.getCommunities().stream().map(CommunityDTO::new).toList();
        this.daggerheartClasses = creator.getDaggerheartClasses().stream().map(DaggerheartClassDTO::new).toList();
        this.features = creator.getIndependentFeatures().stream().map(FeatureDTO::new).toList();
        this.weapons = creator.getWeapons().stream().map(WeaponDTO::new).toList();
    }
    public Creator toModele(){
        return new Creator(
                this.getUsername(),
                this.getPassword(),
                this.armors != null ? this.armors.stream().map(ArmorDTO::toModele).toList() : List.of(),
                this. ancestries != null ? this.ancestries.stream().map(AncestryDTO::toModele).toList() : List.of(),
                this.communities != null ? this.communities.stream().map(CommunityDTO::toModele).toList() : List.of(),
                this.daggerheartClasses != null ? this.daggerheartClasses.stream().map(DaggerheartClassDTO::toModele).toList() : List.of(),
                this.features != null ? this.features.stream().map(FeatureDTO::toModele).toList() : List.of(),
                this.weapons != null ? this.weapons.stream().map(WeaponDTO::toModele).toList() : List.of()
        );
    }
}
