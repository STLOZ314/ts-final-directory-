"use strict";
const STORAGE_KEY = "student-directory-data-v1";
const PROGRAM_VALUES = [
    "Web Development",
    "Cybersecurity",
    "Networking",
    "Robotics",
    "Business",
    "Data Analytics"
];
const YEAR_VALUES = ["Freshman", "Sophomore", "Junior", "Senior"];
let repository;
let nextId = 1;
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isProgram(value) {
    return PROGRAM_VALUES.includes(value);
}
function isClassYear(value) {
    return YEAR_VALUES.includes(value);
}
function toOptionalNumber(value) {
    if (typeof value !== "number") {
        return undefined;
    }
    return Number.isFinite(value) ? value : undefined;
}
function toOptionalString(value) {
    if (typeof value !== "string") {
        return undefined;
    }
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
}
function sanitizeStudent(value) {
    if (!isObject(value)) {
        return null;
    }
    const { id, firstName, lastName, program, year, email, bio, skills, gpa, photoUrl } = value;
    if (typeof id !== "number" ||
        !Number.isFinite(id) ||
        typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof program !== "string" ||
        typeof year !== "string" ||
        typeof email !== "string" ||
        typeof bio !== "string" ||
        !Array.isArray(skills) ||
        !isProgram(program) ||
        !isClassYear(year)) {
        return null;
    }
    const cleanSkills = skills
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    return {
        id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        program,
        year,
        email: email.trim(),
        bio: bio.trim(),
        skills: cleanSkills,
        gpa: toOptionalNumber(gpa),
        photoUrl: toOptionalString(photoUrl)
    };
}
function loadInitialStudents() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return seedStudents;
    }
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return seedStudents;
        }
        const restored = parsed
            .map((item) => sanitizeStudent(item))
            .filter((student) => student !== null);
        return restored.length > 0 ? restored : seedStudents;
    }
    catch {
        return seedStudents;
    }
}
function saveStudents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(repository.getAllStudents()));
}
function clearError(field, errorOutput) {
    field.removeAttribute("aria-invalid");
    errorOutput.textContent = "";
    errorOutput.hidden = true;
}
function setError(field, errorOutput, message) {
    field.setAttribute("aria-invalid", "true");
    errorOutput.textContent = message;
    errorOutput.hidden = false;
}
document.addEventListener("DOMContentLoaded", () => {
    repository = new StudentRepository(loadInitialStudents());
    nextId =
        repository.getAllStudents().reduce((max, student) => Math.max(max, student.id), 0) + 1;
    const form = document.getElementById("student-form");
    const directory = document.getElementById("directory");
    const searchInput = document.getElementById("search");
    const programFilter = document.getElementById("program-filter");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const programSelect = document.getElementById("program");
    const yearSelect = document.getElementById("class-year");
    const gpaInput = document.getElementById("gpa");
    const photoUrlInput = document.getElementById("photo-url");
    const skillsInput = document.getElementById("skills");
    const bioTextarea = document.getElementById("bio");
    const firstNameError = document.getElementById("first-name-error");
    const lastNameError = document.getElementById("last-name-error");
    if (!form ||
        !directory ||
        !searchInput ||
        !programFilter ||
        !firstNameInput ||
        !lastNameInput ||
        !emailInput ||
        !programSelect ||
        !yearSelect ||
        !gpaInput ||
        !photoUrlInput ||
        !skillsInput ||
        !bioTextarea ||
        !firstNameError ||
        !lastNameError) {
        return;
    }
    const applyFilters = () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedProgram = programFilter.value;
        const filtered = repository.findStudents((student) => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            const skillsMatch = student.skills.some((skill) => skill.toLowerCase().includes(searchTerm));
            const searchMatch = searchTerm === "" || fullName.includes(searchTerm) || skillsMatch;
            const filterMatch = selectedProgram === "" || student.program === selectedProgram;
            return searchMatch && filterMatch;
        });
        renderDirectory(filtered);
        updateResultsOutput(filtered.length, repository.getAllStudents().length);
    };
    const resetValidationMessages = () => {
        clearError(firstNameInput, firstNameError);
        clearError(lastNameInput, lastNameError);
    };
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        let hasError = false;
        if (firstName === "") {
            setError(firstNameInput, firstNameError, "First name is required.");
            hasError = true;
        }
        else {
            clearError(firstNameInput, firstNameError);
        }
        if (lastName === "") {
            setError(lastNameInput, lastNameError, "Last name is required.");
            hasError = true;
        }
        else {
            clearError(lastNameInput, lastNameError);
        }
        if (hasError) {
            return;
        }
        const gpaRaw = gpaInput.value.trim();
        const parsedGpa = gpaRaw === "" ? undefined : Number(gpaRaw);
        const normalizedSkills = skillsInput.value
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "");
        const student = {
            id: nextId,
            firstName,
            lastName,
            program: programSelect.value,
            year: yearSelect.value,
            email: emailInput.value.trim(),
            bio: bioTextarea.value.trim(),
            skills: normalizedSkills,
            gpa: Number.isFinite(parsedGpa) ? parsedGpa : undefined,
            photoUrl: photoUrlInput.value.trim() || undefined
        };
        repository.addStudent(student);
        nextId += 1;
        saveStudents();
        form.reset();
        resetValidationMessages();
        updateBioCount(0, bioTextarea.maxLength);
        renderSkillOptions(repository.getAllStudents());
        applyFilters();
    });
    form.addEventListener("reset", () => {
        resetValidationMessages();
        updateBioCount(0, bioTextarea.maxLength);
    });
    bioTextarea.addEventListener("input", () => {
        updateBioCount(bioTextarea.value.length, bioTextarea.maxLength);
    });
    searchInput.addEventListener("input", applyFilters);
    programFilter.addEventListener("change", applyFilters);
    directory.addEventListener("click", (event) => {
        const target = event.target;
        const deleteButton = target.closest("button[data-action='delete-student']");
        if (!deleteButton) {
            return;
        }
        const rawId = deleteButton.dataset.studentId;
        const id = Number(rawId);
        if (!Number.isFinite(id)) {
            return;
        }
        const confirmed = confirm("Delete this student from the directory?");
        if (!confirmed) {
            return;
        }
        const removed = repository.removeStudent(id);
        if (removed) {
            saveStudents();
            renderSkillOptions(repository.getAllStudents());
            applyFilters();
        }
    });
    renderSkillOptions(repository.getAllStudents());
    updateBioCount(0, bioTextarea.maxLength);
    applyFilters();
});
