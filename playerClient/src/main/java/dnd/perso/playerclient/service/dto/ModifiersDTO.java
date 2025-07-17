package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Modifiers;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ModifiersDTO {
    private Long id;
    private int evasion;
    private int armor;
    private DamageThresholdDTO damageThreshold;
    private int hp;
    private int stress;
    private int hope;
    public ModifiersDTO(int evasion, int armor, DamageThresholdDTO damageThreshold, int hp, int stress, int hope) {
        this.evasion = evasion;
        this.armor = armor;
        this.damageThreshold = damageThreshold;
        this.hp = hp;
        this.stress = stress;
        this.hope = hope;
    }
    public Modifiers toModele(){
        return new Modifiers(
                evasion,
                armor,
                damageThreshold.toModele(),
                hp,
                stress,
                hope
        );
    }
    public ModifiersDTO(Modifiers modifiers){
        this.id = modifiers.getId();
        this.evasion = modifiers.getEvasion();
        this.armor = modifiers.getArmor();
        this.damageThreshold = new DamageThresholdDTO(modifiers.getDamageThreshold());
        this.hp = modifiers.getHp();
        this.stress = modifiers.getStress();
        this.hope = modifiers.getHope();
    }
}
