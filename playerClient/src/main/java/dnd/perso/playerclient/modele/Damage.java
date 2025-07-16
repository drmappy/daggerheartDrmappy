package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.DamageType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Damage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int dieSize;
    private int baseDamage;
    private DamageType damageType;
}
