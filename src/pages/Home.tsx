import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            <span className="text-red-500">鮨</span> Ms. Maaedeh
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Artisan Sushi • Workshops • Catering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Explore Gallery
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                The Art of Sushi
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Experience the perfect harmony of tradition and innovation. Each piece is a 
                masterpiece, crafted with precision and passion.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From intimate workshops to elegant catering, discover how artisan sushi can 
                transform your culinary experience.
              </p>
              <Link
                to="/about"
                className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center"
              >
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-center">
                [Placeholder for Sushi Image]
                <br />
                <span className="text-4xl mt-4 block">🍣</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Gallery */}
            <Link to="/gallery" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform group-hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                  <span className="text-6xl">🎨</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Gallery</h3>
                  <p className="text-gray-600">
                    Explore our collection of artistic sushi creations and culinary masterpieces.
                  </p>
                </div>
              </div>
            </Link>

            {/* Workshops */}
            <Link to="/workshops" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform group-hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-6xl">👨‍🍳</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Workshops</h3>
                  <p className="text-gray-600">
                    Learn the art of sushi making through hands-on, interactive workshops.
                  </p>
                </div>
              </div>
            </Link>

            {/* Catering */}
            <Link to="/catering" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform group-hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-6xl">🍱</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Catering</h3>
                  <p className="text-gray-600">
                    Elevate your events with our exquisite sushi catering services.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Art?</h2>
          <p className="text-xl mb-8">
            Book a workshop or inquire about catering for your next event.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
