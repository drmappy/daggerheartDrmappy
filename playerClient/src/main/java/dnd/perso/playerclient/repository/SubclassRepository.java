package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.SubClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubclassRepository extends JpaRepository<SubClass, Long> {

    SubClass findByName(String name);

    List<SubClass> findByNameContaining(String name);
}
