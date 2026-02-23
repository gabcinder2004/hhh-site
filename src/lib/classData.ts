/** WoW class colors -- official Blizzard palette */
export const CLASS_COLORS: Record<string, string> = {
  warrior: '#C69B6D',
  paladin: '#F48CBA',
  hunter: '#AAD372',
  rogue: '#FFF468',
  priest: '#FFFFFF',
  shaman: '#0070DD',
  mage: '#3FC7EB',
  warlock: '#8788EE',
  druid: '#FF7C0A',
} as const

export const CLASS_ID_MAP: Record<number, string> = {
  1: 'warrior',
  2: 'paladin',
  3: 'hunter',
  4: 'rogue',
  5: 'priest',
  7: 'shaman',
  8: 'mage',
  9: 'warlock',
  11: 'druid',
}

export const CLASS_NAMES: Record<string, string> = {
  warrior: 'Warrior',
  paladin: 'Paladin',
  hunter: 'Hunter',
  rogue: 'Rogue',
  priest: 'Priest',
  shaman: 'Shaman',
  mage: 'Mage',
  warlock: 'Warlock',
  druid: 'Druid',
}

export const RACE_NAMES: Record<number, string> = {
  1: 'Human',
  2: 'Orc',
  3: 'Dwarf',
  4: 'Night Elf',
  5: 'Undead',
  6: 'Tauren',
  7: 'Gnome',
  8: 'Troll',
  11: 'High Elf',
}

export const CLASS_ORDER = [
  'warrior',
  'paladin',
  'hunter',
  'rogue',
  'priest',
  'shaman',
  'mage',
  'warlock',
  'druid',
] as const

export const CLASS_ICONS: Record<string, string> = {
  warrior: '\u2694\uFE0F',
  paladin: '\uD83D\uDEE1\uFE0F',
  hunter: '\uD83C\uDFF9',
  rogue: '\uD83D\uDDE1\uFE0F',
  priest: '\u271D\uFE0F',
  shaman: '\uD83C\uDF0A',
  mage: '\u2744\uFE0F',
  warlock: '\uD83D\uDD25',
  druid: '\uD83C\uDF43',
}

export const RANK_ORDER: Record<string, number> = {
  gm: 0,
  officer: 1,
  raider: 2,
  member: 3,
}

export const RANK_NAMES: Record<string, string> = {
  gm: 'Guild Master',
  officer: 'Officers',
  raider: 'Raiders',
  member: 'Members',
}
