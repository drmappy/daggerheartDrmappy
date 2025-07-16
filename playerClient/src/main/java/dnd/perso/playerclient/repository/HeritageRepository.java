package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Heritage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeritageRepository extends JpaRepository<Heritage, Long> {
}
