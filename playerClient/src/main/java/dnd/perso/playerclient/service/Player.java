package dnd.perso.playerclient.service;

import dnd.perso.playerclient.repository.*;
import org.springframework.stereotype.Service;

@Service
public class Player {
    private final DaggerheartCharacterRepository daggerheartCharacterRepository;
    private final DamageThresholdRepository damageThresholdRepository;
    private final EquipementRepository equipementRepository;
    private final ExperienceRepository experienceRepository;

    public Player(DaggerheartCharacterRepository daggerheartCharacterRepository,
                  DamageThresholdRepository damageThresholdRepository) {
        this.daggerheartCharacterRepository = daggerheartCharacterRepository;
        this.damageThresholdRepository = damageThresholdRepository;
    }

}
