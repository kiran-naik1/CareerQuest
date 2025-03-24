const BASE_URL = "https://careerquest-backend-1.onrender.com"; // Your deployed backend URL

async function getRecommendation() {
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value;
  const interests = document.getElementById("interests").value;

  const careerResult = document.getElementById("career-result");
  careerResult.innerHTML = "Loading...";

  try {
    const response = await fetch(`${BASE_URL}/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ education, skills, interests }),
    });

    const data = await response.json();

    if (data.recommended_career) {
      careerResult.innerHTML = `<strong>Suggested Career:</strong> ${data.recommended_career}`;

      // Clear previous results
      document.getElementById("jobs-result").innerHTML = "";
      document.getElementById("courses-result").innerHTML = "";

      // Fetch jobs and courses
      fetchJobs(data.recommended_career);
      fetchCourses(data.recommended_career);
    } else {
      careerResult.innerHTML = "Failed to get a recommendation.";
    }
  } catch (error) {
    console.error("Error:", error);
    careerResult.innerHTML = "Error connecting to server.";
  }
}

async function fetchJobs(career) {
  const jobsResult = document.getElementById("jobs-result");
  jobsResult.innerHTML = "Fetching jobs...";

  try {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ career }),
    });

    const data = await response.json();

    if (data.jobs && data.jobs.length > 0) {
      let jobList = '<div class="job-list">';
      data.jobs.forEach((job) => {
        jobList += `
          <div class="job-card">
            <a href="${job.link}" target="_blank">
              <h3>${job.title}</h3>
              <p>${job.company}</p>
            </a>
          </div>`;
      });
      jobList += "</div>";

      jobsResult.innerHTML = jobList;

      // Force CSS repaint to ensure styles apply
      document.body.offsetHeight;
    } else {
      jobsResult.innerHTML = "No jobs found.";
    }
  } catch (error) {
    console.error("Error:", error);
    jobsResult.innerHTML = "Error fetching jobs.";
  }
}

async function fetchCourses(career) {
  const coursesResult = document.getElementById("courses-result");
  coursesResult.innerHTML = "Fetching courses...";

  try {
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ career }),
    });

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      let courseList = '<div class="course-list">';
      data.items.forEach((course) => {
        courseList += `
          <div class="course-card">
            <a href="${course.link}" target="_blank">
              <h3>${course.title}</h3>
            </a>
          </div>`;
      });
      courseList += "</div>";

      coursesResult.innerHTML = courseList;

      // Force CSS repaint to ensure styles apply
      document.body.offsetHeight;
    } else {
      coursesResult.innerHTML = "No courses found.";
    }
  } catch (error) {
    console.error("Error:", error);
    coursesResult.innerHTML = "Error fetching courses.";
  }
}
