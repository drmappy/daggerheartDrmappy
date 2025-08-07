package dnd.perso.playerclient.modele;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Creator extends Account{
    @OneToMany(cascade = CascadeType.ALL)
    private List<Armor> armors;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Ancestry> ancestries;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Community> communities;
    @OneToMany(cascade = CascadeType.ALL)
    private List<DaggerheartClass> daggerheartClasses;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Weapon> weapons;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Feature> features;
    @OneToMany(cascade = CascadeType.ALL)
    private List<SubClass> subClasses;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Enemy> enemies;
    public Creator(Long id, String username, String password, List<Armor> armors, List<Ancestry> ancestries, List<Community> communities, List<DaggerheartClass> daggerheartClasses, List<Weapon> weapons, List<Feature> features, List<SubClass> subClasses, List<Enemy> enemies) {
        super(id, username, password);
        this.armors = armors;
        this.ancestries = ancestries;
        this.communities = communities;
        this.daggerheartClasses = daggerheartClasses;
        this.weapons = weapons;
        this.features = features;
        this.subClasses = subClasses;
        this.enemies = enemies;
    }

    public void addAncestry(Ancestry modele) {
        if (ancestries != null) {
            ancestries.add(modele);
        } else {
            ancestries = List.of(modele);
        }
    }

    public void addArmor(Armor modele) {
        if (armors != null) {
            armors.add(modele);
        } else {
            armors = List.of(modele);
        }
    }

    public void addDaggerheartClass(DaggerheartClass modele) {
        if (daggerheartClasses != null) {
            daggerheartClasses.add(modele);
        } else {
            daggerheartClasses = List.of(modele);
        }
    }

    public void addCommunity(Community modele) {
        if (communities != null) {
            communities.add(modele);
        } else {
            communities = List.of(modele);
        }
    }

    public void addFeature(Feature modele) {
        if (features != null) {
            features.add(modele);
        } else {
            features = List.of(modele);
        }
    }

    public void addWeapon(Weapon modele) {
        if (weapons != null) {
            weapons.add(modele);
        } else {
            weapons = List.of(modele);
        }
    }
    public void addSubClass(SubClass modele) {
        if (subClasses != null) {
            subClasses.add(modele);
        } else {
            subClasses = List.of(modele);
        }
    }
    public void addEnemy(Enemy modele) {
        if (enemies != null) {
            enemies.add(modele);
        } else {
            enemies = List.of(modele);
        }
    }
}
