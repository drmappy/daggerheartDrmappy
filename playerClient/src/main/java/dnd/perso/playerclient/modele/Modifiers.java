package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Modifiers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int evasion;
    private int armor;
    @OneToOne(cascade = CascadeType.ALL)
    private DamageThreshold damageThreshold;
    private int hp;
    private int stress;
    private int hope;
    public Modifiers(int evasion, int armor, DamageThreshold damageThreshold, int hp, int stress, int hope) {
        this.evasion = evasion;
        this.armor = armor;
        this.damageThreshold = damageThreshold;
        this.hp = hp;
        this.stress = stress;
        this.hope = hope;
    }
}
