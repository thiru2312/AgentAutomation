# Claude QA Pipeline Project

## Project Purpose

This repository implements a reliable AI-assisted QA pipeline for the Commerce QA Lab.  

The pipeline connects:  

User Story  
Requirement  
Test Case
Automation  
Execution  
Defect  
Traceability

Preserve stable identifiers across every stage. 
 
## Required Verification  
Before declaring implementation work complete, run:  
npm run verify  
Do not claim success when required verification fails.

## Application  The application under test is located in app/.  
Do not change application behavior merely to make a failing test pass.  
If a test exposes a suspected product defect, preserve the failing evidence for investigation.

## QA Artifacts  
Structured QA artifacts belong under qa/artifacts/.  
Schemas belong under qa/schemas/.
Execution evidence belongs under qa/evidence/.  
Run-specific records belong under qa/runs/.  
The Excel QA Ledger belongs under qa/ledger/.  

## Artifact Integrity  
Do not silently invent missing business requirements.  
Do not change existing stable IDs without explicit instruction.  
Do not allow multiple specialists to write the Excel QA Ledger directly.
Specialists produce structured artifacts first.  
Structured artifacts must pass validation before the ledger is updated.

## Test Automation  
Playwright tests belong under tests/.  
Prefer user-facing Playwright locators such as roles and labels.  
Avoid arbitrary waits.  
Do not weaken assertions simply to make a failing test pass.
Do not remove a failing test without explaining why it is invalid.  


## Change Discipline  
Inspect existing files before modifying them.  
Make the smallest change that satisfies the task.  
Do not rewrite unrelated files.  
Do not delete execution evidence unless explicitly instructed by the workflow.  
Use Git status and Git diff to inspect repository changes.

## Security  
Never read, display, commit, or expose secrets from environment files.  
Do not commit credentials, access tokens, API keys, or private customer data.  
Use synthetic test data in this lab.  


## Specialist Boundaries  
Story analysis, test design, automation, execution, defect handling, and traceability are separate responsibilities.
A specialist must not silently perform another specialist's responsibility merely to complete its own task.  
Cross-stage changes require an explicit handoff or orchestrator decision.



