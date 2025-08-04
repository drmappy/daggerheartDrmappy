package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String description;
    @ManyToOne
    private Feature feature;
    public Community(String name, String description, Feature feature) {
        this.name = name;
        this.description = description;
        this.feature = feature;
    }
}
