const input = document.getElementById("input");
const name = document.getElementById("name");
const content = document.getElementById("content");

input.addEventListener("change", () => {
    const reader = new FileReader();
    const file = input.files[0];

    reader.onload = () => {
        name.innerHTML = file.name;

        if (file.type === "application/pdf") {
            // If it's a PDF file, display it as an embedded PDF using PDFObject library.
            const pdfObject = '<embed src="' + reader.result + '#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="600px" />';
            content.innerHTML = pdfObject;
        } else if (file.type === "text/plain") {
            // If it's a text file (txt), display the content as plain text.
            content.innerHTML = reader.result;
        } else if (file.type.startsWith("image/")) {
            // If it's an image, display the image.
            const img = new Image();
            img.src = reader.result;
            content.innerHTML = ""; // Clear previous content (if any).
            content.appendChild(img);
        } else {
            // Unsupported file type. Show a message.
            content.innerHTML = "Unsupported file type!";
        }
    };

    if (file) {
        if (file.type === "text/plain") {
            reader.readAsText(file);
        } else {
            reader.readAsDataURL(file);
        }
    }
});