package dnd.perso.playerclient;

import dnd.perso.playerclient.modele.enums.Burden;
import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import dnd.perso.playerclient.modele.enums.DamageType;
import dnd.perso.playerclient.modele.enums.Range;
import dnd.perso.playerclient.service.Player;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PlayerClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlayerClientApplication.class, args);
    }
    private final Player player;
    public PlayerClientApplication(Player player) {
        this.player = player;
    }
    @Bean
    CommandLineRunner run(){
        return args -> {
            TcpServer.createTcpServer("daggerheartdrmappy");
            player.saveGold(0,1,1);
            player.saveWeapon("Longsword", CharacterSpellTrait.STRENGTH, Range.MELEE, 8, 2, DamageType.PHYSICAL, Burden.ONEHANDED);
        };
    }
}
