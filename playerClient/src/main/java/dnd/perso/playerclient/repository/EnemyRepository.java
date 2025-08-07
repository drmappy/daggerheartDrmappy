package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Enemy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnemyRepository extends JpaRepository<Enemy, Long> {
    Enemy findByName(String name);
}
