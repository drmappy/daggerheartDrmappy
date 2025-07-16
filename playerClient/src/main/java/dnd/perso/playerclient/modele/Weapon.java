package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.Burden;
import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import dnd.perso.playerclient.modele.enums.Range;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Weapon {
    @Id
    private String name;
    private CharacterSpellTrait trait;
    private Range range;
    @OneToOne(cascade = CascadeType.ALL)
    private Damage damage;
    private Burden burden;
    @OneToOne
    private Feature feature;
    public Weapon(String name, CharacterSpellTrait trait, Range range, Damage damage, Burden burden) {
        this.name = name;
        this.trait = trait;
        this.range = range;
        this.damage = damage;
        this.burden = burden;
    }
}
