const Catering = () => {
  const packages = [
    {
      id: 1,
      name: 'Intimate Gathering',
      servings: '10-20 people',
      price: 'Starting at $500',
      features: [
        'Selection of nigiri and maki',
        'Fresh sashimi platter',
        'Vegetarian options',
        'Professional presentation',
        'Setup and cleanup',
      ],
      emoji: '🍱',
    },
    {
      id: 2,
      name: 'Corporate Event',
      servings: '20-50 people',
      price: 'Starting at $1,200',
      features: [
        'Premium sushi selection',
        'Specialty rolls',
        'Appetizer platters',
        'Live sushi station option',
        'Full service staff',
        'Custom menu planning',
      ],
      emoji: '🏢',
    },
    {
      id: 3,
      name: 'Luxury Experience',
      servings: '50+ people',
      price: 'Custom pricing',
      features: [
        'Omakase-style service',
        'Premium ingredients',
        'Live chef demonstration',
        'Custom menu design',
        'Full event coordination',
        'Beverage pairing options',
      ],
      emoji: '⭐',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Catering</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elevate your event with artisan sushi catering. From intimate gatherings to large corporate events,
            we bring the art of sushi to you.
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
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-red-100 mb-2">{pkg.servings}</p>
                <p className="text-2xl font-bold">{pkg.price}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
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
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Types */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Perfect For Any Event
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💼', title: 'Corporate Events', desc: 'Impress clients and colleagues' },
              { icon: '💒', title: 'Weddings', desc: 'Elegant reception catering' },
              { icon: '🎉', title: 'Private Parties', desc: 'Make your celebration special' },
              { icon: '🎓', title: 'Special Occasions', desc: 'Graduations, anniversaries & more' },
            ].map((event, idx) => (
              <div key={idx} className="text-center p-4">
                <span className="text-5xl block mb-3">{event.icon}</span>
                <h4 className="font-bold text-gray-900 mb-2">{event.title}</h4>
                <p className="text-gray-600 text-sm">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Contact Us', desc: 'Share your event details and preferences' },
              { step: '2', title: 'Custom Menu', desc: 'We design a menu tailored to your needs' },
              { step: '3', title: 'Confirmation', desc: 'Review and approve your catering plan' },
              { step: '4', title: 'Event Day', desc: 'We handle everything on the day of your event' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Past Events
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
          <h2 className="text-3xl font-bold mb-4">Plan Your Event</h2>
          <p className="text-xl mb-8">
            Contact us today for a custom quote and make your event unforgettable
          </p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catering;
