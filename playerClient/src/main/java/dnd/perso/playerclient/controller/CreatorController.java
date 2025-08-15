package dnd.perso.playerclient.controller;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import dnd.perso.playerclient.modele.enums.Domain;
import dnd.perso.playerclient.modele.enums.EnemyType;
import dnd.perso.playerclient.modele.enums.Tier;
import dnd.perso.playerclient.service.CreatorService;
import dnd.perso.playerclient.service.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/creator")
@CrossOrigin(origins = "http://localhost:5173")
public class CreatorController {
    private final CreatorService creatorService;
    public CreatorController(CreatorService creatorService) {
        this.creatorService = creatorService;
    }
    @PostMapping("/save")
    public ResponseEntity<Void> signup(@RequestBody CreatorDTO creatorDTO) {
        try{
            creatorService.saveCreator(creatorDTO);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save/ancestry")
    public ResponseEntity<Void> saveAncestry(@RequestBody AncestryDTO ancestryDTO, @RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.saveAncestry(ancestryDTO, username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save/armor")
    public ResponseEntity<Void> saveArmor(@RequestBody ArmorDTO armorDTO, @RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.saveArmor(armorDTO, username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save/class")
    public ResponseEntity<Void> saveClass(@RequestBody DaggerheartClassDTO daggerheartClassDTO, @RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.saveDaggerheartClass(daggerheartClassDTO, username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save/subclass")
    public ResponseEntity<Void> saveSubClass(@RequestBody SubClassDTO subClassDTO, @RequestHeader String username, @RequestHeader String password, @RequestHeader String className) {
        try {
            creatorService.saveSubClass(subClassDTO, username, password, className);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save/community")
    public ResponseEntity<Void> saveCommunity(@RequestBody CommunityDTO communityDTO, @RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.saveCommunity(communityDTO, username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save/feature")
    public ResponseEntity<Void> saveFeature(@RequestBody FeatureDTO featureDTO, @RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.saveFeature(featureDTO, username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save/weapon")
    public ResponseEntity<Void> saveWeapon(@RequestBody WeaponDTO weaponDTO, @RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.saveWeapon(weaponDTO, username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save/enemy")
    public ResponseEntity<Void> saveEnemy(@RequestBody EnemyDTO enemyDTO, @RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.saveEnemy(enemyDTO, username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/get")
    public ResponseEntity<CreatorDTO> getProfile(@RequestBody CreatorDTO creatorDTO) {
        try {
            CreatorDTO sentCreator = creatorService.getCreator(creatorDTO.getUsername(), creatorDTO.getPassword());
            return ResponseEntity.ok(sentCreator);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("confirmation")
    public ResponseEntity<Void> confirmCreator(@RequestHeader String username, @RequestHeader String password) {
        try {
            System.out.println(username + " " + password);
            creatorService.getCreator(username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/myClassesNames")
    public ResponseEntity<List<String>> getMyClasses(@RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.getCreator(username, password);
            List<String> classes = creatorService.getDaggerheartClassesNames(username, password);
            return ResponseEntity.ok(classes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/mySubClassesNames")
    public ResponseEntity<List<String>> getMySubClasses(@RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.getCreator(username, password);
            List<String> subClasses = creatorService.getSubclassesNames(username, password);
            return ResponseEntity.ok(subClasses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/myAncestriesNames")
    public ResponseEntity<List<String>> getMyAncestries(@RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.getCreator(username, password);
            List<String> ancestries = creatorService.getAncestriesNames(username, password);
            return ResponseEntity.ok(ancestries);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/myCommunitiesNames")
    public ResponseEntity<List<String>> getMyCommunities(@RequestHeader String username, @RequestHeader String password) {
          try {
                creatorService.getCreator(username, password);
                List<String> communities = creatorService.getCommunitiesNames(username, password);
                return ResponseEntity.ok(communities);
          } catch (Exception e) {
                return ResponseEntity.badRequest().build();
          }
     }
    @GetMapping("/myFeaturesNames")
    public ResponseEntity<List<String>> getMyFeatures(@RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.getCreator(username, password);
            List<String> features = creatorService.getFeaturesNames(username, password);
            return ResponseEntity.ok(features);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/myWeaponsNames")
    public ResponseEntity<List<String>> getMyWeapons(@RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.getCreator(username, password);
            List<String> weapons = creatorService.getWeaponsNames(username, password);
            return ResponseEntity.ok(weapons);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/myArmorsNames")
    public ResponseEntity<List<String>> getMyArmors(@RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.getCreator(username, password);
            List<String> armors = creatorService.getArmorsNames(username, password);
            return ResponseEntity.ok(armors);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/myEnemiesNames")
    public ResponseEntity<List<String>> getAllEnemies(@RequestHeader String username, @RequestHeader String password) {
        try {
            creatorService.getCreator(username, password);
            List<String> enemies = creatorService.getEnemyNames(username, password);
            return ResponseEntity.ok(enemies);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/allDomains")
    public ResponseEntity<List<Domain>> getAllDomains() {
        try {
            List<Domain> domains = List.of(Domain.values());
            return ResponseEntity.ok(domains);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/getAllCharacterSpellTraits")
    public ResponseEntity<List<CharacterSpellTrait>> getAllCharacterSpellTraits() {
        try {
            List<CharacterSpellTrait> spellTraits = List.of(CharacterSpellTrait.values());
            return ResponseEntity.ok(spellTraits);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("ancestry/{name}")
    public ResponseEntity<AncestryDTO> getAncestryByName(@PathVariable String name) {
        try {
            String decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
            AncestryDTO ancestry = creatorService.getAncestryByName(decodedName);
            return ResponseEntity.ok(ancestry);
        } catch (Exception e) {;
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("class/{name}")
    public ResponseEntity<DaggerheartClassDTO> getDaggerheartClassByName(@PathVariable String name) {
        try {
            String decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
            DaggerheartClassDTO daggerheartClass = creatorService.getDaggerheartClassByName(decodedName);
            return ResponseEntity.ok(daggerheartClass);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("subclass/{name}")
    public ResponseEntity<SubClassDTO> getSubClassByName(@PathVariable String name) {
        try {
            String decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
            SubClassDTO subClass = creatorService.getSubClassByName(decodedName);
            return ResponseEntity.ok(subClass);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("community/{name}")
    public ResponseEntity<CommunityDTO> getCommunityByName(@PathVariable String name) {
        try {
            String decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
            CommunityDTO community = creatorService.getCommunityByName(decodedName);
            return ResponseEntity.ok(community);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("feature/{name}")
    public ResponseEntity<FeatureDTO> getFeatureByName(@PathVariable String name) {
        try {
            String decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
            FeatureDTO feature = creatorService.getFeatureByName(decodedName);
            return ResponseEntity.ok(feature);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("weapon/{name}")
    public ResponseEntity<WeaponDTO> getWeaponByName(@PathVariable String name) {
        try {
            String decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
            WeaponDTO weapon = creatorService.getWeaponByName(decodedName);
            return ResponseEntity.ok(weapon);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("armor/{name}")
    public ResponseEntity<ArmorDTO> getArmorByName(@PathVariable String name) {
        try {
            String decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
            ArmorDTO armor = creatorService.getArmorByName(decodedName);
            return ResponseEntity.ok(armor);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/enemy/{name}")
    public ResponseEntity<EnemyDTO> getEnemyByName(@PathVariable String name) {
        try {
            String decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
            EnemyDTO enemy = creatorService.getEnemyByName(decodedName);
            return ResponseEntity.ok(enemy);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/types")
    public ResponseEntity<List<EnemyType>> getAllTypes() {
        try {
            List<EnemyType> enemyTypes = List.of(EnemyType.values());
            return ResponseEntity.ok(enemyTypes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/tiers")
    public ResponseEntity<List<Tier>> getAllTiers() {
        try {
            List<Tier> tiers = List.of(Tier.values());
            return ResponseEntity.ok(tiers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
