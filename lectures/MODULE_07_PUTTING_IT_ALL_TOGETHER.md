# Module 7: Putting It All Together

## 🎯 Learning Objectives

- Integrate all five layers of the AI stack
- Make practical design decisions
- Balance trade-offs (quality, cost, speed)
- Build a complete AI system

## 🏗️ Revisiting the Five Layers

Let's see how they work together in practice:

```
┌──────────────────────────────────────┐
│     Application Layer                │  User Interface
│  Interfaces • Integrations           │  & Experience
├──────────────────────────────────────┤
│     Orchestration Layer              │  Task Planning
│  Planning • Execution • Review       │  & Workflow
├──────────────────────────────────────┤
│     Data Layer                       │  Knowledge &
│  Sources • Pipelines • RAG           │  Context
├──────────────────────────────────────┤
│     Model Layer                      │  Intelligence &
│  LLMs • SLMs • Specialized           │  Reasoning
├──────────────────────────────────────┤
│     Infrastructure Layer             │  Computing
│  On-Premise • Cloud • Local          │  Resources
└──────────────────────────────────────┘
```

## 🔍 Case Study: Drug Discovery Assistant

Let's build the example we've been discussing throughout this course.

### Requirements

**Goal**: Help drug discovery researchers understand and analyze the latest scientific papers in their domain.

**User Needs**:
- Find papers from last 3 months
- Summarize key findings
- Compare multiple papers
- Track trends over time
- Export to reference manager

### Layer-by-Layer Design

#### 1. Infrastructure Layer

**Decision**: **Cloud deployment**

**Reasoning**:
- Need GPU for large models
- Variable workload (not 24/7 usage)
- Don't want to maintain hardware
- Can scale as team grows

**Choice**: AWS or Azure
- EC2/Azure VM with GPU
- Or managed service (SageMaker/Azure OpenAI)

**Cost Estimate**: $500-2000/month

---

#### 2. Model Layer

**Decision**: **Mixtral 8x7B (open source)**

**Reasoning**:
- Strong reasoning for analysis
- Can self-host (cost savings)
- Good at technical content
- No API costs after setup

**Alternative**: Claude 3 Sonnet (if budget allows)

---

#### 3. Data Layer

**Components**:

**Sources**:
- arXiv API (preprints)
- PubMed API (peer-reviewed)
- bioRxiv (biology papers)

**Pipeline**:
```python
1. Fetch papers (last 90 days)
2. Extract text from PDFs
3. Clean and format
4. Chunk (512 tokens, 50 overlap)
5. Embed with sentence-BERT
6. Store in Pinecone vector DB
```

**RAG Setup**:
- Retrieve top 5 relevant papers
- Augment LLM context
- Generate with citations

---

#### 4. Orchestration Layer

**Workflow**:

```
User Query: "Latest CRISPR findings"
     │
     ▼
┌─────────────┐
│  Planning   │ Identify: search terms, date range, papers needed
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Execution  │ 1. Search vector DB for papers
│             │ 2. Retrieve full texts
│             │ 3. Extract findings from each
│             │ 4. Synthesize across papers
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Review    │ Check: accuracy, citations, completeness
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Response   │ Formatted summary with sources
└─────────────┘
```

**Framework**: LangChain with custom agents

---

#### 5. Application Layer

**Interface**:
- Web app (React frontend)
- Text query input
- PDF viewer for papers
- Timeline visualization

**Features**:
- Follow-up questions
- Regenerate sections
- Inline citations (hover for details)
- Export to Zotero/Mendeley

**Integrations**:
- Slack notifications for new papers
- Email digest (weekly)
- Export to reference managers

---

### Architecture Diagram

```
┌──────────────┐
│   Web UI     │ ← User interacts
│  (React)     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Backend    │ ← Orchestration logic
│  (Python/    │   (LangChain)
│   FastAPI)   │
└──────┬───────┘
       │
       ├──────────────┬───────────────┬────────────────┐
       │              │               │                │
       ▼              ▼               ▼                ▼
┌──────────┐  ┌──────────┐   ┌──────────┐    ┌──────────┐
│ Mixtral  │  │ Pinecone │   │  arXiv   │    │  Zotero  │
│  (LLM)   │  │(Vector DB│   │   API    │    │   API    │
└──────────┘  └──────────┘   └──────────┘    └──────────┘
```

---

## ⚖️ Trade-Off Decisions

### Quality vs. Cost

| Option | Quality | Cost/Month | Choice |
|--------|---------|-----------|--------|
| GPT-4 API | ⭐⭐⭐⭐⭐ | $2000+ | ❌ Too expensive |
| Claude 3 | ⭐⭐⭐⭐⭐ | $1500+ | ❌ Too expensive |
| Mixtral | ⭐⭐⭐⭐ | $800 | ✅ Best balance |
| Llama 2 70B | ⭐⭐⭐⭐ | $1000 | 🤔 Alternative |

**Decision**: Mixtral (good quality, manageable cost)

### Speed vs. Accuracy

| Approach | Speed | Accuracy | Choice |
|----------|-------|----------|--------|
| No RAG | Fast | Low | ❌ |
| RAG Top-3 | Fast | Medium | 🤔 |
| RAG Top-5 | Medium | High | ✅ |
| RAG Top-10 + Rerank | Slow | Highest | ❌ |

**Decision**: RAG Top-5 (good enough accuracy, acceptable speed)

### Build vs. Buy

| Component | Build | Buy/Use | Choice |
|-----------|-------|---------|--------|
| Web UI | Custom React | ✅ | Control + features |
| LLM Hosting | Self-host | Mixtral | ✅ Cost savings |
| Vector DB | Build w/FAISS | Pinecone | ✅ Reliability |
| PDF Parsing | Build | PyPDF2 | ✅ Free library |

---

## 🚀 Implementation Roadmap

### Phase 1: MVP (2-4 weeks)
- [ ] Set up cloud infrastructure
- [ ] Deploy Mixtral model
- [ ] Build simple RAG pipeline
- [ ] Basic web UI (query + response)
- [ ] Test with 100 papers

### Phase 2: Enhancement (2-3 weeks)
- [ ] Add citation system
- [ ] Implement follow-up questions
- [ ] Add PDF viewer
- [ ] Improve chunking strategy
- [ ] Test with 1000 papers

### Phase 3: Integration (2-3 weeks)
- [ ] Zotero/Mendeley export
- [ ] Slack notifications
- [ ] Email digests
- [ ] User accounts & history
- [ ] Deploy to production

### Phase 4: Optimization (Ongoing)
- [ ] Monitor performance
- [ ] Gather user feedback
- [ ] Fine-tune model (optional)
- [ ] Add more data sources
- [ ] Improve orchestration

---

## 🔑 Key Takeaways

1. **All layers matter** - Each contributes to success
2. **Trade-offs are inevitable** - Optimize for your constraints
3. **Start simple, iterate** - MVP first, enhance later
4. **User needs drive decisions** - Not technology for its own sake
5. **Monitor and improve** - Build feedback loops

## 💡 Final Exercise

**Your Turn**: Design your own AI application

1. Pick a use case (healthcare, finance, education, etc.)
2. Define requirements
3. Make decisions for each layer
4. Document trade-offs
5. Create implementation plan

---

## 📚 Course Summary

You've learned:
- ✅ Infrastructure options and deployment strategies
- ✅ Model selection criteria
- ✅ Data pipelines and RAG
- ✅ Orchestration patterns
- ✅ Application design principles

**Next Steps**:
- Build your first project
- Join AI communities
- Stay updated on new developments
- Share your learnings

---

## 🎓 Congratulations!

You now understand the complete AI technology stack and can make informed decisions to build reliable, effective AI systems aligned to real-world needs.

**Keep learning. Keep building. Keep improving.**
