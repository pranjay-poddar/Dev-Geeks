import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import List from "@editorjs/list";
import Embed from "@editorjs/embed"


const editor = new EditorJS({
    holder: "editorjs",

    tools: {
        header: {
            class: Header,
            inlineToolbar: ["link"]
        },
        list: {
            class: List,
            inlineToolbar: [
                'link',
                'bold'
            ]
        },
        embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
                services: {
                    youtube: true
                }
            },
        },
    }
});

let saveBtn = document.querySelector("button");

saveBtn.addEventListener("click", function() {
    editor.save().then((res) => {
        console.log("Article data: ", res);
    }).catch((error) => {
        console.log("Savig failed: ", error);
    });
});