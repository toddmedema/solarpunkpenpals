function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Dismissing the bar still works when browser storage is unavailable.
  }
}

function getLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function createMailchimpForm(buttonText) {
  const mcEmbedShell = document.createElement("div");
  mcEmbedShell.id = "mc_embed_shell";

  const mcEmbedSignup = document.createElement("div");
  mcEmbedSignup.id = "mc_embed_signup";

  const form = document.createElement("form");
  form.action =
    "https://fabricate.us10.list-manage.com/subscribe/post?u=792afb261df839e73b669f83f&id=193b65f85f&f_id=00fd56e4f0";
  form.method = "post";
  form.id = "mc-embedded-subscribe-form";
  form.name = "mc-embedded-subscribe-form";
  form.className = "validate";
  form.target = "_blank";
  form.rel = "noopener noreferrer";
  form.setAttribute("aria-label", "Anthology launch newsletter");

  const scrollDiv = document.createElement("div");
  scrollDiv.id = "mc_embed_signup_scroll";

  const fieldGroup = document.createElement("div");
  fieldGroup.className = "mc-field-group";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "EMAIL";
  emailInput.className = "required email";
  emailInput.id = "mce-EMAIL";
  emailInput.required = true;
  emailInput.placeholder = "Email";
  emailInput.autocomplete = "email";
  emailInput.setAttribute("aria-label", "Email address");

  const sourceInput = document.createElement("input");
  sourceInput.type = "hidden";
  sourceInput.name = "SOURCE";
  sourceInput.className = "text";
  sourceInput.id = "mce-SOURCE";
  sourceInput.setAttribute("value", window.location.pathname);

  fieldGroup.appendChild(emailInput);
  fieldGroup.appendChild(sourceInput);

  const hiddenDiv = document.createElement("div");
  hiddenDiv.setAttribute("aria-hidden", "true");
  hiddenDiv.style.position = "absolute";
  hiddenDiv.style.left = "-5000px";

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "text";
  hiddenInput.name = "b_792afb261df839e73b669f83f_193b65f85f";
  hiddenInput.tabIndex = "-1";

  hiddenDiv.appendChild(hiddenInput);

  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.name = "subscribe";
  submitButton.id = "mc-embedded-subscribe";
  submitButton.className = "button";
  submitButton.value = buttonText || "Notify me";

  fieldGroup.appendChild(submitButton);
  scrollDiv.appendChild(fieldGroup);
  scrollDiv.appendChild(hiddenDiv);

  form.appendChild(scrollDiv);
  mcEmbedSignup.appendChild(form);
  mcEmbedShell.appendChild(mcEmbedSignup);

  return mcEmbedShell;
}

function appendSubscribeBar() {
  if (getLocalStorage("subscribeBarClosed") === "true") {
    return;
  }

  const subscribeBar = document.createElement("div");
  subscribeBar.id = "subscribeBar";
  const subscribeText = document.createElement("span");
  subscribeText.textContent = "We're launching an anthology!";

  const mailchimpWrapper = document.createElement("div");
  mailchimpWrapper.className = "mailchimp-wrapper";
  mailchimpWrapper.appendChild(createMailchimpForm());

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "close-button";
  closeButton.setAttribute("aria-label", "Dismiss newsletter signup");
  closeButton.textContent = "×";
  closeButton.onclick = function () {
    document.body.removeChild(subscribeBar);
    setLocalStorage("subscribeBarClosed", "true"); // Save close state in localStorage
  };

  subscribeBar.appendChild(closeButton);
  subscribeBar.appendChild(subscribeText);
  subscribeBar.appendChild(mailchimpWrapper);
  document.body.appendChild(subscribeBar);
}

// Schedule independently so a carousel failure cannot prevent newsletter signup.
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(appendSubscribeBar, 4000);
});
