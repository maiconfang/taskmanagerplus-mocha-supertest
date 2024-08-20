# Requirements Traceability Matrix (RTM)

## Introduction

This document maps the functional requirements of the Task Manager Plus API to the corresponding test cases, ensuring that each requirement is adequately covered by tests.

---

## RTM Table

| Requirement ID | Requirement Description                          | Test Case ID(s)           | Covered (Yes/No) |
|----------------|--------------------------------------------------|---------------------------|------------------|
| REQ-001        | The system shall allow the creation of a new task. | TC01                      | Yes              |
| REQ-002        | The system shall allow updating an existing task.  | TC02                      | Yes              |
| REQ-003        | The system shall allow deleting an existing task.  | TC03                      | Yes              |

---

## Detailed Mapping

### Requirement: REQ-001
**Description:** The system shall allow the creation of a new task.

**Test Case(s):** 
- TC01: Create a New Task Successfully

**Coverage:** 
- Verifies that the system successfully creates a task with a title, description, due date, and completion status.

### Requirement: REQ-002
**Description:** The system shall allow updating an existing task.

**Test Case(s):** 
- TC02: Update an Existing Task Successfully

**Coverage:** 
- Verifies that the system updates the details of an existing task, including the title, description, due date, and completion status.

### Requirement: REQ-003
**Description:** The system shall allow deleting an existing task.

**Test Case(s):** 
- TC03: Delete an Existing Task Successfully

**Coverage:** 
- Verifies that the system deletes an existing task and ensures that it cannot be retrieved after deletion.

---

## Conclusion

This RTM ensures that all the primary functional requirements for the Task Manager Plus API are covered by the corresponding test cases. Any changes or additions to the requirements should be reflected in this matrix and the test cases to maintain the integrity of test coverage.

