// Environment variable configuration
export const env = {
  app: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '0.0.0',
    environment: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
  auth: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  database: {
    url: process.env.DATABASE_URL,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  services: {
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    falKey: process.env.FAL_KEY,
    deepInfraKey: process.env.DEEPINFRA_API_KEY,
  }
};

// Validate required environment variables
export function validateEnvConfig() {
  const requiredVars = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'DATABASE_URL',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY'
  ];
  
  const missing = requiredVars.filter(
    varName => !process.env[varName]
  );
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

// Change detection thresholds
export const CHANGE_THRESHOLDS = {
  // Percentage change threshold for numeric values
  NUMERIC_PERCENT_THRESHOLD: 20,

  // Percentage change threshold for string length
  STRING_LENGTH_PERCENT_THRESHOLD: 30,

  // Minimum string length to consider significant
  MIN_STRING_LENGTH: 10,

  // Minimum rating change to consider significant (on 1-10 scale)
  MIN_RATING_CHANGE: 2,

  // Minimum confidence change to consider significant (percentage points)
  MIN_CONFIDENCE_CHANGE: 15,

  // Sentiment sensitivity factor
  SENTIMENT_SENSITIVITY: 0.1,
}

// Audio recording settings
export const AUDIO_SETTINGS = {
  // Maximum recording duration in seconds
  MAX_RECORDING_DURATION: 300,

  // Minimum recording duration in seconds to save
  MIN_RECORDING_DURATION: 3,

  // Audio quality (sample rate)
  SAMPLE_RATE: 44100,

  // Audio format
  FORMAT: "audio/webm",
}

// AI analysis settings
export const AI_SETTINGS = {
  // Minimum confidence score for AI recommendations
  MIN_CONFIDENCE_SCORE: 0.7,

  // Maximum number of recommendations to show
  MAX_RECOMMENDATIONS: 5,

  // Refresh interval for AI analysis in minutes
  REFRESH_INTERVAL: 60,

  // Enable/disable AI features
  FEATURES_ENABLED: true,
}

// Evaluation metrics weights
export const EVALUATION_WEIGHTS = {
  // Technical feasibility weights
  TECHNICAL_FEASIBILITY: {
    COMPLEXITY: 0.3,
    TIME_TO_MARKET: 0.3,
    RESOURCE_REQUIREMENTS: 0.2,
    TECHNICAL_RISK: 0.2,
  },

  // Impact assessment weights
  IMPACT_ASSESSMENT: {
    MARKET_DISRUPTION: 0.25,
    USER_BENEFIT: 0.3,
    ECOSYSTEM_CONTRIBUTION: 0.25,
    LONG_TERM_POTENTIAL: 0.2,
  },

  // Partner synergy weights
  PARTNER_SYNERGY: {
    MARKET_ALIGNMENT: 0.3,
    RESOURCE_COMPATIBILITY: 0.25,
    MUTUAL_BENEFITS: 0.3,
    INTEGRATION_EASE: 0.15,
  },
}

// Motivational quotes
export const QUOTES = [
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    text: "Ideas are the beginning points of all fortunes.",
    author: "Napoleon Hill",
  },
  {
    text: "The tipping point is that magic moment when an idea, trend, or social behavior crosses a threshold, tips, and spreads like wildfire.",
    author: "Malcolm Gladwell",
  },
  {
    text: "If you're not embarrassed by the first version of your product, you've launched too late.",
    author: "Reid Hoffman",
  },
  {
    text: "Make something people want.",
    author: "Paul Graham",
  },
  {
    text: "The biggest risk is not taking any risk.",
    author: "Mark Zuckerberg",
  },
  {
    text: "Don't worry about failure; you only need to be right once.",
    author: "Drew Houston",
  },
  {
    text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    author: "Steve Jobs",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
]

export const SYNERGY_THRESHOLDS = {
  MIN_VALUABLE_SCORE: 60,
}

// Export a combined config object for convenience
export const config = {
  env,
  changeThresholds: CHANGE_THRESHOLDS,
  audioSettings: AUDIO_SETTINGS,
  aiSettings: AI_SETTINGS,
  evaluationWeights: EVALUATION_WEIGHTS,
  quotes: QUOTES,
  synergyThresholds: SYNERGY_THRESHOLDS,
};

// Default export for convenience
export default config;