package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.DaggerheartCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<DaggerheartCharacter, Long> {
}
