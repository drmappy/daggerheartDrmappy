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
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String pronouns;
    @OneToOne
    private Heritage heritage;
    @OneToOne
    private Modifiers modifiers;
    @OneToOne
    private DaggerheartClass characterClass;


    private int stress;
    @OneToOne
    private CharacterTraits traits;
    @OneToOne
    private Equipment equipment;
    private List<Experience> experiences;
    @OneToOne
    private Gold gold;
    @OneToOne
    private Inventory inventory;
    private String imageBinaryData;
}
