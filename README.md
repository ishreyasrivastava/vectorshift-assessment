# VectorShift Pipeline Builder

A React-based pipeline builder with a FastAPI backend for DAG validation. Built as part of the VectorShift technical assessment.

## Architecture

### Frontend (React + ReactFlow)
- **BaseNode abstraction** — All node types extend a common `BaseNode` component that handles handles, fields, and styling. Adding a new node type = defining config, not writing JSX.
- **Variable detection** — The Text node parses `{{variable}}` patterns and creates dynamic output handles for each detected variable.
- **Styled nodes** — Custom node styling with consistent color-coded headers and clean layout.

### Backend (FastAPI)
- **DAG validation** — Uses Kahn's algorithm (topological sort via BFS) to verify the pipeline is acyclic. O(V+E) time complexity.
- **Pipeline parsing** — Returns node count, edge count, and DAG status.

## Tradeoffs & Decisions

1. **BaseNode over individual components** — More upfront abstraction, but pays off immediately when adding new node types. Each node is ~15 lines of config vs 50+ lines of duplicated JSX.

2. **Kahn's algorithm over DFS cycle detection** — Both are O(V+E), but Kahn's naturally produces a topological ordering which could be useful for future pipeline execution order. Also avoids recursion depth issues on large graphs.

3. **Client-side variable parsing** — Variables are detected in the browser rather than sent to the backend. This keeps the UI responsive (no network round-trip for handle updates) at the cost of duplicating regex logic if the backend ever needs it.

4. **Alert-based results** — Used `alert()` for pipeline analysis results for simplicity. A production version would use a modal or toast notification system.

## Bugs Found in Starter Code

1. **`100wv` typo** — `ui.js` had `width: 100wv` instead of `100vw`, breaking the full-width layout.
2. **Missing `nodeIDs` in store** — `store.js` referenced `get().nodeIDs` but never initialized it in the state object, causing undefined behavior on first node creation.

## Running Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Tests
```bash
cd backend
pytest test_main.py -v
```

## Tech Stack
- React 18, ReactFlow, Zustand
- FastAPI, Pydantic, Uvicorn
- 9 test cases (unit + integration)
