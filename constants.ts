import { MediaItem, ChannelItem } from './types';

export const DEFAULT_M3U = "https://iptv-demo.example.com/playlist.m3u";

export const MOCK_MOVIES: MediaItem[] = [
  {
    id: 1,
    title: "Cyber Horizon",
    description: "In a future where humanity has merged with machines, one detective must solve the ultimate crime.",
    poster: "https://picsum.photos/300/450?random=1",
    backdrop: "https://picsum.photos/1920/1080?random=1",
    type: 'movie',
    rating: 4.8,
    year: 2024,
    duration: "2h 15m"
  },
  {
    id: 2,
    title: "The Deep Blue",
    description: "An expedition to the mariana trench reveals secrets that should have stayed buried.",
    poster: "https://picsum.photos/300/450?random=2",
    backdrop: "https://picsum.photos/1920/1080?random=2",
    type: 'movie',
    rating: 4.5,
    year: 2023,
    duration: "1h 50m"
  },
  {
    id: 3,
    title: "Velocity",
    description: "High stakes racing on the streets of Tokyo.",
    poster: "https://picsum.photos/300/450?random=3",
    backdrop: "https://picsum.photos/1920/1080?random=3",
    type: 'movie',
    rating: 4.2,
    year: 2023,
    duration: "2h 05m"
  },
  {
    id: 4,
    title: "Shadows of Past",
    description: "A psychological thriller that twists reality.",
    poster: "https://picsum.photos/300/450?random=4",
    backdrop: "https://picsum.photos/1920/1080?random=4",
    type: 'movie',
    rating: 4.9,
    year: 2022,
    duration: "1h 45m"
  },
  {
    id: 5,
    title: "Infinite Loop",
    description: "Trapped in time, they must save the world.",
    poster: "https://picsum.photos/300/450?random=5",
    backdrop: "https://picsum.photos/1920/1080?random=5",
    type: 'movie',
    rating: 4.1,
    year: 2024,
    duration: "1h 55m"
  }
];

export const MOCK_SERIES: MediaItem[] = [
  {
    id: 101,
    title: "Code Red",
    description: "A team of elite hackers fights global corruption.",
    poster: "https://picsum.photos/300/450?random=10",
    backdrop: "https://picsum.photos/1920/1080?random=10",
    type: 'series',
    rating: 4.7,
    year: 2023
  },
  {
    id: 102,
    title: "Dynasty",
    description: "The rise and fall of a futuristic empire.",
    poster: "https://picsum.photos/300/450?random=11",
    backdrop: "https://picsum.photos/1920/1080?random=11",
    type: 'series',
    rating: 4.6,
    year: 2022
  },
  {
    id: 103,
    title: "Lost Signal",
    description: "Astronauts stranded on a distant planet.",
    poster: "https://picsum.photos/300/450?random=12",
    backdrop: "https://picsum.photos/1920/1080?random=12",
    type: 'series',
    rating: 4.3,
    year: 2024
  },
  {
    id: 104,
    title: "The Chef",
    description: "Culinary chaos in a high-pressure kitchen.",
    poster: "https://picsum.photos/300/450?random=13",
    backdrop: "https://picsum.photos/1920/1080?random=13",
    type: 'series',
    rating: 4.8,
    year: 2023
  }
];

export const MOCK_CHANNELS: ChannelItem[] = [
  { 
    id: 1, 
    name: "News 24", 
    logo: "N24", 
    category: "News", 
    currentProgram: "World Report", 
    preview: "https://picsum.photos/600/340?random=20" 
  },
  { 
    id: 2, 
    name: "Sports 1", 
    logo: "S1", 
    category: "Sports", 
    currentProgram: "Live: Football Final", 
    preview: "https://picsum.photos/600/340?random=21" 
  },
  { 
    id: 3, 
    name: "Cinema HD", 
    logo: "CHD", 
    category: "Movies", 
    currentProgram: "The Godfather", 
    preview: "https://picsum.photos/600/340?random=22" 
  },
  { 
    id: 4, 
    name: "Discovery", 
    logo: "DSC", 
    category: "Documentary", 
    currentProgram: "Planet Earth III", 
    preview: "https://picsum.photos/600/340?random=23" 
  },
  { 
    id: 5, 
    name: "Music Hits", 
    logo: "MTV", 
    category: "Music", 
    currentProgram: "Top 40 Countdown", 
    preview: "https://picsum.photos/600/340?random=24" 
  },
  { 
    id: 6, 
    name: "Kids TV", 
    logo: "KDS", 
    category: "Kids", 
    currentProgram: "Morning Cartoons", 
    preview: "https://picsum.photos/600/340?random=25" 
  },
  { 
    id: 7, 
    name: "History", 
    logo: "HIS", 
    category: "Documentary", 
    currentProgram: "WWII in Color", 
    preview: "https://picsum.photos/600/340?random=26" 
  },
  { 
    id: 8, 
    name: "Action Max", 
    logo: "MAX", 
    category: "Movies", 
    currentProgram: "John Wick: Chapter 4", 
    preview: "https://picsum.photos/600/340?random=27" 
  },
];