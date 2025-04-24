# DeFi Risk Intelligence Platform

AI-powered risk analysis for DeFi projects.

## Project Analysis

### Overview

This is a Next.js application focused on DeFi (Decentralized Finance) risk intelligence and analysis. The platform provides AI-powered risk analysis for DeFi projects, with features for document analysis, sentiment analysis, and project visualization.

### Tech Stack

- **Framework**: Next.js 15.2.4 with React 19
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM (likely with SQLite for development)
- **AI Integration**: AI SDK with DeepInfra, possibly for analysis tasks
- **State Management**: React Context API
- **Monitoring**: Sentry for error tracking
- **UI Components**: Extensive component library based on Radix UI primitives

### Project Structure

#### Core Application Structure

- **`app/`**: Next.js App Router structure with pages and API routes
- **`components/`**: Organized UI components (features, layout, UI primitives)
- **`contexts/`**: React context providers for state management
- **`hooks/`**: Custom React hooks
- **`lib/`**: Utility functions and services
- **`prisma/`**: Database schema and migrations
- **`docs/`**: Documentation for various features
- **`scripts/`**: Utility scripts for project maintenance
- **`styles/`**: Global CSS styles
- **`types/`**: TypeScript type definitions

### Key Features

1. **DeFi Project Analysis**
   - Document analysis for whitepapers and code
   - Sentiment analysis for market perception
   - Risk analysis forms and assessments
   - Project visualization (tokenomics, architecture, risk profiles)

2. **Notification System**
   - Real-time notifications with different types and priorities
   - Toast notifications for transient messages
   - Persistent notification center

3. **Search Functionality**
   - Global search across the application
   - Search results categorization

4. **Theme System**
   - Light/dark mode toggle
   - Custom theme support

5. **Authentication**
   - User authentication with NextAuth.js
   - Role-based access control

6. **Breadcrumb Navigation**
   - Context-aware breadcrumb system

7. **Media Features**
   - Audio recording and logs
   - File uploading
   - Image generation (possibly AI-powered)

### Project Purpose

Based on the code and structure, this platform is designed for:

1. **Risk Analysis**: Analyzing DeFi projects for potential risks and vulnerabilities
2. **Document Intelligence**: Extracting insights from whitepapers and code
3. **Market Sentiment**: Tracking and analyzing market perception of projects
4. **Visualization**: Creating visual representations of project architecture and risk profiles
5. **Idea Management**: Tracking and evaluating ideas with frameworks like SWOT, Porter's Five Forces, and Lean Canvas

### Development Patterns

The project follows several modern development patterns:

1. **Feature-based Organization**: Components are organized by feature (auth, notification, search, etc.)
2. **Singleton Services**: Services like NotificationService use the singleton pattern
3. **Context + Hooks Pattern**: State management via context with custom hooks for consumption
4. **Type Safety**: Extensive TypeScript typing throughout the project
5. **API Route Handlers**: Structured API routes with error handling
6. **Middleware**: Custom middleware for API monitoring and authentication

## Development Roadmaps

### MVP Roadmap

Our MVP focuses on delivering essential risk analysis capabilities with a streamlined user experience. Key priorities include:

1. Document analysis for DeFi whitepapers and code
2. Basic risk assessment scoring
3. Simple risk profile visualizations
4. Project management functionality
5. Core authentication features

For detailed information on our MVP development plan, including timelines and specific features, see the [MVP Roadmap](./docs/mvp-roadmap.md).

### Future Roadmap

Following our MVP, we plan to expand the platform with:

1. Enhanced analysis capabilities (Q3 2025)
2. Advanced visualization and reporting (Q4 2025)
3. Collaboration features and integrations (Q1 2026)
4. AI and predictive analytics (Q2 2026)
5. Enterprise-grade features (Q3-Q4 2026)

For our long-term vision and detailed feature plans, see the [Future Roadmap](./docs/future-roadmap.md).
## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Git
### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/defi-risk-intelligence.git
   cd defi-risk-intelligence
