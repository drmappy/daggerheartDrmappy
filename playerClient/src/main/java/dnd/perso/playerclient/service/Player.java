package dnd.perso.playerclient.service;

import dnd.perso.playerclient.modele.Damage;
import dnd.perso.playerclient.modele.Feature;
import dnd.perso.playerclient.modele.Gold;
import dnd.perso.playerclient.modele.Weapon;
import dnd.perso.playerclient.modele.enums.Burden;
import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import dnd.perso.playerclient.modele.enums.DamageType;
import dnd.perso.playerclient.modele.enums.Range;
import dnd.perso.playerclient.repository.DamageRepository;
import dnd.perso.playerclient.repository.GoldRepository;
import dnd.perso.playerclient.repository.WeaponRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class Player {
    private final GoldRepository goldRepository;
    private final WeaponRepository weaponRepository;
    private final DamageRepository damageRepository;

    public Player(GoldRepository goldRepository, WeaponRepository weaponRepository, DamageRepository damageRepository) {
        this.goldRepository = goldRepository;
        this.weaponRepository = weaponRepository;
        this.damageRepository = damageRepository;
    }
    @Transactional
    public void saveGold(int handfuls, int bags, int chest) {
        goldRepository.save(new Gold(handfuls, bags, chest));
    }
    @Transactional
    public void saveWeapon(String name, CharacterSpellTrait trait, Range range, int damageDie, int baseDamage, DamageType damageType, Burden burden) {
        Damage damage = new Damage(damageDie,baseDamage, damageType);
        weaponRepository.save(new Weapon(name, trait, range, damage, burden));
    }
}
