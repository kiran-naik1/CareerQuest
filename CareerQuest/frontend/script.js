async function getRecommendation() {
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value;
  const interests = document.getElementById("interests").value;

  if (!education || !skills || !interests) {
    document.getElementById("career-result").innerHTML =
      "⚠️ Please fill all fields!";
    return;
  }

  document.getElementById("career-result").innerHTML =
    "⏳ Getting recommendation...";

  const response = await fetch("http://127.0.0.1:5000/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ education, skills, interests }),
  });

  const data = await response.json();

  if (response.ok) {
    document.getElementById(
      "career-result"
    ).innerHTML = `✅ Recommended Career: <strong>${data.recommended_career}</strong>`;
    getJobs(data.recommended_career);
    getCourses(data.recommended_career);
  } else {
    document.getElementById("career-result").innerHTML =
      "❌ No recommendation found.";
  }
}

async function getJobs(career) {
  document.getElementById("jobs-result").innerHTML = "⏳ Searching jobs...";

  const response = await fetch("http://127.0.0.1:5000/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ career }),
  });

  const data = await response.json();

  if (response.ok && data.jobs) {
    let jobListings = "<div class='job-list'>";

    data.jobs.forEach((job) => {
      jobListings += `
              <div class="job-card">
                  <h3>${job.title}</h3>
                  <p><strong>Company:</strong> ${job.company}</p>
                  <p><strong>Location:</strong> ${job.location}</p>
                  <a href="${job.link}" target="_blank">🔗 Apply Here</a>
              </div>
          `;
    });

    jobListings += "</div>";
    document.getElementById("jobs-result").innerHTML = jobListings;
  } else {
    document.getElementById("jobs-result").innerHTML = "❌ No jobs found.";
  }
}

async function getCourses(career) {
  document.getElementById("courses-result").innerHTML =
    "⏳ Searching courses...";

  const response = await fetch("http://127.0.0.1:5000/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ career }),
  });

  const data = await response.json();

  if (response.ok && data.items) {
    let courseListings = "<div class='course-list'>";

    data.items.forEach((course) => {
      let source = new URL(course.link).hostname.replace("www.", "");
      let description = course.snippet
        ? course.snippet
        : "No description available.";

      courseListings += `
              <div class="course-card">
                  <h3>${course.title}</h3>
                  <p><strong>Source:</strong> ${source}</p>
                  <p>${description}</p>
                  <a href="${course.link}" target="_blank">📖 View Course</a>
              </div>
          `;
    });

    courseListings += "</div>";
    document.getElementById("courses-result").innerHTML = courseListings;
  } else {
    document.getElementById("courses-result").innerHTML =
      "❌ No courses found.";
  }
}
