package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeatureRepository extends JpaRepository<Feature, String> {
}
