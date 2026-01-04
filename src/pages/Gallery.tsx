import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'nigiri', 'maki', 'sashimi', 'special'];

  // Placeholder gallery items
  const galleryItems = [
    { id: 1, category: 'nigiri', titleKey: 'gallery.items.tunaNigiri', emoji: '🍣' },
    { id: 2, category: 'maki', titleKey: 'gallery.items.dragonRoll', emoji: '🍙' },
    { id: 3, category: 'sashimi', titleKey: 'gallery.items.salmonSashimi', emoji: '🐟' },
    { id: 4, category: 'special', titleKey: 'gallery.items.rainbowPlatter', emoji: '🌈' },
    { id: 5, category: 'nigiri', titleKey: 'gallery.items.salmonNigiri', emoji: '🍣' },
    { id: 6, category: 'maki', titleKey: 'gallery.items.californiaRoll', emoji: '🍙' },
    { id: 7, category: 'sashimi', titleKey: 'gallery.items.tunaSashimi', emoji: '🐟' },
    { id: 8, category: 'special', titleKey: 'gallery.items.artisticCreation', emoji: '🎨' },
    { id: 9, category: 'nigiri', titleKey: 'gallery.items.eelNigiri', emoji: '🍣' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t('gallery.header.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('gallery.header.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t(`gallery.categories.${category}`)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-8xl group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t(item.titleKey)}</h3>
                <p className="text-gray-600 text-sm uppercase tracking-wide">
                  {t(`gallery.categories.${item.category}`)}
                </p>
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-red-600 bg-opacity-0 group-hover:bg-opacity-90 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold">
                  {t('gallery.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            {t('gallery.featured.title')}
          </h2>
          <div className="relative bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <span className="text-9xl block mb-4">🍱</span>
                <p className="text-gray-500 text-lg">
                  {t('gallery.featured.placeholder')}
                </p>
              </div>
            </div>
            {/* Carousel controls */}
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
