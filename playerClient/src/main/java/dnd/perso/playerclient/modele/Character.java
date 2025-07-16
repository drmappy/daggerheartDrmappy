package dnd.perso.playerclient.modele;

import dnd.perso.playerclient.modele.heritage.Heritage;
import dnd.perso.playerclient.modele.heritage.Modifiers;

import java.util.HashMap;

public class Character {
    private String name;
    private String pronouns;

    private Heritage heritage;
    private Modifiers modifiers;
    private Class characterClass;


    private int stress;
    private int hope;
    private CharacterTraits traits;

    private Equipment equipment;

    private HashMap<String, Integer> experience;
    private Gold gold;
    private Inventory inventory;
    private String imageBinaryData;
}
