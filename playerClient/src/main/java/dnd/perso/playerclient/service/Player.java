package dnd.perso.playerclient.service;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.repository.DaggerheartCharacterRepository;
import dnd.perso.playerclient.service.dto.DaggerheartCharacterDTO;
import org.springframework.stereotype.Service;

@Service
public class Player {

    // Constructor
    private final DaggerheartCharacterRepository daggerheartCharacterRepository;
    public Player(
            DaggerheartCharacterRepository daggerheartCharacterRepository
    ) {
        this.daggerheartCharacterRepository = daggerheartCharacterRepository;
    }

    // Methods
    public void saveCharacter(DaggerheartCharacterDTO characterDTO) throws DatabaseError {
        try {
            daggerheartCharacterRepository.save(characterDTO.toModele(characterDTO));
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }

    public DaggerheartCharacterDTO getCharacterById() throws DatabaseError {
        try {
            return daggerheartCharacterRepository.findById(1L)
                    .map(DaggerheartCharacterDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }

}
