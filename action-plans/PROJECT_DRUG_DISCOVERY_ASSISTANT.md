# Project: Drug Discovery Research Assistant

## 🎯 Project Overview

Build a complete AI application to help drug discovery researchers understand and analyze the latest scientific papers in their domain.

**Difficulty**: Intermediate  
**Duration**: 3-4 weeks  
**Tech Stack**: Python, FastAPI, React, Mixtral, Pinecone, LangChain

---

## 📋 Requirements

### Functional Requirements

1. **Search Papers**: Find relevant papers by keyword, author, date range
2. **Summarize**: Generate concise summaries of papers
3. **Compare**: Side-by-side comparison of multiple papers
4. **Extract Findings**: Identify key findings and methodology
5. **Q&A**: Answer questions about papers
6. **Export**: Save to reference managers (Zotero, Mendeley)
7. **Track**: Monitor new papers matching criteria

### Non-Functional Requirements

- **Response time**: < 5 seconds for queries
- **Accuracy**: High-quality summaries with citations
- **Cost**: < $1000/month for 50 users
- **Availability**: 99% uptime

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (React)                   │
│  - Search interface                                 │
│  - PDF viewer                                       │
│  - Citation display                                 │
│  - Export controls                                  │
└──────────────┬──────────────────────────────────────┘
               │ REST API
┌──────────────▼──────────────────────────────────────┐
│              Backend (FastAPI)                      │
│  - Query orchestration                              │
│  - LangChain agents                                 │
│  - Authentication                                   │
└──┬───────────┬───────────┬─────────────┬───────────┘
   │           │           │             │
   ▼           ▼           ▼             ▼
┌──────┐  ┌─────────┐ ┌──────────┐  ┌────────┐
│Mixtral│  │Pinecone │ │  arXiv   │  │ Zotero │
│ (LLM) │  │(VectorDB│ │   API    │  │  API   │
└───────┘  └─────────┘ └──────────┘  └────────┘
```

---

## 🔧 Implementation Guide

### Phase 1: Setup (Week 1)

#### 1.1 Environment Setup

```bash
# Create project structure
mkdir drug-discovery-ai
cd drug-discovery-ai

# Backend
mkdir backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn langchain pinecone-client
pip install sentence-transformers arxiv pypdf2 python-dotenv
pip install openai anthropic  # for model access
```

#### 1.2 Frontend Setup

```bash
# Create React app
npx create-react-app frontend
cd frontend
npm install axios react-query react-markdown
npm install @tanstack/react-table lucide-react
```

#### 1.3 Environment Configuration

```bash
# backend/.env
PINECONE_API_KEY=your_key
PINECONE_ENVIRONMENT=us-east-1
MIXTRAL_API_KEY=your_key  # or local endpoint
ARXIV_EMAIL=your_email
```

---

### Phase 2: Data Pipeline (Week 1-2)

#### 2.1 Paper Fetching

```python
# backend/data/arxiv_fetcher.py
import arxiv
from datetime import datetime, timedelta

class ArxivFetcher:
    def fetch_papers(self, query, days_back=90, max_results=100):
        """Fetch papers from arXiv"""
        date_threshold = datetime.now() - timedelta(days=days_back)
        
        search = arxiv.Search(
            query=query,
            max_results=max_results,
            sort_by=arxiv.SortCriterion.SubmittedDate
        )
        
        papers = []
        for result in search.results():
            if result.published >= date_threshold:
                papers.append({
                    'id': result.entry_id,
                    'title': result.title,
                    'authors': [a.name for a in result.authors],
                    'abstract': result.summary,
                    'published': result.published,
                    'pdf_url': result.pdf_url
                })
        
        return papers
```

#### 2.2 PDF Processing

```python
# backend/data/pdf_processor.py
import PyPDF2
import requests
from io import BytesIO

class PDFProcessor:
    def download_and_extract(self, pdf_url):
        """Download PDF and extract text"""
        response = requests.get(pdf_url)
        pdf_file = BytesIO(response.content)
        
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        
        return text
    
    def chunk_text(self, text, chunk_size=512, overlap=50):
        """Split text into overlapping chunks"""
        words = text.split()
        chunks = []
        
        for i in range(0, len(words), chunk_size - overlap):
            chunk = " ".join(words[i:i + chunk_size])
            chunks.append(chunk)
        
        return chunks
```

#### 2.3 Embedding & Vector DB

```python
# backend/data/vector_store.py
from sentence_transformers import SentenceTransformer
import pinecone

class VectorStore:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        pinecone.init(
            api_key=os.getenv('PINECONE_API_KEY'),
            environment=os.getenv('PINECONE_ENVIRONMENT')
        )
        self.index = pinecone.Index('research-papers')
    
    def add_paper(self, paper_id, chunks):
        """Add paper chunks to vector DB"""
        embeddings = self.model.encode(chunks)
        
        vectors = []
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            vectors.append({
                'id': f"{paper_id}_{i}",
                'values': embedding.tolist(),
                'metadata': {
                    'paper_id': paper_id,
                    'chunk_index': i,
                    'text': chunk
                }
            })
        
        self.index.upsert(vectors)
    
    def search(self, query, top_k=5):
        """Search for relevant chunks"""
        query_embedding = self.model.encode([query])[0]
        results = self.index.query(
            vector=query_embedding.tolist(),
            top_k=top_k,
            include_metadata=True
        )
        return results['matches']
```

---

### Phase 3: RAG Implementation (Week 2)

#### 3.1 RAG System

```python
# backend/rag/retrieval.py
from langchain.llms import HuggingFacePipeline
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

class RAGSystem:
    def __init__(self, vector_store, llm):
        self.vector_store = vector_store
        self.llm = llm
        
        self.prompt_template = """
        Use the following context to answer the question.
        If you don't know the answer, say so. Always cite sources.
        
        Context:
        {context}
        
        Question: {question}
        
        Answer with citations:
        """
    
    def query(self, question):
        """Answer question using RAG"""
        # Retrieve relevant chunks
        results = self.vector_store.search(question, top_k=5)
        
        # Build context
        context = "\n\n".join([
            f"[Source {i+1}] {r['metadata']['text']}"
            for i, r in enumerate(results)
        ])
        
        # Generate answer
        prompt = self.prompt_template.format(
            context=context,
            question=question
        )
        
        answer = self.llm(prompt)
        
        return {
            'answer': answer,
            'sources': results
        }
```

---

### Phase 4: Orchestration (Week 2-3)

#### 4.1 LangChain Agent

```python
# backend/agents/research_agent.py
from langchain.agents import initialize_agent, Tool
from langchain.memory import ConversationBufferMemory

class ResearchAgent:
    def __init__(self, rag_system, arxiv_fetcher):
        self.rag_system = rag_system
        self.arxiv_fetcher = arxiv_fetcher
        
        tools = [
            Tool(
                name="SearchPapers",
                func=self.search_papers,
                description="Search for papers on arXiv"
            ),
            Tool(
                name="AnswerQuestion",
                func=self.answer_question,
                description="Answer questions about papers"
            ),
            Tool(
                name="ComparePapers",
                func=self.compare_papers,
                description="Compare multiple papers"
            )
        ]
        
        self.agent = initialize_agent(
            tools=tools,
            llm=llm,
            agent="conversational-react-description",
            memory=ConversationBufferMemory()
        )
    
    def process_query(self, query):
        """Process user query with orchestration"""
        return self.agent.run(query)
```

---

### Phase 5: Backend API (Week 3)

#### 5.1 FastAPI Endpoints

```python
# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str
    filters: dict = {}

@app.post("/api/query")
async def query(request: QueryRequest):
    """Answer user query"""
    try:
        result = research_agent.process_query(request.query)
        return {
            'answer': result['answer'],
            'sources': result['sources'],
            'timestamp': datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/papers/search")
async def search_papers(request: dict):
    """Search papers"""
    papers = arxiv_fetcher.fetch_papers(
        query=request['query'],
        days_back=request.get('days_back', 90)
    )
    return {'papers': papers}

@app.get("/api/papers/{paper_id}")
async def get_paper(paper_id: str):
    """Get paper details"""
    # Implementation
    pass

@app.post("/api/export")
async def export(request: dict):
    """Export to reference manager"""
    # Implementation
    pass
```

---

### Phase 6: Frontend (Week 3-4)

#### 6.1 Main App Component

```jsx
// frontend/src/App.jsx
import React, { useState } from 'react';
import SearchInterface from './components/SearchInterface';
import ResultsDisplay from './components/ResultsDisplay';
import CitationPanel from './components/CitationPanel';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Drug Discovery Research Assistant</h1>
      </header>
      
      <SearchInterface 
        query={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        loading={loading}
      />
      
      {results && (
        <div className="results-container">
          <ResultsDisplay answer={results.answer} />
          <CitationPanel sources={results.sources} />
        </div>
      )}
    </div>
  );
}

export default App;
```

---

## 📊 Testing Plan

### Unit Tests
- [ ] PDF extraction accuracy
- [ ] Chunking preserves context
- [ ] Embedding generation
- [ ] Vector search relevance

### Integration Tests
- [ ] End-to-end query flow
- [ ] API endpoints
- [ ] Error handling
- [ ] Citation accuracy

### User Testing
- [ ] 5-10 researchers test the system
- [ ] Gather feedback on:
  - Answer quality
  - Relevance of sources
  - UI usability
  - Speed

---

## 🚀 Deployment

### Option 1: Cloud (AWS)
```bash
# EC2 instance with GPU
# Docker containers for backend/frontend
# Load balancer for scaling
```

### Option 2: Serverless
```bash
# AWS Lambda for backend
# S3 + CloudFront for frontend
# Aurora Serverless for database
```

---

## 📈 Metrics to Track

- Query response time
- Answer relevance (user ratings)
- Source citation accuracy
- Daily active users
- Cost per query

---

## 🎯 Success Criteria

- [ ] Can search and summarize papers
- [ ] Response time < 5 seconds
- [ ] Citations are accurate and clickable
- [ ] Users can export to Zotero
- [ ] System handles 50 concurrent users
- [ ] Cost < $20/user/month

---

**Ready to build? Start with Phase 1!**
