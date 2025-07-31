package dnd.perso.playerclient.controller;

import dnd.perso.playerclient.modele.enums.CharacterSpellTrait;
import dnd.perso.playerclient.modele.enums.Domain;
import dnd.perso.playerclient.service.CreatorService;
import dnd.perso.playerclient.service.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/get")
    public ResponseEntity<CreatorDTO> getProfile(@RequestBody CreatorDTO creatorDTO) {
        try {
            CreatorDTO sentCreator = creatorService.getCreator(creatorDTO.getUsername(), creatorDTO.getPassword());
            return ResponseEntity.ok(sentCreator);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/myClasses")
    public ResponseEntity<List<DaggerheartClassDTO>> getMyClasses(@RequestBody CreatorDTO creatorDTO) {
        try {
            CreatorDTO sentCreator = creatorService.getCreator(creatorDTO.getUsername(), creatorDTO.getPassword());
            List<DaggerheartClassDTO> classes = sentCreator.getDaggerheartClasses();
            return ResponseEntity.ok(classes);
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
}
