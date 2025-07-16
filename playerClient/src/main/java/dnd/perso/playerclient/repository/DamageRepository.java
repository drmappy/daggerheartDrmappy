package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Damage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamageRepository extends JpaRepository<Damage, Long> {
}
