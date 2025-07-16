package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.CharacterTrait;

import java.util.List;

public class SubClass {
    private String name;
    private String description;
    private CharacterTrait spellcastingTrait;

    private List<Feature> foundationFeatures;
    private List<Feature> specializationFeatures;
    private List<Feature> masteryFeatures;
}
