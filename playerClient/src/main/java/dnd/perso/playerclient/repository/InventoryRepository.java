package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
