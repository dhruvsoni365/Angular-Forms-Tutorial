"use client";

import { useState } from "react";

interface Cafe {
  id: number;
  name: string;
  image: string;
  rating: number;
  distance: string;
  tags: string[];
  description: string;
}

const cafes: Cafe[] = [
  {
    id: 1,
    name: "Skyline Rooftop Café",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    rating: 4.8,
    distance: "0.8 km",
    tags: ["New", "Rooftop", "Desserts"],
    description: "Stunning city views with artisan coffee"
  },
  {
    id: 2,
    name: "The Velvet Lounge",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
    rating: 4.9,
    distance: "1.2 km",
    tags: ["Luxury", "Brunch", "Wine"],
    description: "Elegant ambiance with gourmet selections"
  },
  {
    id: 3,
    name: "Bloom Garden Café",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
    rating: 4.7,
    distance: "2.1 km",
    tags: ["Garden", "Organic", "Desserts"],
    description: "Fresh pastries in a botanical setting"
  },
  {
    id: 4,
    name: "Noir Espresso Bar",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    rating: 4.6,
    distance: "0.5 km",
    tags: ["New", "Specialty Coffee"],
    description: "Minimalist design meets bold flavors"
  },
  {
    id: 5,
    name: "Sunset Terrace",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    rating: 4.9,
    distance: "3.0 km",
    tags: ["Rooftop", "Cocktails", "Dinner"],
    description: "Perfect evening spot with live music"
  }
];

export default function Home() {
  const [likedCafes, setLikedCafes] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedCafes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400 flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-black rounded-[60px] shadow-2xl p-3">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-3xl z-20"></div>
        
        {/* Screen Content */}
        <div className="relative w-full h-full bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400 rounded-[48px] overflow-hidden">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 pt-2 text-white text-sm font-medium z-10">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <svg className="w-5 h-4" fill="currentColor" viewBox="0 0 24 20">
                <rect x="1" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="4" y="7" width="12" height="6" fill="currentColor"/>
                <rect x="20" y="8" width="3" height="4" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div className="h-full overflow-y-auto pt-12 pb-24 px-6">
            {/* Header */}
            <div className="mb-6 mt-4">
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Evermore</h1>
              <p className="text-white/90 text-lg font-light">Daily Discovery</p>
            </div>

            {/* Café Cards */}
            <div className="space-y-5">
              {cafes.map((cafe) => (
                <div
                  key={cafe.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cafe.image}
                      alt={cafe.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(cafe.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <svg
                        className={`w-5 h-5 ${likedCafes.has(cafe.id) ? 'fill-red-500' : 'fill-none'} stroke-current ${likedCafes.has(cafe.id) ? 'text-red-500' : 'text-gray-700'}`}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 flex-1">
                        {cafe.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {cafe.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cafe.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tag === "New"
                              ? "bg-purple-100 text-purple-700"
                              : tag === "Rooftop"
                              ? "bg-orange-100 text-orange-700"
                              : tag === "Desserts"
                              ? "bg-pink-100 text-pink-700"
                              : tag === "Luxury"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Rating and Distance */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-900 font-semibold">{cafe.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium">{cafe.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 flex items-center justify-around px-8">
            <button className="flex flex-col items-center gap-1 text-purple-600">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
              </svg>
              <span className="text-xs font-medium">Discover</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V7.89l7-3.11v8.2z" />
              </svg>
              <span className="text-xs font-medium">Saved</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
