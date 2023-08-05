/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/theme/dracula.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/mode/javascript/javascript'

const editor = () => {
    useEffect(() => {
        async function init() {
            Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
                mode: { name: 'javascript', json: true,},
                theme:'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });
        }
        init();
    }, []);
    return <textarea id="realtimeEditor"></textarea>
}

export default editor;
