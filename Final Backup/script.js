let defaultProjects = [
  {
    title: "VR Interface Design Project",
    category: "UX",
    skills: "Figma, Unity",
    author: "Alex Kim",
    time: "Posted today",
    description:
      "Looking for someone to design menus, onboarding, and overall user flow for a VR class concept focused on clean and usable interaction.",
    overview:
      "This project focuses on designing a clear interface for a VR concept. The goal is to make navigation, prompts, and interactions easy to understand inside an immersive environment.",
    timeline: "2 to 3 weeks",
    team: "One developer, one 3D artist, and one project lead."
  },
  {
    title: "AR Low-Poly Environment",
    category: "3D",
    skills: "Blender",
    author: "Maya Patel",
    time: "Posted today",
    description:
      "Need help creating optimized low-poly objects and a lightweight scene for an interactive AR prototype.",
    overview:
      "This project needs simple environment assets that can work smoothly in an AR prototype.",
    timeline: "1 to 2 weeks",
    team: "One AR developer and one interaction designer."
  },
  {
    title: "Portfolio Website Build",
    category: "Web",
    skills: "HTML, CSS",
    author: "Jordan Lee",
    time: "Posted 1 day ago",
    description:
      "Looking for a web partner who can help with layout, responsiveness, and making the final interface look polished.",
    overview:
      "This project is focused on building a clean portfolio website with responsive layout and clear project storytelling.",
    timeline: "1 week",
    team: "One designer and one web developer."
  },
  {
    title: "Interactive Installation",
    category: "Creative Tech",
    skills: "JavaScript, p5.js, Arduino",
    author: "Sam Rivera",
    time: "Posted 2 days ago",
    description:
      "Building an installation involving sound, light, and simple interaction. Looking for someone who likes experimenting with code and physical computing.",
    overview:
      "This project combines sensors, sound, and visual feedback into a simple interactive installation.",
    timeline: "3 weeks",
    team: "Two creative coding students."
  }
];

function getProjects() {
  let savedProjects = localStorage.getItem("projects");

  if (savedProjects) {
    return JSON.parse(savedProjects);
  }

  localStorage.setItem("projects", JSON.stringify(defaultProjects));
  return defaultProjects;
}

function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function showProjects(category) {
  let projectList = document.getElementById("projectList");

  if (!projectList) {
    return;
  }

  let projects = getProjects();
  projectList.innerHTML = "";

  for (let i = 0; i < projects.length; i++) {
    if (category !== "All" && projects[i].category !== category) {
      continue;
    }

    let post = document.createElement("div");
    post.className = "team-post";

    post.innerHTML =
      '<div class="team-post-top">' +
        "<div>" +
          "<h3>" + projects[i].title + "</h3>" +
          '<div class="meta">Skills: ' + projects[i].skills + " • " + projects[i].time + "</div>" +
        "</div>" +
        '<span class="post-tag">' + projects[i].category + "</span>" +
      "</div>" +
      "<p>" + projects[i].description + "</p>" +
      '<div class="team-actions">' +
        '<button class="btn small-btn" onclick="openProject(' + i + ')">View Project</button>' +
      "</div>";

    projectList.appendChild(post);
  }
}

function filterProjects(category) {
  showProjects(category);
}

function openProjectForm() {
  document.getElementById("projectModal").classList.remove("hidden");
}

function closeProjectForm() {
  document.getElementById("projectModal").classList.add("hidden");
}

function addProject() {
  let title = document.getElementById("projectTitleInput").value;
  let category = document.getElementById("projectCategoryInput").value;
  let description = document.getElementById("projectDescriptionInput").value;
  let skills = document.getElementById("projectSkillsInput").value;
  let author = document.getElementById("projectAuthorInput").value;

  if (title === "" || description === "" || skills === "") {
    alert("Please fill out the project title, description, and skills.");
    return;
  }

  if (author === "") {
    author = "IDM Student";
  }

  let newProject = {
    title: title,
    category: category,
    skills: skills,
    author: author,
    time: "Posted just now",
    description: description,
    overview: description,
    timeline: "Flexible",
    team: "Open to new collaborators."
  };

  let projects = getProjects();
  projects.push(newProject);
  saveProjects(projects);

  document.getElementById("projectTitleInput").value = "";
  document.getElementById("projectDescriptionInput").value = "";
  document.getElementById("projectSkillsInput").value = "";
  document.getElementById("projectAuthorInput").value = "";

  closeProjectForm();
  showProjects("All");
}

function openProject(index) {
  let projects = getProjects();
  localStorage.setItem("selectedProject", JSON.stringify(projects[index]));
  window.location.href = "project-details.html";
}

function loadProjectDetails() {
  let titleArea = document.getElementById("detailTitle");

  if (!titleArea) {
    return;
  }

  let project = JSON.parse(localStorage.getItem("selectedProject"));

  if (!project) {
    project = defaultProjects[0];
  }

  document.getElementById("detailTitle").innerText = project.title;
  document.getElementById("detailDescription").innerText = project.description;
  document.getElementById("detailAuthor").innerText =
    "Posted by " + project.author + " • " + project.time;
  document.getElementById("detailCategory").innerText = project.category;
  document.getElementById("detailSkills").innerText = project.skills;
  document.getElementById("detailOverview").innerText = project.overview;
  document.getElementById("detailTimeline").innerText = project.timeline;
  document.getElementById("detailTeam").innerText = project.team;
}

function joinProject(button) {
  button.innerHTML = "Project Accepted ✓";
  button.disabled = true;
  button.className = "btn small-btn joined";
}

/* profile functions */

function getProfileData() {
  let savedProfile = localStorage.getItem("profileData");

  if (savedProfile) {
    return JSON.parse(savedProfile);
  }

  return {
    name: "Hriday Agrawal",
    bio: "First year IDM student from Mumbai, interested in UX, 3D design, web development, and UI/UX.",
    about: "I am interested in user experience, 3D design, and game development. I am comfortable with multiple coding languages, game engines, Adobe tools, and 3D software.",
    skills: "UX Research, Blender, HTML, CSS, JavaScript, Arduino, Figma"
  };
}

function loadProfileData() {
  let nameArea = document.getElementById("profileName");

  if (!nameArea) {
    return;
  }

  let profile = getProfileData();

  document.getElementById("profileName").innerText = profile.name;
  document.getElementById("profileBio").innerText = profile.bio;

  let aboutArea = document.getElementById("profileAbout");

  if (aboutArea) {
    aboutArea.innerText = profile.about;
  }

  let skillsBox = document.getElementById("profileSkills");

  if (!skillsBox) {
    return;
  }

  skillsBox.innerHTML = "";

  let skillsArray = profile.skills.split(",");

  for (let i = 0; i < skillsArray.length; i++) {
    let span = document.createElement("span");
    span.className = "skill-tag";
    span.innerText = skillsArray[i].trim();
    skillsBox.appendChild(span);
  }
}

function openProfileForm() {
  let profile = getProfileData();

  document.getElementById("profileModal").classList.remove("hidden");
  document.getElementById("nameInput").value = profile.name;
  document.getElementById("bioInput").value = profile.bio;
  document.getElementById("aboutInput").value = profile.about;
  document.getElementById("skillsInput").value = profile.skills;
}

function closeProfileForm() {
  document.getElementById("profileModal").classList.add("hidden");
}

function saveProfile() {
  let profile = {
    name: document.getElementById("nameInput").value,
    bio: document.getElementById("bioInput").value,
    about: document.getElementById("aboutInput").value,
    skills: document.getElementById("skillsInput").value
  };

  localStorage.setItem("profileData", JSON.stringify(profile));

  loadProfileData();
  closeProfileForm();
}

/* page loading */

if   (document.getElementById("projectList")) {
  showProjects("All");
}

if (document.getElementById("detailTitle")) {
  loadProjectDetails();
}

if (document.getElementById("profileName")) {
  loadProfileData();
}


  