package dnd.perso.playerclient.service;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.modele.Player;
import dnd.perso.playerclient.repository.*;
import dnd.perso.playerclient.service.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlayerService {

    // Constructor
    private final DaggerheartCharacterRepository daggerheartCharacterRepository;
    private final DaggerheartClassRepository daggerheartClassRepository;
    private final SubclassRepository subclassRepository;
    private final AncestryRepository ancestryRepository;
    private final CommunityRepository communityRepository;
    private final FeatureRepository featureRepository;
    private final WeaponRepository weaponRepository;
    private final ArmorRepository armorRepository;
    private final ExperienceRepository experienceRepository;
    private final AccountRepository accountRepository;
    public PlayerService(
            DaggerheartCharacterRepository daggerheartCharacterRepository,
            DaggerheartClassRepository daggerheartClassRepository,
            SubclassRepository subclassRepository,
            AncestryRepository ancestryRepository,
            CommunityRepository communityRepository,
            FeatureRepository featureRepository,
            WeaponRepository weaponRepository,
            ArmorRepository armorRepository,
            ExperienceRepository experienceRepository,
            AccountRepository accountRepository
    ) {
        this.daggerheartCharacterRepository = daggerheartCharacterRepository;
        this.daggerheartClassRepository = daggerheartClassRepository;
        this.subclassRepository = subclassRepository;
        this.ancestryRepository = ancestryRepository;
        this.communityRepository = communityRepository;
        this.featureRepository = featureRepository;
        this.weaponRepository = weaponRepository;
        this.armorRepository = armorRepository;
        this.experienceRepository = experienceRepository;
        this.accountRepository = accountRepository;
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
    public void savePlayer(PlayerDTO playerDTO) throws Exception {
        try {
            accountRepository.save(playerDTO.toModele());
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public PlayerDTO getPlayerById(String username, String password) throws DatabaseError {
        try {
            return new PlayerDTO((Player) accountRepository.getByUsernameAndPassword(username, password));
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
    @Transactional
    public AncestryDTO getAncestryById(String name) throws DatabaseError {
        try {
            return ancestryRepository.findById(name)
                    .map(AncestryDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public CommunityDTO getCommunityById(String name) throws DatabaseError {
        try {
            return communityRepository.findById(name)
                    .map(CommunityDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public FeatureDTO getFeatureById(String name) throws DatabaseError {
        try {
            return featureRepository.findById(name)
                    .map(FeatureDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public WeaponDTO getWeaponById(String name) throws DatabaseError {
        try {
            return weaponRepository.findById(name)
                    .map(WeaponDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public ArmorDTO getArmorById(String name) throws DatabaseError {
        try {
            return armorRepository.findById(name)
                    .map(ArmorDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public ExperienceDTO getExperienceById(long id) throws DatabaseError {
        try {
            return experienceRepository.findById(id)
                    .map(ExperienceDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw e;
        }
    }
}
