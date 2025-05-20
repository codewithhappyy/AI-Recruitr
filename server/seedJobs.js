import Job from './models/jobModel.js';
import mongoose from './config/db.js';

const jobs = [
  { 
    title: "Frontend Developer", 
    company: "ABC Corp", 
    location: "Hyderabad", 
    skills: ["React", "CSS", "JavaScript"],
    salary: "₹8-12 LPA",
    experience: "2-4 years",
    jobType: "Full-time"
  },
  { 
    title: "Backend Developer", 
    company: "XYZ Ltd", 
    location: "Remote", 
    skills: ["Node.js", "MongoDB", "AWS"],
    salary: "₹10-15 LPA",
    experience: "3-5 years",
    jobType: "Full-time"
  },
  { 
    title: "Full Stack Developer", 
    company: "Tech Solutions Inc", 
    location: "Bangalore", 
    skills: ["React", "Node.js", "Express", "MongoDB"],
    salary: "₹12-18 LPA",
    experience: "4-6 years",
    jobType: "Full-time"
  },
  { 
    title: "UI/UX Designer", 
    company: "Creative Minds", 
    location: "Mumbai", 
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    salary: "₹6-10 LPA",
    experience: "1-3 years",
    jobType: "Full-time"
  },
  { 
    title: "DevOps Engineer", 
    company: "Cloud Systems", 
    location: "Pune", 
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    salary: "₹15-20 LPA",
    experience: "5-7 years",
    jobType: "Full-time"
  },
  { 
    title: "Data Scientist", 
    company: "Analytics Pro", 
    location: "Remote", 
    skills: ["Python", "Machine Learning", "Pandas", "TensorFlow"],
    salary: "₹18-25 LPA",
    experience: "4-6 years",
    jobType: "Full-time"
  },
  { 
    title: "Mobile App Developer", 
    company: "AppWorks", 
    location: "Delhi", 
    skills: ["React Native", "Flutter", "iOS", "Android"],
    salary: "₹9-14 LPA",
    experience: "2-5 years",
    jobType: "Full-time"
  },
  { 
    title: "QA Engineer", 
    company: "Quality First", 
    location: "Chennai", 
    skills: ["Automation Testing", "Selenium", "Jest", "Cypress"],
    salary: "₹7-11 LPA",
    experience: "2-4 years",
    jobType: "Full-time"
  },
  { 
    title: "Technical Writer", 
    company: "DocuTech", 
    location: "Remote", 
    skills: ["Technical Documentation", "Markdown", "API Documentation", "Git"],
    salary: "₹5-8 LPA",
    experience: "1-3 years",
    jobType: "Contract"
  },
  { 
    title: "Product Manager", 
    company: "Innovate Labs", 
    location: "Gurgaon", 
    skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
    salary: "₹20-30 LPA",
    experience: "6-9 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "Quality First",
    location: "Chennai",
    skills: ["Automation Testing", "Selenium", "Jest", "Cypress"],
    salary: "₹7-11 LPA",
    experience: "2-4 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "TestPro Solutions",
    location: "Bangalore",
    skills: ["Manual Testing", "JIRA", "TestRail", "Postman"],
    salary: "₹6-10 LPA",
    experience: "1-3 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "Quality Assurance Inc",
    location: "Pune",
    skills: ["Selenium", "Java", "TestNG", "Jenkins"],
    salary: "₹8-12 LPA",
    experience: "3-5 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "PerfectQA",
    location: "Hyderabad",
    skills: ["Cypress", "JavaScript", "API Testing", "Git"],
    salary: "₹9-13 LPA",
    experience: "4-6 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "TestMasters",
    location: "Delhi",
    skills: ["Appium", "Mobile Testing", "Android", "iOS"],
    salary: "₹7.5-11.5 LPA",
    experience: "2-5 years",
    jobType: "Contract"
  },
  {
    title: "QA Engineer",
    company: "BugFinders",
    location: "Mumbai",
    skills: ["Performance Testing", "JMeter", "LoadRunner", "SQL"],
    salary: "₹10-15 LPA",
    experience: "5-7 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "QualityCheck",
    location: "Gurgaon",
    skills: ["Security Testing", "OWASP", "Burp Suite", "Penetration Testing"],
    salary: "₹12-18 LPA",
    experience: "6-8 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "TestAutomation Co",
    location: "Noida",
    skills: ["Playwright", "TypeScript", "CI/CD", "Docker"],
    salary: "₹11-16 LPA",
    experience: "4-7 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "QualityPioneers",
    location: "Ahmedabad",
    skills: ["Robot Framework", "Python", "BDD", "Selenium"],
    salary: "₹6.5-10.5 LPA",
    experience: "2-4 years",
    jobType: "Part-time"
  },
  {
    title: "QA Engineer",
    company: "TestInnovators",
    location: "Remote",
    skills: ["Cucumber", "Gherkin", "SpecFlow", "JUnit"],
    salary: "₹8-14 LPA",
    experience: "3-6 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "QualityExperts",
    location: "Chennai",
    skills: ["Selenium WebDriver", "Java", "Maven", "TestNG"],
    salary: "₹7.5-12 LPA",
    experience: "3-5 years",
    jobType: "Full-time"
  },
  {
    title: "QA Engineer",
    company: "TestSpecialists",
    location: "Bangalore",
    skills: ["Postman", "API Testing", "Swagger", "REST Assured"],
    salary: "₹9-14 LPA",
    experience: "4-6 years",
    jobType: "Full-time"
  }
];

mongoose.connection.once('open', async () => {
  try {
    await Job.deleteMany({});
    await Job.insertMany(jobs);
    console.log("More Jobs seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding jobs:", error);
    process.exit(1);
  }
});