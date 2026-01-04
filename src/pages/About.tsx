import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t('about.header.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('about.header.subtitle')}
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.story.title')}</h2>
              <div className="space-y-4 text-gray-600">
                <p>{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <p>{t('about.story.p3')}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-200 to-red-300 rounded-lg h-96 flex items-center justify-center">
              <span className="text-9xl">👩‍🍳</span>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('about.philosophy.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('about.philosophy.precision.title')}</h3>
              <p className="text-gray-600">
                {t('about.philosophy.precision.desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('about.philosophy.passion.title')}</h3>
              <p className="text-gray-600">
                {t('about.philosophy.passion.desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('about.philosophy.quality.title')}</h3>
              <p className="text-gray-600">
                {t('about.philosophy.quality.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('about.milestones.title')}</h2>
          <div className="space-y-8">
            {[
              { year: '2012', event: t('about.milestones.items.y2012') },
              { year: '2014', event: t('about.milestones.items.y2014') },
              { year: '2016', event: t('about.milestones.items.y2016') },
              { year: '2018', event: t('about.milestones.items.y2018') },
              { year: '2020', event: t('about.milestones.items.y2020') },
              { year: '2024', event: t('about.milestones.items.y2024') },
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
          <h2 className="text-3xl font-bold mb-6 text-center">{t('about.values.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: t('about.values.sustainability.title'),
                desc: t('about.values.sustainability.desc'),
              },
              {
                title: t('about.values.education.title'),
                desc: t('about.values.education.desc'),
              },
              {
                title: t('about.values.innovation.title'),
                desc: t('about.values.innovation.desc'),
              },
              {
                title: t('about.values.community.title'),
                desc: t('about.values.community.desc'),
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
            {t('about.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('about.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              {t('about.cta.bookWorkshop')}
            </button>
            <button className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              {t('about.cta.contactUs')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
