import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const STORAGE_KEY = 'msmaaedeh.lang';

const resources = {
  en: {
    translation: {
      language: {
        en: 'English',
        fa: 'فارسی',
        toggleLabel: 'Language',
      },
      nav: {
        home: 'Home',
        gallery: 'Gallery',
        workshops: 'Workshops',
        catering: 'Catering',
        about: 'About',
        contact: 'Contact',
      },
      footer: {
        tagline: 'Artisan sushi crafted with passion, precision, and creativity.',
        explore: 'Explore',
        about: 'About',
        connect: 'Connect',
        ourStory: 'Our Story',
        contact: 'Contact',
        copyright: 'All rights reserved.',
        social: {
          instagram: 'Instagram',
          facebook: 'Facebook',
        },
      },
      home: {
        hero: {
          tagline: 'Artisan Sushi • Workshops • Catering',
          exploreGallery: 'Explore Gallery',
          getInTouch: 'Get in Touch',
        },
        aboutPreview: {
          title: 'The Art of Sushi',
          p1: 'Experience the perfect harmony of tradition and innovation. Each piece is a masterpiece, crafted with precision and passion.',
          p2: 'From intimate workshops to elegant catering, discover how artisan sushi can transform your culinary experience.',
          learnMore: 'Learn More',
          placeholder: '[Placeholder for Sushi Image]',
        },
        services: {
          title: 'Our Services',
          gallery: {
            title: 'Gallery',
            desc: 'Explore our collection of artistic sushi creations and culinary masterpieces.',
          },
          workshops: {
            title: 'Workshops',
            desc: 'Learn the art of sushi making through hands-on, interactive workshops.',
          },
          catering: {
            title: 'Catering',
            desc: 'Elevate your events with our exquisite sushi catering services.',
          },
        },
        cta: {
          title: 'Ready to Experience Art?',
          desc: 'Book a workshop or inquire about catering for your next event.',
          contactUs: 'Contact Us',
        },
      },
      about: {
        header: {
          title: 'About Ms. Maaedeh',
          subtitle: 'A journey of passion, precision, and artistry',
        },
        story: {
          title: 'Our Story',
          p1: "Ms. Maaedeh's journey into the world of sushi began over a decade ago, sparked by a deep fascination with Japanese culinary arts. What started as a personal passion evolved into a professional calling.",
          p2: 'After years of training under master sushi chefs and studying traditional techniques, Ms. Maaedeh developed a unique approach that blends time-honored methods with contemporary artistic expression.',
          p3: 'Today, she shares her expertise through intimate workshops, custom catering services, and a growing community of sushi enthusiasts who appreciate the marriage of tradition and innovation.',
        },
        philosophy: {
          title: 'Our Philosophy',
          precision: {
            title: 'Precision',
            desc: 'Every cut, every grain of rice, every detail matters. Precision is the foundation of exceptional sushi.',
          },
          passion: {
            title: 'Passion',
            desc: "Sushi is more than food—it's an art form that requires dedication, love, and respect for the craft.",
          },
          quality: {
            title: 'Quality',
            desc: 'We source only the finest, freshest ingredients to ensure every creation exceeds expectations.',
          },
        },
        milestones: {
          title: 'Journey Milestones',
          items: {
            y2012: 'Discovered passion for sushi during travels in Japan',
            y2014: 'Completed intensive sushi chef training program',
            y2016: 'Opened first pop-up sushi experience',
            y2018: 'Launched workshop program for aspiring chefs',
            y2020: 'Expanded to full-service catering',
            y2024: 'Serving the community with passion and excellence',
          },
        },
        values: {
          title: 'Our Values',
          sustainability: {
            title: 'Sustainability',
            desc: 'We partner with sustainable fisheries and prioritize eco-friendly practices.',
          },
          education: {
            title: 'Education',
            desc: 'Sharing knowledge and inspiring others to appreciate the art of sushi.',
          },
          innovation: {
            title: 'Innovation',
            desc: 'Respecting tradition while embracing creative new approaches.',
          },
          community: {
            title: 'Community',
            desc: 'Building connections through shared culinary experiences.',
          },
        },
        cta: {
          title: 'Experience the Art',
          desc: 'Join us for a workshop or let us cater your next event',
          bookWorkshop: 'Book a Workshop',
          contactUs: 'Contact Us',
        },
      },
      contact: {
        header: {
          title: 'Contact Us',
          subtitle: 'Get in touch to book a workshop, request catering, or just say hello',
        },
        form: {
          title: 'Send a Message',
          fullName: 'Full Name',
          fullNamePlaceholder: 'Your name',
          email: 'Email Address',
          emailPlaceholder: 'your.email@example.com',
          phone: 'Phone Number',
          phonePlaceholder: '(555) 123-4567',
          subject: 'Subject',
          subjectPlaceholder: 'Select a subject',
          subjectOptions: {
            workshop: 'Workshop Inquiry',
            catering: 'Catering Request',
            general: 'General Question',
            other: 'Other',
          },
          message: 'Message',
          messagePlaceholder: 'Tell us about your inquiry...',
          send: 'Send Message',
          successAlert: 'Thank you for your message! We will get back to you soon.',
        },
        info: {
          title: 'Contact Information',
          email: 'Email',
          phone: 'Phone',
          location: 'Location',
          locationValue1: 'San Francisco, CA',
          locationValue2: '(Exact location provided upon booking)',
        },
        availability: {
          title: 'Availability',
          workshops: 'Workshops',
          workshopsValue: 'By Appointment',
          catering: 'Catering',
          cateringValue: 'Book in Advance',
          responseTime: 'Response Time',
          responseTimeValue: '24-48 Hours',
        },
        social: {
          title: 'Follow Our Journey',
          desc: 'Stay updated with our latest creations, workshop schedules, and special events',
        },
      },
      catering: {
        header: {
          title: 'Catering',
          subtitle: 'Elevate your event with artisan sushi catering. From intimate gatherings to large corporate events, we bring the art of sushi to you.',
        },
        packages: {
          intimate: {
            name: 'Intimate Gathering',
            servings: '10-20 people',
            price: 'Starting at $500',
            features: {
              f1: 'Selection of nigiri and maki',
              f2: 'Fresh sashimi platter',
              f3: 'Vegetarian options',
              f4: 'Professional presentation',
              f5: 'Setup and cleanup',
            },
          },
          corporate: {
            name: 'Corporate Event',
            servings: '20-50 people',
            price: 'Starting at $1,200',
            features: {
              f1: 'Premium sushi selection',
              f2: 'Specialty rolls',
              f3: 'Appetizer platters',
              f4: 'Live sushi station option',
              f5: 'Full service staff',
              f6: 'Custom menu planning',
            },
          },
          luxury: {
            name: 'Luxury Experience',
            servings: '50+ people',
            price: 'Custom pricing',
            features: {
              f1: 'Omakase-style service',
              f2: 'Premium ingredients',
              f3: 'Live chef demonstration',
              f4: 'Custom menu design',
              f5: 'Full event coordination',
              f6: 'Beverage pairing options',
            },
          },
          requestQuote: 'Request Quote',
        },
        eventTypes: {
          title: 'Perfect For Any Event',
          items: {
            corporate: { title: 'Corporate Events', desc: 'Impress clients and colleagues' },
            weddings: { title: 'Weddings', desc: 'Elegant reception catering' },
            privateParties: { title: 'Private Parties', desc: 'Make your celebration special' },
            occasions: { title: 'Special Occasions', desc: 'Graduations, anniversaries & more' },
          },
        },
        process: {
          title: 'How It Works',
          steps: {
            s1: { title: 'Contact Us', desc: 'Share your event details and preferences' },
            s2: { title: 'Custom Menu', desc: 'We design a menu tailored to your needs' },
            s3: { title: 'Confirmation', desc: 'Review and approve your catering plan' },
            s4: { title: 'Event Day', desc: 'We handle everything on the day of your event' },
          },
        },
        pastEvents: {
          title: 'Past Events',
        },
        cta: {
          title: 'Plan Your Event',
          desc: 'Contact us today for a custom quote and make your event unforgettable',
          button: 'Get a Quote',
        },
      },
      gallery: {
        header: {
          title: 'Gallery',
          subtitle: 'Explore our collection of artisan sushi creations',
        },
        categories: {
          all: 'All',
          nigiri: 'Nigiri',
          maki: 'Maki',
          sashimi: 'Sashimi',
          special: 'Special',
        },
        items: {
          tunaNigiri: 'Tuna Nigiri',
          dragonRoll: 'Dragon Roll',
          salmonSashimi: 'Salmon Sashimi',
          rainbowPlatter: 'Rainbow Platter',
          salmonNigiri: 'Salmon Nigiri',
          californiaRoll: 'California Roll',
          tunaSashimi: 'Tuna Sashimi',
          artisticCreation: 'Artistic Creation',
          eelNigiri: 'Eel Nigiri',
        },
        viewDetails: 'View Details',
        featured: {
          title: 'Featured Creations',
          placeholder: '[Placeholder for carousel component]',
        },
      },
      workshops: {
        header: {
          title: 'Workshops',
          subtitle: 'Learn the art of sushi making through hands-on, interactive workshops led by Ms. Maaedeh',
        },
        cards: {
          beginner: {
            title: 'Beginner Sushi Making',
            duration: '2 hours',
            level: 'Beginner',
            capacity: '8-12 people',
            price: '$85 per person',
            description: 'Learn the fundamentals of sushi making, from rice preparation to rolling techniques.',
          },
          advanced: {
            title: 'Advanced Nigiri Techniques',
            duration: '3 hours',
            level: 'Advanced',
            capacity: '6-8 people',
            price: '$125 per person',
            description: 'Master the art of nigiri sushi with professional knife skills and fish preparation.',
          },
          artistic: {
            title: 'Artistic Sushi Presentation',
            duration: '2.5 hours',
            level: 'Intermediate',
            capacity: '8-10 people',
            price: '$95 per person',
            description: 'Create visually stunning sushi presentations that are both beautiful and delicious.',
          },
          private: {
            title: 'Private Group Workshop',
            duration: 'Flexible',
            level: 'All Levels',
            capacity: 'Custom',
            price: 'Contact for pricing',
            description: 'Customized workshops for corporate events, parties, or special occasions.',
          },
        },
        bookNow: 'Book Now',
        expect: {
          title: 'What to Expect',
          expert: {
            title: 'Expert Instruction',
            desc: 'Learn from an experienced sushi chef with years of expertise',
          },
          handsOn: {
            title: 'Hands-On Practice',
            desc: 'Get hands-on experience with professional tools and techniques',
          },
          takeHome: {
            title: 'Take Home Skills',
            desc: 'Leave with recipes, techniques, and confidence to create at home',
          },
        },
        cta: {
          title: 'Ready to Learn?',
          desc: 'Book your workshop today or contact us for custom options',
          button: 'Contact Us',
        },
      },
    },
  },
  fa: {
    translation: {
      language: {
        en: 'English',
        fa: 'فارسی',
        toggleLabel: 'زبان',
      },
      nav: {
        home: 'خانه',
        gallery: 'گالری',
        workshops: 'کارگاه‌ها',
        catering: 'پذیرایی',
        about: 'درباره',
        contact: 'تماس',
      },
      footer: {
        tagline: 'سوشیِ دست‌ساز، با عشق، دقت و خلاقیت.',
        explore: 'کاوش',
        about: 'درباره',
        connect: 'ارتباط',
        ourStory: 'داستان ما',
        contact: 'تماس',
        copyright: 'همهٔ حقوق محفوظ است.',
        social: {
          instagram: 'اینستاگرام',
          facebook: 'فیسبوک',
        },
      },
      home: {
        hero: {
          tagline: 'سوشی دست‌ساز • کارگاه‌ها • پذیرایی',
          exploreGallery: 'دیدن گالری',
          getInTouch: 'در تماس باشید',
        },
        aboutPreview: {
          title: 'هنرِ سوشی',
          p1: 'هماهنگیِ کاملِ سنت و نوآوری را تجربه کنید. هر لقمه یک شاهکار است—با دقت و اشتیاق ساخته شده.',
          p2: 'از کارگاه‌های صمیمی تا پذیرایی‌های شیک، ببینید سوشیِ دست‌ساز چگونه تجربهٔ غذایی شما را متحول می‌کند.',
          learnMore: 'بیشتر بدانید',
          placeholder: '[جای‌نگهدار برای تصویر سوشی]',
        },
        services: {
          title: 'خدمات ما',
          gallery: {
            title: 'گالری',
            desc: 'مجموعهٔ خلق‌های هنری سوشی و شاهکارهای آشپزی ما را ببینید.',
          },
          workshops: {
            title: 'کارگاه‌ها',
            desc: 'هنرِ سوشی را با کارگاه‌های تعاملی و عملی یاد بگیرید.',
          },
          catering: {
            title: 'پذیرایی',
            desc: 'رویدادهای خود را با خدمات پذیراییِ سوشیِ ویژه ارتقا دهید.',
          },
        },
        cta: {
          title: 'آمادهٔ تجربهٔ هنر هستید؟',
          desc: 'کارگاه رزرو کنید یا برای پذیراییِ رویداد بعدی‌تان پیام بدهید.',
          contactUs: 'تماس با ما',
        },
      },
      about: {
        header: {
          title: 'دربارهٔ خانم معیده',
          subtitle: 'سفری از اشتیاق، دقت و هنر',
        },
        story: {
          title: 'داستان ما',
          p1: 'مسیرِ خانم معیده در دنیای سوشی بیش از ده سال پیش آغاز شد؛ با شیفتگیِ عمیق به هنرهای آشپزی ژاپنی. آنچه با علاقه‌ای شخصی شروع شد، به فراخوانی حرفه‌ای تبدیل شد.',
          p2: 'پس از سال‌ها آموزش نزد استادان سوشی و مطالعهٔ تکنیک‌های سنتی، خانم معیده رویکردی ویژه ساخت که روش‌های اصیل را با بیان هنریِ معاصر ترکیب می‌کند.',
          p3: 'امروز او تجربه‌اش را از طریق کارگاه‌های صمیمی، خدمات پذیرایی سفارشی و جامعه‌ای رو‌به‌رشد از دوستداران سوشی به اشتراک می‌گذارد—کسانی که پیوند سنت و نوآوری را دوست دارند.',
        },
        philosophy: {
          title: 'فلسفهٔ ما',
          precision: {
            title: 'دقت',
            desc: 'هر برش، هر دانهٔ برنج و هر جزئیات مهم است. دقت، پایهٔ سوشیِ عالی است.',
          },
          passion: {
            title: 'اشتیاق',
            desc: 'سوشی فقط غذا نیست—یک هنر است که به تعهد، عشق و احترام به کار نیاز دارد.',
          },
          quality: {
            title: 'کیفیت',
            desc: 'فقط بهترین و تازه‌ترین مواد اولیه را انتخاب می‌کنیم تا هر خلقی فراتر از انتظار باشد.',
          },
        },
        milestones: {
          title: 'نقاط عطف مسیر',
          items: {
            y2012: 'در سفر به ژاپن، اشتیاق به سوشی را کشف کرد',
            y2014: 'دورهٔ فشردهٔ آموزشِ سرآشپز سوشی را به پایان رساند',
            y2016: 'اولین تجربهٔ پاپ‌آپ سوشی را راه‌اندازی کرد',
            y2018: 'برنامهٔ کارگاه‌ها را برای هنرجویان آغاز کرد',
            y2020: 'خدمات را به پذیراییِ کامل گسترش داد',
            y2024: 'خدمت به جامعه با عشق و تعالی',
          },
        },
        values: {
          title: 'ارزش‌های ما',
          sustainability: {
            title: 'پایداری',
            desc: 'با شیلاتِ پایدار همکاری می‌کنیم و روش‌های دوستدار محیط‌زیست را در اولویت می‌گذاریم.',
          },
          education: {
            title: 'آموزش',
            desc: 'اشتراک دانش و الهام‌بخشی برای درک هنرِ سوشی.',
          },
          innovation: {
            title: 'نوآوری',
            desc: 'احترام به سنت و در عین حال استقبال از ایده‌های خلاقانهٔ تازه.',
          },
          community: {
            title: 'جامعه',
            desc: 'ساختن پیوندها از طریق تجربه‌های آشپزیِ مشترک.',
          },
        },
        cta: {
          title: 'هنر را تجربه کنید',
          desc: 'به کارگاه ما بپیوندید یا پذیراییِ رویداد بعدی‌تان را به ما بسپارید',
          bookWorkshop: 'رزرو کارگاه',
          contactUs: 'تماس با ما',
        },
      },
      contact: {
        header: {
          title: 'تماس با ما',
          subtitle: 'برای رزرو کارگاه، درخواست پذیرایی یا گفتن یک سلام، پیام بدهید',
        },
        form: {
          title: 'ارسال پیام',
          fullName: 'نام و نام خانوادگی',
          fullNamePlaceholder: 'نام شما',
          email: 'ایمیل',
          emailPlaceholder: 'your.email@example.com',
          phone: 'شماره تلفن',
          phonePlaceholder: '(555) 123-4567',
          subject: 'موضوع',
          subjectPlaceholder: 'یک موضوع انتخاب کنید',
          subjectOptions: {
            workshop: 'پرسش دربارهٔ کارگاه',
            catering: 'درخواست پذیرایی',
            general: 'سؤال عمومی',
            other: 'سایر',
          },
          message: 'پیام',
          messagePlaceholder: 'دربارهٔ درخواست‌تان بنویسید…',
          send: 'ارسال پیام',
          successAlert: 'از پیام شما سپاسگزاریم! به‌زودی با شما تماس می‌گیریم.',
        },
        info: {
          title: 'اطلاعات تماس',
          email: 'ایمیل',
          phone: 'تلفن',
          location: 'مکان',
          locationValue1: 'سن‌فرانسیسکو، کالیفرنیا',
          locationValue2: '(مکان دقیق پس از رزرو اعلام می‌شود)',
        },
        availability: {
          title: 'زمان‌بندی',
          workshops: 'کارگاه‌ها',
          workshopsValue: 'با هماهنگی',
          catering: 'پذیرایی',
          cateringValue: 'با رزرو قبلی',
          responseTime: 'زمان پاسخگویی',
          responseTimeValue: '۲۴ تا ۴۸ ساعت',
        },
        social: {
          title: 'مسیر ما را دنبال کنید',
          desc: 'از جدیدترین خلق‌ها، زمان‌بندی کارگاه‌ها و رویدادهای ویژه باخبر شوید',
        },
      },
      catering: {
        header: {
          title: 'پذیرایی',
          subtitle: 'رویداد خود را با پذیراییِ سوشیِ دست‌ساز ارتقا دهید. از دورهمی‌های کوچک تا رویدادهای بزرگ، هنرِ سوشی را به شما می‌آوریم.',
        },
        packages: {
          intimate: {
            name: 'دورهمی صمیمی',
            servings: '۱۰ تا ۲۰ نفر',
            price: 'از ۵۰۰ دلار',
            features: {
              f1: 'گزینشی از نیگیری و ماکی',
              f2: 'سینی ساشیمی تازه',
              f3: 'گزینه‌های گیاهی',
              f4: 'چیدمان حرفه‌ای',
              f5: 'آماده‌سازی و جمع‌آوری',
            },
          },
          corporate: {
            name: 'رویداد شرکتی',
            servings: '۲۰ تا ۵۰ نفر',
            price: 'از ۱٬۲۰۰ دلار',
            features: {
              f1: 'گزینش ممتاز سوشی',
              f2: 'رول‌های ویژه',
              f3: 'پیش‌غذاها',
              f4: 'ایستگاه سوشی زنده (اختیاری)',
              f5: 'پرسنل کامل خدمات',
              f6: 'برنامه‌ریزی منوی سفارشی',
            },
          },
          luxury: {
            name: 'تجربهٔ لوکس',
            servings: '۵۰ نفر به بالا',
            price: 'قیمت‌گذاری سفارشی',
            features: {
              f1: 'سرویس به سبک اومکاسه',
              f2: 'مواد اولیه ممتاز',
              f3: 'نمایش زندهٔ آشپز',
              f4: 'طراحی منوی اختصاصی',
              f5: 'هماهنگی کامل رویداد',
              f6: 'پیشنهاد جفت‌سازی نوشیدنی',
            },
          },
          requestQuote: 'درخواست قیمت',
        },
        eventTypes: {
          title: 'مناسب برای هر رویداد',
          items: {
            corporate: { title: 'رویدادهای شرکتی', desc: 'اثرگذاری بر مشتریان و همکاران' },
            weddings: { title: 'عروسی', desc: 'پذیرایی شیک برای مراسم' },
            privateParties: { title: 'مهمانی خصوصی', desc: 'جشن‌تان را خاص کنید' },
            occasions: { title: 'مناسبت‌های ویژه', desc: 'فارغ‌التحصیلی، سالگرد و…' },
          },
        },
        process: {
          title: 'چطور کار می‌کند',
          steps: {
            s1: { title: 'تماس با ما', desc: 'جزئیات رویداد و سلیقه‌تان را بگویید' },
            s2: { title: 'منوی اختصاصی', desc: 'منویی متناسب با نیاز شما طراحی می‌کنیم' },
            s3: { title: 'تأیید نهایی', desc: 'برنامه را بررسی و تأیید کنید' },
            s4: { title: 'روز رویداد', desc: 'در روز رویداد همه‌چیز را ما مدیریت می‌کنیم' },
          },
        },
        pastEvents: {
          title: 'رویدادهای گذشته',
        },
        cta: {
          title: 'رویدادتان را برنامه‌ریزی کنید',
          desc: 'امروز برای دریافت قیمت سفارشی پیام بدهید و رویدادتان را فراموش‌نشدنی کنید',
          button: 'دریافت قیمت',
        },
      },
      gallery: {
        header: {
          title: 'گالری',
          subtitle: 'مجموعهٔ خلق‌های سوشیِ دست‌ساز ما را ببینید',
        },
        categories: {
          all: 'همه',
          nigiri: 'نیگیری',
          maki: 'ماکی',
          sashimi: 'ساشیمی',
          special: 'ویژه',
        },
        items: {
          tunaNigiri: 'نیگیری تُن',
          dragonRoll: 'رول اژدها',
          salmonSashimi: 'ساشیمی سالمون',
          rainbowPlatter: 'سینی رنگین‌کمان',
          salmonNigiri: 'نیگیری سالمون',
          californiaRoll: 'رول کالیفرنیا',
          tunaSashimi: 'ساشیمی تُن',
          artisticCreation: 'خلق هنری',
          eelNigiri: 'نیگیری مارماهی',
        },
        viewDetails: 'مشاهده جزئیات',
        featured: {
          title: 'خلق‌های ویژه',
          placeholder: '[جای‌نگهدار برای کاروسل]',
        },
      },
      workshops: {
        header: {
          title: 'کارگاه‌ها',
          subtitle: 'هنر سوشی را با کارگاه‌های تعاملی و عملیِ خانم معیده یاد بگیرید',
        },
        cards: {
          beginner: {
            title: 'سوشی برای مبتدی‌ها',
            duration: '۲ ساعت',
            level: 'مبتدی',
            capacity: '۸ تا ۱۲ نفر',
            price: '۸۵ دلار برای هر نفر',
            description: 'مبانی سوشی را یاد بگیرید؛ از آماده‌سازی برنج تا تکنیک‌های رول کردن.',
          },
          advanced: {
            title: 'تکنیک‌های پیشرفتهٔ نیگیری',
            duration: '۳ ساعت',
            level: 'پیشرفته',
            capacity: '۶ تا ۸ نفر',
            price: '۱۲۵ دلار برای هر نفر',
            description: 'هنر نیگیری را با مهارت‌های حرفه‌ایِ چاقو و آماده‌سازی ماهی یاد بگیرید.',
          },
          artistic: {
            title: 'ارائهٔ هنری سوشی',
            duration: '۲٫۵ ساعت',
            level: 'متوسط',
            capacity: '۸ تا ۱۰ نفر',
            price: '۹۵ دلار برای هر نفر',
            description: 'چیدمان‌های چشم‌نواز خلق کنید که هم زیبا باشند و هم خوشمزه.',
          },
          private: {
            title: 'کارگاه خصوصی گروهی',
            duration: 'شناور',
            level: 'همهٔ سطوح',
            capacity: 'سفارشی',
            price: 'برای قیمت تماس بگیرید',
            description: 'کارگاه‌های سفارشی برای رویدادهای شرکتی، مهمانی‌ها یا مناسبت‌های ویژه.',
          },
        },
        bookNow: 'رزرو',
        expect: {
          title: 'چه چیزهایی در انتظار شماست',
          expert: {
            title: 'آموزش تخصصی',
            desc: 'از سرآشپز سوشی با سال‌ها تجربه یاد بگیرید',
          },
          handsOn: {
            title: 'تمرین عملی',
            desc: 'با ابزارهای حرفه‌ای و تکنیک‌های واقعی تمرین کنید',
          },
          takeHome: {
            title: 'مهارت‌های قابل استفاده در خانه',
            desc: 'با دستورها، تکنیک‌ها و اعتمادبه‌نفس برای ساخت در خانه برگردید',
          },
        },
        cta: {
          title: 'آمادهٔ یادگیری هستید؟',
          desc: 'امروز کارگاه‌تان را رزرو کنید یا برای گزینه‌های سفارشی پیام بدهید',
          button: 'تماس با ما',
        },
      },
    },
  },
} as const;

function applyDocumentLanguage(lng: string) {
  if (typeof document === 'undefined') return;
  const isRtl = lng === 'fa';
  document.documentElement.lang = lng;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
}

const initialLanguage = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'fa' || saved === 'en' ? saved : 'en';
  } catch {
    return 'en';
  }
})();

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fa'],
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (lng) => {
  applyDocumentLanguage(lng);
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignore
  }
});

applyDocumentLanguage(initialLanguage);

export default i18n;
