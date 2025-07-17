package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.DaggerheartCharacter;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DaggerheartCharacterDTO {
    private Long id;
    private String name;
    private String pronouns;
    private HeritageDTO heritage;
    private ModifiersDTO modifiers;
    private DaggerheartClassDTO characterClass;
    private SubClassDTO subClass;
    private int stress;
    private CharacterTraitsDTO traits;
    private EquipmentDTO equipement;
    private List<ExperienceDTO> experiences;
    private GoldDTO gold;
    private InventoryDTO inventory;
    private String imageBinaryData;

    public DaggerheartCharacter toModele(DaggerheartCharacterDTO daggerheartCharacterDTO) {
        return new DaggerheartCharacter(
                name,
                pronouns,
                heritage.toModele(),
                modifiers.toModele(),
                characterClass.toModele(),
                subClass.toModele(),
                stress,
                traits.toModele(),
                equipement.toModele(),
                experiences.stream().map(ExperienceDTO::toModele).toList(),
                gold.toModele(),
                inventory.toModele(),
                imageBinaryData
        );
    }
    public DaggerheartCharacterDTO(DaggerheartCharacter daggerheartCharacter) {
        this.id = daggerheartCharacter.getId();
        this.name = daggerheartCharacter.getName();
        this.pronouns = daggerheartCharacter.getPronouns();
        this.heritage = new HeritageDTO(daggerheartCharacter.getHeritage());
        this.modifiers = new ModifiersDTO(daggerheartCharacter.getModifiers());
        this.characterClass = new DaggerheartClassDTO(daggerheartCharacter.getCharacterClass());
        this.subClass = new SubClassDTO(daggerheartCharacter.getSubClass());
    }
}
