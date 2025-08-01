package dnd.perso.playerclient.repository;

import dnd.perso.playerclient.modele.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CreatorRepository extends JpaRepository<Creator, Long> {
    @Query("select c.daggerheartClasses from Creator c where c.username = ?1 and c.password = ?2")
    List<DaggerheartClass> findClassesByUsernameAndPassword(String username, String password);
    @Query("select c.subClasses from Creator c where c.username = ?1 and c.password = ?2")
    List<SubClass> findSubClassesByUsernameAndPassword(String username, String password);
    @Query("select c.weapons from Creator c where c.username = ?1 and c.password = ?2")
    List<Weapon> findWeaponsByUsernameAndPassword(String username, String password);
    @Query("select c.armors from Creator c where c.username = ?1 and c.password = ?2")
    List<Armor> findArmorByUsernameAndPassword(String username, String password);
    @Query("select c.features from Creator c where c.username = ?1 and c.password = ?2")
    List<Feature> findFeatureByUsernameAndPassword(String username, String password);
    @Query("select c.communities from Creator c where c.username = ?1 and c.password = ?2")
    List<Community> findCommunityByUsernameAndPassword(String username, String password);
    @Query("select c.ancestries from Creator c where c.username = ?1 and c.password = ?2")
    List<Ancestry> findAncestriesByUsernameAndPassword(String username, String password);
}
