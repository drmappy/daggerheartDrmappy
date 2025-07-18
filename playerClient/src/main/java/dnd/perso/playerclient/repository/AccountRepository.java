package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountRepository extends JpaRepository<Account, String> {
    @Query("select account " +
            "from Account account " +
            "where account.username = ?1 " +
            "and account.password = ?2")
    Account getByUsernameAndPassword(String username, String password);
}
