const textInput = document.getElementById('text-input');
const toneSelect = document.getElementById('tone-select');
const rewriteButton = document.getElementById('rewrite-btn');
const output = document.getElementById('output');

const API_URL = 'https://YOUR-BACKEND-NAME.onrender.com';

async function rewriteWithAI(text) {
  try {
    const response = await fetch(
      `${API_URL}/api/rewrite`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text
        })
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: 'Unable to connect to Clarity AI server'
    };
  }
}

rewriteButton.addEventListener('click', async () => {
  const text = textInput.value.trim();

  if (!text) {
    output.textContent = 'Please enter some text to improve.';
    output.classList.remove('empty');
    return;
  }

  rewriteButton.disabled = true;
  rewriteButton.textContent = 'Improving...';
  output.textContent = 'Connecting to backend...';
  output.classList.remove('empty');

  const result = await rewriteWithAI(text);

  if (result.success) {
    output.textContent = result.rewritten || result.original || 'No rewrite returned.';
  } else {
    output.textContent = result.error || 'Unable to improve text.';
  }

  rewriteButton.disabled = false;
  rewriteButton.textContent = 'Improve text';
});
