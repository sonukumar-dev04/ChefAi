import { Camera, BookOpen, ChefHat, Search } from "lucide-react";

export const STATS = [
  { val: "10/mo", label: "Free Scans" },
  { val: "1M+", label: "Recipes" },
  { val: "$0", label: "To Start" },
  { val: "4.9★", label: "Rating" },
];

export const FEATURES = [
  {
    icon: Camera,
    title: "Scan Your Pantry",
    desc: "Point your camera at your fridge or ingredients. AI identifies everything instantly — no typing, no guessing.",
    limit: "10 scans/mo free",
    emoji: "📸",
    tag: "Most loved",
  },
  {
    icon: ChefHat,
    title: "AI Meal Suggestions",
    desc: "Get gourmet recipe ideas built around exactly what you already have. Zero food waste, maximum flavour.",
    limit: "5 meals/mo free",
    emoji: "🍳",
    tag: "Most used",
  },
  {
    icon: Search,
    title: "Search Any Dish",
    desc: "Find any recipe by cuisine, cook time, or dietary needs. Filter until you land on exactly what you want.",
    limit: "Unlimited",
    emoji: "🔍",
    tag: "Always free",
  },
  {
    icon: BookOpen,
    title: "Digital Cookbook",
    desc: "Save your favourites, export as PDF, and share with family. Your personal recipe library, always at hand.",
    limit: "3 saves/mo free",
    emoji: "📖",
    tag: "Pro feature",
  },
];

export const STEPS = [
  {
    num: "01",
    title: "Add your ingredients",
    desc: "Type what you have or scan your fridge with your camera. We save everything to your personal pantry.",
    icon: "🥕",
    proof: "Takes under 30 seconds",
    detail:
      "Works with partial ingredients too — even 3 items is enough to get started.",
  },
  {
    num: "02",
    title: "Pick a recipe",
    desc: "We surface the best matching recipes by ingredient overlap, cook time, and your taste preferences.",
    icon: "📋",
    proof: "Matched from 1M+ recipes",
    detail:
      "Filter by cuisine, dietary needs, or time available. You're always in control.",
  },
  {
    num: "03",
    title: "Cook & enjoy",
    desc: "Follow step-by-step instructions with built-in timers and pro tips. Rate it and save it when done.",
    icon: "🍽️",
    proof: "97% say it turned out great",
    detail:
      "Each step is timed and clearly written — like having a chef guide you personally.",
  },
];

export const CUISINES = [
  { flag: "🇮🇳", name: "Indian" },
  { flag: "🇮🇹", name: "Italian" },
  { flag: "🇯🇵", name: "Japanese" },
  { flag: "🇲🇽", name: "Mexican" },
  { flag: "🇨🇳", name: "Chinese" },
  { flag: "🇫🇷", name: "French" },
  { flag: "🇹🇷", name: "Turkish" },
  { flag: "🇬🇷", name: "Greek" },
  { flag: "🇹🇭", name: "Thai" },
  { flag: "🇲🇦", name: "Moroccan" },
  { flag: "🇬🇧", name: "British" },
  { flag: "🇻🇳", name: "Vietnamese" },
];

export const TESTIMONIALS = [
  {
    quote:
      "I used to throw away so much food every week. Now I scan my fridge and have dinner ideas in seconds. This app genuinely changed how I cook.",
    name: "Priya Sharma",
    role: "Home Cook, Hyderabad",
    initials: "PS",
  },
  {
    quote:
      "The AI suggestions are surprisingly creative. It recommended a dish I'd never thought to make from random veggies I had lying around.",
    name: "Marcus Johnson",
    role: "Food Blogger",
    initials: "MJ",
  },
  {
    quote:
      "As a chef I was skeptical — but this genuinely helps me plan staff meals fast during prep hours. Solid, practical tool.",
    name: "Aiko Tanaka",
    role: "Executive Chef, Tokyo",
    initials: "AT",
  },
];

export function getCategoryEmoji(category) {
  const emojiMap = {
    Beef: "🥩",
    Chicken: "🍗",
    Dessert: "🍰",
    Lamb: "🍖",
    Miscellaneous: "🍴",
    Pasta: "🍝",
    Pork: "🥓",
    Seafood: "🦐",
    Side: "🥗",
    Starter: "🥟",
    Vegan: "🥬",
    Vegetarian: "🥕",
    Breakfast: "🍳",
    Goat: "🐐",
  };
  return emojiMap[category] || "🍽️";
}

export function getCountryFlag(country) {
  const emojiMap = {
    American: "🗽",
    British: "👑",
    Canadian: "🍁",
    Chinese: "🐉",
    Croatian: "⚽",
    Dutch: "🌷",
    Egyptian: "🐫",
    Filipino: "🌴",
    French: "🥐",
    Greek: "🏛️",
    Indian: "🪷",
    Irish: "☘️",
    Italian: "🍕",
    Jamaican: "🌴",
    Japanese: "🗾",
    Kenyan: "🦒",
    Malaysian: "🌺",
    Mexican: "🌮",
    Moroccan: "🕌",
    Polish: "🦅",
    Portuguese: "🚢",
    Russian: "❄️",
    Spanish: "💃",
    Thai: "🛕",
    Tunisian: "🏜️",
    Turkish: "🧿",
    Ukrainian: "🌻",
    Vietnamese: "🍜",
    Algerian: "🏜️",
    Argentinian: "⚽",
    Australian: "🦘",
    Norwegian: "❄️",
    "Saudi Arabian": "🕋",
    Slovakian: "🏔️",
    Syrian: "🏛️",
    Uruguayan: "⚽",
    Venezuelan: "🌞",
  };
  return emojiMap[country] ?? "🌍";
}

export const SUPPORTED_CUISINES = [
  "American",
  "British",
  "Canadian",
  "Chinese",
  "Croatian",
  "Dutch",
  "Egyptian",
  "Filipino",
  "French",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Jamaican",
  "Japanese",
  "Kenyan",
  "Malaysian",
  "Mexican",
  "Moroccan",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Thai",
  "Tunisian",
  "Turkish",
  "Ukrainian",
  "Vietnamese",
  "Algerian",
  "Argentinian",
  "Australian",
  "Norwegian",
  "Saudi Arabian",
  "Slovakian",
  "Syrian",
  "Uruguayan",
  "Venezuelan",
];
