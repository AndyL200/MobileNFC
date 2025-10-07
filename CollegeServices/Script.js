// Fetch metadata for service
async function fetchMetadata(serviceName) {
  let filename = "";
  switch (serviceName) {
    case "Cafeteria": filename = "Cafeteria_metadata.json"; break;
    case "Dorms": filename = "Dorms_metadata.json"; break;
    case "Library": filename = "Library_metadata.json"; break;
  }
  try {
    const response = await fetch(filename);
    return await response.json();
  } catch {
    return null;
  }
}

// Read TNumber from file
async function readTNumber() {
  try {
    const response = await fetch("Tnumber.txt");
    const text = await response.text();
    return text.trim();
  } catch (err) {
    console.error("Failed to load Tnumber.txt", err);
    return null;
  }
}

// Render form after checking TNumber
async function renderForm(serviceName) {
  const tNumber = await readTNumber();
  const container = document.getElementById("formContainer");
  const metadata = await fetchMetadata(serviceName);

  if (!tNumber || !metadata || !metadata[tNumber]) {
    container.innerHTML = `
      <h2>${serviceName} Access Request</h2>
      <p>❌ TNumber not found or not authorized for ${serviceName}.</p>
    `;
    return;
  }

  container.innerHTML = `
    <h2>${serviceName} Access Request</h2>
    <p>TNumber: <strong>${tNumber}</strong></p>
    <input type="text" id="location" placeholder="Enter location/building/section" />
    <button id="submitBtn">Submit</button>
    <div id="resultMessage"></div>
  `;

  document.getElementById("submitBtn").addEventListener("click", () => handleSubmit(serviceName, tNumber, metadata));
}

// Handle form submission
function handleSubmit(serviceName, tNumber, metadata) {
  const location = document.getElementById("location").value.trim();
  const resultDiv = document.getElementById("resultMessage");

  if (!location) {
    resultDiv.textContent = "⚠️ Enter a location.";
    resultDiv.style.color = "orange";
    return;
  }

  const userData = metadata[tNumber];

  if (!userData.Access.includes(location)) {
    resultDiv.textContent = `❌ Access denied for "${location}".`;
    resultDiv.style.color = "red";
    return;
  }

  let msg = `✅ Access granted for ${serviceName}!\nID: ${tNumber}\nLocation: ${location}`;
  if (serviceName === "Cafeteria") msg += `\nBalance: $${userData.Balance || "N/A"}`;
  resultDiv.textContent = msg;
  resultDiv.style.color = "green";
}

// Attach buttons
document.getElementById("cafeteriaBtn").addEventListener("click", () => renderForm("Cafeteria"));
document.getElementById("dormsBtn").addEventListener("click", () => renderForm("Dorms"));
document.getElementById("libraryBtn").addEventListener("click", () => renderForm("Library"));
