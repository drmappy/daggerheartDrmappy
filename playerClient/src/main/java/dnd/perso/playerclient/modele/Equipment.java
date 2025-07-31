package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Weapon primary;
    @ManyToOne
    private Weapon secondary;
    @ManyToOne
    private Armor activeArmor;
    public Equipment(Weapon primary, Weapon secondary, Armor activeArmor) {
        this.primary = primary;
        this.secondary = secondary;
        this.activeArmor = activeArmor;
    }
}
