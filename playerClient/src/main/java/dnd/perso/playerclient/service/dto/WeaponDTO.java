package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Weapon;
import dnd.perso.playerclient.modele.enums.Burden;
import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import dnd.perso.playerclient.modele.enums.Range;
import dnd.perso.playerclient.modele.enums.Tier;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WeaponDTO {
    private Long id;
    private String name;
    private Tier tier;
    private CharacterSpellTrait trait;
    private Range range;
    private DamageDTO damage;
    private Burden burden;
    private FeatureDTO feature;
    public WeaponDTO(String name, CharacterSpellTrait trait, Range range, DamageDTO damage, Burden burden, Tier tier) {
        this.tier = tier;
        this.name = name;
        this.trait = trait;
        this.range = range;
        this.damage = damage;
        this.burden = burden;
    }

    public WeaponDTO(String name, CharacterSpellTrait trait, Range range, DamageDTO damageDTO, Burden burden, FeatureDTO feature, Tier tier) {
        this.tier = tier;
        this.name = name;
        this.trait = trait;
        this.range = range;
        this.damage = damageDTO;
        this.burden = burden;
        this.feature = feature;
    }

    public Weapon toModele() {
        return new Weapon(
                id,
                name,
                tier,
                trait,
                range,
                damage.toModele(),
                burden,
                feature != null ? feature.toModele() : null
        );
    }
    public WeaponDTO(Weapon weapon) {
        this.name = weapon.getName();
        this.id = weapon.getId();
        this.tier = weapon.getTier();
        this.trait = weapon.getTrait();
        this.range = weapon.getRange();
        this.damage = new DamageDTO(weapon.getDamage());
        this.burden = weapon.getBurden();
        this.feature = weapon.getFeature() != null ? new FeatureDTO(weapon.getFeature()) : null;
    }
}
