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
    private final FeatureRepository featureRepository;
    private final AccountRepository accountRepository;

    public CreatorService(
            FeatureRepository featureRepository,
            AccountRepository accountRepository
    ) {
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
    public void saveWeaponOrArmorFeature(FeatureDTO featureDTO, CreatorDTO creatorDTO) throws DatabaseError {
        try {
            accountRepository.getByUsernameAndPassword(creatorDTO.getUsername(), creatorDTO.getPassword());
            featureDTO.setCreatedBy(creatorDTO.getId());
            featureRepository.save(featureDTO.toModele());
        } catch (Exception e) {
            throw new DatabaseError();
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
}
