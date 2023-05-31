import React from 'react'
import { Button } from '@material-ui/core'
import { jsPDF } from 'jspdf'
import domtoimage from 'dom-to-image';


import './PdfGenerator.css'

function PdfGenerator({
     text, color, font, size, lineHeight
}) {


    var content = text
    const generate = () => {
        const doc = new jsPDF();
        var splitText = doc.splitTextToSize(content, 160)
        doc.addFont(font)
        doc.setFont(font)
        doc.setTextColor(color)
        doc.setFontSize(Number(size))
        doc.setLineHeightFactor(lineHeight/25)
        doc.text(20, 20, splitText)
        doc.save("h.pdf");
   }

   const generateJpeg = () => {
        domtoimage.toJpeg(document.getElementById('my-node'), { quality: 1 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
   }

    return (
        <div className="pdf">
            <Button onClick={generate} color="primary" variant="contained">Generate PDF </Button>
        </div>
    )
}

export default PdfGenerator
