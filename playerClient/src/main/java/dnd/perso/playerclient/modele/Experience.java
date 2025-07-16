package dnd.perso.playerclient.modele;

import jakarta.persistence.*;

@Entity
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String experience;
    private int modifier;
    @ManyToOne
    private DaggerheartCharacter character;
}
