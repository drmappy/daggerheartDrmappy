package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.Domain;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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
    private List<Feature> hopeFeatures;
    private List<Feature> classFeatures;
    @OneToOne
    private SubClass subClass;
}
