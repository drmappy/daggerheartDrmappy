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
            creatorService.saveCreator(new CreatorDTO(null, "Maxi", "password", List.of(), List.of(), List.of(), List.of(), List.of(), List.of()));
            DaggerheartCharacterDTO characterDTO = new DaggerheartCharacterDTO("Massi",
                    "He/Him",
                    new HeritageDTO(
                            new AncestryDTO(
                                    "human",
                                    "Human's are the reason for human error.",
                                    new FeatureDTO(
                                            "half-blind",
                                            "You wear glasses or lenses.",
                                            FeatureType.ANCESTRY
                                            ),
                                    new FeatureDTO(
                                            "Male pattern baldness",
                                            "At least hair transplants are very effective nowadays.",
                                            FeatureType.ANCESTRY
                                            )
                            ),
                            new CommunityDTO(
                                    "The City",
                                    "A place where people live together in a community.",
                                    new FeatureDTO(
                                            "City Dweller",
                                            "You are used to the hustle and bustle of city life add +1 to your evasion.",
                                            FeatureType.COMMUNITY
                                            )
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
                                            "You are skilled in surviving in the wilderness, add +1 to your survival checks.",
                                            FeatureType.HOPE
                                    ),
                                    new FeatureDTO(
                                            "Tracker",
                                            "You can track creatures and find their trails.",
                                            FeatureType.HOPE
                                    )
                            ),
                            List.of(
                                    new FeatureDTO(
                                            "Survival",
                                            "You are skilled in surviving in the wilderness, add +1 to your survival checks.",
                                            FeatureType.CLASS
                                    ),
                                    new FeatureDTO(
                                            "Tracking",
                                            "You can track creatures and find their trails.",
                                            FeatureType.CLASS
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
                                                            "Summon a beast companion to aid you in combat.",
                                                            FeatureType.FOUNDATION
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast",
                                                            "Summon a beast companion to aid you in combat, but its better.",
                                                            FeatureType.SPECIALIZATION
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast",
                                                            "Summon a beast companion to aid you in combat, but its even better.",
                                                            FeatureType.MASTERY
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
                                                            "You can find the best path through difficult terrain.",
                                                            FeatureType.FOUNDATION
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder",
                                                            "You can find the best path through difficult terrain, but its better.",
                                                            FeatureType.SPECIALIZATION
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder",
                                                            "You can find the best path through difficult terrain, but its even better.",
                                                            FeatureType.MASTERY
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
                                            "You can find the best path through difficult terrain.",
                                            FeatureType.FOUNDATION
                                    )
                            ),
                            List.of(
                                    new FeatureDTO(
                                            "Pathfinder",
                                            "You can find the best path through difficult terrain, but its better.",
                                            FeatureType.SPECIALIZATION
                                    )
                            ),
                            List.of(
                                    new FeatureDTO(
                                            "Pathfinder",
                                            "You can find the best path through difficult terrain, but its even better.",
                                            FeatureType.MASTERY
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
                                            "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up.",
                                            FeatureType.WEAPON
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
                                            "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up.",
                                            FeatureType.WEAPON
                                    )
                            ),
                            new ArmorDTO(
                                    "Leather Armor",
                                    6,
                                    13,
                                    3,
                                    new FeatureDTO(
                                            "Lightweight",
                                            "This armor is lightweight and allows for quick movement, add +1 to your evasion.",
                                            FeatureType.ARMOR
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
                                                    "You can throw this dagger quickly, add +1 to your finesse when throwing.",
                                                    FeatureType.WEAPON
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
                                                    "These boots allow you to move silently, add +1 to your stealth.",
                                                    FeatureType.ARMOR
                                            )
                                    )
                            )
                    ),
                    "Image data"
            );
            AncestryDTO ancestry= new AncestryDTO(
                    "human",
                    "Human's are the reason for human error.",
                    new FeatureDTO(
                            "half-blind",
                            "You wear glasses or lenses.",
                            FeatureType.ANCESTRY
                    ),
                    new FeatureDTO(
                            "Male pattern baldness",
                            "At least hair transplants are very effective nowadays.",
                            FeatureType.ANCESTRY
                    )
            );
            CommunityDTO communityDTO = new CommunityDTO(
                    "The City",
                    "A place where people live together in a community.",
                    new FeatureDTO(
                            "City Dweller",
                            "You are used to the hustle and bustle of city life add +1 to your evasion.",
                            FeatureType.COMMUNITY
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
                                            "You are skilled in surviving in the wilderness, add +1 to your survival checks.",
                                            FeatureType.HOPE
                                    ),
                                    new FeatureDTO(
                                            "Tracker",
                                            "You can track creatures and find their trails.",
                                            FeatureType.HOPE
                                    )
                            ),
                            List.of(
                                    new FeatureDTO(
                                            "Survival",
                                            "You are skilled in surviving in the wilderness, add +1 to your survival checks.",
                                            FeatureType.CLASS
                                    ),
                                    new FeatureDTO(
                                            "Tracking",
                                            "You can track creatures and find their trails.",
                                            FeatureType.CLASS
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
                                                            "Summon a beast companion to aid you in combat.",
                                                            FeatureType.FOUNDATION
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast better",
                                                            "Summon a beast companion to aid you in combat, but its better.",
                                                            FeatureType.SPECIALIZATION
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Summon Beast best",
                                                            "Summon a beast companion to aid you in combat, but its even better.",
                                                            FeatureType.MASTERY
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
                                                            "You can find the best path through difficult terrain.",
                                                            FeatureType.FOUNDATION
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder better",
                                                            "You can find the best path through difficult terrain, but its better.",
                                                            FeatureType.SPECIALIZATION
                                                    )
                                            ),
                                            List.of(
                                                    new FeatureDTO(
                                                            "Pathfinder best",
                                                            "You can find the best path through difficult terrain, but its even better.",
                                                            FeatureType.MASTERY
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
                                    "These boots allow you to move silently, add +1 to your stealth.",
                                    FeatureType.ARMOR
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
                            "This armor is lightweight and allows for quick movement, add +1 to your evasion.",
                            FeatureType.ARMOR
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
                                    "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up.",
                                    FeatureType.WEAPON
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
                                    "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up.",
                                    FeatureType.WEAPON
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
                                    "You can throw this dagger quickly, add +1 to your finesse when throwing.",
                                    FeatureType.WEAPON
                            )
            );
            //Features
            FeatureDTO feat7 = new FeatureDTO(
                    "enigmatic",
                    "You are an enigma, add +1 to your stealth.",
                    FeatureType.ANCESTRY
            );
            FeatureDTO feat6 = new FeatureDTO(
                    "City Dweller",
                    "You are used to the hustle and bustle of city life add +1 to your evasion.",
                    FeatureType.COMMUNITY
            );

            FeatureDTO feat5 = new FeatureDTO(
                    "Male pattern baldness",
                    "At least hair transplants are very effective nowadays.",
                    FeatureType.ANCESTRY
            );
            FeatureDTO feat4 = new FeatureDTO(
                    "half-blind",
                    "You wear glasses or lenses.",
                    FeatureType.ANCESTRY
            );
            FeatureDTO feat3 = new FeatureDTO(
                            "Quick Throw",
                            "You can throw this dagger quickly, add +1 to your finesse when throwing.",
                            FeatureType.WEAPON
            );
            FeatureDTO feat2 = new FeatureDTO(
                            "Quick Strike",
                            "You can strike quickly with this weapon, add +1 to your finesse when bellow half your hit points rounded up.",
                            FeatureType.WEAPON
            );
            FeatureDTO feat1 = new FeatureDTO(
                            "Silent Steps",
                            "These boots allow you to move silently, add +1 to your stealth.",
                            FeatureType.ARMOR
            );

            FeatureDTO feat = new FeatureDTO(
                            "Lightweight",
                            "This armor is lightweight and allows for quick movement, add +1 to your evasion.",
                            FeatureType.ARMOR
            );
            creatorService.saveCreator(new CreatorDTO(1L, "Maxi", "password", List.of(), List.of(), List.of(), List.of(), List.of(), List.of(feat, feat1, feat2, feat3, feat4, feat5, feat6, feat7)));
            creatorService.saveCreator(new CreatorDTO(1L, "Maxi", "password", List.of(armorDTO, armorDTO2), List.of(ancestry), List.of(communityDTO), List.of(daggerheartClassDTO), List.of(weaponDTO1, weaponDTO2, weaponDTO3), List.of(feat, feat1, feat2, feat3)));

            System.out.println(creatorService.getCreator("Maxi", "password"));
            playerService.savePlayer(new PlayerDTO(null, "Maximus", "password"));
            System.out.println(playerService.getPlayer("Maximus", "password"));
            //listof characters cannot fully save due to weapons not being saved because of the way creator is saved.
            playerService.savePlayer(new PlayerDTO(null, "Massi", "password", List.of(characterDTO)));
            System.out.println(playerService.getPlayer("Massi", "password"));

            System.out.println(playerService.getCharacterById(1L));
            System.out.println(playerService.getClassById("Ranger"));
            System.out.println(playerService.getSubClassById("Wayfinder"));
            System.out.println(playerService.getSubClassById("Beastmaster"));
        };
    }
}
