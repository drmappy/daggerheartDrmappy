package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Modifiers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModifiersRepository extends JpaRepository<Modifiers, Long> {
}
