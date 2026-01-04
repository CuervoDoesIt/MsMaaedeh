import { useTranslation } from 'react-i18next';

const Catering = () => {
  const { t } = useTranslation();

  const packages = [
    {
      id: 1,
      key: 'intimate',
      featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5'] as const,
      emoji: '🍱',
    },
    {
      id: 2,
      key: 'corporate',
      featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const,
      emoji: '🏢',
    },
    {
      id: 3,
      key: 'luxury',
      featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const,
      emoji: '⭐',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t('catering.header.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('catering.header.subtitle')}
          </p>
        </div>

        {/* Packages */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-8 text-center">
                <span className="text-6xl block mb-4">{pkg.emoji}</span>
                <h3 className="text-2xl font-bold mb-2">{t(`catering.packages.${pkg.key}.name`)}</h3>
                <p className="text-red-100 mb-2">{t(`catering.packages.${pkg.key}.servings`)}</p>
                <p className="text-2xl font-bold">{t(`catering.packages.${pkg.key}.price`)}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {pkg.featureKeys.map((featureKey) => (
                    <li key={featureKey} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{t(`catering.packages.${pkg.key}.features.${featureKey}`)}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  {t('catering.packages.requestQuote')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Types */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('catering.eventTypes.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💼', key: 'corporate' },
              { icon: '💒', key: 'weddings' },
              { icon: '🎉', key: 'privateParties' },
              { icon: '🎓', key: 'occasions' },
            ].map((event, idx) => (
              <div key={idx} className="text-center p-4">
                <span className="text-5xl block mb-3">{event.icon}</span>
                <h4 className="font-bold text-gray-900 mb-2">{t(`catering.eventTypes.items.${event.key}.title`)}</h4>
                <p className="text-gray-600 text-sm">{t(`catering.eventTypes.items.${event.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('catering.process.title')}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', key: 's1' },
              { step: '2', key: 's2' },
              { step: '3', key: 's3' },
              { step: '4', key: 's4' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t(`catering.process.steps.${item.key}.title`)}</h4>
                <p className="text-gray-600 text-sm">{t(`catering.process.steps.${item.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('catering.pastEvents.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center"
              >
                <span className="text-6xl">🍣</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">{t('catering.cta.title')}</h2>
          <p className="text-xl mb-8">
            {t('catering.cta.desc')}
          </p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {t('catering.cta.button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catering;
