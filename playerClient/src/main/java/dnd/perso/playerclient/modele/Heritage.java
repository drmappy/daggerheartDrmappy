package dnd.perso.playerclient.modele;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Heritage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Ancestry ancestry;
    @ManyToOne
    private Community community;
    private List<String> languages;
    public Heritage(Ancestry ancestry, Community community, List<String> languages) {
        this.ancestry = ancestry;
        this.community = community;
        this.languages = languages;
    }
}
