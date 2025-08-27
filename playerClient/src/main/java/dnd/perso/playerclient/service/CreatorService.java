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
    private final DamageThresholdRepository damageThresholdRepository;
    private final DomainCardsRepository domainCardsRepository;

    public CreatorService(
            AccountRepository accountRepository,
            DaggerheartClassRepository daggerheartClassRepository,
            CreatorRepository creatorRepository,
            AncestryRepository ancestryRepository, SubclassRepository subclassRepository, CommunityRepository communityRepository, FeatureRepository featureRepository, WeaponRepository weaponRepository, ArmorRepository armorRepository, EnemyRepository enemyRepository, DamageThresholdRepository damageThresholdRepository, DomainCardsRepository domainCardsRepository) {
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
        this.damageThresholdRepository = damageThresholdRepository;
        this.domainCardsRepository = domainCardsRepository;
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
            if (ancestryDTO.getId() == null) {
                creator.addAncestry(ancestryDTO.toModele());
            } else {
                Ancestry managedAncestry = ancestryRepository.findById(ancestryDTO.getId()).orElse(null);
                managedAncestry.setName(ancestryDTO.getName());
                managedAncestry.setDescription(ancestryDTO.getDescription());
                managedAncestry.setFeature1(ancestryDTO.getFeature1().toModele());
                managedAncestry.setFeature2(ancestryDTO.getFeature2().toModele());
            }
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveArmor(ArmorDTO armorDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            if (armorDTO.getId() == null) {
                creator.addArmor(armorDTO.toModele());
            } else{
                Armor managedArmor = armorRepository.findById(armorDTO.getId()).orElse(null);
                managedArmor.setName(armorDTO.getName());
                managedArmor.setBaseArmorScore(armorDTO.getBaseArmorScore());
                managedArmor.setMinorToMajor(armorDTO.getMinorToMajor());
                managedArmor.setMajorToSevere(armorDTO.getMajorToSevere());
                managedArmor.setFeature(armorDTO.getFeature() != null ? armorDTO.getFeature().toModele() : null);
            }
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveDaggerheartClass(DaggerheartClassDTO daggerheartClassDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            if (daggerheartClassDTO.getId() == null) {
                creator.addDaggerheartClass(daggerheartClassDTO.toModele());
            } else {
                DaggerheartClass managedClass = daggerheartClassRepository.findById(daggerheartClassDTO.getId()).orElse(null);
                managedClass.setName(daggerheartClassDTO.getName());
                managedClass.setDescription(daggerheartClassDTO.getDescription());
                managedClass.setDomains(daggerheartClassDTO.getDomains());
                managedClass.setStartingEvasion(daggerheartClassDTO.getStartingEvasion());
                managedClass.setStartingHitPoints(daggerheartClassDTO.getStartingHitPoints());
                managedClass.setClassItem(daggerheartClassDTO.getClassItem());
                managedClass.setHopeFeatures(daggerheartClassDTO.getHopeFeatures().stream().map(FeatureDTO::toModele).toList());
                managedClass.setClassFeatures(daggerheartClassDTO.getClassFeatures().stream().map(FeatureDTO::toModele).toList());
            }
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveCommunity(CommunityDTO communityDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            if(communityDTO.getId() == null) {
                creator.addCommunity(communityDTO.toModele());
            } else {
                Community managedCommunity = communityRepository.findById(communityDTO.getId()).orElse(null);
                managedCommunity.setName(communityDTO.getName());
                managedCommunity.setDescription(communityDTO.getDescription());
                managedCommunity.setFeature(communityDTO.getFeature().toModele());
            }
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveFeature(FeatureDTO featureDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            if (featureDTO.getId() == null) {
                creator.addFeature(featureDTO.toModele());
            } else {
                Feature managedFeature = featureRepository.findById(featureDTO.getId()).orElse(null);
                managedFeature.setName(featureDTO.getName());
                managedFeature.setDescription(featureDTO.getDescription());
                managedFeature.setType(featureDTO.getType());
            }
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveWeapon(WeaponDTO weaponDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            if(weaponDTO.getId() == null) {
                creator.addWeapon(weaponDTO.toModele());
            } else {
                Weapon managedWeapon = weaponRepository.findById(weaponDTO.getId()).orElse(null);
                managedWeapon.setName(weaponDTO.getName());
                managedWeapon.setBurden(weaponDTO.getBurden());
                managedWeapon.setTier(weaponDTO.getTier());
                managedWeapon.setTrait(weaponDTO.getTrait());
                managedWeapon.setRange(weaponDTO.getRange());
                managedWeapon.setDamage(weaponDTO.getDamage().toModele());
                managedWeapon.setFeature(weaponDTO.getFeature() != null ? weaponDTO.getFeature().toModele() : null);
            }
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveSubClass(SubClassDTO subClassDTO, String username, String password, String className) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            DaggerheartClass daggerheartClass = daggerheartClassRepository.findByName(className);
            if (subClassDTO.getId() == null) {
                SubClass subClass = subClassDTO.toModele();
                subClass.setDaggerheartClass(daggerheartClass.getName());
                subClass = subclassRepository.save(subClass);
                creator.addSubClass(subClass);
                daggerheartClass.getSubClasses().add(subClass);
            } else {
                SubClass managedSubClass = subclassRepository.findById(subClassDTO.getId()).orElse(null);
                if(managedSubClass.getClass() != subClassDTO.toModele().getClass()){
                    DaggerheartClass oldClass = daggerheartClassRepository.findByName(managedSubClass.getDaggerheartClass());
                    oldClass.getSubClasses().remove(managedSubClass);
                    daggerheartClass.getSubClasses().add(managedSubClass);
                    daggerheartClassRepository.save(oldClass);
                }
                managedSubClass.setName(subClassDTO.getName());
                managedSubClass.setDescription(subClassDTO.getDescription());
                managedSubClass.setSpellcastingTrait(subClassDTO.getSpellCastingTrait());
                managedSubClass.setFoundationFeatures(subClassDTO.getFoundationFeatures().stream().map(FeatureDTO::toModele).toList());
                managedSubClass.setSpecializationFeatures(subClassDTO.getSpecializationFeatures().stream().map(FeatureDTO::toModele).toList());
                managedSubClass.setMasteryFeatures(subClassDTO.getMasteryFeatures().stream().map(FeatureDTO::toModele).toList());
                managedSubClass.setDaggerheartClass(daggerheartClass.getName());
            }
            daggerheartClassRepository.save(daggerheartClass);
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public void saveEnemy(EnemyDTO enemyDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            if(enemyDTO.getId() == null) {
                creator.addEnemy(enemyDTO.toModele());
            } else {
                Enemy enemyToMod = enemyRepository.findById(enemyDTO.getId()).orElse(null);
                enemyToMod.setName(enemyDTO.getName());
                enemyToMod.setDescription(enemyDTO.getDescription());
                enemyToMod.setTier(enemyDTO.getTier());
                enemyToMod.setType(enemyDTO.getType());
                enemyToMod.setDifficulty(enemyDTO.getDifficulty());
                enemyToMod.setHitPoints(enemyDTO.getHitPoints());
                enemyToMod.setStress(enemyDTO.getStress());
                enemyToMod.setAttackModifier(enemyDTO.getAttackModifier());
                DamageThreshold damageThreshold = damageThresholdRepository.getById(enemyDTO.getDamageThreshold().getId());
                damageThreshold.setMinorToMajor(damageThreshold.getMinorToMajor());
                damageThreshold.setMajorToSevere(damageThreshold.getMajorToSevere());
                enemyToMod.setExperience(enemyDTO.getExperience());
                enemyToMod.setFeatures(enemyDTO.getFeatures());
            }
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    public void saveDomainCard(DomainCardDTO domainCardDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            if (domainCardDTO.getId() == null) {
                creator.getDomainCards().add(domainCardDTO.toModele());
            }else{
                DomainCard managedDomainCard = domainCardsRepository.findById(domainCardDTO.getId()).orElse(null);
                managedDomainCard.setName(domainCardDTO.getName());
                managedDomainCard.setDescription(domainCardDTO.getDescription());
                managedDomainCard.setDomain(domainCardDTO.getDomain());
                managedDomainCard.setCardType(domainCardDTO.getCardType());
                managedDomainCard.setLevel(domainCardDTO.getLevel());
            }
            accountRepository.save(creator);
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
    @Transactional
    public List<String> getDomainCardsNames(String username, String password) throws DatabaseError {
        try {
            return creatorRepository.findDomainCardsByUsernameAndPassword(username, password)
                    .stream()
                    .map(DomainCard::getName)
                    .toList();
        } catch (Exception e) {
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
    public DomainCardDTO getDomainCardDTOByName(String name) throws DatabaseError {
        try {
            DomainCard domainCard = domainCardsRepository.findByName(name);
            if (domainCard != null) {
                return new DomainCardDTO(domainCard);
            } else {
                throw new DatabaseError();
            }
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
