package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.Domain;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DaggerheartClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String description;
    private List<Domain> domains;
    private int startingEvasion;
    private int startingHitPoints;
    private String classItem;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> hopeFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> classFeatures;
    @OneToMany
    private List<SubClass> subClasses;
    public DaggerheartClass(String name, String description, List<Domain> domains, int startingEvasion, int startingHitPoints, String classItem, List<Feature> hopeFeatures, List<Feature> classFeatures, List<SubClass> subClasses) {
        this.name = name;
        this.description = description;
        this.domains = domains;
        this.startingEvasion = startingEvasion;
        this.startingHitPoints = startingHitPoints;
        this.classItem = classItem;
        this.hopeFeatures = hopeFeatures;
        this.classFeatures = classFeatures;
        this.subClasses = subClasses;
    }
}
