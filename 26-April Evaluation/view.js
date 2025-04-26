const feedbackList = document.getElementById("feedback-list");

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
