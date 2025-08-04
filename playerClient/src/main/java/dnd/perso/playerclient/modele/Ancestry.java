package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Ancestry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String description;
    @ManyToOne
    private Feature feature1;
    @ManyToOne
    private Feature feature2;
    public Ancestry(String name, String description, Feature feature1, Feature feature2) {
        this.name = name;
        this.description = description;
        this.feature1 = feature1;
        this.feature2 = feature2;
    }
}