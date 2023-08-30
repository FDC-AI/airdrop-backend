async function transfer() {
  const destAddress = document.getElementById('destAddr').value;
  const output = window.document.querySelector('#serverRES');

  const bodyContent = JSON.stringify({
    dest: destAddress,
  });

  const response = await fetch('/jetton/transfer', {
    method: 'POST',
    body: bodyContent,
  });
  const data = await response.text();
  output.innerText = data;
  return;
}
