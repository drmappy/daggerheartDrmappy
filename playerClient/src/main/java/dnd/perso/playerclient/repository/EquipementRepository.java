package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipementRepository extends JpaRepository<Equipment, Long> {
}
