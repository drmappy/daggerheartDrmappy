package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Damage;
import dnd.perso.playerclient.modele.enums.DamageType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DamageDTO {
    private Long id;
    private int dieSize;
    private int baseDamage;
    private DamageType damageType;
    public DamageDTO(int dieSize, int baseDamage, DamageType damageType) {
        this.dieSize = dieSize;
        this.baseDamage = baseDamage;
        this.damageType = damageType;
    }
    public Damage toModele(){
        return new Damage(
                id,
                dieSize,
                baseDamage,
                damageType
        );
    }
    public DamageDTO(Damage damage){
        this.id = damage.getId();
        this.dieSize = damage.getDieSize();
        this.baseDamage = damage.getBaseDamage();
        this.damageType = damage.getDamageType();
    }
}
