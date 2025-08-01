package dnd.perso.playerclient.controller;

import dnd.perso.playerclient.service.PlayerService;
import dnd.perso.playerclient.service.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/player")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {
    private final PlayerService playerService;
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }
    @PostMapping("/save")
    public ResponseEntity<Void> player(@RequestBody PlayerDTO playerDTO) {
        try {
            playerService.savePlayer(playerDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save/character")
    public ResponseEntity<Void> saveCharacter(@RequestBody DaggerheartCharacterDTO characterDTO, @RequestHeader String username, @RequestHeader String password) {
        try {
            playerService.saveCharacter(characterDTO, username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("character/{name}")
    public ResponseEntity<DaggerheartCharacterDTO> getCharacter(@PathVariable String name, @RequestHeader String username, @RequestHeader String password) {
        try {
            DaggerheartCharacterDTO character = playerService.getCharacterByName(name, username, password);
            return ResponseEntity.ok(character);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("get")
    public ResponseEntity<PlayerDTO> getPlayer(@RequestBody PlayerDTO playerDTO) {
        try {
            PlayerDTO player = playerService.getPlayer(playerDTO.getUsername(), playerDTO.getPassword());
            return ResponseEntity.ok(player);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("confirmation")
    public ResponseEntity<Void> confirmPlayer(@RequestHeader String username, @RequestHeader String password) {
        try {
            playerService.getPlayer(username, password);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("characterNames")
    public ResponseEntity<String[]> getCharacterNames(@RequestHeader String username, @RequestHeader String password) {
        try {
            String[] characterNames = playerService.getCharacterNames(username, password);
            return ResponseEntity.ok(characterNames);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/class/{name}")
    public ResponseEntity<DaggerheartClassDTO> getDaggerHeartClass(@PathVariable String name) {
        try{
            return ResponseEntity.ok().body(playerService.getClassById(name));
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/subclass/{name}")
    public ResponseEntity<SubClassDTO> getSubClass(@PathVariable String name) {
        try{
            return ResponseEntity.ok().body(playerService.getSubClassById(name));
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/profile")
    public ResponseEntity<PlayerDTO> getPlayerProfile(@RequestBody PlayerDTO playerDTO) {
        try {
            PlayerDTO player = playerService.getPlayer(playerDTO.getUsername(), playerDTO.getPassword());
            return ResponseEntity.ok(player);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/characterVue")
    public ResponseEntity<DaggerheartCharacterDTO> getCharacterVue(@RequestBody Long id) {
        try {
            DaggerheartCharacterDTO character = playerService.getCharacterById(id);
            return ResponseEntity.ok(character);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/ancestry")
    public ResponseEntity<AncestryDTO>getAncestry(@RequestBody String name) {
        try {
            AncestryDTO ancestry = playerService.getAncestryById(name);
            return ResponseEntity.ok(ancestry);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/community")
    public ResponseEntity<CommunityDTO> getCommunity(@RequestBody String name){
        try {
            CommunityDTO community = playerService.getCommunityById(name);
            return ResponseEntity.ok(community);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/feature")
    public ResponseEntity<FeatureDTO> getFeature(@RequestBody String name){
        try {
            FeatureDTO feature = playerService.getFeatureById(name);
            return ResponseEntity.ok(feature);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/weapon")
    public ResponseEntity<WeaponDTO> getWeapon(@RequestBody String name) {
        try {
            WeaponDTO weapon = playerService.getWeaponById(name);
            return ResponseEntity.ok(weapon);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/armor")
    public ResponseEntity<ArmorDTO> getArmor(@RequestBody String name) {
        try {
            ArmorDTO armor = playerService.getArmorById(name);
            return ResponseEntity.ok(armor);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/experience")
    public ResponseEntity<ExperienceDTO> getExperience(@RequestBody Long id) {
        try {
            ExperienceDTO experience = playerService.getExperienceById(id);
            return ResponseEntity.ok(experience);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/allAncestries")
    public ResponseEntity<AncestryDTO[]> getAllAncestries() {
        try {
            AncestryDTO[] ancestries = playerService.getAllAncestries();
            return ResponseEntity.ok(ancestries);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/allClasses")
    public ResponseEntity<DaggerheartClassDTO[]> getAllClasses() {
        try {
            DaggerheartClassDTO[] classes = playerService.getAllClasses();
            return ResponseEntity.ok(classes);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/allSubClasses")
    public ResponseEntity<SubClassDTO[]> getAllSubClasses() {
        try {
            SubClassDTO[] subClasses = playerService.getAllSubClasses();
            return ResponseEntity.ok(subClasses);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/allCommunities")
    public ResponseEntity<CommunityDTO[]> getAllCommunities() {
        try {
            CommunityDTO[] communities = playerService.getAllCommunities();
            return ResponseEntity.ok(communities);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/allWeapons")
    public ResponseEntity<WeaponDTO[]> getAllWeapons() {
        try {
            WeaponDTO[] weapons = playerService.getAllWeapons();
            return ResponseEntity.ok(weapons);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/allArmors")
    public ResponseEntity<ArmorDTO[]> getAllArmors() {
        try {
            ArmorDTO[] armors = playerService.getAllArmors();
            return ResponseEntity.ok(armors);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{className}/subClasses")
    public ResponseEntity<SubClassDTO[]> getSubClassesByClass(@PathVariable String className) {
        try {
            SubClassDTO[] subClasses = playerService.getSubClassesByClass(className);
            return ResponseEntity.ok(subClasses);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("allFeatures")
    public ResponseEntity<FeatureDTO[]> getAllFeatures() {
        try {
            FeatureDTO[] features = playerService.getAllFeatures();
            return ResponseEntity.ok(features);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
