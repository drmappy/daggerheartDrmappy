package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Equipment;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EquipmentDTO {
    private long id;
    private WeaponDTO primary;
    private WeaponDTO secondary;
    private ArmorDTO activeArmor;

    public EquipmentDTO(WeaponDTO primary, WeaponDTO secondary, ArmorDTO activeArmor) {
        this.primary = primary;
        this.secondary = secondary;
        this.activeArmor = activeArmor;
    }
    public Equipment toModele(){
        return new Equipment(
                primary != null ? primary.toModele() : null,
                secondary != null ? secondary.toModele() : null,
                activeArmor != null ? activeArmor.toModele() : null
        );
    }
    public EquipmentDTO(Equipment equipment){
        this.id = equipment.getId();
        this.primary = equipment.getPrimary() == null ? null : new WeaponDTO(equipment.getPrimary());
        this.secondary = equipment.getSecondary() == null ? null : new WeaponDTO(equipment.getSecondary());
        this.activeArmor = equipment.getActiveArmor() == null ? null : new ArmorDTO(equipment.getActiveArmor());
    }
}
