document.getElementById('askButton').addEventListener('click', async function() {
    const question = document.getElementById('questionInput').value;
  
    // Check if the input field is empty
    if (!question.trim()) {
      alert('Please enter a question');
      return;
    }
  
    // Show a loading indicator while waiting for the response
    document.getElementById('response').innerText = 'Thinking...';
  
    try {
      // Sending the question to the backend (replace with your backend URL)
      const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
      });
  
      // Handling the response from the backend
      const data = await response.json();
  
      if (data.answer) {
        // Displaying the answer in the 'response' div
        document.getElementById('response').innerHTML = `<strong>Answer:</strong> ${data.answer}`;
      } else {
        document.getElementById('response').innerText = 'No response from bot.';
      }
    } catch (error) {
      // Handling errors
      console.error('Error:', error);
      document.getElementById('response').innerText = 'Something went wrong, please try again.';
    }
  });
  