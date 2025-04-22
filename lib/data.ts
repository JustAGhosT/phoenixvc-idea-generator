export type Idea = {
  id: number
  title: string
  confidence: number
  rating: number
  keyDifferentiator: string
  perspectives: {
    positive: string[]
    negative: string[]
  }
  jtbd: {
    core: string
    functional: string
    emotional: string
    social: string
  }
  pestel: {
    political: string
    economic: string
    social: string
    technological: string
    environmental: string
    legal: string
  }
  scenarios: string[]
  swot: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  portersFiveForces: {
    newEntrants: string
    supplierPower: string
    buyerPower: string
    substitutes: string
    rivalry: string
  }
  leanCanvas: {
    problem: string
    customerSegments: string
    uniqueValueProposition: string
    solution: string
    keyMetrics: string
    channels: string
    costStructure: string
    revenueStreams: string
    unfairAdvantage: string
  }
  blueOcean: {
    newMarketSpace: string
    makeCompetitionIrrelevant: string
  }
  marketSize: {
    tam: string
    sam: string
    som: string
  }
}

export const ideas: Idea[] = [
  {
    id: 1,
    title: "Advanced DeFi Risk Intelligence Platform",
    confidence: 75,
    rating: 8,
    keyDifferentiator: "Multi-chain systemic risk engine",
    perspectives: {
      positive: [
        "Fulfills a critical blind-spot in DeFi: systemic risk modeling across protocols.",
        "Institutional-grade analytics builds trust and unlocks large capital pools.",
        "First-mover advantage on Tezos/Etherlink could seed network effects.",
      ],
      negative: [
        "Data scarcity and regime shifts may lead to misleading predictions ('garbage in, garbage out').",
        "Resistance from protocols that prize decentralization over opaque 'black-box' AI.",
        "High R&D cost with uncertain ROI if regulation outpaces development.",
      ],
    },
    jtbd: {
      core: "Ensure safety of capital in complex DeFi environments.",
      functional: "Detect vulnerabilities, forecast liquidity crises, generate alerts.",
      emotional: "Reduce anxiety about hacks/exploits; instill confidence.",
      social: "Signal credibility to stakeholders and regulators.",
    },
    pestel: {
      political: "Potential support as regulators demand better risk reporting.",
      economic: "DeFi continues to attract institutional flows seeking yield.",
      social: "Growing mainstream awareness of DeFi hacks drives demand.",
      technological: "Advances in ML and real-time on-chain data feeds.",
      environmental: "Energy usage concerns around on-chain data indexing.",
      legal: "Unclear liability if AI outputs miss a major exploit.",
    },
    scenarios: [
      "Regulation Catch-Up: Stricter on-chain oversight boosts demand for risk tools.",
      "DeFi Winter: Capital dries up; only cost-efficient tools survive.",
      "Interchain Explosion: New chains emerge, raising complexity beyond current models.",
    ],
    swot: {
      strengths: ["Domain expertise", "Real-time dashboards", "Protocol-agnostic ML"],
      weaknesses: ["High data-science cost", "Model opacity", "Dependency on oracle quality"],
      opportunities: ["Partnerships with custodians and compliance platforms"],
      threats: ["New open-source risk frameworks", "Regulatory bans on predictive scoring"],
    },
    portersFiveForces: {
      newEntrants: "Medium—tech expertise barrier, but open-source could lower it.",
      supplierPower: "High—reliable on-chain data feeds and oracle services are scarce.",
      buyerPower: "High—institutional clients negotiate hard on price/features.",
      substitutes: "Existing risk-assessment consultancies or protocol audits.",
      rivalry: "Intensifying as traditional finance players eye DeFi.",
    },
    leanCanvas: {
      problem: "Hidden systemic risks, unpredictable exploits, lack of real-time insights.",
      customerSegments: "DeFi DAOs, treasury managers, institutional investors.",
      uniqueValueProposition: "See DeFi risk before it strikes—AI-driven, protocol-wide, real-time.",
      solution: "ML vulnerability scans + interconnected risk modeling + alerts.",
      keyMetrics: "Protocols covered, alerts generated, capital protected.",
      channels: "Direct DAO sales; custodian partnerships; conferences.",
      costStructure: "Data ingestion, ML R&D, cloud compute, compliance.",
      revenueStreams: "Subscription tiers by AUM; consulting add-ons.",
      unfairAdvantage: "Proprietary multi-chain correlation engine; early foothold.",
    },
    blueOcean: {
      newMarketSpace: "Blend DeFi risk analytics with institutional reporting standards.",
      makeCompetitionIrrelevant: "Shift from one-off audits to continuous AI-powered monitoring.",
    },
    marketSize: {
      tam: "~$200 billion DeFi AUM → ~$1 billion platform value.",
      sam: "20% institutional segment → $200 million.",
      som: "Capture 5% of SAM → $10 million ARR.",
    },
  },
  {
    id: 2,
    title: "Cross-Chain DeFi Intelligence & Optimization Suite",
    confidence: 65,
    rating: 7,
    keyDifferentiator: "Automated cross-chain arbitrage and yield optimization",
    perspectives: {
      positive: [
        "Addresses multi-chain fragmentation—huge ROI for users who optimize yields.",
        "AI agents reduce manual arbitrage complexity, democratizing profits.",
      ],
      negative: [
        "Rapid protocol changes and variable gas markets may outpace AI's training.",
        "Smart-contract execution risk: bots could lose funds chasing fleeting opportunities.",
      ],
    },
    jtbd: {
      core: "Maximize returns across multiple blockchains with minimal effort.",
      functional: "Identify arbitrage, rebalance assets, predict gas fees.",
      emotional: "Feel savvy; avoid FOMO/missed trades.",
      social: "Share bragging rights on ROI dashboards.",
    },
    pestel: {
      political: "Cross-border capital controls could hamper execution.",
      economic: "Gas price volatility influences arbitrage margins.",
      social: "Demand for passive yield alongside DIY strategies.",
      technological: "Emergence of Layer-2s and cross-chain bridges.",
      environmental: "L2s reducing energy footprint; may favor usage.",
      legal: "Front-running regulations; MEV bot restrictions.",
    },
    scenarios: [
      "MEV Clampdown: Chains limit MEV, shrinking arbitrage opportunities.",
      "Composable Explosion: Standardized interoperability simplifies cross-chain.",
      "Black Swan Event: Major hack wipes out yields; skepticism of AI.",
    ],
    swot: {
      strengths: ["Real-time multi-chain view", "Automated execution"],
      weaknesses: ["High operational complexity", "Security of trading agents"],
      opportunities: ["White-label for exchanges", "Bridge partnerships"],
      threats: ["Competing optimizer bots", "Human arbitrage desks"],
    },
    portersFiveForces: {
      newEntrants: "Medium—open-source arbitrage bots exist.",
      supplierPower: "Low—data feeds abundant.",
      buyerPower: "High—traders are price-sensitive.",
      substitutes: "Manual dashboards; yield aggregators.",
      rivalry: "High in yield-optimization niche.",
    },
    leanCanvas: {
      problem: "Inefficient capital allocation; missed cross-chain yield.",
      customerSegments: "Yield farmers, treasury desks.",
      uniqueValueProposition: "Auto-pilot your DeFi yields—every chain, every strategy.",
      solution: "AI optimizer + execution bots + cost prediction.",
      keyMetrics: "Yield uplift %, bots live, chains covered.",
      channels: "DeFi aggregators; hackathons; community bounties.",
      costStructure: "Bot infrastructure, security audits, dev ops.",
      revenueStreams: "Performance fees; subscriptions.",
      unfairAdvantage: "Proprietary path-discovery algorithms.",
    },
    blueOcean: {
      newMarketSpace: "Unified cross-chain portfolio management UX + AI execution.",
      makeCompetitionIrrelevant: "Move beyond manual, dashboard-only tools.",
    },
    marketSize: {
      tam: "~$80 billion DeFi TVL → ~$400 million optimizer market.",
      sam: "10% active multi-chain farmers → $40 million.",
      som: "10% capture → $4 million ARR.",
    },
  },
  {
    id: 3,
    title: "AI-Powered DeFi Governance Analytics Platform",
    confidence: 60,
    rating: 7,
    keyDifferentiator: "NLP-driven proposal scoring + outcome simulation",
    perspectives: {
      positive: [
        "Tackles voter apathy and uninformed DAO decisions—could redefine 'on-chain democracy.'",
        "Simulation features turn governance into a strategic, engaging process.",
      ],
      negative: [
        "Governance is cultural—AI recommendations may be ignored or mistrusted.",
        "Complex models risk oversimplifying nuanced political dynamics.",
      ],
    },
    jtbd: {
      core: "Make DAO governance more informed, participatory, and secure.",
      functional: "Analyze proposals, simulate outcomes.",
      emotional: "Empower contributors, reduce fear of bad decisions.",
      social: "Showcase thought-leadership within DAO community.",
    },
    pestel: {
      political: "Jurisdictional variation; many DAOs operate outside direct regulation.",
      economic: "Token incentives can drive or hinder participation.",
      social: "Web3 culture demands transparency and fairness.",
      technological: "NLP enables robust proposal sentiment analysis.",
      environmental: "Negligible impact.",
      legal: "Liability concerns if AI advice leads to treasury loss.",
    },
    scenarios: [
      "DAO Standardization: Governance models converge; platform easily adapts.",
      "Governance Fatigue: Too many proposals; AI alerts ignored.",
      "Regulatory Crackdown: On-chain voting subject to securities laws.",
    ],
    swot: {
      strengths: ["Unique simulation + recommendation engine"],
      weaknesses: ["Data quality depends on proposal clarity"],
      opportunities: ["Spin-off to on-chain lobbying services"],
      threats: ["Upgraded native governance tools", "Community skepticism"],
    },
    portersFiveForces: {
      newEntrants: "Low—NLP frameworks are open.",
      supplierPower: "Low—governance data is public.",
      buyerPower: "Medium—DAOs have limited budgets.",
      substitutes: "Manual dashboards; forums.",
      rivalry: "Growing as DAOs seek better tools.",
    },
    leanCanvas: {
      problem: "Voter apathy, uninformed decisions, governance attacks.",
      customerSegments: "DAO founders, contributors.",
      uniqueValueProposition: "Vote smarter, not harder—AI-driven governance insights.",
      solution: "NLP scoring + outcome simulations + personalized alerts.",
      keyMetrics: "Participation uplift, proposals analyzed, simulation accuracy.",
      channels: "DAO grants; governance incubators; community forums.",
      costStructure: "Data processing; model training; integration.",
      revenueStreams: "Subscription; per-proposal analysis fees.",
      unfairAdvantage: "First mover on Tezos/Etherlink governance.",
    },
    blueOcean: {
      newMarketSpace: "Merge on-chain data with NLP sentiment.",
      makeCompetitionIrrelevant: "Force migration from generic dashboards to predictive tools.",
    },
    marketSize: {
      tam: "~2,000 active DAOs → ~$100 million market.",
      sam: "10% targetable → $10 million.",
      som: "20% capture → $2 million ARR.",
    },
  },
  {
    id: 4,
    title: "Enhanced DeFi Oracle Network",
    confidence: 55,
    rating: 6,
    keyDifferentiator: "AI anomaly detection layered atop threshold cryptography",
    perspectives: {
      positive: [
        "Solves one of DeFi's most acute vulnerabilities: oracle manipulation.",
        "AI anomaly detection adds a dynamic defense layer beyond static cryptography.",
      ],
      negative: [
        "Convincing protocols to swap in a new oracle is an uphill trust battle.",
        "Established players (Chainlink, Band) have enormous network effects.",
      ],
    },
    jtbd: {
      core: "Deliver secure, accurate data feeds on-chain.",
      functional: "Validate data; detect anomalies.",
      emotional: "Give peace of mind to protocol developers.",
      social: "Enhance reputation as 'security-first'.",
    },
    pestel: {
      political: "Potential scrutiny if faulty data causes market damage.",
      economic: "Cost of feeds vs. potential exploit losses.",
      social: "Demand for transparency & decentralization.",
      technological: "Advances in threshold cryptography; AI.",
      environmental: "Off-chain compute footprint.",
      legal: "Liability for 'bad data' incidents.",
    },
    scenarios: [
      "Oracle Wars: Protocols demand multiverse oracle redundancy.",
      "On-Chain Data Boom: Native chain oracles reduce third-party need.",
      "Regulatory Mandate: Certifications required for oracle networks.",
    ],
    swot: {
      strengths: ["AI-driven anomaly detection", "Chain-agnostic"],
      weaknesses: ["Bootstrapping provider reputation"],
      opportunities: ["Insurance protocol integrations"],
      threats: ["Attacks on AI models or providers"],
    },
    portersFiveForces: {
      newEntrants: "Medium—cryptography expertise needed.",
      supplierPower: "High—trusted data providers scarce.",
      buyerPower: "Medium—protocols value reliability.",
      substitutes: "Internal chain oracles; centralized APIs.",
      rivalry: "High—established oracle incumbents.",
    },
    leanCanvas: {
      problem: "Price-feed manipulation, downtime, centralization risk.",
      customerSegments: "DeFi protocols, dApp devs.",
      uniqueValueProposition: "Oracle 3.0—AI-monitored, cryptographically secure.",
      solution: "Multi-source aggregation + anomaly AI + consensus.",
      keyMetrics: "SLA uptime; anomalies caught; subscribers.",
      channels: "Developer meetups; security audits; consortiums.",
      costStructure: "Node ops; cryptographic R&D; AI monitoring.",
      revenueStreams: "Subscription; premium SLA contracts.",
      unfairAdvantage: "Hybrid AI/crypto architecture.",
    },
    blueOcean: {
      newMarketSpace: "Real-time AI detection + next-gen cryptography.",
      makeCompetitionIrrelevant: "Static oracles sidelined.",
    },
    marketSize: {
      tam: "~$50 billion DeFi requiring oracles.",
      sam: "10% → $5 billion feed spend.",
      som: "1% capture → $50 million ARR.",
    },
  },
  {
    id: 5,
    title: "AI-Driven Regulatory Compliance Platform for DeFi",
    confidence: 80,
    rating: 9,
    keyDifferentiator: "Real-time mapping of global regs to on-chain transactions",
    perspectives: {
      positive: [
        "Closes the regulatory gap that scares institutional capital away.",
        "Automated KYC/AML and risk scoring streamlines audits.",
      ],
      negative: [
        "Regulatory regimes differ wildly—hard to build one-size-fits-all.",
        "DeFi purists may rebel against compliance 'middlemen.'",
      ],
    },
    jtbd: {
      core: "Ensure on-chain activities meet KYC/AML and reporting mandates.",
      functional: "Transaction monitoring, report generation.",
      emotional: "Alleviate legal anxieties.",
      social: "Signal legitimacy to partners/investors.",
    },
    pestel: {
      political: "Governments increasing scrutiny of crypto flows.",
      economic: "Fines for non-compliance can exceed revenue.",
      social: "Growing public demand for transparency.",
      technological: "NLP for legal-text parsing; on-chain analytics.",
      environmental: "Minimal impact.",
      legal: "Constantly evolving global regulations.",
    },
    scenarios: [
      "Global Standards: FATF bans non-compliant chains → demand spikes.",
      "Fragmented Regimes: Localized rules force modular engine.",
      "Regulation Chill: DeFi retreats to privacy chains.",
    ],
    swot: {
      strengths: ["Automated mapping of regs → on-chain"],
      weaknesses: ["Maintenance overhead as rules change"],
      opportunities: ["White-label for exchanges, banks"],
      threats: ["DIY compliance scripts", "Open-source trackers"],
    },
    portersFiveForces: {
      newEntrants: "Low—legal-tech startups emerging.",
      supplierPower: "Medium—regulatory data sources.",
      buyerPower: "High—protocols want to avoid fines.",
      substitutes: "Manual compliance teams.",
      rivalry: "Growing as RegTech intersects with DeFi.",
    },
    leanCanvas: {
      problem: "Unpredictable compliance costs, legal risk.",
      customerSegments: "DeFi protocols, CEXs, institutional investors.",
      uniqueValueProposition: "One AI to comply them all—real-time DeFi regulation engine.",
      solution: "NLP rule parsing + on-chain transaction scoring + reports.",
      keyMetrics: "Compliance incidents avoided; audit time saved.",
      channels: "RegTech partnerships; compliance conferences.",
      costStructure: "Legal research; data integration; maintenance.",
      revenueStreams: "Subscription; per-report fees.",
      unfairAdvantage: "Deep on-chain/reg-text linkage.",
    },
    blueOcean: {
      newMarketSpace: "Intersection of RegTech and DeFi monitoring.",
      makeCompetitionIrrelevant: "Replace spreadsheets/manual audits.",
    },
    marketSize: {
      tam: "~$60 billion global RegTech spend → $600 million DeFi segment.",
      sam: "20% targetable → $120 million.",
      som: "10% → $12 million ARR.",
    },
  },
  {
    id: 6,
    title: "AI-Enhanced Liquidity Management System",
    confidence: 70,
    rating: 8,
    keyDifferentiator: "Predictive IL models with dynamic rebalancing",
    perspectives: {
      positive: [
        "Optimizes impermanent loss vs. yield trade-offs—liquidity providers love that.",
        "Automates what now requires constant on-chain monitoring.",
      ],
      negative: [
        "Impermanent loss is fundamentally unpredictable; models may misfire.",
        "LPs distrust 'auto-rebalancing' bots after flash-loan attacks.",
      ],
    },
    jtbd: {
      core: "Balance risk and return in liquidity pools automatically.",
      functional: "Predict pool performance; rebalance assets.",
      emotional: "Reduce FUD and manual overhead.",
      social: "Flaunt optimized returns.",
    },
    pestel: {
      political: "Pool regulations (e.g., unregistered securities).",
      economic: "TVL swings affect performance predictions.",
      social: "Growing LP sophistication demands smarter tools.",
      technological: "Advances in time-series forecasting.",
      environmental: "Negligible impact.",
      legal: "Liability if bot loses funds.",
    },
    scenarios: [
      "LP Boom: New incentives flood protocols; automators in demand.",
      "Loss Panic: Major IL event erodes trust in auto-rebalancers.",
      "Protocol Consolidation: Fewer large pools → simpler to optimize.",
    ],
    swot: {
      strengths: ["High ROI potential", "Modular across pools"],
      weaknesses: ["Model overfitting", "On-chain agent security"],
      opportunities: ["Native AMM integrations"],
      threats: ["Protocol auto-optimizers", "MEV dominance"],
    },
    portersFiveForces: {
      newEntrants: "Medium—requires forecasting expertise.",
      supplierPower: "Low—public on-chain data.",
      buyerPower: "High—LPs shop for best returns.",
      substitutes: "Manual rebalance; yield aggregators.",
      rivalry: "High in yield-optimization.",
    },
    leanCanvas: {
      problem: "Impermanent loss; sub-optimal yield.",
      customerSegments: "LPs; protocol treasuries.",
      uniqueValueProposition: "Maximize LP returns, minimize loss—automatically.",
      solution: "Predictive IL model + dynamic rebalancer.",
      keyMetrics: "ROI uplift; rebalances executed; AUM.",
      channels: "AMM partnerships; DeFi dashboards.",
      costStructure: "Bot infra; model maintenance.",
      revenueStreams: "Performance fees.",
      unfairAdvantage: "Risk-adjusted optimization engine.",
    },
    blueOcean: {
      newMarketSpace: "Merge ML forecasting with auto-rebalancing at scale.",
      makeCompetitionIrrelevant: "Eliminate manual position tracking.",
    },
    marketSize: {
      tam: "~$80 billion DeFi TVL → $8 billion addressable.",
      sam: "25% active LPs → $2 billion.",
      som: "1% capture → $20 million ARR.",
    },
  },
  {
    id: 7,
    title: "Sentiment-Driven Market Intelligence for DeFi",
    confidence: 50,
    rating: 6,
    keyDifferentiator: "Fusion of social sentiment with on-chain metrics",
    perspectives: {
      positive: [
        "Captures alpha from social chatter—quantifies hype-driven moves.",
        "Integrates on-chain metrics with sentiment for richer signals.",
      ],
      negative: [
        "Sentiment reversals happen faster than models adapt, leading to whipsaw losses.",
        "Data noise and bots pollute social streams; low signal-to-noise ratio.",
      ],
    },
    jtbd: {
      core: "Forecast short-term price moves and adoption trends.",
      functional: "Scrape, analyze sentiment; correlate with on-chain flows.",
      emotional: "Feel ahead of the crowd; avoid FOMO.",
      social: "Share actionable insights for clout.",
    },
    pestel: {
      political: "Social media regulation (e.g., X content moderation).",
      economic: "Correlation breakdown in stressed markets.",
      social: "Meme culture fueling rapid pumps.",
      technological: "Transformer-based NLP improvements.",
      environmental: "Low impact.",
      legal: "Insider-trading rules unclear in crypto.",
    },
    scenarios: [
      "Meme Mania: Extreme social-driven pumps favor the tool.",
      "Data Crackdown: Bots regulated, reducing noise.",
      "On-Chain Only: Investors ignore social signals.",
    ],
    swot: {
      strengths: ["Holistic data fusion", "Customizable alerts"],
      weaknesses: ["Overfitting sentiment to price", "Model decay"],
      opportunities: ["White-label for exchanges", "Fund partnerships"],
      threats: ["Generic sentiment APIs", "On-chain quant funds"],
    },
    portersFiveForces: {
      newEntrants: "Low—NLP stacks are open.",
      supplierPower: "Low—social APIs available.",
      buyerPower: "High—traders seek edge.",
      substitutes: "Research newsletters.",
      rivalry: "High—crowded quant space.",
    },
    leanCanvas: {
      problem: "Information asymmetry; reactive trading.",
      customerSegments: "Traders; funds; protocol developers.",
      uniqueValueProposition: "Decode DeFi hype—turn chatter into alpha.",
      solution: "Multi-vector sentiment engine + on-chain overlay.",
      keyMetrics: "Signal accuracy; active users; alerts.",
      channels: "Trader communities; trading platforms.",
      costStructure: "Data gathering; NLP model training.",
      revenueStreams: "Subscriptions; API fees.",
      unfairAdvantage: "DeFi-specific lexicon; chain correlation.",
    },
    blueOcean: {
      newMarketSpace: "Fuse social analytics with on-chain flows.",
      makeCompetitionIrrelevant: "Generic sentiment tools sidelined.",
    },
    marketSize: {
      tam: "~$100 billion proprietary trading spend → $1 billion DeFi subset.",
      sam: "10% active quant traders → $100 million.",
      som: "Capture 5% → $5 million ARR.",
    },
  },
]

export const templateCategories = [
  {
    id: "defi",
    name: "DeFi",
    description: "Decentralized Finance projects and protocols",
  },
  {
    id: "nft",
    name: "NFT",
    description: "Non-Fungible Token marketplaces and collections",
  },
  {
    id: "dao",
    name: "DAO",
    description: "Decentralized Autonomous Organizations",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Blockchain infrastructure and tooling",
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Blockchain gaming and metaverse",
  },
]

export const templates = [
  {
    id: 1,
    title: "DeFi Project Analysis",
    category: "defi",
    description: "Comprehensive analysis for DeFi projects including risk assessment, market fit, and growth potential",
    template: `# [Project Name] Analysis

## Positive Perspective
- [Key strength 1]
- [Key strength 2]
- [Key strength 3]

## Negative Perspective
- [Key challenge 1]
- [Key challenge 2]
- [Key challenge 3]

## 1. Jobs-To-Be-Done (JTBD)
- **Core Job**: [Primary user need]
- **Functional**: [Functional aspects]
- **Emotional**: [Emotional benefits]
- **Social**: [Social benefits]

## 2. PESTEL Analysis
- **Political**: [Political factors]
- **Economic**: [Economic factors]
- **Social**: [Social factors]
- **Technological**: [Technological factors]
- **Environmental**: [Environmental factors]
- **Legal**: [Legal factors]

## 3. Scenario Planning
- [Scenario 1]: [Description]
- [Scenario 2]: [Description]
- [Scenario 3]: [Description]

## 4. SWOT Analysis
- **Strengths**: [List strengths]
- **Weaknesses**: [List weaknesses]
- **Opportunities**: [List opportunities]
- **Threats**: [List threats]

## 5. Porter's Five Forces
- **Threat of New Entrants**: [Assessment]
- **Supplier Power**: [Assessment]
- **Buyer Power**: [Assessment]
- **Threat of Substitutes**: [Assessment]
- **Competitive Rivalry**: [Assessment]

## 6. Lean Canvas
- **Problem**: [Problem description]
- **Customer Segments**: [Target users]
- **Unique Value Proposition**: [Core value proposition]
- **Solution**: [Solution components]
- **Key Metrics**: [Success metrics]
- **Channels**: [Distribution channels]
- **Cost Structure**: [Major costs]
- **Revenue Streams**: [Revenue sources]
- **Unfair Advantage**: [Competitive moat]

## 7. Blue Ocean Strategy
- **New Market Space**: [Description]
- **Make Competition Irrelevant**: [Strategy]

## 8. TAM/SAM/SOM
- **TAM**: [Total addressable market]
- **SAM**: [Serviceable addressable market]
- **SOM**: [Serviceable obtainable market]`,
  },
  {
    id: 2,
    title: "NFT Project Analysis",
    category: "nft",
    description: "Framework for analyzing NFT projects, collections, and marketplaces",
    template: `# [NFT Project Name] Analysis

## Positive Perspective
- [Key strength 1]
- [Key strength 2]
- [Key strength 3]

## Negative Perspective
- [Key challenge 1]
- [Key challenge 2]
- [Key challenge 3]

## 1. Unique Value Proposition
- [What makes this NFT project unique?]

## 2. Market Analysis
- **Current Market Size**: [Size and growth]
- **Target Audience**: [Primary collectors/users]
- **Competitor Analysis**: [Key competitors]

## 3. Technical Implementation
- **Blockchain**: [Which blockchain(s)]
- **Smart Contract Features**: [Key technical features]
- **Metadata Storage**: [How/where metadata is stored]

## 4. Community & Marketing
- **Community Size**: [Discord/Twitter metrics]
- **Engagement Strategy**: [How community is engaged]
- **Marketing Approach**: [Key marketing channels]

## 5. Team Assessment
- **Core Team**: [Key team members]
- **Track Record**: [Previous successes]
- **Advisors/Partners**: [Strategic relationships]

## 6. Tokenomics
- **Supply Model**: [Total supply, release schedule]
- **Utility**: [Token utility beyond collection]
- **Secondary Market**: [Trading volume, floor price trends]

## 7. Roadmap Evaluation
- **Short-term Milestones**: [0-6 months]
- **Mid-term Vision**: [6-18 months]
- **Long-term Strategy**: [18+ months]

## 8. Risk Assessment
- **Market Risks**: [Market-related risks]
- **Technical Risks**: [Technical vulnerabilities]
- **Regulatory Risks**: [Potential regulatory issues]

## 9. Innovation Factor
- **Novel Mechanics**: [Innovative features]
- **Industry Impact**: [How it might change the industry]

## 10. Investment Potential
- **Floor Price Projection**: [Estimated growth]
- **Liquidity Assessment**: [Trading volume sustainability]
- **Long-term Value Drivers**: [What will drive value over time]`,
  },
  {
    id: 3,
    title: "DAO Structure Analysis",
    category: "dao",
    description: "Framework for analyzing and designing DAO governance and operations",
    template: `# [DAO Name] Analysis

## Positive Perspective
- [Key strength 1]
- [Key strength 2]
- [Key strength 3]

## Negative Perspective
- [Key challenge 1]
- [Key challenge 2]
- [Key challenge 3]

## 1. Governance Structure
- **Voting Mechanism**: [How voting works]
- **Proposal Process**: [How proposals are submitted and processed]
- **Decision Thresholds**: [Requirements for proposal passage]

## 2. Token Economics
- **Token Distribution**: [How tokens are distributed]
- **Voting Power Calculation**: [How voting power is determined]
- **Treasury Management**: [How funds are managed]

## 3. Operational Framework
- **Working Groups**: [Key operational divisions]
- **Contributor Compensation**: [How contributors are paid]
- **Accountability Systems**: [How performance is tracked]

## 4. Community Engagement
- **Onboarding Process**: [How new members join]
- **Communication Channels**: [Primary communication methods]
- **Community Building Strategies**: [How community is grown]

## 5. Legal Structure
- **Legal Wrapper**: [Legal entity structure if any]
- **Jurisdictional Considerations**: [Key legal jurisdictions]
- **Compliance Strategy**: [Approach to regulatory compliance]

## 6. Technical Infrastructure
- **Voting Platform**: [Technical voting implementation]
- **Multi-sig Setup**: [Treasury security approach]
- **Tools & Software**: [Key operational tools]

## 7. Risk Assessment
- **Governance Attacks**: [Potential governance vulnerabilities]
- **Treasury Risks**: [Financial risks]
- **Regulatory Risks**: [Legal and regulatory concerns]

## 8. Performance Metrics
- **Participation Rate**: [Voting and engagement metrics]
- **Proposal Success Rate**: [Proposal statistics]
- **Treasury Growth/Utilization**: [Financial performance]

## 9. Improvement Opportunities
- **Governance Optimizations**: [Governance improvement ideas]
- **Operational Efficiencies**: [Operational improvement ideas]
- **Strategic Initiatives**: [Key strategic opportunities]

## 10. Competitive Analysis
- **Similar DAOs**: [Comparable organizations]
- **Differentiating Factors**: [What makes this DAO unique]
- **Collaboration Potential**: [Potential DAO-to-DAO partnerships]`,
  },
  {
    id: 4,
    title: "Blockchain Infrastructure Analysis",
    category: "infrastructure",
    description: "Framework for analyzing blockchain infrastructure projects including L1s, L2s, and developer tooling",
    template: `# [Infrastructure Project Name] Analysis

## Positive Perspective
- [Key strength 1]
- [Key strength 2]
- [Key strength 3]

## Negative Perspective
- [Key challenge 1]
- [Key challenge 2]
- [Key challenge 3]

## 1. Technical Architecture
- **Consensus Mechanism**: [How consensus is achieved]
- **Scalability Approach**: [How the system scales]
- **Security Model**: [Security architecture]

## 2. Performance Metrics
- **TPS (Transactions Per Second)**: [Current and projected TPS]
- **Finality Time**: [Time to transaction finality]
- **Cost Structure**: [Fee model and economics]

## 3. Developer Experience
- **Programming Languages**: [Supported languages]
- **Documentation Quality**: [State of documentation]
- **SDK/API Maturity**: [Developer tools assessment]

## 4. Ecosystem Development
- **Current dApps**: [Key applications built on the platform]
- **Developer Community**: [Size and activity of developer community]
- **Funding/Grants**: [Support for ecosystem projects]

## 5. Tokenomics
- **Token Utility**: [How the token is used in the system]
- **Distribution Model**: [How tokens are distributed]
- **Value Accrual**: [How the token captures value]

## 6. Governance
- **Decision-Making Process**: [How protocol changes are made]
- **Upgrade Mechanism**: [How upgrades are implemented]
- **Decentralization Level**: [Assessment of decentralization]

## 7. Interoperability
- **Cross-Chain Capabilities**: [How it interacts with other chains]
- **Standards Compliance**: [Adherence to industry standards]
- **Bridge Security**: [If applicable, bridge security assessment]

## 8. Market Position
- **Competitive Landscape**: [Key competitors]
- **Unique Selling Points**: [Key differentiators]
- **Market Share/Adoption**: [Current adoption metrics]

## 9. Team Assessment
- **Core Team**: [Key team members]
- **Technical Expertise**: [Team technical background]
- **Track Record**: [Previous achievements]

## 10. Risk Assessment
- **Technical Risks**: [Key technical vulnerabilities]
- **Economic Risks**: [Token and economic model risks]
- **Regulatory Risks**: [Potential regulatory issues]

## 11. Future Roadmap
- **Short-term Milestones**: [0-6 months]
- **Mid-term Developments**: [6-18 months]
- **Long-term Vision**: [18+ months]`,
  },
  {
    id: 5,
    title: "Blockchain Gaming Analysis",
    category: "gaming",
    description: "Framework for analyzing blockchain games and metaverse projects",
    template: `# [Blockchain Game/Metaverse] Analysis

## Positive Perspective
- [Key strength 1]
- [Key strength 2]
- [Key strength 3]

## Negative Perspective
- [Key challenge 1]
- [Key challenge 2]
- [Key challenge 3]

## 1. Game Mechanics
- **Core Gameplay**: [Primary gameplay loop]
- **Player Progression**: [How players advance]
- **Web3 Integration**: [How blockchain is integrated into gameplay]

## 2. Economic Design
- **Token Model**: [Game tokens and their functions]
- **Play-to-Earn Mechanics**: [How players earn value]
- **Economic Sustainability**: [Long-term economic viability]

## 3. Technical Implementation
- **Blockchain Platform**: [Underlying blockchain]
- **Smart Contract Architecture**: [Key smart contract features]
- **On-chain vs. Off-chain**: [Balance of on/off chain elements]

## 4. Asset Design
- **NFT Implementation**: [How NFTs are used]
- **Asset Utility**: [What NFTs/tokens do in-game]
- **Interoperability**: [Cross-game/platform compatibility]

## 5. User Experience
- **Onboarding Process**: [New player experience]
- **Web3 Abstraction**: [How blockchain complexity is hidden]
- **Game Client Quality**: [Assessment of game client]

## 6. Community & Social
- **Community Size**: [Player base metrics]
- **Social Features**: [In-game social mechanics]
- **Community Engagement**: [How community is involved]

## 7. Team Assessment
- **Game Development Experience**: [Team's gaming background]
- **Blockchain Expertise**: [Team's blockchain experience]
- **Previous Successes**: [Track record]

## 8. Market Position
- **Target Audience**: [Primary player demographic]
- **Competitor Analysis**: [Similar games/platforms]
- **Market Differentiation**: [Unique selling points]

## 9. Business Model
- **Revenue Streams**: [How the project generates revenue]
- **Funding Status**: [Investment and runway]
- **Monetization Strategy**: [Long-term business approach]

## 10. Growth Strategy
- **User Acquisition Plan**: [How new players are acquired]
- **Retention Mechanics**: [How players are retained]
- **Expansion Roadmap**: [Future development plans]

## 11. Risk Assessment
- **Economic Risks**: [Potential economic model failures]
- **Technical Risks**: [Technical vulnerabilities]
- **Market Risks**: [Competitive and adoption risks]`,
  },
]
