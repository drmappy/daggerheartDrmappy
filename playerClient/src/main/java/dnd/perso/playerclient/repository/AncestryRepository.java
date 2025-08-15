package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Ancestry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AncestryRepository extends JpaRepository<Ancestry, Long> {
    Ancestry findByName(String name);

    List<Ancestry> findByNameContaining(String name);

    void removeAncestryById(Long id);
}
