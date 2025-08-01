package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.DaggerheartCharacter;
import dnd.perso.playerclient.modele.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Query("select player.characters from Player player where player.username = ?1 and player.password = ?2")
    List<DaggerheartCharacter> getCharactersByUsernameAndPassword(String username, String password);
}
