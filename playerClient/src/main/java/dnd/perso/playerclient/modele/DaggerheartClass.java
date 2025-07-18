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
    private String name;
    private String description;
    private List<Domain> domains;
    private int startingEvasion;
    private int startingHitPoints;
    private String classItem;
    @OneToMany(cascade = CascadeType.ALL)
    private List<DependantFeature> hopeIndependentFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<DependantFeature> classIndependentFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<SubClass> subClasses;
}
