package dnd.perso.playerclient.repository;


import dnd.perso.playerclient.modele.CharacterTraits;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterTraitsRepository extends JpaRepository<CharacterTraits, Long> {
}
