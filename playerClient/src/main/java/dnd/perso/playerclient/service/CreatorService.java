package dnd.perso.playerclient.service;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.modele.*;
import dnd.perso.playerclient.repository.*;
import dnd.perso.playerclient.service.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CreatorService {
    // Constructor
    private final AccountRepository accountRepository;
    private final DaggerheartClassRepository daggerheartClassRepository;
    private final CreatorRepository creatorRepository;
    private final AncestryRepository ancestryRepository;
    private final SubclassRepository subclassRepository;
    private final CommunityRepository communityRepository;
    private final FeatureRepository featureRepository;
    private final WeaponRepository weaponRepository;
    private final ArmorRepository armorRepository;
    private final EnemyRepository enemyRepository;

    public CreatorService(
            AccountRepository accountRepository,
            DaggerheartClassRepository daggerheartClassRepository,
            CreatorRepository creatorRepository,
            AncestryRepository ancestryRepository, SubclassRepository subclassRepository, CommunityRepository communityRepository, FeatureRepository featureRepository, WeaponRepository weaponRepository, ArmorRepository armorRepository, EnemyRepository enemyRepository) {
        this.accountRepository = accountRepository;
        this.daggerheartClassRepository = daggerheartClassRepository;
        this.creatorRepository = creatorRepository;
        this.ancestryRepository = ancestryRepository;
        this.subclassRepository = subclassRepository;
        this.communityRepository = communityRepository;
        this.featureRepository = featureRepository;
        this.weaponRepository = weaponRepository;
        this.armorRepository = armorRepository;
        this.enemyRepository = enemyRepository;
    }

    // Methods
    @Transactional
    public void saveCreator(CreatorDTO creatorDTO) throws DatabaseError {
        try {
            accountRepository.save(creatorDTO.toModele());
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public CreatorDTO getCreator(String username, String password) throws DatabaseError {
        try {
            return new CreatorDTO((Creator) accountRepository.getByUsernameAndPassword(username, password));
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }// Java
    @Transactional
    public void saveAncestry(AncestryDTO ancestryDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);

            Ancestry ancestry;
            if (ancestryDTO.getId() != null) {
                ancestry = ancestryRepository.findById(ancestryDTO.getId())
                        .orElseGet(() -> ancestryDTO.toModele());
            } else {
                ancestry = ancestryDTO.toModele();
            }

            ancestry.setName(ancestryDTO.getName());
            ancestry.setDescription(ancestryDTO.getDescription());
            // ... update other fields as needed
            if (creator.getAncestries().stream().noneMatch(a -> a.getId().equals(ancestry.getId()))) {
                creator.addAncestry(ancestry);
                accountRepository.save(creator);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveArmor(ArmorDTO armorDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            creator.addArmor(armorDTO.toModele());
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveDaggerheartClass(DaggerheartClassDTO daggerheartClassDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            creator.addDaggerheartClass(daggerheartClassDTO.toModele());
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveCommunity(CommunityDTO communityDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            creator.addCommunity(communityDTO.toModele());
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveFeature(FeatureDTO featureDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            creator.addFeature(featureDTO.toModele());
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveWeapon(WeaponDTO weaponDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            creator.addWeapon(weaponDTO.toModele());
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveSubClass(SubClassDTO subClassDTO, String username, String password, String className) throws DatabaseError {
        try {
            SubClass subClass = subClassDTO.toModele();
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            creator.addSubClass(subClass);
            accountRepository.save(creator);
            DaggerheartClass daggerheartClass = daggerheartClassRepository.findByName(className);
            if (daggerheartClass != null) {
                List<SubClass> subClasses = daggerheartClass.getSubClasses();
                creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
                List<SubClass> creatorSubClasses = creator.getSubClasses();
                subClasses.add((creatorSubClasses.stream().filter(subClass1 -> subClass1.getName().equals(subClassDTO.getName())).findFirst().get()));
                daggerheartClass.setSubClasses(subClasses);
                daggerheartClassRepository.save(daggerheartClass);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveEnemy(EnemyDTO enemyDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            creator.addEnemy(enemyDTO.toModele());
            accountRepository.save(creator);
        } catch (Exception e) {
            e.printStackTrace();
            throw new DatabaseError();
        }
    }
    @Transactional
    public List<String> getDaggerheartClassesNames(String username, String password) throws DatabaseError {
        try{
            return creatorRepository.findClassesByUsernameAndPassword(username, password)
                    .stream()
                    .map(DaggerheartClass::getName)
                    .toList();
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public List<String> getSubclassesNames(String username, String password) throws DatabaseError {
        try {
            return creatorRepository.findSubClassesByUsernameAndPassword(username, password)
                    .stream()
                    .map(SubClass::getName)
                    .toList();
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public List<String> getAncestriesNames(String username, String password) throws DatabaseError {
        try {
            return creatorRepository.findAncestriesByUsernameAndPassword(username, password)
                    .stream()
                    .map(Ancestry::getName)
                    .toList();
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public List<String> getCommunitiesNames(String username, String password) throws DatabaseError {
        try {
            return creatorRepository.findCommunityByUsernameAndPassword(username, password)
                    .stream()
                    .map(Community::getName)
                    .toList();
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public List<String> getFeaturesNames(String username, String password) throws DatabaseError {
        try {
            return creatorRepository.findFeatureByUsernameAndPassword(username, password)
                    .stream()
                    .map(Feature::getName)
                    .toList();
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public List<String> getWeaponsNames(String username, String password) throws DatabaseError {
        try {
            return creatorRepository.findWeaponsByUsernameAndPassword(username, password)
                    .stream()
                    .map(Weapon::getName)
                    .toList();
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public List<String> getArmorsNames(String username, String password) throws DatabaseError {
        try {
            return creatorRepository.findArmorByUsernameAndPassword(username, password)
                    .stream()
                    .map(Armor::getName)
                    .toList();
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public List<String> getEnemyNames(String username, String password) throws DatabaseError {
        try {
            return creatorRepository.findEnemiesByUsernameAndPassword(username, password)
                    .stream()
                    .map(Enemy::getName)
                    .toList();
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public AncestryDTO getAncestryByName(String name) throws DatabaseError {
        try {
            Ancestry ancestry = ancestryRepository.findByName(name);
            if (ancestry != null) {
                return new AncestryDTO(ancestry);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public DaggerheartClassDTO getDaggerheartClassByName(String name) throws DatabaseError {
        try {
            DaggerheartClass daggerheartClass = daggerheartClassRepository.findByName(name);
            if (daggerheartClass != null) {
                return new DaggerheartClassDTO(daggerheartClass);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public SubClassDTO getSubClassByName(String name) throws DatabaseError {
        try {
            SubClass subClass = subclassRepository.findByName(name);
            if (subClass != null) {
                return new SubClassDTO(subClass);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public CommunityDTO getCommunityByName(String name) throws DatabaseError {
        try {
            Community community = communityRepository.findByName(name);
            if (community != null) {
                return new CommunityDTO(community);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public FeatureDTO getFeatureByName(String name) throws DatabaseError {
        try {
            Feature feature = featureRepository.findByName(name);
            if (feature != null) {
                return new FeatureDTO(feature);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public WeaponDTO getWeaponByName(String name) throws DatabaseError {
        try {
            Weapon weapon = weaponRepository.findByName(name);
            if (weapon != null) {
                return new WeaponDTO(weapon);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public ArmorDTO getArmorByName(String name) throws DatabaseError {
        try {
            Armor armor = armorRepository.findByName(name);
            if (armor != null) {
                return new ArmorDTO(armor);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public EnemyDTO getEnemyByName(String name) throws DatabaseError {
        try {
            Enemy enemy = enemyRepository.findByName(name);
            if (enemy != null) {
                return new EnemyDTO(enemy);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
}
