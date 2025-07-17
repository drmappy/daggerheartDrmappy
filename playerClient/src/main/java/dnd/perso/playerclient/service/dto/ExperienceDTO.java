package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Experience;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ExperienceDTO {
    private Long id;
    private String experience;
    private int modifier;
    public ExperienceDTO(String experience, int modifier) {
        this.experience = experience;
        this.modifier = modifier;
    }
    public Experience toModele() {
        return new Experience(
                experience,
                modifier
        );
    }
    public ExperienceDTO fromModele(Experience experience) {
        return new ExperienceDTO(
                experience.getId(),
                experience.getExperience(),
                experience.getModifier()
        );
    }
    public ExperienceDTO(Experience experience) {
        this.id = experience.getId();
        this.experience = experience.getExperience();
        this.modifier = experience.getModifier();
    }
}
