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
            // Create a default creator
            CreatorDTO creatorDTO = new CreatorDTO(
                    "a",
                    "a",
                    List.of(),
                    List.of(),
                    List.of(),
                    List.of(),
                    List.of(),
                    List.of(),
                    List.of(),
                    List.of()
            );
            creatorService.saveCreator(creatorDTO);

            FeatureDTO featureDTOAncestry = new FeatureDTO(
                    "ancestry feature",
                    "description of ancestry feature",
                    FeatureType.ANCESTRY
            );
            creatorService.saveFeature(featureDTOAncestry, creatorDTO.getUsername(), creatorDTO.getPassword());

            FeatureDTO featureDTOAncestry1 = new FeatureDTO(
                    "ancestry feature1.0",
                    "description of ancestry feature",
                    FeatureType.ANCESTRY
            );
            creatorService.saveFeature(featureDTOAncestry1, creatorDTO.getUsername(), creatorDTO.getPassword());

            FeatureDTO featureDTOCommunity = new FeatureDTO(
                    "community feature",
                    "description of community feature",
                    FeatureType.COMMUNITY
            );
            creatorService.saveFeature(featureDTOCommunity, creatorDTO.getUsername(), creatorDTO.getPassword());

            AncestryDTO ancestryDTO = new AncestryDTO(
                    null,
                    "Ancestry",
                    "description of ancestry",
                    creatorService.getFeatureByName(featureDTOAncestry.getName()),
                    creatorService.getFeatureByName(featureDTOAncestry1.getName())
            );
            creatorService.saveAncestry(ancestryDTO, creatorDTO.getUsername(), creatorDTO.getPassword());

            CommunityDTO communityDTO = new CommunityDTO(
                    "Community",
                    "description of community",
                    creatorService.getFeatureByName(featureDTOCommunity.getName())
            );
            creatorService.saveCommunity(communityDTO, creatorDTO.getUsername(), creatorDTO.getPassword());

            DaggerheartClassDTO daggerheartClassDTO = new DaggerheartClassDTO(
                    null,
                    "Class",
                    "description of class",
                    List.of(Domain.BLADE, Domain.ARCANA),
                    12,
                    4,
                    "class items",
                    List.of(),
                    List.of(),
                    List.of()
            );
            creatorService.saveDaggerheartClass(daggerheartClassDTO, creatorDTO.getUsername(), creatorDTO.getPassword());

            SubClassDTO subClassDTO = new SubClassDTO(
                    null,
                    "SubClass",
                    "description of subclass",
                    CharacterSpellTrait.AGILITY,
                    List.of(),
                    List.of(),
                    List.of()
            );
            creatorService.saveSubClass(subClassDTO, creatorDTO.getUsername(), creatorDTO.getPassword(), daggerheartClassDTO.getName());
        };
    }
}
