package dnd.perso.playerclient.modele;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Feature {
    @Id
    private String name;
    private String description;
}
