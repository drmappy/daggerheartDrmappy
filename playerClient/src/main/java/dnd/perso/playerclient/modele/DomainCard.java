package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.Domain;
import dnd.perso.playerclient.modele.enums.DomainCardType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DomainCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int level;
    private Domain domain;
    private int recallCost;
    private DomainCardType cardType;
    @Column(unique = true)
    private String name;
    private String description;
}
