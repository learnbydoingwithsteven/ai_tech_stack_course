# Module 4: Data Layer

## 🎯 Learning Objectives

- Understand why external data is crucial for AI applications
- Learn about data pipelines and preprocessing
- Master vector databases and embeddings
- Implement RAG (Retrieval-Augmented Generation)

## 📊 Why External Data Matters

### The Knowledge Cutoff Problem

Base models are trained on publicly available information **up to a specific date**:

```
GPT-4:        Training data up to April 2023
Llama 2:      Training data up to September 2022
Claude 3:     Training data up to August 2023
```

**Problem**: Your application needs current information!

**Example - Drug Discovery Assistant**:
- Papers from the past 3 months won't be in the base model
- Need to provide AI system with extra data
- This is the **Data Layer**

---

## 🏗️ Data Layer Components

The data layer breaks into several key components:

### 1. Data Sources
### 2. Data Pipelines
### 3. Vector Databases
### 4. RAG (Retrieval-Augmented Generation)

---

## 1. 📚 Data Sources

### Types of Data Sources

#### Structured Data
```
• Databases (SQL, NoSQL)
• CSV files
• Spreadsheets
• APIs (REST, GraphQL)
```

**Example**: Customer database, product catalog

#### Unstructured Data
```
• Documents (PDF, Word, Text)
• Web pages
• Images
• Audio/Video
```

**Example**: Research papers, support tickets, documentation

#### Semi-Structured Data
```
• JSON
• XML
• Logs
```

**Example**: API responses, system logs

### Common Data Sources for AI

1. **Internal Documents**
   - Company wikis
   - Technical documentation
   - Policy documents
   - Historical data

2. **External Databases**
   - Scientific paper repositories (arXiv, PubMed)
   - News APIs
   - Public datasets
   - Web scraping

3. **Real-Time Streams**
   - Social media feeds
   - Sensor data
   - Transaction logs
   - User interactions

---

## 2. 🔄 Data Pipelines

Data pipelines handle the **processing and preparation** of data before it can be used by AI systems.

### Pipeline Stages

```
┌──────────────┐
│  Ingestion   │ ──> Collect data from sources
└──────┬───────┘
       │
┌──────▼───────┐
│  Cleaning    │ ──> Remove noise, fix errors
└──────┬───────┘
       │
┌──────▼───────┐
│ Transformation│ ──> Format, normalize, enrich
└──────┬───────┘
       │
┌──────▼───────┐
│  Chunking    │ ──> Break into manageable pieces
└──────┬───────┘
       │
┌──────▼───────┐
│  Embedding   │ ──> Convert to vectors
└──────┬───────┘
       │
┌──────▼───────┐
│   Storage    │ ──> Save to vector database
└──────────────┘
```

### Pre-Processing Steps

#### Text Cleaning
```python
# Example transformations
- Remove HTML tags
- Fix encoding issues
- Normalize whitespace
- Remove special characters
- Standardize formatting
```

#### Chunking Strategy

**Why Chunk?**
- Models have token limits
- Retrieval is more precise with smaller chunks
- Better semantic matching

**Chunking Methods**:

1. **Fixed Size**
```
Split every N tokens (e.g., 512 tokens)
Pros: Simple, consistent size
Cons: May split mid-sentence
```

2. **Semantic**
```
Split by paragraphs or sections
Pros: Preserves context
Cons: Variable sizes
```

3. **Overlapping**
```
Chunks overlap by X tokens
Pros: Maintains continuity
Cons: Some redundancy
```

**Example**:
```
Original Document: 10,000 tokens

Chunking Strategy:
- Chunk size: 512 tokens
- Overlap: 50 tokens

Result: ~22 chunks with overlap
```

---

## 3. 🗄️ Vector Databases

### What are Embeddings?

**Embeddings** convert text into numerical vectors that capture semantic meaning.

```
Text: "The cat sat on the mat"
        ↓ (embedding model)
Vector: [0.12, -0.45, 0.89, ..., 0.23]
        (typically 768 or 1536 dimensions)
```

**Key Property**: Similar meanings → Similar vectors

```
"The cat sat on the mat"    → [0.12, -0.45, 0.89, ...]
"A feline rested on a rug"  → [0.13, -0.44, 0.88, ...]
                                  ↑ Close in vector space!

"Quantum physics equations" → [-0.78, 0.23, -0.15, ...]
                                  ↑ Far in vector space
```

### Popular Embedding Models

| Model | Dimensions | Best For |
|-------|-----------|----------|
| **OpenAI ada-002** | 1536 | General purpose, high quality |
| **Sentence-BERT** | 384-768 | Fast, open source |
| **E5** | 768-1024 | Multilingual |
| **BGE** | 768-1024 | Retrieval tasks |

### Vector Database Options

#### 1. **Pinecone** (Managed)
```
Pros: Easy to use, managed, scalable
Cons: Costs, vendor lock-in
Use case: Production apps, don't want to manage DB
```

#### 2. **Weaviate** (Open Source)
```
Pros: Self-hosted, flexible, GraphQL API
Cons: Need to manage infrastructure
Use case: Control over data, complex queries
```

#### 3. **Chroma** (Open Source)
```
Pros: Simple, Python-first, embedded
Cons: Not for production scale
Use case: Development, prototyping
```

#### 4. **Milvus** (Open Source)
```
Pros: High performance, billion-scale
Cons: Complex setup
Use case: Large-scale applications
```

#### 5. **FAISS** (Library)
```
Pros: Fast, battle-tested (Meta)
Cons: Not a full database, memory-only
Use case: Research, custom implementations
```

### Vector Search

**Similarity Metrics**:

1. **Cosine Similarity** (most common)
```
Measures angle between vectors
Range: -1 to 1 (1 = identical)
Use: Text embeddings
```

2. **Euclidean Distance**
```
Measures straight-line distance
Range: 0 to ∞ (0 = identical)
Use: Image embeddings
```

3. **Dot Product**
```
Measures magnitude and direction
Range: -∞ to ∞
Use: Normalized embeddings
```

---

## 4. 🔍 RAG (Retrieval-Augmented Generation)

### What is RAG?

**RAG** combines:
- **Retrieval**: Find relevant information from your data
- **Generation**: Use LLM to generate answers based on retrieved context

### The RAG Pipeline

```
User Query: "What are the latest findings on CRISPR?"
     │
     ▼
┌─────────────────┐
│ 1. Embed Query  │ ──> Convert query to vector
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. Search Vector│ ──> Find similar documents
│    Database     │     (top-k similarity)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. Retrieve Top │ ──> Get relevant text chunks
│    K Results    │     (e.g., top 5)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. Construct    │ ──> Build prompt with context
│    Prompt       │     Context + Query
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 5. LLM Generate │ ──> Generate answer
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 6. Return Answer│ ──> With citations
│    + Sources    │
└─────────────────┘
```

### RAG Prompt Template

```
Context:
{retrieved_document_1}

{retrieved_document_2}

{retrieved_document_3}

Question: {user_query}

Instructions: Answer the question based ONLY on the context above. 
If the context doesn't contain the answer, say "I don't have 
enough information to answer that."

Answer:
```

### RAG vs Fine-Tuning

| Aspect | RAG | Fine-Tuning |
|--------|-----|-------------|
| **Data Update** | Instant | Requires retraining |
| **Cost** | Low (add to DB) | High (GPU hours) |
| **Transparency** | High (see sources) | Low (black box) |
| **Accuracy** | Good | Excellent |
| **Use Case** | Changing data | Fixed domain |

### Advanced RAG Techniques

#### 1. **Hybrid Search**
```
Combine:
- Vector search (semantic)
- Keyword search (BM25)

Better coverage and accuracy
```

#### 2. **Re-ranking**
```
Steps:
1. Retrieve top-N candidates (N=20)
2. Re-rank using cross-encoder model
3. Use top-K for generation (K=5)

Improves relevance
```

#### 3. **Query Expansion**
```
Original: "CRISPR findings"
Expanded: "CRISPR gene editing recent discoveries research"

Increases recall
```

#### 4. **Contextual Compression**
```
After retrieval:
- Extract only relevant sentences
- Remove fluff
- Reduce token usage

Improves quality and reduces cost
```

---

## 🎯 Putting It All Together

### Example: Drug Discovery Assistant

```python
# Simplified pipeline

# 1. Data Sources
papers = load_papers_from_arxiv("CRISPR", last_3_months=True)

# 2. Process & Chunk
chunks = []
for paper in papers:
    text = extract_text(paper)
    text = clean_text(text)
    chunks.extend(chunk_text(text, size=512, overlap=50))

# 3. Create Embeddings
embeddings = embedding_model.encode(chunks)

# 4. Store in Vector DB
vector_db.insert(chunks, embeddings)

# 5. RAG Query
def answer_query(query):
    # Embed query
    query_vector = embedding_model.encode(query)
    
    # Retrieve relevant chunks
    results = vector_db.search(query_vector, top_k=5)
    
    # Build prompt
    context = "\n\n".join([r.text for r in results])
    prompt = f"Context:\n{context}\n\nQuestion: {query}\n\nAnswer:"
    
    # Generate
    answer = llm.generate(prompt)
    
    return answer, results  # Return answer + sources
```

---

## 🔑 Key Takeaways

1. **Base models have cutoff dates** - Need external data for current info
2. **Data pipelines are critical** - Clean, chunk, embed properly
3. **Vector databases enable semantic search** - Find relevant info fast
4. **RAG is powerful and flexible** - Augment LLMs with your data
5. **Quality matters** - Good data in → good answers out

## 💡 Practical Exercise

**Build a Mini-RAG System**:

1. Collect 10 documents on a topic
2. Chunk them (512 tokens, 50 overlap)
3. Create embeddings (use OpenAI or Sentence-BERT)
4. Store in Chroma DB
5. Implement RAG query function
6. Test with questions

---

## 📚 Resources

- [Vector Database Comparison](https://github.com/erikbern/ann-benchmarks)
- [Sentence Transformers](https://www.sbert.net/)
- [LangChain RAG Guide](https://python.langchain.com/docs/use_cases/question_answering/)
- [Pinecone Learning Center](https://www.pinecone.io/learn/)

**Next**: Module 5 - Orchestration Layer
