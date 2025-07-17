package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.DamageThreshold;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DamageThresholdDTO {
    private Long id;
    private int minorToMajor;
    private int majorToSevere;
    public DamageThresholdDTO(int minorToMajor, int majorToSevere) {
        this.minorToMajor = minorToMajor;
        this.majorToSevere = majorToSevere;
    }
    public DamageThreshold toModele(){
        return new DamageThreshold(
                minorToMajor,
                majorToSevere
        );
    }
    public DamageThresholdDTO(DamageThreshold damageThreshold){
        this.id = damageThreshold.getId();
        this.minorToMajor = damageThreshold.getMinorToMajor();
        this.majorToSevere = damageThreshold.getMajorToSevere();
    }
}
