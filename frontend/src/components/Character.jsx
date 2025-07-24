import React, { useState, useEffect } from 'react';

function Character() {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const char = JSON.parse(localStorage.getItem('CurrentCharacter'));
            if (char) {
                setCharacter(char);
            } else {
                setError('No character found.');
            }
        } catch (e) {
            setError('Failed to load character.');
        }
        setLoading(false);
    }, []);

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading character...</p>;
    if (!character) return null;

    return (
        <div>
            <h1>{character.name}</h1>
            <p>Pronouns: {character.pronouns}</p>
            <p>Ancestry: {character.heritage.ancestry.name}</p>
            <p>Community: {character.heritage.community.name}</p>
            <p>Languages: {character.heritage.languages.join(', ')}</p>
            <p>Class: {character.characterClass.name}</p>
            <p>SubClass: {character.subClass.name}</p>
            <p>Traits</p>
            <ul>
                <li>agility: {character.traits.agility}</li>
                <li>strength: {character.traits.strength}</li>
                <li>instinct: {character.traits.instinct}</li>
                <li>knowledge: {character.traits.knowledge}</li>
                <li>presence: {character.traits.presence}</li>
                <li>strength: {character.traits.strength}</li>
            </ul>
            <p>HP: {character.modifiers.hp + character.characterClass.startingHitPoints}</p>
            <p>Stress: {character.stress}</p>
            <p>Hope: {character.modifiers.hope}</p>
            <p>Evasion: {character.modifiers.evasion + character.characterClass.startingEvasion}</p>
            <p>Armor: {character.modifiers.armor + character.equipement.activeArmor.baseArmorScore}</p>
            <p>
                Damage Threshold: Minor to Major: {character.modifiers.damageThreshold.minorToMajor + character.equipement.activeArmor.minorToMajor}, Major to Severe: {character.modifiers.damageThreshold.majorToSevere + character.equipement.activeArmor.majorToSevere}
            </p>
            <h2>Class Features</h2>
            <ul>
                {character.characterClass.classFeatures.map((feature, index) => (
                    <li key={index}>
                        <strong>{feature.name}:</strong> {feature.description}
                    </li>
                ))}
            </ul>
            <h2>Hope Features</h2>
            <ul>
                {character.characterClass.hopeFeatures.map((feature, index) => (
                    <li key={index}>
                        <strong>{feature.name}:</strong> {feature.description}
                    </li>
                ))}
            </ul>
            <h2>SubClass Features</h2>
            <ul>
                {character.subClass.foundationFeatures.map((feature, index) => (
                    <li key={index}>
                        foundation feature:<br/>
                        <strong>{feature.name}:</strong> {feature.description}
                    </li>
                ))}
                {character.subClass.specializationFeatures.map((feature, index) => (
                    <li key={index}>
                        specialization feature:<br/>
                        <strong>{feature.name}:</strong> {feature.description}
                    </li>
                ))}
                {character.subClass.masteryFeatures.map((feature, index) => (
                    <li key={index}>
                        mastery feature:<br/>
                        <strong>{feature.name}:</strong> {feature.description}
                    </li>
                ))}
            </ul>
            <h2>Heritage Features</h2>
            <ul>
                {character.heritage.ancestry.feature1 && (
                    <li>
                        <strong>{character.heritage.ancestry.feature1.name}:</strong> {character.heritage.ancestry.feature1.description}
                    </li>
                )}
                {character.heritage.ancestry.feature2 && (
                    <li>
                        <strong>{character.heritage.ancestry.feature2.name}:</strong> {character.heritage.ancestry.feature2.description}
                    </li>
                )}
                {character.heritage.community.feature && (
                    <li>
                        <strong>{character.heritage.community.feature.name}:</strong> {character.heritage.community.feature.description}
                    </li>
                )}
            </ul>
            <h2>Equipment</h2>
            <h3>Primary Weapon</h3>
            <p>
                <strong>{character.equipement.primary.name}</strong> - Trait: {character.equipement.primary.trait}, Range: {character.equipement.primary.range}, Damage: {character.equipement.primary.damage.baseDamage}d{character.equipement.primary.damage.dieSize} ({character.equipement.primary.damage.damageType})
            </p>
            <p>{character.equipement.primary.feature.name}: {character.equipement.primary.feature.description}</p>
            <h3>Secondary Weapon</h3>
            <p>
                <strong>{character.equipement.secondary.name}</strong> - Trait: {character.equipement.secondary.trait}, Range: {character.equipement.secondary.range}, Damage: {character.equipement.secondary.damage.baseDamage}d{character.equipement.secondary.damage.dieSize} ({character.equipement.secondary.damage.damageType})
            </p>
            <p>{character.equipement.secondary.feature.name}: {character.equipement.secondary.feature.description}</p>
            <h3>Active Armor</h3>
            <p>
                <strong>{character.equipement.activeArmor.name}</strong> - Base Armor Score: {character.equipement.activeArmor.baseArmorScore}, Minor to Major: {character.equipement.activeArmor.minorToMajor}, Major to Severe: {character.equipement.activeArmor.majorToSevere}
            </p>
            <p>{character.equipement.activeArmor.feature.name}: {character.equipement.activeArmor.feature.description}</p>

            <h2>Inventory</h2>
            <h3>Items</h3>
            <ul>
                {character.inventory.items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h3>Weapons</h3>
            <ul>
                {character.inventory.weapons.map((weapon, index) => (
                    <li key={index}>
                        <strong>{weapon.name}</strong> - Trait: {weapon.trait}, Range: {weapon.range}, Damage: {weapon.damage.baseDamage}d{weapon.damage.dieSize} ({weapon.damage.damageType})
                        <p>{weapon.feature.name}: {weapon.feature.description}</p>
                    </li>
                ))}
            </ul>
            <h3>Armors</h3>
            <ul>
                {character.inventory.armors.map((armor, index) => (
                    <li key={index}>
                        <strong>{armor.name}</strong> - Base Armor Score: {armor.baseArmorScore}, Minor to Major: {armor.minorToMajor}, Major to Severe: {armor.majorToSevere}
                        <p>{armor.feature.name}: {armor.feature.description}</p>
                    </li>
                ))}
            </ul>
            <h2>Gold</h2>
            <ul>
                <li>Handfuls: {character.gold.handfuls}</li>
                <li>Bags: {character.gold.bags}</li>
                <li>Chest: {character.gold.chest}</li>
            </ul>
            <h2>Experiences</h2>
            <ul>{character.experiences.map((exp, index) => (
            <li key={index}>
                    <strong>{exp.experience}</strong> +{exp.modifier}
                </li>
            ))}
            </ul>
        </div>
    );
}
export default Character;