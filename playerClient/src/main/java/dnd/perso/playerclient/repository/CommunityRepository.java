package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    Community findByName(String name);

    List<Community> findByNameContaining(String name);
}
