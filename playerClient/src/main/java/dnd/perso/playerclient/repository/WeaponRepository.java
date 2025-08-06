package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Weapon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeaponRepository extends JpaRepository<Weapon, Long> {
    Weapon findByName(String name);

    List<Weapon> findByNameContaining(String name);
}
