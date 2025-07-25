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
    private String name;
    private String description;
    @ManyToOne
    private Feature feature1;
    @ManyToOne
    private Feature feature2;
}