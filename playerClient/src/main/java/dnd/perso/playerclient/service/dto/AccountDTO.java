package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Account;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public abstract class AccountDTO {
    private Long id;
    private String username;
    private String password;

    public abstract Account toModele();
}
