# 🛠️ ItsJust — Organization Meta-Repository

> **Small, focused, single-purpose web tools. No frameworks, no bloat.**

This is the **meta-repository** for the [ItsJust-tools](https://github.com/ItsJust-tools) GitHub organization. It does not contain application code. Instead, it holds the **organization-wide configuration, templates, and community health files** that GitHub applies across every repository in the organization.

## 📖 What This Repository Does

The `.github` repository is a special, reserved name on GitHub. When present at the organization level, its contents are automatically applied to **all** repositories under the `ItsJust-tools` organization. This lets us manage shared configuration in one place instead of duplicating it across dozens of tool repos.

It is the single source of truth for:

- **Issue & PR templates** — consistent, high-quality contribution flows
- **CI/CD workflows** — shared automation that runs across the org
- **Community health files** — `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CONTRIBUTING.md`, and more
- **Organization profile** — the public landing page shown on the org's GitHub profile

## 🗂️ Repository Structure

```
.github/
├── profile/
│   └── README.md          # Public org profile page (shown on github.com/ItsJust-tools)
├── ISSUE_TEMPLATE/        # Issue templates for all repos
│   ├── bug_report.md
│   └── feature_request.md
├── PULL_REQUEST_TEMPLATE.md  # PR template for all repos
├── workflows/             # Shared GitHub Actions workflows
│   └── *.yml
├── CODE_OF_CONDUCT.md     # Community standards
├── SECURITY.md            # Security & vulnerability reporting policy
├── CONTRIBUTING.md        # How to contribute
└── README.md              # This file
```

> **Note:** The exact contents evolve over time. This structure reflects the current state of the repository — see the actual files for the latest.

## 🚀 How to Use This Repository

### For Maintainers

- **Add a shared file** — place it at the root of this repo and it applies org-wide (e.g. a new `CODE_OF_CONDUCT.md`).
- **Add an issue/PR template** — drop a file into `ISSUE_TEMPLATE/` or edit `PULL_REQUEST_TEMPLATE.md`.
- **Add a shared workflow** — place a workflow in `workflows/` and reference it from individual repos, or use it directly if it's configured to run org-wide.
- **Update the org profile** — edit `profile/README.md` to change what visitors see on the organization's GitHub page.

### For Contributors

You don't need to touch this repository to contribute to an ItsJust tool. Just:

1. **Fork** the tool repository you want to work on.
2. **Create a branch** and make your changes.
3. **Open a pull request** — the shared PR template and CI workflows here will guide you.

## 🧰 The Tools

This meta-repo supports the [ItsJust tool suite](https://itsjust.tools) — a growing collection of single-purpose web tools:

- **Notepad** · **Calculator** · **QR Code Generator** · **Color Picker** · **Contrast Checker**
- **Password Generator** · **Calendar** · **Countdown** · **Cron Builder** · **Time Zone Converter**
- **JSON Formatter** · **SVG Editor** · **CSS Filter Visualizer** · **Data URI Builder**
- **Blob Generator** · **Equation Editor** · **Gitignore Generator** · **Vision Deficiency Sim** · **System Config Builder**

## ✨ Philosophy

- **Single-purpose** — one tool, one job
- **Client-side first** — your data stays on your machine
- **No bullshit** — no accounts, no signups, no paywalls
- **Fast** — loads instantly
- **Accessible** — works for everyone

Built with Next.js, TypeScript, Tailwind — deployed on Vercel.

## 🤝 Get Involved

Have an idea? Open an issue. Found a bug? Report it. Want to build something? Fork it.

We maintain an [Ops Board](https://github.com/orgs/ItsJust-tools/projects/3) for known issues and a [Roadmap](https://github.com/orgs/ItsJust-tools/projects/2) for planned tools.

---

<sub>Maintained by [Boot](https://github.com/ItsJust-Openclaw) 🦆</sub>
