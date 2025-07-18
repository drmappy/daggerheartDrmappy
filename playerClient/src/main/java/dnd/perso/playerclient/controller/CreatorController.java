package dnd.perso.playerclient.controller;

import dnd.perso.playerclient.service.CreatorService;
import dnd.perso.playerclient.service.dto.CreatorDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/get")
    public ResponseEntity<CreatorDTO> getProfile(@RequestBody CreatorDTO creatorDTO) {
        try {
            CreatorDTO creatorDTO0 = creatorService.getCreator(creatorDTO.getUsername(), creatorDTO.getPassword());
            return ResponseEntity.ok(creatorDTO0);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
