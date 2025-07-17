package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Gold;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GoldDTO {
    private Long id;
    private int handfuls;
    private int bags;
    private int chest;
    public Gold toModele(){
        return new Gold(
                handfuls,
                bags,
                chest
        );
    }
    public GoldDTO(Gold gold){
        this.id = gold.getId();
        this.handfuls = gold.getHandfuls();
        this.bags = gold.getBags();
        this.chest = gold.getChest();
    }
}
