package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.DamageThreshold;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamageThresholdRepository extends JpaRepository<DamageThreshold, Integer> {
}
