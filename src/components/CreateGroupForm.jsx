import React, { useState, useEffect } from 'react';
import {
  mockRaids,
  mockPlayers,
  mockCharacters,
  mockGroups,
} from '../services/mockData';

function CreateGroupForm() {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRaid, setSelectedRaid] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [slots, setSlots] = useState([]);
  const [groupCreated, setGroupCreated] = useState(false);

  const styles = {
    wrapper: {
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      fontFamily: "'Roboto', sans-serif",
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    raidGroupWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px',
    },
    partyContainer: {
      flex: 1,
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f1f1f1',
    },
    partyHeading: {
      marginBottom: '15px',
      fontSize: '1.2rem',
      color: '#333',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
    },
    tableHeader: {
      textAlign: 'left',
      padding: '10px',
      borderBottom: '2px solid #007bff',
      backgroundColor: '#007bff',
      color: '#fff',
    },
    tableCell: {
      padding: '10px',
      border: '1px solid #ddd',
    },
  };

  useEffect(() => {
    if (selectedRaid) {
      setSlots(
        Array(8).fill({ role: '', playerId: '', characterId: '' }).map((slot, i) => ({
          ...slot,
          role: i % 4 === 3 ? 'Support' : 'DPS',
        }))
      );
    }
  }, [selectedRaid]);

  const toggleCreateGroup = () => {
    setIsCreating(!isCreating);
    if (!isCreating) {
      setSelectedRaid(null);
      setGroupName('');
      setSlots([]);
      setGroupCreated(false);
    }
  };

  const getEligibleCharacters = (playerId) => {
    if (!selectedRaid) return [];
    return mockCharacters.filter(
      (character) =>
        character.playerId === parseInt(playerId) &&
        character.itemLevel >= selectedRaid.minItemLevel &&
        !slots.some((slot) => slot.characterId === character.id.toString())
    );
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = slots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setSlots(updatedSlots);
  };

  const handleSubmitGroup = () => {
    const newGroup = {
      id: mockGroups.length + 1,
      name: groupName,
      raidId: selectedRaid.id,
      slots: slots.filter((slot) => slot.playerId && slot.characterId),
    };
    mockGroups.push(newGroup);
    setGroupCreated(true);
    alert(`Group '${groupName}' created successfully!`);
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <button style={styles.button} onClick={toggleCreateGroup}>
        {isCreating ? 'Cancel' : 'Create New Group'}
      </button>

      {isCreating && (
        <div style={styles.wrapper}>
          <h3>Create a New Group</h3>
          {!selectedRaid ? (
            <>
              <h4>Select a Raid</h4>
              <ul>
                {mockRaids.map((raid) => (
                  <li key={raid.id}>
                    <button
                      style={styles.button}
                      onClick={() => setSelectedRaid(raid)}
                    >
                      {raid.name} (Min Item Level: {raid.minItemLevel})
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h4>Raid: {selectedRaid.name} (Min Item Level: {selectedRaid.minItemLevel})</h4>
              <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <div style={styles.raidGroupWrapper}>
                <div style={styles.partyContainer}>
                  <h4 style={styles.partyHeading}>Party 1</h4>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.tableHeader}>Role</th>
                        <th style={styles.tableHeader}>Player</th>
                        <th style={styles.tableHeader}>Character</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slots.slice(0, 4).map((slot, index) => (
                        <tr key={index}>
                          <td style={styles.tableCell}>{slot.role}</td>
                          <td style={styles.tableCell}>
                            <select
                              value={slot.playerId}
                              onChange={(e) =>
                                handleSlotChange(index, 'playerId', e.target.value)
                              }
                            >
                              <option value="">Select Player</option>
                              {mockPlayers.map((player) => (
                                <option key={player.id} value={player.id}>
                                  {player.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td style={styles.tableCell}>
                            <select
                              value={slot.characterId}
                              onChange={(e) =>
                                handleSlotChange(index, 'characterId', e.target.value)
                              }
                              disabled={!slot.playerId}
                            >
                              <option value="">Select Character</option>
                              {getEligibleCharacters(slot.playerId).map((char) => (
                                <option key={char.id} value={char.id}>
                                  {char.name}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={styles.partyContainer}>
                  <h4 style={styles.partyHeading}>Party 2</h4>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.tableHeader}>Role</th>
                        <th style={styles.tableHeader}>Player</th>
                        <th style={styles.tableHeader}>Character</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slots.slice(4, 8).map((slot, index) => (
                        <tr key={index}>
                          <td style={styles.tableCell}>{slot.role}</td>
                          <td style={styles.tableCell}>
                            <select
                              value={slot.playerId}
                              onChange={(e) =>
                                handleSlotChange(index + 4, 'playerId', e.target.value)
                              }
                            >
                              <option value="">Select Player</option>
                              {mockPlayers.map((player) => (
                                <option key={player.id} value={player.id}>
                                  {player.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td style={styles.tableCell}>
                            <select
                              value={slot.characterId}
                              onChange={(e) =>
                                handleSlotChange(index + 4, 'characterId', e.target.value)
                              }
                              disabled={!slot.playerId}
                            >
                              <option value="">Select Character</option>
                              {getEligibleCharacters(slot.playerId).map((char) => (
                                <option key={char.id} value={char.id}>
                                  {char.name}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <button
                style={!groupName ? styles.disabledButton : styles.button}
                onClick={handleSubmitGroup}
                disabled={!groupName || !slots.some((slot) => slot.playerId && slot.characterId)}
              >
                Submit Group
              </button>
              {groupCreated && <p>Group '{groupName}' created successfully!</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateGroupForm;
