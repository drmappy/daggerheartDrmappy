package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    Community findByName(String name);
}
