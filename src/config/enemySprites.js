// Real monster animation frames (extracted from your uploaded sprite
// sheets, one file per frame - src/assets/enemy/). Two sprite "sets" exist
// right now, each covering idle/walk/attack/dead:
//   skeleton        - smaller, simpler design. Used by every non-boss role
//                     (tank/brawler/archer) - there's no per-role visual
//                     distinction yet, just stats (see enemyRoles.js).
//   skeletonKnight  - bigger, more detailed, has an elaborate windup+burst
//                     attack (from your "Skill2" sheet). Used for bosses.
//
// To add a new sprite set (e.g. a distinct look per role, or a new monster
// type entirely): add a new PNG frame sequence to src/assets/enemy/, add an
// entry here with the same idle/walk/attack/dead shape, and point
// spriteSetForRole() at it for whichever role(s) should use it. Nothing
// else in game.js needs to change.

const FRAME_COUNTS = {
  skeleton: { idle: 6, walk: 8, attack: 6, dead: 4 },
  skeletonKnight: { idle: 6, walk: 9, attack: 13, dead: 13 },
};

// skeletonKnight's only attack animation is the elaborate "skill" sheet -
// used for both normal and heavy boss attacks (see bossMechanics.js).
const FILE_PREFIX = {
  skeleton: { idle: 'skeleton-idle', walk: 'skeleton-walk', attack: 'skeleton-attack', dead: 'skeleton-dead' },
  skeletonKnight: { idle: 'skeleton-knight-idle', walk: 'skeleton-knight-walk', attack: 'skeleton-knight-skill', dead: 'skeleton-knight-dead' },
};

// Native frame heights vary a LOT between sets (basic skeleton frames are
// tiny, ~20px tall; skeletonKnight frames are ~45px). This scale is picked
// per-set so both render at a comparable on-screen size to the heroes
// (~38px tall), rather than reusing the single flat SPRITE_SCALE that
// worked fine for the old uniform 96x96 placeholder sprites.
export const SPRITE_SET_SCALE = {
  skeleton: 1.9,
  skeletonKnight: 0.85,
};

function buildFramePaths(setKey) {
  const counts = FRAME_COUNTS[setKey];
  const prefixes = FILE_PREFIX[setKey];
  const set = {};
  for (const anim of Object.keys(counts)) {
    const paths = [];
    for (let i = 1; i <= counts[anim]; i++) {
      paths.push(`assets/enemy/${prefixes[anim]}-${String(i).padStart(2, '0')}.png`);
    }
    set[anim] = paths;
  }
  return set;
}

export const ENEMY_SPRITE_SETS = {
  skeleton: buildFramePaths('skeleton'),
  skeletonKnight: buildFramePaths('skeletonKnight'),
};

// THE place to change which sprite set a role uses.
export function spriteSetForRole(role) {
  return role === 'boss' ? 'skeletonKnight' : 'skeleton';
}
