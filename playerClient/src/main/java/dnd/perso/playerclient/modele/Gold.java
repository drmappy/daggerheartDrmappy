package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
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
    @OneToOne
    private DaggerheartCharacter character;
    public Gold(int handfuls, int bags, int chest) {
        this.handfuls = handfuls;
        this.bags = bags;
        this.chest = chest;
    }
}
