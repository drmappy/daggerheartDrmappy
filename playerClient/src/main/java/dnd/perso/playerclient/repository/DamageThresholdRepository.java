package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.DamageThreshold;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DamageThresholdRepository extends JpaRepository<DamageThreshold, Integer> {
    DamageThreshold getById(long id);
}
