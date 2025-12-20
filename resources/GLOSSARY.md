# AI Technology Stack - Glossary

A comprehensive glossary of terms used throughout the course.

## A

**API (Application Programming Interface)**  
A set of protocols and tools for building software applications. Allows different programs to communicate with each other.

**Agentic System**  
AI systems that can take autonomous actions, plan, and make decisions to achieve goals.

## B

**Base Model**  
The pre-trained foundation model before any fine-tuning or specialization.

**BM25**  
A ranking function used for keyword-based search, often combined with vector search in hybrid systems.

## C

**Chain of Thought (CoT)**  
A prompting technique where the model explicitly shows its reasoning process step-by-step.

**Chunking**  
Breaking large documents into smaller pieces for embedding and retrieval.

**CORS (Cross-Origin Resource Sharing)**  
A security feature that controls which web domains can access your API.

**CPU (Central Processing Unit)**  
The primary processor in a computer. Less efficient for AI workloads than GPUs.

## D

**Deployment**  
The process of making an application available for use in a production environment.

**Docker**  
A platform for containerizing applications to ensure consistent environments across different systems.

## E

**Embeddings**  
Numerical vector representations of text that capture semantic meaning. Similar meanings → similar vectors.

**Execution Phase**  
The orchestration phase where the AI system calls tools and performs actions.

## F

**Fine-tuning**  
Training a pre-trained model on specific data to adapt it to a particular task or domain.

**Function Calling**  
The ability of LLMs to invoke external functions or tools to perform specific tasks.

## G

**GPU (Graphics Processing Unit)**  
Specialized processors designed for parallel computation, essential for running LLMs efficiently.

**Gunicorn**  
A Python WSGI HTTP server for running web applications in production.

## H

**Hybrid Search**  
Combining vector search (semantic) with keyword search (BM25) for better retrieval.

**Hugging Face**  
A platform hosting over 2 million AI models and datasets, popular in the open-source AI community.

## I

**Inference**  
The process of using a trained model to make predictions or generate outputs.

**Infrastructure Layer**  
The hardware foundation of the AI stack (GPUs, servers, cloud resources).

## K

**Knowledge Cutoff**  
The date after which a model has no information, determined by its training data.

## L

**LangChain**  
A popular framework for building applications with LLMs, providing chains, agents, and memory.

**LangGraph**  
Extension of LangChain for building stateful, graph-based workflows.

**LLM (Large Language Model)**  
AI models with billions of parameters trained on vast text data (e.g., GPT-4, Claude, Llama).

**Local Deployment**  
Running AI models on personal devices (laptops, workstations) rather than servers.

## M

**MCP (Model Context Protocol)**  
A new standardized protocol for tool and context integration with AI systems.

**Mixtral**  
An open-source mixture-of-experts model known for strong reasoning capabilities.

**Model Layer**  
The AI models themselves (LLMs, SLMs) that provide intelligence and reasoning.

**Multi-modal**  
Systems that can process multiple types of input/output (text, images, audio).

## O

**Ollama**  
A tool for easily running LLMs locally on your computer.

**On-premise Deployment**  
Hosting infrastructure on your own physical servers rather than in the cloud.

**Orchestration Layer**  
The workflow management layer that coordinates complex AI tasks through planning, execution, and review.

**Open Source**  
Software with source code that anyone can inspect, modify, and distribute.

## P

**Parameters**  
The learned weights in a neural network. More parameters generally mean more capacity but require more resources.

**Pinecone**  
A managed vector database service optimized for similarity search.

**Proprietary Model**  
Closed-source models owned by companies (e.g., GPT-4, Claude) accessed via API.

**Prompt Engineering**  
The practice of designing effective prompts to get desired outputs from LLMs.

## Q

**Quantization**  
Reducing model precision (e.g., from 16-bit to 8-bit) to decrease size and increase speed with minimal quality loss.

## R

**RAG (Retrieval-Augmented Generation)**  
A technique combining document retrieval with LLM generation to provide context-aware, cited answers.

**ReAct (Reason + Act)**  
A pattern where models alternate between reasoning about what to do and taking actions.

**Re-ranking**  
A second-stage retrieval process that re-orders initial search results for better relevance.

## S

**Semantic Search**  
Search based on meaning rather than keywords, using embeddings and vector similarity.

**Semantic Kernel**  
Microsoft's framework for AI orchestration with skills, planners, and connectors.

**SLM (Small Language Model)**  
Smaller, more efficient models (< 7B parameters) designed for specific tasks or edge deployment.

**Systemd**  
A Linux system service manager used to run applications as background services.

## T

**Token**  
The basic unit of text processed by LLMs (roughly 4 characters or 0.75 words).

**Tool Calling**  
When an LLM decides to invoke external functions or APIs to accomplish tasks.

**TPU (Tensor Processing Unit)**  
Google's specialized processors designed specifically for machine learning workloads.

## V

**Vector Database**  
A database optimized for storing and searching high-dimensional vectors (embeddings).

**Vector Search**  
Finding similar items by comparing their vector representations using metrics like cosine similarity.

**VRAM (Video RAM)**  
Memory on a GPU used to store models and data during computation.

## W

**Whisper**  
OpenAI's speech-to-text model for transcription and audio processing.

**Workflow**  
A sequence of steps or operations that an AI system executes to complete a task.

## Z

**Zero-shot Learning**  
A model's ability to perform tasks it wasn't explicitly trained on, based on instructions alone.

---

## Common Acronyms

- **AI** - Artificial Intelligence
- **API** - Application Programming Interface
- **AWS** - Amazon Web Services
- **BERT** - Bidirectional Encoder Representations from Transformers
- **CLI** - Command Line Interface
- **CNN** - Convolutional Neural Network
- **CoT** - Chain of Thought
- **CPU** - Central Processing Unit
- **CRUD** - Create, Read, Update, Delete
- **CSS** - Cascading Style Sheets
- **GPU** - Graphics Processing Unit
- **HTML** - HyperText Markup Language
- **HTTP** - HyperText Transfer Protocol
- **JSON** - JavaScript Object Notation
- **LLM** - Large Language Model
- **ML** - Machine Learning
- **NLP** - Natural Language Processing
- **OCR** - Optical Character Recognition
- **RAG** - Retrieval-Augmented Generation
- **REST** - Representational State Transfer
- **SDK** - Software Development Kit
- **SLM** - Small Language Model
- **SQL** - Structured Query Language
- **SSL** - Secure Sockets Layer
- **TPU** - Tensor Processing Unit
- **UI** - User Interface
- **UX** - User Experience
- **VRAM** - Video RAM
- **WSGI** - Web Server Gateway Interface

---

## Model Names Reference

**GPT Series** (OpenAI)
- GPT-3.5: Fast, affordable
- GPT-4: Most capable, multimodal

**Claude Series** (Anthropic)
- Claude 3 Haiku: Fast, economical
- Claude 3 Sonnet: Balanced
- Claude 3 Opus: Most capable

**Llama Series** (Meta)
- Llama 2 7B/13B/70B: Open source, various sizes
- Code Llama: Specialized for coding

**Mistral Series**
- Mistral 7B: Efficient open model
- Mixtral 8x7B: Mixture of experts

**Google Models**
- Gemini: Multimodal capabilities
- PaLM 2: Language understanding

---

Use this glossary as a quick reference while learning!
