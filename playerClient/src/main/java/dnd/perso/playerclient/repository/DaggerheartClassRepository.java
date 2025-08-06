package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.DaggerheartClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface DaggerheartClassRepository extends JpaRepository<DaggerheartClass,Long> {
    DaggerheartClass findByName(String name);

    List<DaggerheartClass> findByNameContaining(String name);
}