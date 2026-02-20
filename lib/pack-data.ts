export interface PackCard {
  id: string
  name: string
  image: string
  rarity: "Common" | "Uncommon" | "Rare" | "Ultra Rare" | "Secret Rare"
  grade: number
  value: number
}

export interface Pack {
  id: string
  name: string
  image: string
  price: number
  category: string
  description: string
  maxReturn: string
  heatLevel: number
  odds: {
    rarity: string
    chance: string
  }[]
  cards: PackCard[]
}

export const SAMPLE_CARDS: PackCard[] = [
  { id: "c1", name: "Charizard VMAX", image: "/images/card-charizard.jpg", rarity: "Secret Rare", grade: 10, value: 450 },
  { id: "c2", name: "Pikachu V", image: "/images/card-pikachu.jpg", rarity: "Ultra Rare", grade: 9, value: 120 },
  { id: "c3", name: "Mewtwo GX", image: "/images/card-mewtwo.jpg", rarity: "Ultra Rare", grade: 10, value: 280 },
  { id: "c4", name: "Blastoise EX", image: "/images/card-blastoise.jpg", rarity: "Rare", grade: 8, value: 65 },
  { id: "c5", name: "Venusaur VSTAR", image: "/images/card-venusaur.jpg", rarity: "Rare", grade: 7, value: 40 },
  { id: "c6", name: "Eevee", image: "/images/card-pikachu.jpg", rarity: "Common", grade: 6, value: 5 },
  { id: "c7", name: "Bulbasaur", image: "/images/card-venusaur.jpg", rarity: "Common", grade: 5, value: 3 },
  { id: "c8", name: "Squirtle", image: "/images/card-blastoise.jpg", rarity: "Common", grade: 6, value: 4 },
  { id: "c9", name: "Charmander", image: "/images/card-charizard.jpg", rarity: "Uncommon", grade: 7, value: 12 },
  { id: "c10", name: "Jigglypuff", image: "/images/card-pikachu.jpg", rarity: "Common", grade: 5, value: 2 },
]

export const PACKS: Pack[] = [
  {
    id: "pokemon-starter",
    name: "Pokemon Pack",
    image: "/images/pack-pokemon.jpg",
    price: 25,
    category: "Pokemon TCG",
    description: "Rip open a digital Pokemon pack to instantly reveal a real, graded card. Featuring cards from the latest sets with chances at rare holographic pulls.",
    maxReturn: "45x",
    heatLevel: 3,
    odds: [
      { rarity: "Common", chance: "40%" },
      { rarity: "Uncommon", chance: "30%" },
      { rarity: "Rare", chance: "18%" },
      { rarity: "Ultra Rare", chance: "9%" },
      { rarity: "Secret Rare", chance: "3%" },
    ],
    cards: SAMPLE_CARDS.slice(0, 5),
  },
  {
    id: "baseball-starter",
    name: "Baseball Pack",
    image: "/images/pack-baseball.jpg",
    price: 25,
    category: "Sports Cards",
    description: "Pull graded baseball cards from iconic sets. From rookie cards to legendary Hall of Famers, every rip holds potential.",
    maxReturn: "30x",
    heatLevel: 2,
    odds: [
      { rarity: "Common", chance: "45%" },
      { rarity: "Uncommon", chance: "28%" },
      { rarity: "Rare", chance: "17%" },
      { rarity: "Ultra Rare", chance: "8%" },
      { rarity: "Secret Rare", chance: "2%" },
    ],
    cards: SAMPLE_CARDS.slice(0, 5),
  },
  {
    id: "basketball-hoops",
    name: "Basketball Pack",
    image: "/images/pack-basketball.jpg",
    price: 25,
    category: "Sports Cards",
    description: "Slam dunk your collection with graded basketball cards. Chase rare rookie patches and autographs from NBA legends.",
    maxReturn: "35x",
    heatLevel: 3,
    odds: [
      { rarity: "Common", chance: "42%" },
      { rarity: "Uncommon", chance: "28%" },
      { rarity: "Rare", chance: "18%" },
      { rarity: "Ultra Rare", chance: "9%" },
      { rarity: "Secret Rare", chance: "3%" },
    ],
    cards: SAMPLE_CARDS.slice(0, 5),
  },
  {
    id: "football-starter",
    name: "Football Pack",
    image: "/images/pack-football.jpg",
    price: 25,
    category: "Sports Cards",
    description: "Score big with graded football cards featuring the biggest names in the NFL. Every pack could hold a game-changing pull.",
    maxReturn: "25x",
    heatLevel: 2,
    odds: [
      { rarity: "Common", chance: "45%" },
      { rarity: "Uncommon", chance: "30%" },
      { rarity: "Rare", chance: "15%" },
      { rarity: "Ultra Rare", chance: "8%" },
      { rarity: "Secret Rare", chance: "2%" },
    ],
    cards: SAMPLE_CARDS.slice(0, 5),
  },
  {
    id: "anime-dragon",
    name: "Anime Pack",
    image: "/images/pack-anime.jpg",
    price: 25,
    category: "Anime TCG",
    description: "Unleash the power of anime trading cards with this premium pack. Features cards from top anime series with stunning artwork.",
    maxReturn: "40x",
    heatLevel: 3,
    odds: [
      { rarity: "Common", chance: "40%" },
      { rarity: "Uncommon", chance: "30%" },
      { rarity: "Rare", chance: "18%" },
      { rarity: "Ultra Rare", chance: "9%" },
      { rarity: "Secret Rare", chance: "3%" },
    ],
    cards: SAMPLE_CARDS.slice(0, 5),
  },
  {
    id: "onepiece-voyage",
    name: "One Piece Pack",
    image: "/images/pack-onepiece.jpg",
    price: 80,
    category: "Anime TCG",
    description: "Set sail with premium One Piece trading cards. Hunt for rare character cards and legendary treasures from the Grand Line.",
    maxReturn: "60x",
    heatLevel: 3,
    odds: [
      { rarity: "Common", chance: "35%" },
      { rarity: "Uncommon", chance: "28%" },
      { rarity: "Rare", chance: "20%" },
      { rarity: "Ultra Rare", chance: "12%" },
      { rarity: "Secret Rare", chance: "5%" },
    ],
    cards: SAMPLE_CARDS.slice(0, 5),
  },
]

const RARITY_WEIGHTS: Record<string, number> = {
  "Common": 40,
  "Uncommon": 30,
  "Rare": 18,
  "Ultra Rare": 9,
  "Secret Rare": 3,
}

function weightedRandomCard(): PackCard {
  const totalWeight = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0)
  let roll = Math.random() * totalWeight
  let chosenRarity: string = "Common"

  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    roll -= weight
    if (roll <= 0) {
      chosenRarity = rarity
      break
    }
  }

  const matching = SAMPLE_CARDS.filter(c => c.rarity === chosenRarity)
  if (matching.length === 0) {
    return { ...SAMPLE_CARDS[0], id: `${SAMPLE_CARDS[0].id}-${Date.now()}-${Math.random()}` }
  }
  const card = matching[Math.floor(Math.random() * matching.length)]
  return { ...card, id: `${card.id}-${Date.now()}-${Math.random()}` }
}

export function getRandomCards(count: number): PackCard[] {
  const results: PackCard[] = []
  for (let i = 0; i < count; i++) {
    results.push(weightedRandomCard())
  }
  return results
}

export function isHighValue(card: PackCard): boolean {
  return card.rarity === "Secret Rare" || card.rarity === "Ultra Rare" || card.value >= 100
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "Secret Rare": return "text-accent"
    case "Ultra Rare": return "text-primary"
    case "Rare": return "text-chart-5"
    case "Uncommon": return "text-secondary-foreground"
    default: return "text-muted-foreground"
  }
}

export function getRarityBg(rarity: string): string {
  switch (rarity) {
    case "Secret Rare": return "bg-accent/20 border-accent/40"
    case "Ultra Rare": return "bg-primary/20 border-primary/40"
    case "Rare": return "bg-chart-5/20 border-chart-5/40"
    default: return "bg-secondary border-border"
  }
}
