package dnd.perso.playerclient.service;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.repository.*;
import dnd.perso.playerclient.service.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class Creator {
    // Constructor
    private final DaggerheartClassRepository daggerheartClassRepository;
    private final AncestryRepository ancestryRepository;
    private final CommunityRepository communityRepository;
    private final ArmorRepository armorRepository;
    private final WeaponRepository weaponRepository;
    private final FeatureRepository featureRepository;

    public Creator(
            DaggerheartClassRepository daggerheartClassRepository,
            AncestryRepository ancestryRepository,
            CommunityRepository communityRepository,
            ArmorRepository armorRepository,
            WeaponRepository weaponRepository,
            FeatureRepository featureRepository) {
        this.daggerheartClassRepository = daggerheartClassRepository;
        this.ancestryRepository = ancestryRepository;
        this.communityRepository = communityRepository;
        this.armorRepository = armorRepository;
        this.weaponRepository = weaponRepository;
        this.featureRepository = featureRepository;
    }

    // Methods
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
