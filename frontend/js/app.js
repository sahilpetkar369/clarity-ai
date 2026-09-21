const textInput = document.getElementById('text-input');
const toneSelect = document.getElementById('tone-select');
const rewriteButton = document.getElementById('rewrite-btn');
const output = document.getElementById('output');

async function rewriteWithAI(text) {
  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/rewrite',
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

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: 'Unable to connect to backend'
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
