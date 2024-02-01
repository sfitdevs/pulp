let settingsBtn = document.getElementById("settingsBtn");
let fileUpload = document.getElementById("file-upload");
let langShow = document.getElementById("lang-show");
let selectLang = document.getElementById("mode");
let createBtn = document.getElementById("create");
let descriptionElement = document.getElementById("description");
let editor = ace.edit("editor");
// editor settings
editor.focus();
editor.getSession().setUseWorker(false);
editor.setTheme("ace/theme/xcode");
editor.getSession().setMode("ace/mode/text");
editor.setShowPrintMargin(false);
editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});
editor.getSession().on("change", function () {
  let content = editor.getValue() || "";
  (!content.trim()) ? createBtn.disabled = true : createBtn.disabled = false
})
// when selection is changed
selectLang.addEventListener("change", (e) => {
  editor.session.setMode(`ace/mode/${selectLang.value}`);
});
// file upload functions
let setEditorValue = (file) => {
  if (!file) return;
  let reader = new FileReader();
  reader.onload = function (e) { editor.setValue(e.target.result); };
  reader.readAsText(file);
}
let fileChanged = (e) => {
  let file = e.target.files[0];
  setEditorValue(file);
}
// drag and drop
document.body.ondragover = (event) => { event.preventDefault(); };
document.body.ondrop = (event) => {
  event.preventDefault();
  if (event.dataTransfer.items && event.dataTransfer.items[0].kind === "file") {
    setEditorValue(event.dataTransfer.items[0].getAsFile());
  } else {
    setEditorValue(event.dataTransfer.files[0]);
  }
};
// create pulp
const createPulp = async () => {
  let content = editor.getValue();
  if (!content || !content.trim()) return
  let language = selectLang.options[selectLang.selectedIndex].getAttribute('ext');
  let description = descriptionElement.value;
  let response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ content, language, description }),
    headers: { "Content-Type": "application/json" }
  });
  let { key, accessKey } = await response.json();
  await navigator.clipboard.writeText(`https://pulp.deta.dev/${key}`);
  localStorage.setItem(key, accessKey);
  location = `http://pulp.deta.dev/${key}`;
}
// event listeners
fileUpload.addEventListener('change', fileChanged, false);
createBtn.addEventListener('click', createPulp);
