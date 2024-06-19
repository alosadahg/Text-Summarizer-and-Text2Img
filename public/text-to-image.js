const textArea = document.getElementById("prompt");
const submitButton = document.getElementById("submit-button");
const generatedImageArea = document.getElementById("generated-image");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const textArea = e.target;

  var text = textArea.value;
  if(text.length > 2 && text.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  submitButton.classList.add("submit-button--loading");

  const prompt = textArea.value; 

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "prompt": prompt
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("/generate-image", requestOptions)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const imageBlob = new Blob([buffer]);
      const imageUrl = URL.createObjectURL(imageBlob);
      generatedImageArea.src = imageUrl;
        submitButton.classList.remove("submit-button--loading");
    })
    .catch((error) => {
      console.error(error);
    });
}