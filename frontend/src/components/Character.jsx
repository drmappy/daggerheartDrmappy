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
            <p>Armor: {character.modifiers.armor + character.equipment.activeArmor?.baseArmorScore || ""}</p>
            <p>
                Damage Threshold: Minor to Major: {(character.modifiers.damageThreshold?.minorToMajor ?? 0) + (character.equipment.activeArmor?.minorToMajor ?? 0)}, Major to Severe: {(character.modifiers.damageThreshold?.majorToSevere ?? 0) + (character.equipment.activeArmor?.majorToSevere ?? 0)}            </p>
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
                <strong>{character.equipment.primary?.name ?? ""}</strong> - Trait: {character.equipment.primary?.trait ?? ""}, Range: {character.equipment.primary?.range ?? ""}, Damage: {character.equipment.primary?.damage?.baseDamage ?? 0}d{character.equipment.primary?.damage?.dieSize ?? 0} ({character.equipment.primary?.damage?.damageType ?? ""})            </p>
            <p>
                {character.equipment.primary?.feature?.name ?? ""}: {character.equipment.primary?.feature?.description ?? ""}
            </p>
            <h3>Secondary Weapon</h3>
            <p>
                <strong>{character.equipment.secondary?.name ?? ""}</strong> - Trait: {character.equipment.secondary?.trait ?? ""}, Range: {character.equipment.secondary?.range ?? ""}, Damage: {character.equipment.secondary?.damage?.baseDamage ?? 0}d{character.equipment.secondary?.damage?.dieSize ?? 0} ({character.equipment.secondary?.damage?.damageType ?? ""})
            </p>
            <p>
                {character.equipment.secondary?.feature?.name ?? ""}: {character.equipment.secondary?.feature?.description ?? ""}
            </p>
            <h3>Active Armor</h3>
            <p>
                <strong>{character.equipment.activeArmor?.name ?? ""}</strong> - Base Armor Score: {character.equipment.activeArmor?.baseArmorScore ?? 0}, Minor to Major: {character.equipment.activeArmor?.minorToMajor ?? 0}, Major to Severe: {character.equipment.activeArmor?.majorToSevere ?? 0}
            </p>
            <p>
                {character.equipment.activeArmor?.feature?.name ?? ""}: {character.equipment.activeArmor?.feature?.description ?? ""}
            </p>
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