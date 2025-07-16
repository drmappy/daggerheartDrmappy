package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.DaggerheartCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DaggerheartCharacterRepository extends JpaRepository<DaggerheartCharacter, Long> {
}
