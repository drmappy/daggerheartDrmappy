package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.DaggerheartClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface DaggerheartClassRepository extends JpaRepository<DaggerheartClass,Long> {
    DaggerheartClass findByName(String name);
    DaggerheartClass findById(long id);
    List<DaggerheartClass> findByNameContaining(String name);
}