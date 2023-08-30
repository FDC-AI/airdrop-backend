async function transfer() {
  const destAddress = document.getElementById('destAddr').value;
  const output = window.document.querySelector('#serverRES');

  const bodyContent = JSON.stringify({
    dest: destAddress,
  });

  try {
    const response = await fetch('/jetton/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyContent,
    });
    const data = await response.text();
    output.innerText = data;
  } catch (error) {
    output.innerText = 'error';
  }

  return;
}
