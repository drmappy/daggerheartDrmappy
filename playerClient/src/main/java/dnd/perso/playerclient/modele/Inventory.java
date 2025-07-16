package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private List<String> items;
    @OneToMany
    private List<Weapon> weapons;
    @OneToMany
    private List<Armor> armors;
    @OneToOne
    private DaggerheartCharacter character;
}
