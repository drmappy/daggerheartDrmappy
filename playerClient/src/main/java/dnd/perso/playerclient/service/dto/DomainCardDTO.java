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
    private String name;
    private String description;
    public DomainCardDTO(int level, Domain domain, int recallCost, DomainCardType cardType, String name, String description) {
        this.level = level;
        this.domain = domain;
        this.recallCost = recallCost;
        this.cardType = cardType;
        this.name = name;
        this.description = description;
    }

    public DomainCardDTO(DomainCard domainCard) {
        this.id = domainCard.getId();
        this.level = domainCard.getLevel();
        this.domain = domainCard.getDomain();
        this.recallCost = domainCard.getRecallCost();
        this.cardType = domainCard.getCardType();
        this.name = domainCard.getName();
        this.description = domainCard.getDescription();
    }

    public DomainCard toModele() {
        return new DomainCard(
                id,
                level,
                domain,
                recallCost,
                cardType,
                name,
                description
        );
    }
}