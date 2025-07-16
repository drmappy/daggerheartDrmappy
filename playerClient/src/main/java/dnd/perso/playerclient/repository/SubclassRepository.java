package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.SubClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubclassRepository extends JpaRepository<SubClass, String> {
}
