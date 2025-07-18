package dnd.perso.playerclient;

import dnd.perso.playerclient.modele.enums.*;
import dnd.perso.playerclient.service.CreatorService;
import dnd.perso.playerclient.service.PlayerService;
import dnd.perso.playerclient.service.dto.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class PlayerClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlayerClientApplication.class, args);
    }
    private final PlayerService playerService;
    private final CreatorService creatorService;
    public PlayerClientApplication(PlayerService playerService, CreatorService creatorService) {
        this.playerService = playerService;
        this.creatorService = creatorService;
    }
    @Bean
    CommandLineRunner run(){
        return args -> {
            TcpServer.createTcpServer("daggerheartdrmappy");
            DaggerheartCharacterDTO characterDTO = new DaggerheartCharacterDTO("Massi",
                    "He/Him",
                    new HeritageDTO(
                            new AncestryDTO(
                                    "human",
                                    "Human's are the reason for human error.",
                                    new FeatureDTO(
                                            "half-blind",
                                            "You wear glasses or lenses."),
                                    new FeatureDTO(
                                            "Male pattern baldness",
                                            "At least hair transplants are very effective nowadays.")
                            ),
                            new CommunityDTO(
                                    "The City",
                                    "A place where people live together in a community.",
                                    new FeatureDTO(
                                            "City Dweller",
                                            "You are used to the hustle and bustle of city life add +1 to your evasion.")
                            ),
                            List.of("english", "french", "polish")
                    ),
                    new ModifiersDTO(
                            1,
                            0,
                            new DamageThresholdDTO(
                                    0,
                                    0
                            ),
                            0,
                            0,
                            0
                    ),
                    new DaggerheartClassDTO(
                            "Ranger",
                            "A master of the wilderness, skilled in tracking and survival.",
                            List.of(
                                    Domain.BONE,
                                    Domain.SAGE
                            ),
                            10,
                            6,
                            "A compass or a map that helps you navigate through the wilderness.",
                            List.of(
                                    new FeatureDTO(
                                            "Survivalist",
                                            "You are skilled in surviving in the wilderness, add +1 to your survival checks."
                                    ),
                                    new FeatureDTO(
                                            "Tracker",
                                            "You can track creatures and find their trails."
                                    )
                            ),
                            List.of(
                                    new FeatureDTO(
                                            "Survival",
                                            "You are skilled in surviving in the wilderness, add +1 to your survival checks."
                                    ),
                                    new FeatureDTO(
                                            "Tracking",
                                            "You can track creatures and find their trails."
                                    )
                            ),
                            List.of(
                                    new SubClassDTO(
                                            "Beastmaster",
                                            "A ranger who has a deep bond with a beast companion.",
                                            CharacterSpellTrait.AGILITY,
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast",
                                                            "Summon a beast companion to aid you in combat."
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast",
                                                            "Summon a beast companion to aid you in combat, but its better."
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast",
                                                            "Summon a beast companion to aid you in combat, but its even better."
                                                    )
                                            )
                                    ),
                                    new SubClassDTO(
                                            "Wayfinder",
                                            "A ranger who is skilled in navigation and exploration.",
                                            CharacterSpellTrait.AGILITY,
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder",
                                                            "You can find the best path through difficult terrain."
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder",
                                                            "You can find the best path through difficult terrain, but its better."
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder",
                                                            "You can find the best path through difficult terrain, but its even better."
                                                    )
                                            )
                                    )
                            )
                    ),
                    new SubClassDTO(
                            "Wayfinder",
                            "A ranger who is skilled in navigation and exploration.",
                            CharacterSpellTrait.AGILITY,
                            List.of(
                                    new FeatureDTO(
                                            "Pathfinder",
                                            "You can find the best path through difficult terrain."
                                    )
                            ),
                            List.of(
                                    new FeatureDTO(
                                            "Pathfinder",
                                            "You can find the best path through difficult terrain, but its better."
                                    )
                            ),
                            List.of(
                                    new FeatureDTO(
                                            "Pathfinder",
                                            "You can find the best path through difficult terrain, but its even better."
                                    )
                            )
                    ),
                    6,
                    new CharacterTraitsDTO(
                            2,
                            1,
                            1,
                            0,
                            -1,
                            -1
                    ),
                    new EquipmentDTO(
                            new WeaponDTO(
                                    "Short Sword",
                                    CharacterSpellTrait.AGILITY,
                                    Range.MELEE,
                                    new DamageDTO(
                                            6,
                                            1,
                                            DamageType.PHYSICAL
                                    ),
                                    Burden.ONEHANDED,
                                    new FeatureDTO(
                                            "Quick Strike",
                                            "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up."
                                    )
                            ),
                            new WeaponDTO(
                                    "Short Sword number 2",
                                    CharacterSpellTrait.AGILITY,
                                    Range.MELEE,
                                    new DamageDTO(
                                            6,
                                            1,
                                            DamageType.PHYSICAL
                                    ),
                                    Burden.ONEHANDED,
                                    new FeatureDTO(
                                            "Quick Strike",
                                            "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up."
                                    )
                            ),
                            new ArmorDTO(
                                    "Leather Armor",
                                    6,
                                    13,
                                    3,
                                    new FeatureDTO(
                                            "Lightweight",
                                            "This armor is lightweight and allows for quick movement, add +1 to your evasion."
                                    )
                            )
                    ),
                    List.of(
                            new ExperienceDTO(
                                    "First Adventure",
                                    2
                            ),
                            new ExperienceDTO(
                                    "First Strike",
                                    2
                            )
                    ),
                    new GoldDTO(
                            3,
                            1,
                            0
                    ),
                    new InventoryDTO(
                            List.of("Healing Potion", "Rations", "Map"),
                            List.of(
                                    new WeaponDTO(
                                            "Dagger",
                                            CharacterSpellTrait.AGILITY,
                                            Range.MELEE,
                                            new DamageDTO(
                                                    4,
                                                    1,
                                                    DamageType.PHYSICAL
                                            ),
                                            Burden.ONEHANDED,
                                            new FeatureDTO(
                                                    "Quick Throw",
                                                    "You can throw this dagger quickly, add +1 to your finesse when throwing."
                                            )
                                    )
                            ),
                            List.of(
                                    new ArmorDTO(
                                            "Leather Boots",
                                            2,
                                            10,
                                            1,
                                            new FeatureDTO(
                                                    "Silent Steps",
                                                    "These boots allow you to move silently, add +1 to your stealth."
                                            )
                                    )
                            )
                    ),
                    "Image data"
            );
            FeatureDTO feature1 = new FeatureDTO(
                    "half-blind",
                    "You wear glasses or lenses."
            );
            FeatureDTO feature2 = new FeatureDTO(
                    "Male pattern baldness",
                    "At least hair transplants are very effective nowadays."
            );
            FeatureDTO feature3 = new FeatureDTO(
                    "City Dweller",
                    "You are used to the hustle and bustle of city life add +1 to your evasion."
            );
            FeatureDTO feature4 = new FeatureDTO(
                    "Survivalist",
                    "You are skilled in surviving in the wilderness, add +1 to your survival checks."
            );
            FeatureDTO feature5 = new FeatureDTO(
               "Tracker",
                    "You can track creatures and find their trails."
            );
            FeatureDTO feature6 = new FeatureDTO(
                    "Survival",
                    "You are skilled in surviving in the wilderness, add +1 to your survival checks."
            );
            FeatureDTO feature7 = new FeatureDTO(
                    "Tracking",
                    "You can track creatures and find their trails."
            );
            FeatureDTO feature8 = new FeatureDTO(
                    "Summon Beast",
                    "Summon a beast companion to aid you in combat."
            );
            FeatureDTO feature9 = new FeatureDTO(
                    "Summon Beast better",
                    "Summon a beast companion to aid you in combat, but its better."
            );
            FeatureDTO feature10 = new FeatureDTO(
                    "Summon Beast best",
                    "Summon a beast companion to aid you in combat, but its even better."
            );
            FeatureDTO feature11 = new FeatureDTO(
                    "Pathfinder",
                    "You can find the best path through difficult terrain."
            );
            FeatureDTO feature12 = new FeatureDTO(
                    "Pathfinder better",
                    "You can find the best path through difficult terrain, but its better."
            );
            FeatureDTO feature13 = new FeatureDTO(
                    "Pathfinder best",
                    "You can find the best path through difficult terrain, but its even better."
            );
            FeatureDTO feature14 = new FeatureDTO(
                    "Silent Steps",
                    "These boots allow you to move silently, add +1 to your stealth."
            );
            FeatureDTO feature15 = new FeatureDTO(
                    "Quick Strike",
                    "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up."
            );
            FeatureDTO feature16 = new FeatureDTO(
                    "Lightweight",
                    "This armor is lightweight and allows for quick movement, add +1 to your evasion."
            );
            FeatureDTO feature17 = new FeatureDTO(
                    "Quick Throw",
                    "You can throw this dagger quickly, add +1 to your finesse when throwing."
            );
            AncestryDTO ancestry= new AncestryDTO(
                    "human",
                    "Human's are the reason for human error.",
                    new FeatureDTO(
                            "half-blind",
                            "You wear glasses or lenses."
                    ),
                    new FeatureDTO(
                            "Male pattern baldness",
                            "At least hair transplants are very effective nowadays."
                    )
            );
            CommunityDTO communityDTO = new CommunityDTO(
                    "The City",
                    "A place where people live together in a community.",
                    new FeatureDTO(
                            "City Dweller",
                            "You are used to the hustle and bustle of city life add +1 to your evasion."
                    )
            );
            DaggerheartClassDTO daggerheartClassDTO =
                    new DaggerheartClassDTO(
                            "Ranger",
                            "A master of the wilderness, skilled in tracking and survival.",
                            List.of(
                                    Domain.BONE,
                                    Domain.SAGE
                            ),
                            10,
                            6,
                            "A compass or a map that helps you navigate through the wilderness.",
                            List.of(
                                    new FeatureDTO(
                                            "Survivalist",
                                            "You are skilled in surviving in the wilderness, add +1 to your survival checks."
                                    ),
                                    new FeatureDTO(
                                            "Tracker",
                                            "You can track creatures and find their trails."
                                    )
                            ),
                            List.of(
                                    new FeatureDTO(
                                            "Survival",
                                            "You are skilled in surviving in the wilderness, add +1 to your survival checks."
                                    ),
                                    new FeatureDTO(
                                            "Tracking",
                                            "You can track creatures and find their trails."
                                    )
                            ),
                            List.of(
                                    new SubClassDTO(
                                            "Beastmaster",
                                            "A ranger who has a deep bond with a beast companion.",
                                            CharacterSpellTrait.AGILITY,
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast",
                                                            "Summon a beast companion to aid you in combat."
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast better",
                                                            "Summon a beast companion to aid you in combat, but its better."
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast best",
                                                            "Summon a beast companion to aid you in combat, but its even better."
                                                    )
                                            )
                                    ),
                                    new SubClassDTO(
                                            "Wayfinder",
                                            "A ranger who is skilled in navigation and exploration.",
                                            CharacterSpellTrait.AGILITY,
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder",
                                                            "You can find the best path through difficult terrain."
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder better",
                                                            "You can find the best path through difficult terrain, but its better."
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder best",
                                                            "You can find the best path through difficult terrain, but its even better."
                                                    )
                                            )
                                    )
                            )
            );
            ArmorDTO armorDTO =
                    new ArmorDTO(
                            "Leather Boots",
                            2,
                            10,
                            1,
                            new FeatureDTO(
                                    "Silent Steps",
                                    "These boots allow you to move silently, add +1 to your stealth."
                            )
            );
            ArmorDTO armorDTO2 =
            new ArmorDTO(
                    "Leather Armor",
                    6,
                    13,
                    3,
                    new FeatureDTO(
                            "Lightweight",
                            "This armor is lightweight and allows for quick movement, add +1 to your evasion."
                    )
            );
            WeaponDTO weaponDTO1 =
                    new WeaponDTO(
                            "Short Sword",
                            CharacterSpellTrait.AGILITY,
                            Range.MELEE,
                            new DamageDTO(
                                    6,
                                    1,
                                    DamageType.PHYSICAL
                            ),
                            Burden.ONEHANDED,
                            new FeatureDTO(
                                    "Quick Strike",
                                    "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up."
                            )
            );
            WeaponDTO weaponDTO2 =
            new WeaponDTO(
                            "Short Sword number 2",
                            CharacterSpellTrait.AGILITY,
                            Range.MELEE,
                            new DamageDTO(
                                    6,
                                    1,
                                    DamageType.PHYSICAL
                            ),
                            Burden.ONEHANDED,
                            new FeatureDTO(
                                    "Quick Strike",
                                    "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up."
                            )
            );
            WeaponDTO weaponDTO3 =
                    new WeaponDTO(
                            "Dagger",
                            CharacterSpellTrait.AGILITY,
                            Range.MELEE,
                            new DamageDTO(
                                    4,
                                    1,
                                    DamageType.PHYSICAL
                            ),
                            Burden.ONEHANDED,
                            new FeatureDTO(
                                    "Quick Throw",
                                    "You can throw this dagger quickly, add +1 to your finesse when throwing."
                            )
            );
            creatorService.saveCreator(new CreatorDTO("Maxi", "password", List.of(), List.of(), List.of(), List.of(), List.of(feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9, feature10, feature11, feature12, feature13, feature14, feature15, feature16, feature17), List.of()));
            creatorService.saveCreator(new CreatorDTO("Maxi", "password", List.of(armorDTO, armorDTO2), List.of(ancestry), List.of(communityDTO), List.of(daggerheartClassDTO), List.of(feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9, feature10, feature11, feature12, feature13, feature14, feature15, feature16, feature17), List.of(weaponDTO1, weaponDTO2, weaponDTO3)));
            System.out.println(creatorService.getCreator("Maxi", "password"));
            playerService.savePlayer(new PlayerDTO("Maximus", "password"));
            System.out.println(playerService.getPlayer("Maximus", "password"));
            //listof characters cannot fully save due to weapons not being saved because of the way creator is saved.
            playerService.savePlayer(new PlayerDTO("Massi", "password", List.of(characterDTO)));
            System.out.println(playerService.getPlayer("Massi", "password"));

            System.out.println(playerService.getCharacterById(1L));
            System.out.println(playerService.getClassById("Ranger"));
            System.out.println(playerService.getSubClassById("Wayfinder"));
            System.out.println(playerService.getSubClassById("Beastmaster"));
        };
    }
}
