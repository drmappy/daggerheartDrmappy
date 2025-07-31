package dnd.perso.playerclient.service;

import dnd.perso.playerclient.exception.DatabaseError;
import dnd.perso.playerclient.modele.Creator;
import dnd.perso.playerclient.modele.DaggerheartClass;
import dnd.perso.playerclient.modele.SubClass;
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

    public CreatorService(
            AccountRepository accountRepository,
            DaggerheartClassRepository daggerheartClassRepository) {
        this.accountRepository = accountRepository;
        this.daggerheartClassRepository = daggerheartClassRepository;
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
    public void saveAncestry(AncestryDTO ancestryDTO, String username, String password) throws DatabaseError {
        try {
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            creator.addAncestry(ancestryDTO.toModele());
            accountRepository.save(creator);
        } catch (Exception e) {
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
            Creator creator = (Creator) accountRepository.getByUsernameAndPassword(username, password);
            creator.addSubClass(subClassDTO.toModele());
            accountRepository.save(creator);
            DaggerheartClass daggerheartClass = daggerheartClassRepository.findById(className).orElse(null);
            if (daggerheartClass != null) {
                List<SubClass> subClasses = daggerheartClass.getSubClasses();
                subClasses.add(subClassDTO.toModele());
                daggerheartClass.setSubClasses(subClasses);
                daggerheartClassRepository.save(daggerheartClass);
            } else {
                throw new DatabaseError();
            }
        } catch (Exception e) {
            throw new DatabaseError();
        }
    }
}
