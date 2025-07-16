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
    @OneToOne
    private Weapon primary;
    @OneToOne
    private Weapon secondary;
    @OneToOne
    private Armor activeArmor;
    @OneToOne
    private DaggerheartCharacter character;
}
