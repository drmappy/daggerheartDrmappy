package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Gold;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoldRepository extends JpaRepository<Gold, Long> {
}
