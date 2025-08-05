package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchInfo {
    private String name;
    private String type;
    public SearchInfo(Ancestry ancestry) {
        this.name = ancestry.getName();
        this.type = "ancestry";
    }
    public SearchInfo(Armor armor) {
        this.name = armor.getName();
        this.type = "armor";
    }
    public SearchInfo(Weapon weapon) {
        this.name = weapon.getName();
        this.type = "weapon";
    }
    public SearchInfo(Community community) {
        this.name = community.getName();
        this.type = "community";
    }
    public SearchInfo(DaggerheartClass daggerheartClass) {
        this.name = daggerheartClass.getName();
        this.type = "class";
    }
    public SearchInfo(SubClass subClass) {
        this.name = subClass.getName();
        this.type = "subclass";
    }
    public SearchInfo(Feature feature) {
        this.name = feature.getName();
        this.type = "feature";
    }
}
