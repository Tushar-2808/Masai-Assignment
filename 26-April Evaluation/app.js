const form = document.getElementById("feedback-form");
const input = document.getElementById("feedback-input");
const feedbackList = document.getElementById("feedback-list");
const themeToggle = document.getElementById("theme-toggle");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  try {
    await db.collection("feedbacks").add({
      text: text,
      createdAt: new Date(),
    });
    input.value = "";
  } catch (error) {
    console.error("Error adding feedback:", error);
  }
});

db.collection("feedbacks")
  .orderBy("createdAt", "desc")
  .onSnapshot((snapshot) => {
    feedbackList.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "feedback-item";
      div.innerHTML = `
        <p>${data.text}</p>
        <small>${data.createdAt.toDate().toLocaleString()}</small>
      `;
      feedbackList.appendChild(div);
    });
  });

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});
