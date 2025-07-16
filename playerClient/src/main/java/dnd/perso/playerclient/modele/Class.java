package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.enums.Domain;

import java.util.List;

public class Class {
    private String name;
    private String description;
    private List<Domain> domains;
    private int startingEvasion;
    private int startingHitPoints;
    private String classItem;
    private List<Feature> hopeFeatures;
    private List<Feature> classFeatures;
    private SubClass subClass;
}
