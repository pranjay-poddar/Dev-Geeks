import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default function Editor(props) {
    const {
        language,
        displayName,
        value,
        onChange
    } = props
    const [open, setOpen] = useState(true)

    function handleChange(editor, data, value) {
        onChange(value)
    }

  return (
    <div className={`editor-container${open ? '' : 'collapsed'}`}>
        <div className='editor-name'>
         
            {displayName}
            <button
            type='button'
            className='expand-collapse-btn'
                onClick={() => setOpen(prevOpen => !prevOpen)}
            >
                <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
            </button>
        </div>
        <ControlledEditor 
            onBeforeChange={handleChange}
            value={value}
            className="editor-wrapper"
            options={{
                lineWrapping: true,
                lint: true,
                mode: language,
                theme: 'material-darker',
                lineNumbers: true
            }}
        />
    </div>
  )
}
