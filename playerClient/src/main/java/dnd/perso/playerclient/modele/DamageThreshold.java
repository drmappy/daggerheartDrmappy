package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DamageThreshold {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int minorToMajor;
    private int majorToSevere;
    public DamageThreshold(int minorToMajor, int majorToSevere) {
        this.minorToMajor = minorToMajor;
        this.majorToSevere = majorToSevere;
    }
}
