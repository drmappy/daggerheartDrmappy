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
    private List<IndependentFeature> independentFeatures;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Weapon> weapons;
    public Creator(String username, String password, List<Armor> armors, List<Ancestry> ancestries, List<Community> communities, List<DaggerheartClass> daggerheartClasses, List<IndependentFeature> independentFeatures, List<Weapon> weapons) {
        super(username, password);
        this.armors = armors;
        this.ancestries = ancestries;
        this.communities = communities;
        this.daggerheartClasses = daggerheartClasses;
        this.independentFeatures = independentFeatures;
        this.weapons = weapons;
    }
}
