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
    private String name;
    private String description;
    @ManyToOne
    private Feature feature;
}
