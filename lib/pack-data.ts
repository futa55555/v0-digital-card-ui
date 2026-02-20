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
    cards: SAMPLE_CARDS,
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
    cards: SAMPLE_CARDS,
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
    cards: SAMPLE_CARDS,
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
    cards: SAMPLE_CARDS,
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
    cards: SAMPLE_CARDS,
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
    cards: SAMPLE_CARDS,
  },
]

export function getRandomCards(count: number): PackCard[] {
  const results: PackCard[] = []
  for (let i = 0; i < count; i++) {
    const card = SAMPLE_CARDS[Math.floor(Math.random() * SAMPLE_CARDS.length)]
    results.push({
      ...card,
      id: `${card.id}-${Date.now()}-${i}`,
    })
  }
  return results
}
