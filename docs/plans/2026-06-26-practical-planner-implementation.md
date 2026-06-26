# Practical Planner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade Image Seed into a practical photography project planner with multi-field input, Coze built-in LLM workflow design, richer visual material, and updated submission package.

**Architecture:** Keep the app static and deployable on GitHub Pages. `src/core.js` owns deterministic planning logic and database matching; `src/app.js` owns UI state, forms, routing, favorites, and history; docs/report/zip are regenerated after verification.

**Tech Stack:** HTML/CSS/vanilla JS, Node test runner, MySQL SQL file, python-docx report tooling, GitHub Pages.

---

### Task 1: Core planner behavior

**Files:**
- Modify: `tests/core.test.js`
- Modify: `src/core.js`

**Steps:**
1. Add failing tests for `buildStudyResult({ theme, location, subject, gear, style, duration, deliverable })`.
2. Verify tests fail because planner fields are missing.
3. Implement local planner output with schedule, shot list, field notes, risks, and `cozeModelNode`.
4. Verify tests pass.

### Task 2: Practical UI

**Files:**
- Modify: `src/app.js`
- Modify: `styles.css`

**Steps:**
1. Replace single keyword input with multi-field planner form.
2. Add result sections for plan brief, schedule, shot list, risks, and material wall.
3. Keep photographers/books/favorites/history routes.
4. Verify browser has no broken images or console errors.

### Task 3: Coze workflow docs

**Files:**
- Modify: `docs/coze_workflow.md`
- Modify: `docs/coze_workflow_config.json`
- Modify: `README.md`

**Steps:**
1. Update docs to state Coze uses built-in LLM node.
2. Add multi-field input schema.
3. Keep note about current login limitation for saving workflow.

### Task 4: Screenshots and report

**Files:**
- Modify: `tools/build_report.py`
- Generated: `output/screenshots/*.png`
- Generated: `output/doc/摄影创作研究助手-项目说明.docx`

**Steps:**
1. Regenerate screenshots for login, practical home, plan result, photographers, books, favorites, history.
2. Update report copy and screenshots.
3. Export PDF and render pages for visual QA.

### Task 5: Deploy and package

**Files:**
- Commit all source changes.
- Generated: `output/submit/摄影创作研究助手-提交材料.zip`

**Steps:**
1. Run syntax checks and tests.
2. Push to GitHub Pages.
3. Verify deployed URL, broken images, and console errors.
4. Rebuild final submission zip.
