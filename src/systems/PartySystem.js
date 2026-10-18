export const PARTY_LIMIT = 5;

export class PartySystem {
  static add(party, character) {
    if (!character || party.length >= PARTY_LIMIT) return { ok: false, party };
    if (party.some((member) => member.id === character.id)) return { ok: false, party };
    return { ok: true, party: [...party, character] };
  }

  static remove(party, characterId) {
    return { ok: party.some((member) => member.id === characterId), party: party.filter((member) => member.id !== characterId) };
  }

  static power(party) { return party.reduce((sum, member) => sum + Number(member.stats?.attack ?? member.power ?? 0), 0); }
  static roles(party) { return party.map((member) => member.role ?? member.classId); }
  static validate(party) { return Array.isArray(party) && party.length > 0 && party.length <= PARTY_LIMIT; }
}
