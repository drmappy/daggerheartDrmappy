package dnd.perso.playerclient.service.dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchData {
    private List<SearchInfo> results;
    private int pages;
}
