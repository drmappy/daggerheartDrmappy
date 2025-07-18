package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Armor;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ArmorDTO {
    private String name;
    private int minorToMajor;
    private int majorToSevere;
    private int baseArmorScore;
    private FeatureDTO feature;
    public Armor toModele(){
        return new Armor(
                name,
                minorToMajor,
                majorToSevere,
                baseArmorScore,
                feature != null ? feature.toModele() : null
        );
    }
    public ArmorDTO(Armor armor) {
        this.name = armor.getName();
        this.minorToMajor = armor.getMinorToMajor();
        this.majorToSevere = armor.getMajorToSevere();
        this.baseArmorScore = armor.getBaseArmorScore();
        this.feature = armor.getFeature() != null ? new FeatureDTO(armor.getFeature()) : null;
    }
}
