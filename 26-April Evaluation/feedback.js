
const form = document.getElementById('feedback-form');
const input = document.getElementById('feedback-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  try {
    await db.collection('feedbacks').add({
      text: text,
      createdAt: new Date()
    });
    alert('Feedback submitted successfully!');
    input.value = '';
  } catch (error) {
    console.error('Error submitting feedback:', error);
  }
});
