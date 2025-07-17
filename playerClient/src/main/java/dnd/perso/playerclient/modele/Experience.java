package dnd.perso.playerclient.modele;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String experience;
    private int modifier;
    public Experience(String experience, int modifier) {
        this.experience = experience;
        this.modifier = modifier;
    }
}
