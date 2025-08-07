package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.EnemyType;
import dnd.perso.playerclient.modele.enums.Tier;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Enemy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Tier tier;
    private EnemyType type;
    private String motivesAndTactics;
    private int difficulty;
    private int hitPoints;
    private int stress;
    private int attackModifier;
    @OneToOne(cascade = CascadeType.ALL)
    private DamageThreshold damageThreshold;
    @ManyToOne
    private Weapon weapon;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Experience> experience;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> features;
    public Enemy(String name, Tier tier, EnemyType type, String description, String motivesAndTactics, int difficulty, DamageThreshold damageThreshold, int hitPoints, int stress, int attackModifier, Weapon weapon, List<Experience> experience, List<Feature> features) {
        this.name = name;
        this.tier = tier;
        this.type = type;
        this.description = description;
        this.motivesAndTactics = motivesAndTactics;
        this.difficulty = difficulty;
        this.damageThreshold = damageThreshold;
        this.hitPoints = hitPoints;
        this.stress = stress;
        this.attackModifier = attackModifier;
        this.weapon = weapon;
        this.experience = experience;
        this.features = features;
    }
}
