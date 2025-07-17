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
    @ManyToOne
    private DaggerheartClass characterClass;
    @ManyToOne
    private SubClass subClass;


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
    public DaggerheartCharacter(String name, String pronouns, Heritage heritage, Modifiers modifiers, DaggerheartClass characterClass, SubClass subClass, int stress, CharacterTraits traits, Equipment equipment, List<Experience> experiences, Gold gold, Inventory inventory, String imageBinaryData) {
        this.name = name;
        this.pronouns = pronouns;
        this.heritage = heritage;
        this.modifiers = modifiers;
        this.characterClass = characterClass;
        this.subClass = subClass;
        this.stress = stress;
        this.traits = traits;
        this.equipment = equipment;
        this.experiences = experiences;
        this.gold = gold;
        this.inventory = inventory;
        this.imageBinaryData = imageBinaryData;
    }
}
