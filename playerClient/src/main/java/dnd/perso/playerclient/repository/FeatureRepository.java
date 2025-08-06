package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeatureRepository extends JpaRepository<Feature, Long> {
    Feature findByName(String name);

    List<Feature> findByNameContaining(String name);
}
