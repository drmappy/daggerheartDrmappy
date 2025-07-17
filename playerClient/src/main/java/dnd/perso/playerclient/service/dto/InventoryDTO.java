package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Inventory;
import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InventoryDTO {
    private Long id;
    private List<String> items;
    private List<WeaponDTO> weapons;
    private List<ArmorDTO> armors;
    public InventoryDTO( List<String> items, List<WeaponDTO> weapons, List<ArmorDTO> armors) {
        this.items = items;
        this.weapons = weapons;
        this.armors = armors;
    }
    public Inventory toModele(){
        return new Inventory(
                items,
                weapons.stream().map(WeaponDTO::toModele).toList(),
                armors.stream().map(ArmorDTO::toModele).toList()
        );
    }
    public InventoryDTO(Inventory inventory){
        this.id = inventory.getId();
        this.items = inventory.getItems();
        this.weapons = inventory.getWeapons().stream().map(WeaponDTO::new).toList();
        this.armors = inventory.getArmors().stream().map(ArmorDTO::new).toList();
    }
}
