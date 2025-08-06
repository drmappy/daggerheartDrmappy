package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Armor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArmorRepository extends JpaRepository<Armor, Long> {
    Armor findByName(String name);

    List<Armor> findByNameContaining(String name);
}
