let mcInstalled = false;

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value;
}

function createMailchimpForm(buttonText) {
  const mcEmbedShell = document.createElement("div");
  mcEmbedShell.id = "mc_embed_shell";

  const mcEmbedSignup = document.createElement("div");
  mcEmbedSignup.id = "mc_embed_signup";

  const form = document.createElement("form");
  form.action =
    "https://fabricate.us10.list-manage.com/subscribe/post?u=792afb261df839e73b669f83f&amp;id=193b65f85f&amp;f_id=00fd56e4f0";
  form.method = "post";
  form.id = "mc-embedded-subscribe-form";
  form.name = "mc-embedded-subscribe-form";
  form.className = "validate";
  form.target = "_blank";

  const scrollDiv = document.createElement("div");
  scrollDiv.id = "mc_embed_signup_scroll";

  const responsesDiv = document.createElement("div");
  responsesDiv.id = "mce-responses";

  const errorResponse = document.createElement("div");
  errorResponse.className = "response";
  errorResponse.id = "mce-error-response";
  errorResponse.style.display = "none";

  const successResponse = document.createElement("div");
  successResponse.className = "response";
  successResponse.id = "mce-success-response";
  successResponse.style.display = "none";
  successResponse.innerHTML = "<strong>Thank you for subscribing!</strong>";

  responsesDiv.appendChild(errorResponse);
  responsesDiv.appendChild(successResponse);

  const fieldGroup = document.createElement("div");
  fieldGroup.className = "mc-field-group";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "EMAIL";
  emailInput.className = "required email";
  emailInput.id = "mce-EMAIL";
  emailInput.required = true;
  emailInput.placeholder = "Email";

  const sourceInput = document.createElement("input");
  sourceInput.type = "text";
  sourceInput.name = "SOURCE";
  sourceInput.className = "text";
  sourceInput.id = "mce-SOURCE";
  sourceInput.style.display = "none";
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
  submitButton.onclick = function () {
    if (document.getElementById("subscribeBar")) {
      document.getElementById("subscribeBar").style.display = "none";
    }
    if (document.getElementById("mce-success-response")) {
      document.getElementById("mce-success-response").style = "display: block";
    }
    setLocalStorage("subscribeBarClosed", "true");
  };

  scrollDiv.appendChild(responsesDiv);
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
  mailchimpWrapper.id = "mc_embed_shell";
  mailchimpWrapper.appendChild(createMailchimpForm());

  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.textContent = "×";
  closeButton.onclick = function () {
    document.body.removeChild(subscribeBar);
    setLocalStorage("subscribeBarClosed", "true"); // Save close state in localStorage
  };

  subscribeBar.appendChild(closeButton);
  subscribeBar.appendChild(subscribeText);
  subscribeBar.appendChild(mailchimpWrapper);
  document.body.appendChild(subscribeBar);
  installMc();
}

function installMc() {
  if (mcInstalled) {
    return;
  }

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";

  const inlineScript = document.createElement("script");
  inlineScript.type = "text/javascript";
  inlineScript.text = `
        (function($) {
            window.fnames = new Array();
            window.ftypes = new Array();
            fnames[0] = 'EMAIL';
            ftypes[0] = 'email';
            fnames[1] = 'SOURCE';
            ftypes[1] = 'text';
            fnames[3] = 'ADDRESS';
            ftypes[3] = 'address';
            fnames[4] = 'PHONE';
            ftypes[4] = 'phone';
        }(jQuery));
        var $mcj = jQuery.noConflict(true);
    `;

  document.body.appendChild(script);
  document.body.appendChild(inlineScript);
  mcInstalled = true;
}

// Call the function on page load - chain with existing onload (e.g. Glide slider init)
// #region agent log
const prevOnload = window.onload;
window.onload = function () {
  fetch('http://127.0.0.1:7280/ingest/394f9e45-54d9-4c83-93b0-ba26f4874d9c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e618f8'},body:JSON.stringify({sessionId:'e618f8',location:'subscribe.js:onload',message:'subscribe onload fired',data:{prevOnloadCalled:true},timestamp:Date.now(),hypothesisId:'A',runId:'post-fix'})}).catch(()=>{});
  // #endregion
  if (typeof prevOnload === 'function') prevOnload();
  setTimeout(appendSubscribeBar, 4000);
};
