function getInitials(firstName: string, lastName: string): string {
  const first = firstName.trim().charAt(0).toUpperCase();
  const last = lastName.trim().charAt(0).toUpperCase();
  return `${first}${last}` || "--";
}

function buildFallbackAvatar(student: Student): HTMLDivElement {
  const fallback = document.createElement("div");
  fallback.className = "fallback-avatar";
  fallback.setAttribute("aria-hidden", "true");
  fallback.textContent = getInitials(student.firstName, student.lastName);
  return fallback;
}

function renderDirectory(students: Student[]): void {
  const directory = document.getElementById("directory") as HTMLElement | null;

  if (!directory) {
    return;
  }

  directory.innerHTML = "";

  if (students.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className =
      "rounded-2xl border border-slate-300 bg-white/70 p-6 text-center shadow-sm";
    emptyState.innerHTML =
      "<p class=\"text-lg font-semibold text-slate-800\">No students match your current filters.</p><p class=\"mt-2 text-slate-600\">Try a different search term, clear the filter, or add a new student.";
    directory.append(emptyState);
    return;
  }

  for (const student of students) {
    const card = document.createElement("article");
    card.className =
      "group relative overflow-hidden rounded-2xl border border-slate-300 bg-white/80 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-sky-600";

    const media = document.createElement("div");
    media.className =
      "mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-2xl font-bold text-slate-700";

    if (student.photoUrl) {
      const image = document.createElement("img");
      image.src = student.photoUrl;
      image.alt = `${student.firstName} ${student.lastName} portrait`;
      image.className = "h-full w-full object-cover";
      image.addEventListener("error", () => {
        media.innerHTML = "";
        media.append(buildFallbackAvatar(student));
      });
      media.append(image);
    } else {
      media.append(buildFallbackAvatar(student));
    }

    const name = document.createElement("h3");
    name.className = "text-xl font-semibold text-slate-900";
    name.textContent = `${student.firstName} ${student.lastName}`;

    const meta = document.createElement("p");
    meta.className = "mt-1 text-sm text-slate-700";
    meta.textContent = `${student.program} | ${student.year}`;

    const email = document.createElement("p");
    email.className = "mt-2 text-sm text-slate-600";
    email.textContent = student.email;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete-student";
    deleteButton.dataset.studentId = String(student.id);
    deleteButton.className =
      "mt-4 inline-flex items-center rounded-lg border border-red-700 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2";
    deleteButton.textContent = "Delete";

    card.append(media, name, meta, email, deleteButton);
    directory.append(card);
  }
}

function renderSkillOptions(students: Student[]): void {
  const datalist = document.getElementById("skill-options") as HTMLDataListElement | null;

  if (!datalist) {
    return;
  }

  const uniqueSkills = new Set<string>();

  for (const student of students) {
    for (const skill of student.skills) {
      if (skill.trim() !== "") {
        uniqueSkills.add(skill.trim());
      }
    }
  }

  datalist.innerHTML = "";

  const sortedSkills = [...uniqueSkills].sort((a, b) => a.localeCompare(b));

  for (const skill of sortedSkills) {
    const option = document.createElement("option") as HTMLOptionElement;
    option.value = skill;
    datalist.append(option);
  }
}

function updateResultsOutput(visibleCount: number, totalCount: number): void {
  const resultOutput = document.getElementById("results-count") as HTMLOutputElement | null;

  if (!resultOutput) {
    return;
  }

  resultOutput.value = `Showing ${visibleCount} of ${totalCount} students`;
  resultOutput.textContent = resultOutput.value;
}

function updateBioCount(currentCount: number, maxCount: number): void {
  const bioOutput = document.getElementById("bio-count") as HTMLOutputElement | null;

  if (!bioOutput) {
    return;
  }

  bioOutput.value = `${currentCount} / ${maxCount} characters`;
  bioOutput.textContent = bioOutput.value;
}