import React, {useState} from 'react'
import { SketchPicker, CirclePicker } from 'react-color'
import domtoimage from 'dom-to-image';
import Fade from '@material-ui/core/Fade';
import { Paper, Button, MenuItem, Select, FormControl, InputLabel, Slider, FormControlLabel, Switch, Tooltip } from '@material-ui/core'

import './FontConverter.css'
import './fonts.css'

import Usage from '../Usage/Usage';


function FontConverter() {

    const [text, setText] = useState("A hero can be anyone. Even a man doing something as simple and reassuring as putting a coat around a young boy's shoulders to let him know that the world hadn't ended. This is a sample text. Enter your text here to convert to handwritten font.")
    const [fontFamily, setFontFamily] = useState("'Beth Ellen', cursive")
    const [fontSize, setFontSize] = useState(17)
    const [color, setColor] = useState('blue')
    const [pageColor, setPageColor] = useState('white')
    const [letterSpacing, setLetterSpacing] = useState(1)
    const [wordSpacing, setWordSpacing] = useState(1)
    const [lineHeight, setLineHeight] = useState(30)
    const [fontWeight, setFontWeight] = useState(300)
    const [line, setLine] = useState(false)
    const [shadow, setShadow] = useState(false)
    const [margin, setMargin] = useState(false)
    const [marginTop, setMarginTop] = useState(false)

    const [showColorPicker1, setShowColorPicker1] = useState(false)
    const [showColorPicker2, setShowColorPicker2] = useState(false)

    const colorList = ['#ffffff', '#f2f2f2', '#e6e6e6', '#d9d9d9', '#cccccc', '#bfbfbf', '#ffffe6', ' #ffffcc', '#ffffb3', '#ffff99', '#e6ffff', '#e6ffe6']


    const handleLineHeight = (event, newValue) => {
        setLineHeight(newValue);
    };

    const handleFontWeight = (event, newValue) => {
        setFontWeight(newValue);
    };

    const handlePageLines = (event) => {
        setLine(!line);
      };

    const handleShadow = (event) => {
    setShadow(!shadow);
    };

    const handleMargin = (event) => {
        setMargin(!margin);
    };

    const handleMarginTop = (event) => {
        setMarginTop(!marginTop);
    };

    const generateJpeg = () => {
        domtoimage.toJpeg(document.getElementById('page'), { quality: 1 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'download.jpeg';
            link.href = dataUrl;
            link.click();
        });
   }

    return (
        <div className="fontConverter">
            <div className="fontStyler">
                <div className="input_container">
                    <Paper elevation={15} className="paper_input" >
                        <textarea onChange={e => setText(e.target.value)} 
                            className="inputTextField" cols='36' rows='19'>
                            {text}
                        </textarea>
                    </Paper>
                    <div className="usageButton">
                        <Usage />
                    </div>
                </div>
                <div className="font_selector">
                {/* <h2>Select Styles</h2> */}
                <div className="gridOne">
                    <div className="fontFamily" style={{marginBottom: "1.5rem"}}>
                            <FormControl style={{minWidth: 150}}>
                            <InputLabel id="font-label">Fonts</InputLabel>
                            <Select
                                    labelId="font-label"
                                    onChange={e => setFontFamily(e.target.value)}
                                    >
                                    <MenuItem style={{fontFamily: "'Architects Daughter', cursive"}} value={"'Architects Daughter', cursive"}>Architects Daughter</MenuItem>
                                    <MenuItem style={{fontFamily: "'Bad Script', cursive"}} value={"'Bad Script', cursive"}>Bad Script</MenuItem>
                                    <MenuItem style={{fontFamily: "'Beth Ellen', cursive"}} value={"'Beth Ellen', cursive"}>Beth Ellen</MenuItem>
                                    <MenuItem style={{fontFamily: "'Bilbo', cursive"}} value={"'Bilbo', cursive"}>Bilbo</MenuItem>
                                    <MenuItem style={{fontFamily: "'Calligraffitti', cursive"}} value={"'Calligraffitti', cursive"}>Calligraffitti</MenuItem>
                                    <MenuItem style={{fontFamily: "'Caveat', cursive"}} value={"'Caveat', cursive"}>Caveat</MenuItem>
                                    <MenuItem style={{fontFamily: "'Charmonman', cursive"}} value={"'Charmonman', cursive"}>Charmonman</MenuItem>
                                    <MenuItem style={{fontFamily: "'Dancing Script', cursive"}} value={"'Dancing Script', cursive"}>Dancing Script</MenuItem>
                                    <MenuItem style={{fontFamily: "'Dawning of a New Day', cursive"}} value={"'Dawning of a New Day', cursive"}>Dawning of a New Day</MenuItem>
                                    <MenuItem style={{fontFamily: "'Euphoria Script', cursive"}} value={"'Euphoria Script', cursive"}>Euphoria Script</MenuItem>
                                    <MenuItem style={{fontFamily: "'Homemade Apple', cursive"}} value={"'Homemade Apple', cursive"}>Homemade Apple</MenuItem>
                                    <MenuItem style={{fontFamily: "'Indie Flower', cursive"}} value={"'Indie Flower', cursive"}>Indie Flower</MenuItem>
                                    <MenuItem style={{fontFamily: "'Just Me Again Down Here', cursive"}} value={"'Just Me Again Down Here', cursive"}>Just Me Again Down Here</MenuItem>
                                    <MenuItem style={{fontFamily: "'Kristi', cursive"}} value={"'Kristi', cursive"}>Kristi</MenuItem>
                                    <MenuItem style={{fontFamily: "'Liu Jian Mao Cao', cursive"}} value={"'Liu Jian Mao Cao', cursive"}>Liu Jian Mao Cao</MenuItem>
                                    <MenuItem style={{fontFamily: "'Loved by the King', cursive"}} value={"'Loved by the King', cursive"}>Loved by the King</MenuItem>
                                    <MenuItem style={{fontFamily: "'Lovers Quarrel', cursive"}} value={"'Lovers Quarrel', cursive"}>Lovers Quarrel</MenuItem>
                                    <MenuItem style={{fontFamily: "'Marck Script', cursive"}} value={"'Marck Script', cursive"}>Marck Script</MenuItem>
                                    <MenuItem style={{fontFamily: "'Mr Dafoe', cursive"}} value={"'Mr Dafoe', cursive"}>Mr Dafoe</MenuItem>
                                    <MenuItem style={{fontFamily: "'Mr De Haviland', cursive"}} value={"'Mr De Haviland', cursive"}>Mr De Haviland</MenuItem>
                                    <MenuItem style={{fontFamily: "'Mrs Saint Delafield', cursive"}} value={"'Mrs Saint Delafield', cursive"}>Mrs Saint Delafield</MenuItem>
                                    <MenuItem style={{fontFamily: "'Nanum Brush Script', cursive"}} value={"'Nanum Brush Script', cursive"}>Nanum Brush Script</MenuItem>
                                    <MenuItem style={{fontFamily: "'Over the Rainbow', cursive"}} value={"'Over the Rainbow', cursive"}>Over the Rainbow</MenuItem>
                                    <MenuItem style={{fontFamily: "'Parisienne', cursive"}} value={"'Parisienne', cursive"}>Parisienne</MenuItem>
                                    <MenuItem style={{fontFamily: "'Qwigley', cursive"}} value={"'Qwigley', cursive"}>Qwigley</MenuItem>
                                    <MenuItem style={{fontFamily: "'Rancho', cursive"}} value={"'Rancho', cursive"}>Rancho</MenuItem>
                                    <MenuItem style={{fontFamily: "'ArchiReenie Beanietects', cursive"}} value={"'ArchiReenie Beanietects', cursive"}>Reenie Beanie</MenuItem>
                                    <MenuItem style={{fontFamily: "'Ruthie', cursive"}} value={"'Ruthie', cursive"}>Ruthie</MenuItem>
                                    <MenuItem style={{fontFamily: "'Sacramento', cursive"}} value={"'Sacramento', cursive"}>Sacramento</MenuItem>
                                    <MenuItem style={{fontFamily: "'Shadows Into Light', cursive"}} value={"'Shadows Into Light', cursive"}>Shadows Into Light</MenuItem>
                                    <MenuItem style={{fontFamily: "'Shadows Into Light Two', cursive"}} value={"'Shadows Into Light Two', cursive"}>Shadows Into Light Two</MenuItem>
                                    <MenuItem style={{fontFamily: "'Vibur', cursive"}} value={"'Vibur', cursive"}>Vibur</MenuItem>
                                    <MenuItem style={{fontFamily: "'Waiting for the Sunrise', cursive"}} value={"'Waiting for the Sunrise', cursive"}>Waiting for the Sunrise</MenuItem>
                                    <MenuItem style={{fontFamily: "'Yellowtail', cursive"}} value={"'Yellowtail', cursive"}>Yellowtail</MenuItem>
                                </Select> 
                                </FormControl>
                        </div>
                        <div className="fontSize" style={{marginBottom: "1.5rem"}}>
                            <FormControl style={{minWidth: 150}}>
                                <InputLabel id="fontSize-label" >Font Size</InputLabel>
                                <Select
                                value={fontSize}
                                labelId="fontSize-label"
                                onChange={e => setFontSize(e.target.value)}
                                >
                                <MenuItem value={14}>14</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                                <MenuItem value={17}>17</MenuItem>
                                <MenuItem value={18}>18</MenuItem>
                                <MenuItem value={19}>19</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={21}>21</MenuItem>
                                <MenuItem value={22}>22</MenuItem>
                                <MenuItem value={23}>23</MenuItem>
                                <MenuItem value={24}>24</MenuItem>
                                </Select>
                            </FormControl>
                            </div>

                            <div className="fontWeight" style={{marginBottom: "1.5rem"}}>
                                <InputLabel id="fontWeight">Font Weight</InputLabel>
                                <Slider style={{width: 150}}
                                    defaultValue={200}
                                    value={fontWeight}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    onChange={handleFontWeight}
                                    step={100}
                                    min={100}
                                    max={900}
                                />
                            </div>

                            <div className="letterSpacing" style={{marginBottom: "1.5rem"}}>
                                <FormControl style={{minWidth: 150}}>
                                    <InputLabel id="letterSpacing-label">Letter Spacing</InputLabel>
                                    <Select
                                    value={letterSpacing}
                                    labelId="letterSpacing-label"
                                    onChange={e => setLetterSpacing(e.target.value)}
                                    >
                                    <MenuItem value={-2}>-2</MenuItem>
                                    <MenuItem value={-1.5}>-1.5</MenuItem>
                                    <MenuItem value={-1}>-1</MenuItem>
                                    <MenuItem value={-0.5}>-0.5</MenuItem>
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={0.5}>0.5</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={1.5}>1.5</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="wordSpacing" style={{marginBottom: "1.5rem"}}>
                                <FormControl style={{minWidth: 150}}>
                                    <InputLabel id="wordSpacing-label">Word Spacing</InputLabel>
                                    <Select
                                    value={wordSpacing}
                                    labelId="wordSpacing-label"
                                    onChange={e => setWordSpacing(e.target.value)}
                                    >
                                    <MenuItem value={-4}>-4</MenuItem>
                                    <MenuItem value={-3}>-3</MenuItem>
                                    <MenuItem value={-2}>-2</MenuItem>
                                    <MenuItem value={-1}>-1</MenuItem>
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={0.5}>0.5</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>6</MenuItem>
                                    <MenuItem value={6}>8</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>


                        </div>

                        <div className="gridTwo">
                            <div className="colorButton">
                                <Button style={{backgroundColor: `${color}`}} onClick={() => setShowColorPicker1(showColorPicker => !showColorPicker)} variant="contained" color="primary">
                                    {showColorPicker1 ? 'Close ' : 'Font Color'}
                                </Button>
                            </div>
                            <div className="colorPicker">
                                {
                                    showColorPicker1 && (
                                        <SketchPicker 
                                            color={color}
                                            onChange={targetColor => setColor(targetColor.hex)}
                                        />
                                    )
                                }
                            </div>

                            <div className="colorButton">
                                <Button style={{backgroundColor: `${pageColor}`, color: 'black'}} onClick={() => setShowColorPicker2(showColorPicker => !showColorPicker)} variant="contained" color="primary">
                                    {showColorPicker2 ? 'Close ' : 'Page Color'}
                                </Button>
                            </div>
                            <div className="colorPicker">
                                {
                                    showColorPicker2 && (
                                        <CirclePicker
                                            colors={colorList} 
                                            color={pageColor}
                                            onChange={targetColor => setPageColor(targetColor.hex)}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        

                        <div className="gridThree">
                            <div className="lineHeight" style={{marginBottom: "1.5rem"}}>
                                <InputLabel id="lineHeight">Line Height</InputLabel>
                                <Slider style={{width: 150}}
                                    defaultValue={30}
                                    value={lineHeight}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    onChange={handleLineHeight}
                                    step={1}
                                    min={10}
                                    max={70}
                                    color="primary"
                                />
                            </div>

                            <div className="linesCheckbox">
                                <Tooltip title="Add Page Lines" placement="right" TransitionComponent={Fade} arrow>
                                    <FormControlLabel
                                        control={<Switch checked={line} onChange={handlePageLines} name="lines" color="primary"/>}
                                        label="Page Lines"
                                    />
                                </Tooltip>
                            </div>

                            <div className="shadowCheckbox">
                                <Tooltip title="Add Shadow To Paper" placement="left" TransitionComponent={Fade} arrow>
                                    <FormControlLabel
                                        control={<Switch checked={shadow} onChange={handleShadow} name="shadow" color="primary"/>}
                                        label="Scan Effect"
                                    />
                                </Tooltip>
                            </div>

                            <div className="marginCheckbox">
                                <Tooltip title="Insert Margin" placement="right" TransitionComponent={Fade} arrow>
                                    <FormControlLabel
                                        control={<Switch checked={margin} onChange={handleMargin} name="shadow" color="primary"/>}
                                        label="Page Margin"
                                    />
                                </Tooltip>
                            </div>

                            <div className="marginTopCheckbox">
                                <Tooltip title="Give Top Margin" placement="right" TransitionComponent={Fade} arrow>
                                    <FormControlLabel
                                        control={<Switch checked={marginTop} onChange={handleMarginTop} name="shadow" color="primary"/>}
                                        label="Top Space"
                                    />
                                </Tooltip>
                            </div>
                            
                        </div>
                        
                </div>
                <div className="output_container">
                    <Paper elevation={3} square={true} className="paper" id="page" style={{backgroundImage: 
                            line? 'repeating-linear-gradient(transparent 0px, transparent 24px, #333333 25px)' : 'none', backgroundColor: `${pageColor}`,
                            WebkitBoxShadow: shadow ? 'inset 18px 0px 50px -7px rgba(106,110,101,1)' : 'none', MozBoxShadow: shadow ? 'inset 18px 0px 50px -7px rgba(106,110,101,1)' : 'none',
                            boxShadow: shadow ? 'inset 18px 0px 50px -7px rgba(106,110,101,1)' : 'none'}}>
                        <p className="output_text" 
                            style={{fontFamily: `${fontFamily}`, fontSize: `${fontSize}px`, color: `${color}`, 
                                letterSpacing: `${letterSpacing}px`, wordSpacing: `${wordSpacing}px`, lineHeight: `${lineHeight}px`, paddingTop: marginTop? '2rem' : '0',
                                fontWeight: `${fontWeight}`, left: margin? '2rem' : '0', borderLeft: margin? '2px solid #666666' : 'none', paddingLeft: margin? '0.5rem' : '0'}}>
                            {text}
                        </p>
                    </Paper>
                    <div className="download_button">
                        <Button onClick={generateJpeg} variant="contained" style={{color: 'white', backgroundColor: '#ec4c4c'}}>Download Image </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FontConverter

