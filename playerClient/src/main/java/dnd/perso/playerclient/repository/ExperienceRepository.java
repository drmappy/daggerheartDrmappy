package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}
