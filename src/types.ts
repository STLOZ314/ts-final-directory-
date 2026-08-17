type Program =
  | "Web Development"
  | "Cybersecurity"
  | "Networking"
  | "Robotics"
  | "Business"
  | "Data Analytics";

type ClassYear = "Freshman" | "Sophomore" | "Junior" | "Senior";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  program: Program;
  year: ClassYear;
  email: string;
  bio: string;
  skills: string[];
  gpa?: number;
  photoUrl?: string;
}