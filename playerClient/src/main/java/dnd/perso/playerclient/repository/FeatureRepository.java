package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Feature;
import dnd.perso.playerclient.modele.enums.FeatureType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface FeatureRepository extends JpaRepository<Feature, Long> {
    Feature findByName(String name);

    List<Feature> findByNameContaining(String name);
    @Query("SELECT f FROM Feature f WHERE f.type = ?1")
    List<Feature> findByType(FeatureType featureType);
}
