package dnd.perso.playerclient.modele;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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
    @OneToOne(cascade = CascadeType.ALL)
    private Feature feature;
}
