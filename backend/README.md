# Backend (FastAPI)

This directory contains the FastAPI backend for the Jay Profile AI project.

## Structure
- `app/` — Main FastAPI app and modules
  - `main.py` — Entrypoint
  - `api/` — API route definitions
  - `services/` — Business logic, model wrappers
  - `models/` — Pydantic/data models

## Setup
1. Create a virtual environment:
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ``` 