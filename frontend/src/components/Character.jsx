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
            <p>HP: {character.modifiers.hp + character.characterClass.startingHitPoints}</p>
            <p>Stress: {character.stress}</p>
            <p>Hope: {character.modifiers.hope}</p>
            <p>Evasion: {character.modifiers.evasion + character.characterClass.startingEvasion}</p>
            <p>Armor: {character.modifiers.armor}</p>
            <p>
                Damage Threshold: Minor to Major: {character.modifiers.damageThreshold.minorToMajor}, Major to Severe: {character.modifiers.damageThreshold.majorToSevere}
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
                        <strong>{feature.name}:</strong> {feature.description}
                    </li>
                ))}
                {character.subClass.specializationFeatures.map((feature, index) => (
                    <li key={index}>
                        <strong>{feature.name}:</strong> {feature.description}
                    </li>
                ))}
                {character.subClass.masteryFeatures.map((feature, index) => (
                    <li key={index}>
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
        </div>
    );
}

export default Character;
// {
//     "id": 1,
//     "name": "Massi",
//     "pronouns": "He/Him",
//     "heritage": {
//     "id": 1,
//         "ancestry": {
//         "name": "human",
//             "description": "Human's are the reason for human error.",
//             "feature1": {
//             "name": "half-blind",
//                 "description": "You wear glasses or lenses.",
//                 "type": "ANCESTRY",
//                 "createdBy": null
//         },
//         "feature2": {
//             "name": "Male pattern baldness",
//                 "description": "At least hair transplants are very effective nowadays.",
//                 "type": "ANCESTRY",
//                 "createdBy": null
//         }
//     },
//     "community": {
//         "name": "The City",
//             "description": "A place where people live together in a community.",
//             "feature": {
//             "name": "City Dweller",
//                 "description": "You are used to the hustle and bustle of city life add +1 to your evasion.",
//                 "type": "COMMUNITY",
//                 "createdBy": null
//         }
//     },
//     "languages": [
//         "english",
//         "french",
//         "polish"
//     ]
// },
//     "modifiers": {
//     "id": 1,
//         "evasion": 1,
//         "armor": 0,
//         "damageThreshold": {
//         "id": 1,
//             "minorToMajor": 0,
//             "majorToSevere": 0
//     },
//     "hp": 0,
//         "stress": 0,
//         "hope": 0
// },
//     "characterClass": {
//     "name": "Ranger",
//         "description": "A master of the wilderness, skilled in tracking and survival.",
//         "domains": [
//         "BONE",
//         "SAGE"
//     ],
//         "startingEvasion": 10,
//         "startingHitPoints": 6,
//         "classItem": "A compass or a map that helps you navigate through the wilderness.",
//         "hopeFeatures": [
//         {
//             "name": "Survivalist",
//             "description": "You are skilled in surviving in the wilderness, add +1 to your survival checks.",
//             "type": "HOPE",
//             "createdBy": null
//         },
//         {
//             "name": "Tracker",
//             "description": "You can track creatures and find their trails.",
//             "type": "HOPE",
//             "createdBy": null
//         }
//     ],
//         "classFeatures": [
//         {
//             "name": "Survival",
//             "description": "You are skilled in surviving in the wilderness, add +1 to your survival checks.",
//             "type": "CLASS",
//             "createdBy": null
//         },
//         {
//             "name": "Tracking",
//             "description": "You can track creatures and find their trails.",
//             "type": "CLASS",
//             "createdBy": null
//         }
//     ],
//         "subClasses": [
//         {
//             "name": "Beastmaster",
//             "description": "A ranger who has a deep bond with a beast companion.",
//             "spellCastingTrait": "AGILITY",
//             "foundationFeatures": [
//                 {
//                     "name": "Summon Beast",
//                     "description": "Summon a beast companion to aid you in combat.",
//                     "type": "FOUNDATION",
//                     "createdBy": null
//                 }
//             ],
//             "specializationFeatures": [
//                 {
//                     "name": "Summon Beast better",
//                     "description": "Summon a beast companion to aid you in combat, but its better.",
//                     "type": "SPECIALIZATION",
//                     "createdBy": null
//                 }
//             ],
//             "masteryFeatures": [
//                 {
//                     "name": "Summon Beast best",
//                     "description": "Summon a beast companion to aid you in combat, but its even better.",
//                     "type": "MASTERY",
//                     "createdBy": null
//                 }
//             ]
//         },
//         {
//             "name": "Wayfinder",
//             "description": "A ranger who is skilled in navigation and exploration.",
//             "spellCastingTrait": "AGILITY",
//             "foundationFeatures": [
//                 {
//                     "name": "Pathfinder",
//                     "description": "You can find the best path through difficult terrain.",
//                     "type": "FOUNDATION",
//                     "createdBy": null
//                 }
//             ],
//             "specializationFeatures": [
//                 {
//                     "name": "Pathfinder better",
//                     "description": "You can find the best path through difficult terrain, but its better.",
//                     "type": "SPECIALIZATION",
//                     "createdBy": null
//                 }
//             ],
//             "masteryFeatures": [
//                 {
//                     "name": "Pathfinder best",
//                     "description": "You can find the best path through difficult terrain, but its even better.",
//                     "type": "MASTERY",
//                     "createdBy": null
//                 }
//             ]
//         }
//     ]
// },
//     "subClass": {
//     "name": "Wayfinder",
//         "description": "A ranger who is skilled in navigation and exploration.",
//         "spellCastingTrait": "AGILITY",
//         "foundationFeatures": [
//         {
//             "name": "Pathfinder",
//             "description": "You can find the best path through difficult terrain.",
//             "type": "FOUNDATION",
//             "createdBy": null
//         }
//     ],
//         "specializationFeatures": [
//         {
//             "name": "Pathfinder better",
//             "description": "You can find the best path through difficult terrain, but its better.",
//             "type": "SPECIALIZATION",
//             "createdBy": null
//         }
//     ],
//         "masteryFeatures": [
//         {
//             "name": "Pathfinder best",
//             "description": "You can find the best path through difficult terrain, but its even better.",
//             "type": "MASTERY",
//             "createdBy": null
//         }
//     ]
// },
//     "stress": 0,
//     "traits": null,
//     "equipement": null,
//     "experiences": null,
//     "gold": null,
//     "inventory": null,
//     "imageBinaryData": null
// }
