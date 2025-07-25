package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Armor {
    @Id
    private String name;
    private int minorToMajor;
    private int majorToSevere;
    private int baseArmorScore;
    @ManyToOne
    private Feature feature;
    public Armor(String name, int minorToMajor, int majorToSevere, int baseArmorScore) {
        this.name = name;
        this.minorToMajor = minorToMajor;
        this.majorToSevere = majorToSevere;
        this.baseArmorScore = baseArmorScore;

    }
}
