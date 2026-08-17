"use strict";
const seedStudents = [
    {
        id: 1,
        firstName: "Aaliyah",
        lastName: "Chen",
        program: "Web Development",
        year: "Sophomore",
        email: "aaliyah.chen@example.edu",
        bio: "Front-end focused student who enjoys design systems and accessibility.",
        skills: ["HTML", "CSS", "TypeScript", "Figma"],
        gpa: 3.7,
        photoUrl: "assets/photos/student-01.jpg"
    },
    {
        id: 2,
        firstName: "Marcus",
        lastName: "Lopez",
        program: "Cybersecurity",
        year: "Junior",
        email: "marcus.lopez@example.edu",
        bio: "Interested in secure coding and threat analysis.",
        skills: ["Python", "Wireshark", "Linux", "Risk Assessment"],
        photoUrl: "assets/photos/student-02.jpg"
    },
    {
        id: 3,
        firstName: "Priya",
        lastName: "Nair",
        program: "Data Analytics",
        year: "Senior",
        email: "priya.nair@example.edu",
        bio: "Builds data dashboards and loves telling stories with data.",
        skills: ["SQL", "Tableau", "Excel", "Statistics"],
        gpa: 3.9,
        photoUrl: "assets/photos/student-03.jpg"
    },
    {
        id: 4,
        firstName: "Ethan",
        lastName: "Brooks",
        program: "Networking",
        year: "Freshman",
        email: "ethan.brooks@example.edu",
        bio: "Learning network architecture and troubleshooting fundamentals.",
        skills: ["Cisco", "TCP/IP", "Routing", "Switching"],
        photoUrl: "assets/photos/student-04.jpg"
    },
    {
        id: 5,
        firstName: "Sofia",
        lastName: "Ramirez",
        program: "Business",
        year: "Junior",
        email: "sofia.ramirez@example.edu",
        bio: "Combines business strategy with product thinking.",
        skills: ["Communication", "Project Planning", "Research"],
        gpa: 3.5,
        photoUrl: "assets/photos/student-05.jpg"
    },
    {
        id: 6,
        firstName: "Noah",
        lastName: "Patel",
        program: "Robotics",
        year: "Senior",
        email: "noah.patel@example.edu",
        bio: "Builds autonomous prototypes and sensor-driven systems.",
        skills: ["C++", "Arduino", "CAD", "Embedded Systems"],
        photoUrl: "assets/photos/student-06.jpg"
    },
    {
        id: 7,
        firstName: "Harper",
        lastName: "Kim",
        program: "Web Development",
        year: "Freshman",
        email: "harper.kim@example.edu",
        bio: "New developer exploring responsive layout and JS basics.",
        skills: ["HTML", "CSS", "JavaScript"],
        photoUrl: "assets/photos/student-07.jpg"
    },
    {
        id: 8,
        firstName: "Liam",
        lastName: "Okafor",
        program: "Cybersecurity",
        year: "Sophomore",
        email: "liam.okafor@example.edu",
        bio: "Interested in ethical hacking and incident response.",
        skills: ["Bash", "Nmap", "Linux", "Security"],
        gpa: 3.6,
        photoUrl: "assets/photos/student-08.jpg"
    },
    {
        id: 9,
        firstName: "Mina",
        lastName: "Sato",
        program: "Data Analytics",
        year: "Junior",
        email: "mina.sato@example.edu",
        bio: "Focuses on data cleaning and predictive modeling.",
        skills: ["Python", "Pandas", "SQL", "Storytelling"],
        photoUrl: "assets/photos/student-09.jpg"
    },
    {
        id: 10,
        firstName: "Jordan",
        lastName: "Price",
        program: "Networking",
        year: "Senior",
        email: "jordan.price@example.edu",
        bio: "Capstone student with a focus on high-availability networks.",
        skills: ["Firewall", "Monitoring", "Automation"],
        gpa: 3.8,
        photoUrl: "assets/photos/student-10.jpg"
    }
];
class StudentRepository {
    students;
    constructor(initialStudents) {
        this.students = [...initialStudents];
    }
    addStudent(student) {
        this.students.push(student);
    }
    removeStudent(id) {
        const beforeCount = this.students.length;
        this.students = this.students.filter((student) => student.id !== id);
        return this.students.length < beforeCount;
    }
    getAllStudents() {
        return [...this.students];
    }
    findStudents(predicate) {
        return this.students.filter(predicate);
    }
}
