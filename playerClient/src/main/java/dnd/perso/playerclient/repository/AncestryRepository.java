package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Ancestry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AncestryRepository extends JpaRepository<Ancestry, String> {
}
