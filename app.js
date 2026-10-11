const button = document.getElementById("guideBtn");
button.addEventListener("click", async () => {
  const need = document.getElementById("need").value.trim();
  const error = document.getElementById("error");
  const result = document.getElementById("result");
  error.textContent = "";
  if (!need) {
    error.textContent = "Please describe what you need so we can show a starting point.";
    return;
  }
  button.disabled = true;
  button.textContent = "Preparing your guide…";
  try {
    const response = await fetch("/api/guide", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({need})
    });
    if (!response.ok) throw new Error("Unable to load the guide.");
    const data = await response.json();
    document.getElementById("serviceTitle").textContent = data.title;
    document.getElementById("summary").textContent = data.summary;
    document.getElementById("nextStep").textContent = data.next;
    document.getElementById("notice").textContent = data.notice;
    const list = document.getElementById("checklist");
    list.replaceChildren();
    data.checklist.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    result.classList.remove("hidden");
    result.scrollIntoView({behavior: "smooth", block: "start"});
  } catch (e) {
    error.textContent = "Something went wrong. Please try again.";
  } finally {
    button.disabled = false;
    button.innerHTML = 'Guide me <span>→</span>';
  }
});
