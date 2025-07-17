package dnd.perso.playerclient.service;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.repository.*;
import dnd.perso.playerclient.service.dto.DaggerheartCharacterDTO;
import dnd.perso.playerclient.service.dto.DaggerheartClassDTO;
import dnd.perso.playerclient.service.dto.SubClassDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class Player {

    // Constructor
    private final DaggerheartCharacterRepository daggerheartCharacterRepository;
    private final DaggerheartClassRepository daggerheartClassRepository;
    private final SubclassRepository subclassRepository;
    private final AncestryRepository ancestryRepository;
    private final CommunityRepository communityRepository;
    public Player(
            DaggerheartCharacterRepository daggerheartCharacterRepository,
            DaggerheartClassRepository daggerheartClassRepository,
            SubclassRepository subclassRepository,
            AncestryRepository ancestryRepository,
            CommunityRepository communityRepository
    ) {
        this.daggerheartCharacterRepository = daggerheartCharacterRepository;
        this.daggerheartClassRepository = daggerheartClassRepository;
        this.subclassRepository = subclassRepository;
        this.ancestryRepository = ancestryRepository;
        this.communityRepository = communityRepository;
    }

    // Methods
    @Transactional
    public DaggerheartClassDTO getClassById(String name) throws DatabaseError {
        try {
            return daggerheartClassRepository.findById(name)
                    .map(DaggerheartClassDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public SubClassDTO getSubClassById(String name) throws DatabaseError {
        try {
            return subclassRepository.findById(name)
                    .map(SubClassDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public void saveCharacter(DaggerheartCharacterDTO characterDTO) throws Exception {
        try {
            daggerheartCharacterRepository.save(characterDTO.toModele(characterDTO));
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public DaggerheartCharacterDTO getCharacterById(long id) throws DatabaseError {
        try {
            return daggerheartCharacterRepository.findById(id)
                    .map(DaggerheartCharacterDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw e;
        }
    }
}
