package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.DaggerheartClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DaggerheartClassRepository extends JpaRepository<DaggerheartClass,String> {
    List<DaggerheartClass> findByName(String name);
}
