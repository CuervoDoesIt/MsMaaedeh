const Workshops = () => {
  const workshops = [
    {
      id: 1,
      title: 'Beginner Sushi Making',
      duration: '2 hours',
      level: 'Beginner',
      capacity: '8-12 people',
      price: '$85 per person',
      description: 'Learn the fundamentals of sushi making, from rice preparation to rolling techniques.',
      emoji: '🌱',
    },
    {
      id: 2,
      title: 'Advanced Nigiri Techniques',
      duration: '3 hours',
      level: 'Advanced',
      capacity: '6-8 people',
      price: '$125 per person',
      description: 'Master the art of nigiri sushi with professional knife skills and fish preparation.',
      emoji: '⚡',
    },
    {
      id: 3,
      title: 'Artistic Sushi Presentation',
      duration: '2.5 hours',
      level: 'Intermediate',
      capacity: '8-10 people',
      price: '$95 per person',
      description: 'Create visually stunning sushi presentations that are both beautiful and delicious.',
      emoji: '🎨',
    },
    {
      id: 4,
      title: 'Private Group Workshop',
      duration: 'Flexible',
      level: 'All Levels',
      capacity: 'Custom',
      price: 'Contact for pricing',
      description: 'Customized workshops for corporate events, parties, or special occasions.',
      emoji: '👥',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Workshops</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn the art of sushi making through hands-on, interactive workshops led by Ms. Maaedeh
          </p>
        </div>

        {/* Workshop Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {workshops.map((workshop, index) => (
            <div
              key={workshop.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-white">
                <span className="text-6xl block mb-4">{workshop.emoji}</span>
                <h3 className="text-2xl font-bold mb-2">{workshop.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {workshop.level}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {workshop.duration}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{workshop.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>{workshop.capacity}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{workshop.price}</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* What to Expect Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What to Expect
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Instruction</h3>
              <p className="text-gray-600">
                Learn from an experienced sushi chef with years of expertise
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Hands-On Practice</h3>
              <p className="text-gray-600">
                Get hands-on experience with professional tools and techniques
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Take Home Skills</h3>
              <p className="text-gray-600">
                Leave with recipes, techniques, and confidence to create at home
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn?</h2>
          <p className="text-xl mb-8">Book your workshop today or contact us for custom options</p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workshops;
