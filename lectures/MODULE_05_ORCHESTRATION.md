# Module 5: Orchestration Layer

## 🎯 Learning Objectives

- Understand why complex tasks need orchestration
- Learn the three phases: Thinking, Execution, Review
- Explore orchestration frameworks and patterns
- Implement multi-step AI workflows

## 🔄 Why Orchestration Matters

Building AI systems that do something **more complex than just generating text** requires breaking the initial user input down into smaller, manageable tasks.

### Single vs. Multi-Step

#### ❌ Simple (Limited)
```
User Input → LLM → Single Response
```

**Example**: 
```
Q: "What is CRISPR?"
A: "CRISPR is a gene editing technology..."
```

#### ✅ Orchestrated (Powerful)
```
User Input → Plan → Execute → Review → Response
              ↓        ↓         ↓
           Multiple steps with different tools
```

**Example**:
```
Q: "Analyze the latest CRISPR papers and summarize key findings"

Steps:
1. Plan: Identify search terms, timeframe
2. Execute: Search papers, extract findings, categorize
3. Review: Check consistency, cite sources
4. Respond: Formatted summary with citations
```

---

## 🧠 The Three Phases of Orchestration

### 1. Thinking (Planning)

**Purpose**: Use model's reasoning to plan the approach

**What Happens**:
- Break down the user query
- Identify required steps
- Determine what tools/data are needed
- Create an execution strategy

**Example**:

```
User Query: 
"Compare the performance of our product with competitors"

Planning Phase:
┌─────────────────────────────────────────┐
│ Step 1: Identify our product metrics    │
│ Step 2: List main competitors           │
│ Step 3: Gather competitor data          │
│ Step 4: Normalize metrics for comparison│
│ Step 5: Create comparison table         │
│ Step 6: Highlight key differences       │
└─────────────────────────────────────────┘
```

**Techniques**:
- **Chain of Thought (CoT)**: Model explicitly reasons step-by-step
- **Tree of Thoughts**: Explore multiple reasoning paths
- **ReAct**: Reason about actions and observations

---

### 2. Execution (Tool Calling)

**Purpose**: Actually perform the planned steps using tools and functions

**What Happens**:
- Call external APIs
- Query databases
- Run computations
- Retrieve documents
- Transform data

#### Tool Calling / Function Calling

Modern LLMs can invoke tools:

```python
# Define available tools
tools = [
    {
        "name": "search_papers",
        "description": "Search scientific papers database",
        "parameters": {
            "query": "string",
            "date_range": "string",
            "max_results": "integer"
        }
    },
    {
        "name": "extract_key_points",
        "description": "Extract key findings from a paper",
        "parameters": {
            "paper_id": "string"
        }
    },
    {
        "name": "calculate_statistics",
        "description": "Calculate statistical metrics",
        "parameters": {
            "data": "array",
            "metric": "string"
        }
    }
]

# LLM decides which tools to use and when
response = llm.generate(
    query="Analyze CRISPR papers from 2024",
    tools=tools
)

# LLM might generate:
{
    "tool": "search_papers",
    "parameters": {
        "query": "CRISPR gene editing",
        "date_range": "2024-01-01 to 2024-12-31",
        "max_results": 20
    }
}
```

#### Execution Patterns

**1. Sequential**
```
Step 1 → Step 2 → Step 3 → Step 4
```
Each step depends on previous one

**2. Parallel**
```
Step 1 → ┌─ Step 2a ─┐
         ├─ Step 2b ─┤ → Step 3
         └─ Step 2c ─┘
```
Independent tasks run simultaneously

**3. Conditional**
```
Step 1 → Decision
         ├─ If A → Path 1
         └─ If B → Path 2
```
Branch based on results

**4. Iterative**
```
Step 1 → Step 2 → Check
         ↑         │
         └─────────┘ Repeat if needed
```
Loop until condition met

---

### 3. Review (Self-Critique)

**Purpose**: LLM critiques its own output and initiates improvements

**What Happens**:
- Check for accuracy
- Verify consistency
- Validate sources
- Identify gaps
- Suggest improvements

**Review Loop**:

```
┌──────────────┐
│   Generate   │
│   Response   │
└──────┬───────┘
       │
       ▼
┌──────────────┐      ┌──────────────┐
│   Review     │ ───> │   Issues     │
│   Quality    │      │   Found?     │
└──────────────┘      └──────┬───────┘
                             │
                    YES ─────┼───── NO
                             │        │
                      ┌──────▼─────┐  │
                      │  Improve   │  │
                      │  Response  │  │
                      └──────┬─────┘  │
                             │        │
                             └────────┤
                                      ▼
                             ┌──────────────┐
                             │ Final Answer │
                             └──────────────┘
```

**Review Checklist**:
```python
review_prompt = """
Review the following response and check:

1. Accuracy: Are all facts correct?
2. Completeness: Does it fully answer the question?
3. Consistency: Are there contradictions?
4. Citations: Are sources properly cited?
5. Clarity: Is it easy to understand?

If any issues found, suggest improvements.

Response to review:
{generated_response}
"""
```

**Self-Improvement**:
```
Initial: "CRISPR was invented in 2012"

Review: "Check - CRISPR was discovered in bacteria 
earlier, but CRISPR-Cas9 gene editing was developed 
around 2012"

Improved: "CRISPR-Cas9 gene editing technology was 
developed in 2012, though CRISPR sequences were 
discovered in bacteria much earlier"
```

---

## 🛠️ Orchestration Frameworks

### 1. LangChain

**What**: Popular Python framework for LLM applications

**Key Features**:
- Chains: Sequence LLM calls
- Agents: Let LLM choose tools
- Memory: Maintain conversation context
- Retrievers: RAG integration

**Example**:
```python
from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI

# Define tools
tools = [
    Tool(
        name="Calculator",
        func=calculator.run,
        description="For math calculations"
    ),
    Tool(
        name="Search",
        func=search.run,
        description="For searching information"
    )
]

# Create agent
agent = initialize_agent(
    tools=tools,
    llm=OpenAI(temperature=0),
    agent="zero-shot-react-description"
)

# Use agent
result = agent.run("What is 25 * 4, and what's the capital of France?")
```

---

### 2. LangGraph

**What**: Extension of LangChain for building stateful graphs

**Key Features**:
- Nodes: Individual steps
- Edges: Connections between steps
- State: Maintained across graph
- Cycles: Support loops and revisions

**Example**:
```python
from langgraph.graph import StateGraph

# Define workflow graph
workflow = StateGraph()

# Add nodes
workflow.add_node("plan", planning_function)
workflow.add_node("search", search_function)
workflow.add_node("analyze", analyze_function)
workflow.add_node("review", review_function)

# Add edges
workflow.add_edge("plan", "search")
workflow.add_edge("search", "analyze")
workflow.add_edge("analyze", "review")

# Conditional edge (loop back if needed)
workflow.add_conditional_edges(
    "review",
    should_continue,
    {
        "continue": "analyze",  # Redo analysis
        "end": END  # Finish
    }
)

# Execute
result = workflow.invoke({"query": user_query})
```

---

### 3. Semantic Kernel

**What**: Microsoft's framework for AI orchestration

**Key Features**:
- Skills: Reusable capabilities
- Planners: Automatic planning
- Memory: Long-term and short-term
- Connectors: Integration with tools

**Example**:
```python
import semantic_kernel as sk

# Create kernel
kernel = sk.Kernel()

# Add skills
kernel.import_skill(SearchSkill(), "search")
kernel.import_skill(AnalysisSkill(), "analysis")

# Create planner
planner = SequentialPlanner(kernel)

# Generate plan
plan = await planner.create_plan_async(
    "Analyze latest research papers on quantum computing"
)

# Execute plan
result = await plan.invoke_async()
```

---

### 4. MCP (Model Context Protocol)

**What**: New protocol for tool/context integration

**Key Features**:
- Standardized interface
- Context providers
- Tool servers
- Resource access

**Why It Matters**:
- Interoperability: Tools work across platforms
- Simplicity: Standard protocol
- Flexibility: Easy to add new tools

**Example**:
```json
{
  "protocol": "mcp/1.0",
  "capabilities": {
    "tools": [
      {
        "name": "file_search",
        "description": "Search files in directory",
        "parameters": {...}
      }
    ],
    "resources": [
      {
        "uri": "file:///docs/*",
        "mime_type": "text/plain"
      }
    ]
  }
}
```

---

## 🎯 Common Orchestration Patterns

### 1. ReAct (Reason + Act)

```
Thought: I need to find the latest paper on CRISPR
Action: search_papers(query="CRISPR", year=2024)
Observation: Found 15 papers

Thought: I should analyze the most cited one
Action: get_paper_details(paper_id="arxiv:2024.12345")
Observation: Paper details retrieved

Thought: Now I can summarize the key findings
Action: summarize(text=paper_content)
Observation: Summary generated

Answer: [Final response with summary]
```

### 2. Chain of Thought

```
User: "What's 25% of 240?"

CoT Response:
Let me solve this step by step:
1. Convert percentage to decimal: 25% = 0.25
2. Multiply: 240 × 0.25
3. Calculate: 60

Answer: 60
```

### 3. Multi-Agent System

```
┌──────────────┐
│ Coordinator  │ ← User query
└──────┬───────┘
       │
       ├─────────┬─────────┬─────────┐
       ▼         ▼         ▼         ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Research │ │Analysis │ │Writing  │ │Review   │
│ Agent   │ │ Agent   │ │ Agent   │ │ Agent   │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
       │         │         │         │
       └─────────┴─────────┴─────────┘
                 │
                 ▼
         ┌──────────────┐
         │ Final Output │
         └──────────────┘
```

Each agent has specialized role:
- **Research Agent**: Gathers information
- **Analysis Agent**: Processes data
- **Writing Agent**: Composes response
- **Review Agent**: Quality check

---

## 🔑 Key Takeaways

1. **Orchestration enables complexity** - Break tasks into steps
2. **Three phases**: Thinking → Execution → Review
3. **Tool calling is powerful** - LLMs can use external functions
4. **Self-review improves quality** - Feedback loops work
5. **Multiple frameworks available** - Choose based on needs
6. **MCP is the future** - Standard protocol for integration

## 💡 Practical Exercise

**Build a Research Assistant**:

Create an orchestrated system that:
1. **Plans** - Breaks down research question
2. **Executes** - Searches, retrieves, analyzes
3. **Reviews** - Validates findings
4. **Responds** - Formatted with citations

**Tools Needed**:
- Web search API
- PDF text extraction
- Summarization
- Citation formatting

---

## 📚 Resources

- [LangChain Documentation](https://python.langchain.com/)
- [LangGraph Guide](https://langchain-ai.github.io/langgraph/)
- [Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/)
- [ReAct Paper](https://arxiv.org/abs/2210.03629)
- [Model Context Protocol](https://modelcontextprotocol.io/)

**Next**: Module 6 - Application Layer
