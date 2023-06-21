import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className='header'>
        <div className='logo'>
        
        <img src='./codepenlogo.png' width={35}  /> 
        </div>
        <div className='details'>
          <h1 className='proj-name'>Untitled-1 </h1>
          
        </div>
        
       
      </div>
      <div className='top-pane'>
        <Editor 
          language="xml" 
          displayName="HTML" 
          value={html} 
          onChange={setHtml} 
        />
        <Editor 
          language="css" 
          displayName="CSS" 
          value={css} 
          onChange={setCss}
        />
        <Editor 
          language="javascript" 
          displayName="JS" 
          value={js} 
          onChange={setJs} 
        />
      </div>
      <div className='pane'>
        <iframe
          srcDoc={srcDoc}
          title='output'
          sandbox='allow-scripts'
          frameBorder="0"
          width="100%"
          height="100%"
          />
      </div>
    </>
  )
}

export default App;
