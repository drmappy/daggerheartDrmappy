package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.IndependentFeature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeatureRepository extends JpaRepository<IndependentFeature, String> {
}
