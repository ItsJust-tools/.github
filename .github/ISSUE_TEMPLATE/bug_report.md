---
name: Bug Report
description: Report a bug or unexpected behavior
title: "[Bug]: "
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to report a bug! Please fill out the fields below.
  - type: textarea
    id: description
    attributes:
      label: Description
      description: A clear and concise description of what the bug is.
      placeholder: Describe the bug...
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: Steps to reproduce the behavior.
      placeholder: |
        1. Go to '...'
        2. Click on '...'
        3. Scroll down to '...'
        4. See error
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What did you expect to happen?
      placeholder: What should have happened?
    validations:
      required: true
  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened?
      placeholder: What actually happened?
    validations:
      required: true
  - type: input
    id: environment
    attributes:
      label: Environment
      description: Browser, OS, and any other relevant environment details.
      placeholder: e.g. Chrome 130 on macOS 15.0
    validations:
      required: false
  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: If applicable, add screenshots to help explain your problem.
      placeholder: Paste screenshots here
    validations:
      required: false
  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Add any other context about the problem here.
      placeholder: Any other context
    validations:
      required: false
