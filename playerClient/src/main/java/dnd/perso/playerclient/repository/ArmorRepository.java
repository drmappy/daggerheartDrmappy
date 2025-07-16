package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Armor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArmorRepository extends JpaRepository<Armor, String> {
}
