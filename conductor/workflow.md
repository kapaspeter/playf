# Project Workflow

## Guiding Principles

1. **The Plan is the Source of Truth:** All work must be tracked in `plan.md`
2. **The Tech Stack is Deliberate:** Changes to the tech stack must be documented in `tech-stack.md` *before* implementation
3. **Test-Driven Development:** Write unit tests before implementing functionality
4. **High Code Coverage:** Aim for >80% code coverage for all modules
5. **User Experience First:** Every decision should prioritize user experience
6. **Non-Interactive & CI-Aware:** Prefer non-interactive commands. Use `CI=true` for watch-mode tools (tests, linters) to ensure single execution.

## Task Workflow

All tasks follow a strict lifecycle:

### Standard Task Workflow

1. **Select Task:** Choose the next available task from `plan.md` in sequential order

2. **Mark In Progress:** Before beginning work, edit `plan.md` and change the task from `[ ]` to `[~]`

3. **Write Failing Tests (Red Phase):**
   - Create a new test file for the feature or bug fix.
   - Write one or more unit tests that clearly define the expected behavior and acceptance criteria for the task.
   - **CRITICAL:** Run the tests and confirm that they fail as expected. This is the "Red" phase of TDD. Do not proceed until you have failing tests.

4. **Implement to Pass Tests (Green Phase):**
   - Write the minimum amount of application code necessary to make the failing tests pass.
   - Run the test suite again and confirm that all tests now pass. This is the "Green" phase.

5. **Refactor (Optional but Recommended):**
   - With the safety of passing tests, refactor the implementation code and the test code to improve clarity, remove duplication, and enhance performance without changing the external behavior.
   - Rerun tests to ensure they still pass after refactoring.

6. **Verify Coverage:** Run coverage reports using the project's chosen tools.
   Target: >80% coverage for new code.

7. **Document Deviations:** If implementation differs from tech stack:
   - **STOP** implementation
   - Update `tech-stack.md` with new design
   - Add dated note explaining the change
   - Resume implementation

8. **Mark Task as Complete in Plan:**
    - **Step 8.1: Update Plan:** Read `plan.md`, find the line for the completed task, and update its status from `[~]` to `[x]`.
    - **Step 8.2: Write Plan:** Write the updated content back to `plan.md`.

### Phase Completion Verification and Checkpointing Protocol

**Trigger:** This protocol is executed immediately after all tasks in a phase in `plan.md` are completed.

1.  **Announce Protocol Start:** Inform the user that the phase is complete and the verification and checkpointing protocol has begun.

2.  **Ensure Test Coverage for Phase Changes:**
    -   **Step 2.1: Determine Phase Scope:** Identify all files changed during this phase.
    -   **Step 2.2: Verify and Create Tests:** For each code file, verify a corresponding test file exists and validates the functionality described in this phase's tasks.

3.  **Execute Automated Tests with Proactive Debugging:**
    -   Announce and execute the automated test suite.
    -   If tests fail, debug and fix (max two attempts) before asking the user for guidance.

4.  **Propose a Detailed, Actionable Manual Verification Plan:**
    -   Generate a step-by-step plan for the user to manually verify the phase's goals.

5.  **Await Explicit User Feedback:**
    -   **PAUSE** and await the user's explicit "yes" or feedback.

6.  **Commit Phase Changes:**
    -   Stage all code changes and the updated `plan.md`.
    -   Perform a single commit for the entire phase with a detailed message summarizing the tasks completed.
    -   **Example Commit Message:**
        ```
        feat(phase-name): Complete Phase Name

        - Task 1: Description of changes
        - Task 2: Description of changes
        - Checkpoint: End of Phase Name
        ```

7.  **Get and Record Phase Checkpoint SHA:**
    -   **Step 7.1: Get Commit Hash:** Obtain the first 7 characters of the phase commit hash.
    -   **Step 7.2: Update Plan:** Append the SHA to the phase heading in `plan.md` in the format `[checkpoint: <sha>]`.
    -   **Step 7.3: Write Plan:** Write the updated content back to `plan.md`.

8.  **Announce Completion:** Inform the user that the phase is complete and the checkpoint has been created.

## Quality Gates

Before marking any task complete, verify:

- [ ] All tests pass
- [ ] Code coverage meets requirements (>80%)
- [ ] Code follows project's code style guidelines
- [ ] All public functions/methods are documented
- [ ] Type safety is enforced
- [ ] No linting or static analysis errors
- [ ] Works correctly on mobile (if applicable)
- [ ] Documentation updated if needed
- [ ] No security vulnerabilities introduced

## Development Commands

(To be adapted to Astro/React/Prisma/Docker)

### Setup
```bash
docker-compose up -d --build
docker-compose exec app npm install
```

### Daily Development
```bash
docker-compose exec app npm run dev
docker-compose exec app npm test
docker-compose exec app npm run lint
```

## Testing Requirements

### Unit Testing
- Every module must have corresponding tests.
- Mock external dependencies.
- Test both success and failure cases.

### Integration Testing
- Test complete user flows (e.g., reservation form submission).
- Verify database transactions via Prisma.

## Definition of Done

A task is complete when:

1. All code implemented to specification
2. Unit tests written and passing
3. Code coverage meets requirements (>80%)
4. Implementation notes updated in `plan.md`
5. Phase checkpoint committed (if it's the last task of the phase)

## Commit Guidelines

### Message Format
```
<type>(<scope>): <description>

[optional body]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting
- `refactor`: Code change (no bug fix or feature)
- `test`: Adding missing tests
- `chore`: Maintenance tasks
- `conductor`: Conductor-specific meta-tasks or setup