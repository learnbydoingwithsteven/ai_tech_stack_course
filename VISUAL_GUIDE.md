# AI Technology Stack - Visual Guide

A visual representation of the course structure and AI stack architecture.

## 🏗️ The Five-Layer Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                           │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │  Interfaces    │  │  Revisions     │  │  Integrations  │   │
│  │  • Text        │  │  • Follow-up   │  │  • APIs        │   │
│  │  • Image       │  │  • Regenerate  │  │  • Webhooks    │   │
│  │  • Audio       │  │  • Edit inline │  │  • Export      │   │
│  │  • Data        │  │  • Citations   │  │  • Import      │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATION LAYER                          │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │   Thinking     │  │   Execution    │  │    Review      │   │
│  │  • Planning    │  │  • Tool Call   │  │  • Validate    │   │
│  │  • Reasoning   │  │  • Function    │  │  • Critique    │   │
│  │  • Strategy    │  │  • Parallel    │  │  • Improve     │   │
│  │  • Breaking    │  │  • Sequential  │  │  • Iterate     │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │  Data Sources  │  │   Pipelines    │  │   RAG System   │   │
│  │  • Documents   │  │  • Extract     │  │  • Vector DB   │   │
│  │  • APIs        │  │  • Clean       │  │  • Embeddings  │   │
│  │  • Databases   │  │  • Chunk       │  │  • Retrieval   │   │
│  │  • Real-time   │  │  • Embed       │  │  • Augment     │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                       MODEL LAYER                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │  Open Source   │  │   Proprietary  │  │ Specialization │   │
│  │  • Llama       │  │  • GPT-4       │  │  • Code        │   │
│  │  • Mistral     │  │  • Claude      │  │  • Reasoning   │   │
│  │  • Falcon      │  │  • Gemini      │  │  • Chat        │   │
│  │  7B - 70B+     │  │  API Access    │  │  • Domain      │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                         │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │  On-Premise    │  │     Cloud      │  │     Local      │   │
│  │  • Own GPUs    │  │  • AWS/Azure   │  │  • Laptop      │   │
│  │  • Full Control│  │  • Scalable    │  │  • Privacy     │   │
│  │  • High Cost   │  │  • Pay-as-go   │  │  • Small SLM   │   │
│  │  • Enterprise  │  │  • Flexible    │  │  • Offline     │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Diagram

```
User Query
    │
    ├─► [Application Layer] ─► Parse Input
    │                           │
    │                           ▼
    ├─► [Orchestration] ──────► Plan Steps
    │                           │
    │                           ├─► Step 1: Retrieve Context
    │                           │    │
    │                           │    ├─► [Data Layer]
    │                           │    │    ├─► Search Vector DB
    │                           │    │    ├─► Get Top-K Results
    │                           │    │    └─► Return Context
    │                           │    │
    │                           │    ▼
    │                           ├─► Step 2: Generate Response
    │                           │    │
    │                           │    ├─► [Model Layer]
    │                           │    │    ├─► Load Model
    │                           │    │    │    │
    │                           │    │    │    ├─► [Infrastructure]
    │                           │    │    │    │    └─► GPU/CPU
    │                           │    │    │    │
    │                           │    │    ├─► Process Prompt
    │                           │    │    └─► Generate Text
    │                           │    │
    │                           │    ▼
    │                           └─► Step 3: Review & Refine
    │                                │
    │                                ├─► Check Quality
    │                                ├─► Validate Citations
    │                                └─► Improve if needed
    │                                     │
    ▼                                     ▼
[Application Layer] ◄──────────────── Format Response
    │
    ├─► Add Citations
    ├─► Apply Formatting
    └─► Return to User
         │
         ▼
    User Response
```

---

## 📊 Technology Decision Tree

```
START: Need to Build AI Application
│
├─► What's your budget?
│   │
│   ├─► Limited ($0-1K/mo)
│   │   ├─► Use Cloud: ✓ Heroku/Railway
│   │   ├─► Model: Open source (Llama/Mistral)
│   │   └─► Data: Chroma DB (embedded)
│   │
│   ├─► Medium ($1K-5K/mo)
│   │   ├─► Use Cloud: ✓ AWS/Azure
│   │   ├─► Model: Mixtral or API (Claude/GPT-3.5)
│   │   └─► Data: Managed vector DB (Pinecone)
│   │
│   └─► High ($5K+/mo)
│       ├─► Use: On-premise + Cloud hybrid
│       ├─► Model: GPT-4, Claude 3, Custom fine-tune
│       └─► Data: Enterprise vector DB (Weaviate cluster)
│
├─► What's your scale?
│   │
│   ├─► Personal/Prototype
│   │   └─► Local deployment → Ollama + Laptop
│   │
│   ├─► Small Team (10-100 users)
│   │   └─► Cloud deployment → Single instance
│   │
│   └─► Enterprise (100+ users)
│       └─► Multi-region cloud → Load balanced
│
└─► What's your use case?
    │
    ├─► Code Generation
    │   └─► Use: Code Llama, StarCoder, Codex
    │
    ├─► Research/Analysis
    │   └─► Use: GPT-4, Claude 3, Mixtral + RAG
    │
    ├─► Customer Service
    │   └─► Use: Claude, Llama 2 Chat + Fine-tuning
    │
    └─► Private/Sensitive Data
        └─► Use: Self-hosted open source only
```

---

## 🎯 Learning Path Flowchart

```
START HERE
    │
    ▼
┌─────────────────┐
│   Week 1-2      │
│  Foundations    │
│                 │
│  • Module 1     │◄─── You are here: Understanding basics
│  • Module 2     │
│                 │
│  Deliverable:   │
│  Design doc     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Week 3-4      │
│ Models & Data   │
│                 │
│  • Module 3     │
│  • Module 4     │
│                 │
│  Deliverable:   │
│  RAG prototype  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Week 5-6      │
│ Orchestration   │
│  & Application  │
│                 │
│  • Module 5     │
│  • Module 6     │
│                 │
│  Deliverable:   │
│  Working agent  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Week 7-8      │
│ Final Project   │
│                 │
│  • Module 7     │
│  • Integration  │
│  • Deploy       │
│                 │
│  Deliverable:   │
│  Full app       │
└────────┬────────┘
         │
         ▼
    🎓 GRADUATE
    │
    ├─► Build portfolio projects
    ├─► Apply to jobs
    ├─► Start freelancing
    └─► Continue learning
```

---

## 🔧 Development Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT CYCLE                        │
└─────────────────────────────────────────────────────────────┘

Phase 1: DESIGN
    │
    ├─► Define requirements
    ├─► Choose tech stack
    ├─► Design architecture
    └─► Create mockups
         │
         ▼
Phase 2: DEVELOP
    │
    ├─► Set up infrastructure
    ├─► Implement backend
    ├─► Build frontend
    └─► Integrate components
         │
         ▼
Phase 3: TEST
    │
    ├─► Unit tests
    ├─► Integration tests
    ├─► User testing
    └─► Performance testing
         │
         ▼
Phase 4: DEPLOY
    │
    ├─► Set up CI/CD
    ├─► Configure production
    ├─► Deploy to cloud
    └─► Monitor metrics
         │
         ▼
Phase 5: ITERATE
    │
    ├─► Gather feedback
    ├─► Fix bugs
    ├─► Add features
    └─► Optimize performance
         │
         └─► Back to Phase 1
```

---

## 📈 Skill Progression Map

```
BEGINNER                INTERMEDIATE            ADVANCED
   │                         │                      │
   │                         │                      │
   ▼                         ▼                      ▼

Understand              Implement               Architect
AI concepts             Systems                 Solutions
   │                         │                      │
   ├─► 5 layers             ├─► RAG system          ├─► Multi-agent
   ├─► Models               ├─► Vector DB           ├─► Optimization
   ├─► RAG basics           ├─► Orchestration       ├─► Scaling
   └─► Deployment           ├─► APIs                ├─► Security
                            └─► Integration         └─► Production

   📚 Modules 1-2          📚 Modules 3-5          📚 Modules 6-7
   ⏱️  2-3 weeks            ⏱️  3-4 weeks            ⏱️  2-3 weeks
   🎯 Learn concepts       🎯 Build projects       🎯 Deploy apps
```

---

## 🏆 Course Completion Journey

```
START
  │
  ├─► Module 1: Introduction          [▓▓▓░░░░] 1/7
  ├─► Module 2: Infrastructure        [▓▓▓▓░░░] 2/7
  ├─► Module 3: Models                [▓▓▓▓▓░░] 3/7
  ├─► Module 4: Data                  [▓▓▓▓▓▓░] 4/7
  ├─► Module 5: Orchestration         [▓▓▓▓▓▓▓] 5/7
  ├─► Module 6: Application           [▓▓▓▓▓▓▓] 6/7
  └─► Module 7: Integration           [▓▓▓▓▓▓▓] 7/7
       │
       ├─► Quiz Scores: 85% avg
       ├─► Projects: 3 completed
       └─► Progress: 100%
            │
            ▼
       🎉 COURSE COMPLETE! 🎉
            │
            ├─► Certificate earned
            ├─► Portfolio ready
            └─► Job ready!
```

---

## 🎨 UI Component Hierarchy

```
Web Application
│
├─── Header
│    ├── Logo
│    ├── Navigation
│    │   ├── Modules
│    │   ├── Progress
│    │   └── Resources
│    └── User Menu
│
├─── Main Content
│    │
│    ├─── Home Page
│    │    ├── Hero Section
│    │    ├── Search Bar
│    │    └── Module Grid
│    │         ├── Module Card 1
│    │         ├── Module Card 2
│    │         └── ...
│    │
│    ├─── Module Page
│    │    ├── Breadcrumb
│    │    ├── Module Content
│    │    │   ├── Header
│    │    │   ├── Body (Markdown)
│    │    │   └── Media
│    │    └── Actions
│    │         ├── Take Quiz
│    │         └── Mark Complete
│    │
│    ├─── Quiz Page
│    │    ├── Quiz Header
│    │    ├── Questions
│    │    │   ├── Question 1
│    │    │   ├── Question 2
│    │    │   └── ...
│    │    └── Submit Button
│    │
│    ├─── Progress Page
│    │    ├── Overview Cards
│    │    │   ├── Completed
│    │    │   ├── Progress Bar
│    │    │   └── Average Score
│    │    └── Module List
│    │
│    └─── Resources Page
│         ├── Action Plans
│         ├── External Links
│         ├── Tools
│         └── Reading List
│
└─── Footer
     ├── Copyright
     └── Links
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USERS                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   LOAD BALANCER                             │
│                   (AWS ALB / Nginx)                         │
└────────┬────────────────────────────────┬───────────────────┘
         │                                │
         ▼                                ▼
┌─────────────────┐              ┌─────────────────┐
│   FRONTEND      │              │   FRONTEND      │
│   (Container 1) │              │   (Container 2) │
│                 │              │                 │
│   • HTML/CSS/JS │              │   • HTML/CSS/JS │
│   • Static      │              │   • Static      │
└────────┬────────┘              └────────┬────────┘
         │                                │
         └────────────┬───────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │   API GATEWAY          │
         └────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVICES                         │
├─────────────────┬────────────────┬──────────────────────────┤
│   Backend 1     │   Backend 2    │   Backend 3              │
│   (Container)   │   (Container)  │   (Container)            │
│                 │                │                          │
│   • Flask API   │   • Flask API  │   • Flask API            │
│   • LLM         │   • LLM        │   • LLM                  │
└────────┬────────┴────────┬───────┴──────────┬───────────────┘
         │                 │                  │
         └─────────────────┼──────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────┐
         │       DATABASES                 │
         ├─────────────────────────────────┤
         │  • Vector DB (Pinecone)         │
         │  • Cache (Redis)                │
         │  • Storage (S3)                 │
         └─────────────────────────────────┘
```

---

## 📦 Tech Stack Overview

```
┌───────────────────────────────────────────────────────────────┐
│                    FULL STACK                                 │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  FRONTEND                BACKEND              INFRASTRUCTURE  │
│  ┌─────────────┐        ┌─────────────┐     ┌─────────────┐ │
│  │ HTML5       │        │ Python 3.9+ │     │ Docker      │ │
│  │ CSS3        │        │ Flask       │     │ Compose     │ │
│  │ JavaScript  │───────►│ Flask-CORS  │────►│ Nginx       │ │
│  │ (Vanilla)   │        │ Gunicorn    │     │ Linux       │ │
│  └─────────────┘        └─────────────┘     └─────────────┘ │
│                                                               │
│  MODELS                  DATA                ORCHESTRATION   │
│  ┌─────────────┐        ┌─────────────┐     ┌─────────────┐ │
│  │ GPT-4       │        │ Pinecone    │     │ LangChain   │ │
│  │ Claude 3    │        │ Chroma      │     │ LangGraph   │ │
│  │ Llama 2     │───────►│ Embeddings  │────►│ ReAct       │ │
│  │ Mixtral     │        │ RAG         │     │ Agents      │ │
│  └─────────────┘        └─────────────┘     └─────────────┘ │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

Use these visual guides to understand the architecture and navigate the course!

For interactive exploration, start the application and browse through modules.
