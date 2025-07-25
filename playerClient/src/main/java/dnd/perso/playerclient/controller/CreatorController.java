package dnd.perso.playerclient.controller;

import dnd.perso.playerclient.service.CreatorService;
import dnd.perso.playerclient.service.dto.CreatorDTO;
import dnd.perso.playerclient.service.dto.DaggerheartClassDTO;
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
        System.out.println("Received creatorDTO: " + creatorDTO);
        try{
            creatorService.saveCreator(creatorDTO);
            return ResponseEntity.ok().build();
        }catch (Exception e){
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
}
