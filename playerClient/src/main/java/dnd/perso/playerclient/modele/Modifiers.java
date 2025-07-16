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
    @OneToOne
    private DamageThreshold damageThreshold;
    private int hp;
    private int stress;
    private int hope;
    @OneToOne
    private DaggerheartCharacter character;
}
