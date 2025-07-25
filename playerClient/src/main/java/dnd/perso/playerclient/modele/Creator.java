package dnd.perso.playerclient.modele;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

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
    public Creator(Long id, String username, String password, List<Armor> armors, List<Ancestry> ancestries, List<Community> communities, List<DaggerheartClass> daggerheartClasses, List<Weapon> weapons, List<Feature> features) {
        super(id, username, password);
        this.armors = armors;
        this.ancestries = ancestries;
        this.communities = communities;
        this.daggerheartClasses = daggerheartClasses;
        this.weapons = weapons;
        this.features = features;
    }
}
