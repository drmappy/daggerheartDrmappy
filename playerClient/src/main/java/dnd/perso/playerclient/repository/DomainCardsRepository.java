package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.DomainCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomainCardsRepository extends JpaRepository<DomainCard, Long> {
    DomainCard findByName(String name);
}
