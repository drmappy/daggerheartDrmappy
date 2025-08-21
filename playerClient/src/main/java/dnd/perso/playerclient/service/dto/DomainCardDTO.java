package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.DomainCard;
import dnd.perso.playerclient.modele.Feature;
import dnd.perso.playerclient.modele.enums.Domain;
import dnd.perso.playerclient.modele.enums.DomainCardType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DomainCardDTO {
    private Long id;
    private int level;
    private Domain domain;
    private int recallCost;
    private DomainCardType cardType;
    private Feature feature;
    public DomainCardDTO(int level, Domain domain, int recallCost, DomainCardType cardType, Feature feature) {
        this.level = level;
        this.domain = domain;
        this.recallCost = recallCost;
        this.cardType = cardType;
        this.feature = feature;
    }
    public DomainCard toModele() {
        return new DomainCard(
                id,
                level,
                domain,
                recallCost,
                cardType,
                feature
        );
    }
}