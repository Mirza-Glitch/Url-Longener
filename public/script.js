const urlInput = document.querySelector(".form-group input");
const myForm = document.querySelector("form");
const msgDiv = document.querySelector(".longLink");
const msgSuccess = document.querySelector(".longLink #success");
const anchor = document.querySelector(".longLink #success a");
const msgErr = document.querySelector(".longLink #err");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  msgDiv.style.display = "none";
  msgSuccess.style.display = "none";
  msgErr.style.display = "none";
  let inpVal = urlInput.value;
  fetch("/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: inpVal,
    }),
  })
    .then((r) => r.json())
    .then((url) => {
      if (!url.success) {
        msgDiv.style.display = "block";
        msgErr.style.display = "block";
        return;
      }
      msgDiv.style.display = "block";
      msgSuccess.style.display = "block";
      anchor.href = url.extendedUrl;
      anchor.innerText = url.extendedUrl;
    });
});
  