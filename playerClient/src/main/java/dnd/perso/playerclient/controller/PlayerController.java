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
    @PostMapping("get")
    public ResponseEntity<PlayerDTO> getPlayer(@RequestBody PlayerDTO playerDTO) {
        try {
            PlayerDTO player = playerService.getPlayer(playerDTO.getUsername(), playerDTO.getPassword());
            System.out.println("Player retrieved: " + player);
            return ResponseEntity.ok(player);
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
}
