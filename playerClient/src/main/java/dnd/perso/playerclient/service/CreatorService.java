package dnd.perso.playerclient.service;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.modele.Creator;
import dnd.perso.playerclient.repository.*;
import dnd.perso.playerclient.service.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CreatorService {
    // Constructor
    private final DaggerheartClassRepository daggerheartClassRepository;
    private final AncestryRepository ancestryRepository;
    private final CommunityRepository communityRepository;
    private final ArmorRepository armorRepository;
    private final WeaponRepository weaponRepository;
    private final FeatureRepository featureRepository;
    private final AccountRepository accountRepository;

    public CreatorService(
            DaggerheartClassRepository daggerheartClassRepository,
            AncestryRepository ancestryRepository,
            CommunityRepository communityRepository,
            ArmorRepository armorRepository,
            WeaponRepository weaponRepository,
            FeatureRepository featureRepository,
            AccountRepository accountRepository
    ) {
        this.daggerheartClassRepository = daggerheartClassRepository;
        this.ancestryRepository = ancestryRepository;
        this.communityRepository = communityRepository;
        this.armorRepository = armorRepository;
        this.weaponRepository = weaponRepository;
        this.featureRepository = featureRepository;
        this.accountRepository = accountRepository;
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
    }
    @Transactional
    public void saveClass(DaggerheartClassDTO daggerheartClassDTO) throws DatabaseError {
        try {
            daggerheartClassRepository.save(daggerheartClassDTO.toModele());
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public void saveAncestry(AncestryDTO ancestryDTO) throws DatabaseError {
        try {
            ancestryRepository.save(ancestryDTO.toModele());
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public void saveCommunity(CommunityDTO communityDTO) throws DatabaseError {
        try {
            communityRepository.save(communityDTO.toModele());
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public void saveArmor(ArmorDTO armorDTO) throws DatabaseError {
        try {
            armorRepository.save(armorDTO.toModele());
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public void saveWeapon(WeaponDTO weaponDTO) throws DatabaseError {
        try {
            weaponRepository.save(weaponDTO.toModele());
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public void saveFeature(FeatureDTO featureDTO) throws DatabaseError {
        try {
            featureRepository.save(featureDTO.toModele());
        } catch (Exception e) {
            throw e;
        }
    }
}
