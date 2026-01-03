const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Ms. Maaedeh</h1>
          <p className="text-xl text-gray-600">
            A journey of passion, precision, and artistry
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Ms. Maaedeh's journey into the world of sushi began over a decade ago, sparked by a deep
                  fascination with Japanese culinary arts. What started as a personal passion evolved into
                  a professional calling.
                </p>
                <p>
                  After years of training under master sushi chefs and studying traditional techniques,
                  Ms. Maaedeh developed a unique approach that blends time-honored methods with contemporary
                  artistic expression.
                </p>
                <p>
                  Today, she shares her expertise through intimate workshops, custom catering services, and
                  a growing community of sushi enthusiasts who appreciate the marriage of tradition and innovation.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-200 to-red-300 rounded-lg h-96 flex items-center justify-center">
              <span className="text-9xl">👩‍🍳</span>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Precision</h3>
              <p className="text-gray-600">
                Every cut, every grain of rice, every detail matters. Precision is the foundation of
                exceptional sushi.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Passion</h3>
              <p className="text-gray-600">
                Sushi is more than food—it's an art form that requires dedication, love, and respect
                for the craft.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quality</h3>
              <p className="text-gray-600">
                We source only the finest, freshest ingredients to ensure every creation exceeds
                expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Journey Milestones</h2>
          <div className="space-y-8">
            {[
              { year: '2012', event: 'Discovered passion for sushi during travels in Japan' },
              { year: '2014', event: 'Completed intensive sushi chef training program' },
              { year: '2016', event: 'Opened first pop-up sushi experience' },
              { year: '2018', event: 'Launched workshop program for aspiring chefs' },
              { year: '2020', event: 'Expanded to full-service catering' },
              { year: '2024', event: 'Serving the community with passion and excellence' },
            ].map((milestone, idx) => (
              <div key={idx} className="flex items-start">
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold mr-6 flex-shrink-0">
                  {milestone.year}
                </div>
                <p className="text-gray-700 pt-2">{milestone.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Sustainability',
                desc: 'We partner with sustainable fisheries and prioritize eco-friendly practices.',
              },
              {
                title: 'Education',
                desc: 'Sharing knowledge and inspiring others to appreciate the art of sushi.',
              },
              {
                title: 'Innovation',
                desc: 'Respecting tradition while embracing creative new approaches.',
              },
              {
                title: 'Community',
                desc: 'Building connections through shared culinary experiences.',
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-red-100">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience the Art
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join us for a workshop or let us cater your next event
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Book a Workshop
            </button>
            <button className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
