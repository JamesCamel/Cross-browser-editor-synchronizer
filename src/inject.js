let cm = document.querySelector('.CodeMirror');
let gistEditor = cm.CodeMirror;
let div = document.createElement('div');
div.setAttribute("id", "mirror-change-detector");
div.style.display = 'none';
document.body.appendChild(div);

gistEditor.on("update", async () => {
    div.textContent = await gistEditor.getValue();
});

div.addEventListener("DOMSubtreeModified", async () => {
    await gistEditor.setValue(div.textContent);
});


