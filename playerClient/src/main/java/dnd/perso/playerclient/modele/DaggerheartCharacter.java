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
public class DaggerheartCharacter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String pronouns;
    @OneToOne(cascade = CascadeType.ALL)
    private Heritage heritage;
    @OneToOne(cascade = CascadeType.ALL)
    private Modifiers modifiers;
    @OneToOne
    private DaggerheartClass characterClass;


    private int stress;
    @OneToOne(cascade = CascadeType.ALL)
    private CharacterTraits traits;
    @OneToOne(cascade = CascadeType.ALL)
    private Equipment equipment;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Experience> experiences;
    @OneToOne(cascade = CascadeType.ALL)
    private Gold gold;
    @OneToOne(cascade = CascadeType.ALL)
    private Inventory inventory;
    private String imageBinaryData;
}
