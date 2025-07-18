package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.DaggerheartClass;
import dnd.perso.playerclient.modele.enums.Domain;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DaggerheartClassDTO {
    private String name;
    private String description;
    private List<Domain> domains;
    private int startingEvasion;
    private int startingHitPoints;
    private String classItem;
    private List<FeatureDTO> hopeFeatures;
    private List<FeatureDTO> classFeatures;
    private List<SubClassDTO> subClasses;
    public DaggerheartClass toModele(){
        return new DaggerheartClass(
                name,
                description,
                domains,
                startingEvasion,
                startingHitPoints,
                classItem,
                hopeFeatures.stream().map(FeatureDTO::toModele).toList(),
                classFeatures.stream().map(FeatureDTO::toModele).toList(),
                subClasses.stream().map(SubClassDTO::toModele).toList()
        );
    }
    public DaggerheartClassDTO(DaggerheartClass daggerheartClass) {
        this.name = daggerheartClass.getName();
        this.description = daggerheartClass.getDescription();
        this.domains = daggerheartClass.getDomains();
        this.startingEvasion = daggerheartClass.getStartingEvasion();
        this.startingHitPoints = daggerheartClass.getStartingHitPoints();
        this.classItem = daggerheartClass.getClassItem();
        this.hopeFeatures = daggerheartClass.getHopeIndependentFeatures().stream().map(FeatureDTO::new).toList();
        this.classFeatures = daggerheartClass.getClassIndependentFeatures().stream().map(FeatureDTO::new).toList();
        this.subClasses = daggerheartClass.getSubClasses().stream().map(SubClassDTO::new).toList();
    }
}
