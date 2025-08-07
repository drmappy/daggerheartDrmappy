package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.*;
import dnd.perso.playerclient.modele.enums.EnemyType;
import dnd.perso.playerclient.modele.enums.Tier;
import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EnemyDTO {
    private Long id;
    private String name;
    private String description;
    private Tier tier;
    private EnemyType type;
    private String motivesAndTactics;
    private int difficulty;
    private DamageThreshold damageThreshold;
    private int hitPoints;
    private int stress;
    private int attackModifier;
    private Weapon weapon;
    private List<Experience> experience;
    private List<Feature> features;
    public EnemyDTO(String name, Tier tier, EnemyType type, String description, String motivesAndTactics, int difficulty, DamageThreshold damageThreshold, int hitPoints, int stress, int attackModifier, Weapon weapon, List<Experience> experience, List<Feature> features) {
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
    public EnemyDTO(Enemy enemy){
        this.id = enemy.getId();
        this.name = enemy.getName();
        this.description = enemy.getDescription();
        this.tier = enemy.getTier();
        this.type = enemy.getType();
        this.motivesAndTactics = enemy.getMotivesAndTactics();
        this.difficulty = enemy.getDifficulty();
        this.damageThreshold = enemy.getDamageThreshold();
        this.hitPoints = enemy.getHitPoints();
        this.stress = enemy.getStress();
        this.attackModifier = enemy.getAttackModifier();
        this.weapon = enemy.getWeapon();
        this.experience = enemy.getExperience();
        this.features = enemy.getFeatures();
    }

    public Enemy toModele() {
        return new Enemy(
                this.id,
                this.name,
                this.description,
                this.tier,
                this.type,
                this.motivesAndTactics,
                this.difficulty,
                this.hitPoints,
                this.stress,
                this.attackModifier,
                this.damageThreshold,
                this.weapon,
                this.experience,
                this.features
        );
    }
}
