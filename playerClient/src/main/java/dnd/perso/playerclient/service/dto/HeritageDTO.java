package dnd.perso.playerclient.service.dto;

import dnd.perso.playerclient.modele.Heritage;
import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HeritageDTO {
    private Long id;
    private AncestryDTO ancestry;
    private CommunityDTO community;
    private List<String> languages;
    public HeritageDTO(AncestryDTO ancestry, CommunityDTO community, List<String> languages) {
        this.ancestry = ancestry;
        this.community = community;
        this.languages = languages;
    }
    public Heritage toModele(){
        return new Heritage(
                ancestry.toModele(),
                community.toModele(),
                languages
        );
    }
    public HeritageDTO(Heritage heritage) {
        this.id = heritage.getId();
        this.ancestry = new AncestryDTO(heritage.getAncestry());
        this.community = new CommunityDTO(heritage.getCommunity());
        this.languages = heritage.getLanguages();
    }
}
