package dnd.perso.playerclient.modele;

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
public class Gold {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int handfuls;
    private int bags;
    private int chest;
    public Gold(int handfuls, int bags, int chest) {
        this.handfuls = handfuls;
        this.bags = bags;
        this.chest = chest;
    }
}
