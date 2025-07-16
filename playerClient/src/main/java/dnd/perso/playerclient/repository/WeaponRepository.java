package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Weapon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeaponRepository extends JpaRepository<Weapon, String> {

}
