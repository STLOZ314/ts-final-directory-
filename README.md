# Student Directory Application

A responsive student directory built with semantic HTML, Tailwind CSS, custom CSS, and vanilla TypeScript. The app supports creating, reading, deleting, searching, and filtering students, and persists data with localStorage.

## Part 1 Plan (Pre-build)

### Planned Student Fields

- Required: id, firstName, lastName, program, year, email, bio, skills
- Optional: gpa, photoUrl

### Planned Views and States

- Header hero section introducing the project.
- Add-student form panel with grouped fieldsets.
- Directory cards grid populated at runtime from data.
- Search + program filter controls above directory.
- Empty-state card when no records match.

### Rough Layout Sketch

```text
+-------------------------------------------------------------+
| Header / Title / Intro                                      |
+--------------------------+----------------------------------+
| Add Student Form         | Search + Filter + Result Count   |
| - Personal fieldset      |                                  |
| - Academic fieldset      | Directory Grid of Cards          |
| - Bio count output       | [Photo][Name][Meta][Delete]      |
+--------------------------+----------------------------------+
| Footer                                                     |
+-------------------------------------------------------------+
```

## TypeScript Concept Checklist

| Concept | Where it belongs in this project |
|---|---|
| interface | Student in src/types.ts |
| union type | Program and ClassYear in src/types.ts |
| class + access modifiers | StudentRepository with private students in src/data.ts |
| type assertion (as) | DOM lookups and select values in src/app.ts and src/render.ts |

## Required Web API Interface Checklist

| Interface | Required usage |
|---|---|
| HTMLFormElement | Add-student form in index.html and typed in src/app.ts |
| HTMLFieldSetElement | Two grouped sections in form (Personal Info, Academic Info) |
| HTMLLabelElement | Labels associated with every form control in index.html |
| HTMLInputElement | Name, email, gpa, skills, photo URL, and search controls |
| HTMLSelectElement | Program and Class Year form fields + program filter |
| HTMLTextAreaElement | Bio input and live character tracking |
| HTMLButtonElement | Save, Reset, and card Delete buttons |
| HTMLOutputElement | Bio character counter + live result count |
| HTMLDataListElement | Skill suggestion list with id skill-options |
| HTMLOptionElement | Dynamic skill options created in src/render.ts |

## Build and Run

1. Compile TypeScript:

```bash
npx tsc
```

2. Open index.html in a browser (or use Live Server).

## Notes on Completeness

- If photos are missing in assets/photos, cards still render with initials fallback.
- localStorage persistence is active for add/delete operations.
- With more time, next upgrade would be edit-in-place and sort controls.

## Deployment (GitHub Pages)

1. Copy this project into final-project/ at the root of your public portfolio repository.
2. Commit source files and dist/ output.
3. In repository Settings > Pages, choose GitHub Actions.
4. Let the default Pages workflow publish.
5. Test the live github.io URL end-to-end before submission.
