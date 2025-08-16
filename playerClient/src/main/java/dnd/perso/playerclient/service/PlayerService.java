package dnd.perso.playerclient.service;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.modele.DaggerheartCharacter;
import dnd.perso.playerclient.modele.Player;
import dnd.perso.playerclient.repository.*;
import dnd.perso.playerclient.service.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerService {
    private final int PAGE_LIMIT = 10;
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
    private final PlayerRepository playerRepository;
    private final EnemyRepository enemyRepository;

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
            AccountRepository accountRepository,
            PlayerRepository playerRepository,
            EnemyRepository enemyRepository) {
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
        this.playerRepository = playerRepository;
        this.enemyRepository = enemyRepository;
    }

    // Methods
    @Transactional
    public DaggerheartClassDTO getClassByName(String name) throws DatabaseError {
        try {
            return new DaggerheartClassDTO(daggerheartClassRepository.findByName(name));
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public SubClassDTO getSubClassByName(String name) throws DatabaseError {
        try {
            return new SubClassDTO(subclassRepository.findByName(name));
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
    public AncestryDTO getAncestryByName(String name) throws DatabaseError {
        try {
            return new AncestryDTO(ancestryRepository.findByName(name));
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public CommunityDTO getCommunityByName(String name) throws DatabaseError {
        try {
            return new CommunityDTO(communityRepository.findByName(name));
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public FeatureDTO getFeatureByName(String name) throws DatabaseError {
        try {
            return new FeatureDTO(featureRepository.findByName(name));
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public WeaponDTO getWeaponByName(String name) throws DatabaseError {
        try {
            return new WeaponDTO(weaponRepository.findByName(name));
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public ArmorDTO getArmorByName(String name) throws DatabaseError {
        try {
            return new ArmorDTO(armorRepository.findByName(name));
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
            return daggerheartClassRepository.findByName(className)
                    .getSubClasses().stream()
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
            Player player = getPlayer(username, password).toModele();
            if (player == null) {
                throw new DatabaseError();
            }
            DaggerheartCharacter character = characterDTO.toModele(characterDTO);
            player.addCharacter(character);
            playerRepository.save(player);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            throw new Exception(e);
        }
    }
    @Transactional
    public String[] getCharacterNames(String username, String password) throws DatabaseError {
        try {
            Player player = getPlayer(username, password).toModele();
            if (player == null) {
                throw new DatabaseError();
            }
            return player.getCharacters().stream()
                    .map(DaggerheartCharacter::getName)
                    .toArray(String[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public DaggerheartCharacterDTO getCharacterByName(String name, String username, String password) throws DatabaseError {
        try {
            List<DaggerheartCharacter> characters = playerRepository.getCharactersByUsernameAndPassword(username, password);
            return characters.stream()
                    .filter(character -> character.getName().equals(name))
                    .findFirst()
                    .map(DaggerheartCharacterDTO::new)
                    .orElseThrow(DatabaseError::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public SearchData search(String name, int page, String[] objectsToSearch) {
        List<SearchInfo> results = new ArrayList<>();
        try {
            for (String objectType : objectsToSearch) {
                switch (objectType) {
                    case "CLASS":
                        daggerheartClassRepository.findByNameContaining(name)
                                .forEach(c -> results.add(new SearchInfo(c.getName(), "class")));
                        break;
                    case "SUBCLASS":
                        subclassRepository.findByNameContaining(name)
                                .forEach(sc -> results.add(new SearchInfo(sc.getName(), "subclass")));
                        break;
                    case "ANCESTRY":
                        ancestryRepository.findByNameContaining(name)
                                .forEach(a -> results.add(new SearchInfo(a.getName(), "ancestry")));
                        break;
                    case "COMMUNITY":
                        communityRepository.findByNameContaining(name)
                                .forEach(c -> results.add(new SearchInfo(c.getName(), "community")));
                        break;
                    case "FEATURE":
                        featureRepository.findByNameContaining(name)
                                .forEach(f -> results.add(new SearchInfo(f.getName(), "feature")));
                        break;
                    case "WEAPON":
                        weaponRepository.findByNameContaining(name)
                                .forEach(w -> results.add(new SearchInfo(w.getName(), "weapon")));
                        break;
                    case "ARMOR":
                        armorRepository.findByNameContaining(name)
                                .forEach(a -> results.add(new SearchInfo(a.getName(), "armor")));
                        break;
                    case "ENEMY":
                        enemyRepository.findByNameContaining(name)
                                .forEach(e -> results.add(new SearchInfo(e.getName(), "enemy")));
                        break;
                    default:
                        break;
                }
            }
        } catch (Exception e) {
            throw e;
        }
        int fromIndex = Math.min(page * PAGE_LIMIT, results.size());
        int toIndex = Math.min(fromIndex + PAGE_LIMIT, results.size());
        List<SearchInfo> infoToSend = results.subList(fromIndex, toIndex);
        return new SearchData(infoToSend, results.size()/ PAGE_LIMIT + (results.size() % PAGE_LIMIT == 0 ? 0 : 1));
    }

    public FeatureDTO[] getAllFeaturesByType(String featureType) throws DatabaseError{
        try {
            return featureRepository.findByType(featureType).stream()
                    .map(FeatureDTO::new)
                    .toArray(FeatureDTO[]::new);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
}
