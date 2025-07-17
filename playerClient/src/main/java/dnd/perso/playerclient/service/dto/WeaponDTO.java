package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Weapon;
import dnd.perso.playerclient.modele.enums.Burden;
import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import dnd.perso.playerclient.modele.enums.Range;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WeaponDTO {
    private String name;
    private CharacterSpellTrait trait;
    private Range range;
    private DamageDTO damage;
    private Burden burden;
    private FeatureDTO feature;
    public WeaponDTO(String name, CharacterSpellTrait trait, Range range, DamageDTO damage, Burden burden) {
        this.name = name;
        this.trait = trait;
        this.range = range;
        this.damage = damage;
        this.burden = burden;
    }

    public Weapon toModele() {
        return new Weapon(
                name,
                trait,
                range,
                damage.toModele(),
                burden,
                feature != null ? feature.toModele() : null
        );
    }
    public WeaponDTO(Weapon weapon) {
        this.name = weapon.getName();
        this.trait = weapon.getTrait();
        this.range = weapon.getRange();
        this.damage = new DamageDTO(weapon.getDamage());
        this.burden = weapon.getBurden();
        this.feature = weapon.getFeature() != null ? new FeatureDTO(weapon.getFeature()) : null;
    }
}
