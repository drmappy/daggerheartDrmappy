package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SubClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String description;
    private CharacterSpellTrait spellcastingTrait;
    @ManyToOne
    private DaggerheartClass daggerheartClass;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> foundationFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> specializationFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> masteryFeatures;
    public SubClass(String name, String description, CharacterSpellTrait spellcastingTrait, List<Feature> foundationFeatures, List<Feature> specializationFeatures, List<Feature> masteryFeatures, DaggerheartClass daggerheartClass) {
        this.name = name;
        this.description = description;
        this.spellcastingTrait = spellcastingTrait;
        this.foundationFeatures = foundationFeatures;
        this.specializationFeatures = specializationFeatures;
        this.masteryFeatures = masteryFeatures;
        this.daggerheartClass = daggerheartClass;
    }
}
