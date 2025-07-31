package dnd.perso.playerclient.service;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.modele.DaggerheartCharacter;
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
    public PlayerDTO getPlayer(String username, String password) throws DatabaseError {
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
    @Transactional
    public AncestryDTO[] getAllAncestries() throws DatabaseError {
        try {
            return ancestryRepository.findAll().stream()
                    .map(AncestryDTO::new)
                    .toArray(AncestryDTO[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public DaggerheartClassDTO[] getAllClasses() throws DatabaseError {
        try {
            return daggerheartClassRepository.findAll().stream()
                    .map(DaggerheartClassDTO::new)
                    .toArray(DaggerheartClassDTO[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public SubClassDTO[] getAllSubClasses() throws DatabaseError {
        try {
            return subclassRepository.findAll().stream()
                    .map(SubClassDTO::new)
                    .toArray(SubClassDTO[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public CommunityDTO[] getAllCommunities() throws DatabaseError {
        try {
            return communityRepository.findAll().stream()
                    .map(CommunityDTO::new)
                    .toArray(CommunityDTO[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public WeaponDTO[] getAllWeapons() throws DatabaseError {
        try {
            return weaponRepository.findAll().stream()
                    .map(WeaponDTO::new)
                    .toArray(WeaponDTO[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public ArmorDTO[] getAllArmors() throws DatabaseError {
        try {
            return armorRepository.findAll().stream()
                    .map(ArmorDTO::new)
                    .toArray(ArmorDTO[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public SubClassDTO[] getSubClassesByClass(String className) throws DatabaseError {
        try {
            return daggerheartClassRepository.findByName(className).stream()
                    .flatMap(daggerheartClass -> daggerheartClass.getSubClasses().stream())
                    .map(SubClassDTO::new)
                    .toArray(SubClassDTO[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public FeatureDTO[] getAllFeatures() throws DatabaseError {
        try {
            return featureRepository.findAll().stream()
                    .map(FeatureDTO::new)
                    .toArray(FeatureDTO[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveCharacter(DaggerheartCharacterDTO characterDTO, String username, String password) throws Exception {
        try {
            Player player = (Player) accountRepository.getByUsernameAndPassword(username, password);
            if (player == null) {
                throw new DatabaseError();
            }
            DaggerheartCharacter character = characterDTO.toModele(characterDTO);
            player.addCharacter(character);
            daggerheartCharacterRepository.save(character);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
