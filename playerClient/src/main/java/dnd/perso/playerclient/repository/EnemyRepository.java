package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Enemy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnemyRepository extends JpaRepository<Enemy, Long> {
    Enemy findByName(String name);

    List<Enemy> findByNameContaining(String name);
}
