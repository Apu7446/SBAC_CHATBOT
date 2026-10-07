/**
 * SBAC Bank PLC - Chatbot Knowledge Base
 * Structured data extracted from sbacbank.com
 */
const SBAC_KNOWLEDGE = {
  bankInfo: {
    fullName: "SBAC Bank PLC (South Bangla Agriculture and Commerce Bank PLC)",
    shortName: "SBAC Bank",
    generation: "4th Generation Private Commercial Bank in Bangladesh",
    established: "April 2013",
    swiftCode: "SBACBDDH",
    headOffice: "BSC Tower, (5th - 16th Floor), 2-3 Rajuk Avenue, Motijheel, Dhaka-1000",
    mapUrl: "https://maps.app.goo.gl/MbQ5QkHvFxvhyEoHA",
    hotline: "16327",
    internationalHotline: "+880 9612 016327",
    overseasAlt: "09611-016327",
    email: "info@sbacbank.com",
    bankingHours: {
      days: "Sunday to Thursday (রবিবার - বৃহস্পতিবার)",
      hours: "10:00 AM - 5:00 PM",
      closedDays: "Friday, Saturday and Public Holidays (শুক্রবার, শনিবার ও সরকারি ছুটি)"
    },
    subsidiary: {
      name: "SBAC Investment Limited",
      website: "https://sbacbsl.com"
    }
  },

  urls: {
    website: "https://www.sbacbank.com",
    eKyc: "https://sbacdigital.com",
    internetBanking: "https://ibank.sbacbank.com:8080",
    locations: "https://www.sbacbank.com/locations",
    emiCalculator: "https://www.sbacbank.com/emi-calculator",
    productSelector: "https://www.sbacbank.com/product-selector",
    career: "https://career.sbacdigital.com",
    interestRates: "https://www.sbacbank.com/interest-rates",
    depositRatesPdf: "https://cdn.sbacbank.com/files/documents/deposit-interest-rates.pdf",
    loanRatesPdf: "https://cdn.sbacbank.com/files/documents/loan-interest-rates.pdf",
    scheduleOfChargesPdf: "https://cdn.sbacbank.com/files/documents/schedule-of-charges.pdf",
    complaintCell: "https://www.sbacbank.com/complaint-cell",
    forms: "https://www.sbacbank.com/forms",
    cards: "https://www.sbacbank.com/cards",
    agentBanking: "https://www.sbacbank.com/agent-banking",
    treasury: "https://www.sbacbank.com/treasury",
    investorRelations: "https://www.sbacbank.com/investors-relations",
    playStore: "https://play.google.com/store/apps/details?id=com.sbac&hl=en&gl=US",
    appStore: "https://apps.apple.com/us/app/banglapay/id1445566322"
  },

  accounts: [
    {
      id: "savings",
      name: "Savings Deposit Account",
      banglaName: "সেভিংস ডিপোজিট অ্যাকাউন্ট",
      minBalance: "Tk 1,000",
      description: "সাধারণ নাগরিক ও পেশাজীবীদের জন্য লাভজনক সঞ্চয়ী হিসাব।",
      docs: "NID/পাসপোর্ট/জন্ম সনদ, ২ কপি ছবি, নমিনির ১ কপি ছবি ও NID, ইউটিলিটি বিলের কপি।"
    },
    {
      id: "current",
      name: "Current Deposit Account",
      banglaName: "কারেন্ট ডিপোজিট অ্যাকাউন্ট (চলতি হিসাব)",
      minBalance: "Tk 2,000 - 5,000",
      description: "ব্যবসায়ী ও প্রতিষ্ঠানের জন্য আনলিমিটেড লেনদেন ও চেকবুক সুবিধা সম্পন্ন অ্যাকাউন্ট।",
      docs: "ট্রেড লাইসেন্স, মালিকের NID ও ছবি, ই-টিন (TIN), নমিনির তথ্য।"
    },
    {
      id: "parua",
      name: "SBAC Parua",
      banglaName: "এসবিএসি পড়ুয়া (স্টুডেন্ট অ্যাকাউন্ট)",
      minBalance: "মাত্র ৫০০ টাকা (Tk 500)",
      description: "স্কুল-কলেজ পড়ুয়া শিক্ষার্থীদের জন্য আকর্ষণীয় সুদের হারে সঞ্চয়ী অ্যাকাউন্ট।",
      docs: "শিক্ষার্থীর জন্ম সনদ/NID, স্টুডেন্ট আইডি/ফি রসিদ, অভিভাবকের NID ও ছবি।"
    },
    {
      id: "ucchasha",
      name: "SBAC Ucchasha",
      banglaName: "এসবিএসি উচ্ছ্বাস (উচ্চশিক্ষা সঞ্চয়)",
      minBalance: "১,০০০ টাকা (Tk 1,000)",
      description: "কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের উচ্চশিক্ষা ব্যয় নির্বাহের জন্য বিশেষ অ্যাকাউন্ট।",
      docs: "বিশ্ববিদ্যালয়/কলেজ আইডি, শিক্ষার্থীর ছবি ও NID/জন্ম সনদ।"
    },
    {
      id: "senior",
      name: "Senior Citizen Savings Account",
      banglaName: "সিনিয়র সিটিজেন সেভিংস অ্যাকাউন্ট",
      minBalance: "Tk 1,000",
      description: "৫০/৬০+ বছর বয়সী প্রবীণ নাগরিকদের জন্য অগ্রাধিকার সেবা ও অতিরিক্ত সুদের সুবিধা।",
      docs: "NID (বয়স প্রমাণের জন্য), ছবি, নমিনির ছবি ও NID।"
    },
    {
      id: "probashi",
      name: "SBAC Probashi",
      banglaName: "এসবিএসি প্রবাসী অ্যাকাউন্ট",
      minBalance: "Tk 1,000",
      description: "প্রবাসী বাংলাদেশীদের (NRB) সহজে রেমিট্যান্স পাঠানো ও দেশের মাটিতে সঞ্চয়ের সুযোগ।",
      docs: "বৈধ পাসপোর্ট, ভিসা/আকামা কপি, বিদেশের কর্মস্থলের প্রমাণ, দেশের নমিনির NID ও ছবি।"
    },
    {
      id: "fast",
      name: "SBAC Fast Account",
      banglaName: "এসবিএসি ফাস্ট অ্যাকাউন্ট (ই-কেওয়াইসি)",
      minBalance: "Tk 500 - 1,000",
      description: "sbacdigital.com ওয়েবসাইটে ঘরে বসে এনআইডি দিয়ে কয়েক মিনিটেই পেপারলেস অ্যাকাউন্ট খোলার সুবিধা।",
      docs: "শুধুমাত্র ন্যাশনাল আইডি কার্ড (NID) ও স্মার্টফোন সেলফি।"
    },
    {
      id: "inclusion",
      name: "Financial Inclusion Accounts",
      banglaName: "১০ টাকা, ৫০ টাকা ও ১০০ টাকার অ্যাকাউন্ট",
      minBalance: "Tk 10 / 50 / 100",
      description: "কৃষক, পোশাক শ্রমিক ও প্রাথমিক শিক্ষার্থীদের ব্যাংকিং আওতায় আনার বিশেষ অ্যাকাউন্ট।"
    }
  ],

  depositSchemes: [
    {
      name: "Fixed Deposit Receipt (FDR)",
      banglaName: "ফিক্সড ডিপোজিট (এফডিআর)",
      details: "১, ৩, ৬, ১২, ২৪ বা ৩৬ মাসের নির্দিষ্ট মেয়াদে আকর্ষণীয় ও নিশ্চিত মুনাফা।"
    },
    {
      name: "Monthly Savings Scheme (DPS/MSS)",
      banglaName: "ডিপিএস / মান্থলি সেভিংস স্কিম",
      details: "প্রতি মাসে ৫০০ টাকা থেকে শুরু করে সাধ্যমতো কিস্তিতে ১ থেকে ১০ বছর মেয়াদী সঞ্চয়।"
    },
    {
      name: "Double Benefit Scheme (DBS)",
      banglaName: "ডাবল বেনিফিট স্কিম (দ্বিগুণ বৃদ্ধি স্কিম)",
      details: "নির্দিষ্ট মেয়াদে এককালীন জমার টাকা দ্বিগুণ হওয়ার জনপ্রিয় স্কিম।"
    },
    {
      name: "Triple Benefit Scheme (TBS)",
      banglaName: "ট্রিপল বেনিফিট স্কিম (তিনগুণ বৃদ্ধি স্কিম)",
      details: "দীর্ঘমেয়াদে জমার টাকা ৩ গুণ করার নিরাপদ সঞ্চয় পরিকল্পনা।"
    },
    {
      name: "Monthly Benefit Scheme (MBS / MIS)",
      banglaName: "মান্থলি বেনিফিট স্কিম (মাসিক মুনাফা স্কিম)",
      details: "এককালীন বড় অংকের টাকা জমা রেখে প্রতি মাসে সংসার খরচের জন্য নির্দিষ্ট মুনাফা পাওয়ার সুবিধা।"
    },
    {
      name: "Lakhopoti & Kotipoti Schemes",
      banglaName: "লাখপতি ও কোটিপতি সঞ্চয় স্কিম",
      details: "সহজ মাসিক কিস্তিতে নির্দিষ্ট মেয়াদে ১ লাখ বা ১ কোটি টাকার তহবিল গঠনের স্কিম।"
    }
  ],

  banglaPayFeatures: [
    "২৪/৭ রিয়েল-টাইম ব্যালেন্স অনুসন্ধান ও মিনি স্টেটমেন্ট",
    "SBAC অ্যাকাউন্টে ইনস্ট্যান্ট ফান্ড ট্রান্সফার",
    "অন্যান্য ব্যাংকে NPSB (তাত্ক্ষণিক) এবং BEFTN / RTGS ট্রান্সফার",
    "বিকাশ (bKash), নগদ (Nagad) ও রকেট (Rocket) ওয়ালেটে সরাসরি টাকা পাঠানো",
    "সব সিম অপারেটরে মোবাইল রিচার্জ (GP, BL, Robi, Airtel, Teletalk)",
    "বিদ্যুৎ, গ্যাস, পানি ও ইন্টারনেট ইউটিলিটি বিল পরিশোধ",
    "ক্রেডিট কার্ডের বিল পেমেন্ট",
    "বাংলা কিউআর (Bangla QR) এর মাধ্যমে দোকানে কেনাকাটার বিল পেমেন্ট",
    "চেক বই রিকোয়েস্ট ও চেক স্টপ সুবিধা"
  ],

  loans: [
    {
      name: "Personal Loan (ব্যক্তিগত ঋণ)",
      details: "চাকরিজীবী ও পেশাজীবীদের যেকোনো ব্যক্তিগত প্রয়োজনে জামানতবিহীন সহজ লোন সুবিধা।"
    },
    {
      name: "Home Loan (গৃহ ঋণ)",
      details: "ফ্ল্যাট ক্রয়, বাড়ি নির্মাণ বা সংস্কারের জন্য দীর্ঘমেয়াদী কিস্তিতে আকর্ষণীয় হাউজিং লোন।"
    },
    {
      name: "Auto / Car Loan (গাড়ি ঋণ)",
      details: "নতুন বা রিকন্ডিশন্ড গাড়ি কেনার জন্য সহজ শর্তে অটো লোন।"
    },
    {
      name: "CMSME & Women Entrepreneur Loan",
      details: "ক্ষুদ্র ও মাঝারি ব্যবসা এবং নারী উদ্যোক্তাদের জন্য বিশেষ ও সহজ শর্তে অর্থায়ন।"
    },
    {
      name: "Agriculture Loan (কৃষি ঋণ)",
      details: "ফসল চাষ, ডেইরি, পোল্ট্রি, মৎস্য ও কৃষি যন্ত্রপাতি ক্রয়ের জন্য সহজ কৃষি ঋণ।"
    }
  ]
};
