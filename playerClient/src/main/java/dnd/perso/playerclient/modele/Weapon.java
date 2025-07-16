package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.Burden;
import dnd.perso.playerclient.modele.enums.Range;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Weapon {
    @Id
    private String name;
    private String trait;
    private Range range;
    @OneToOne
    private Damage damage;
    private Burden burden;
    @OneToOne
    private Feature feature;
}
