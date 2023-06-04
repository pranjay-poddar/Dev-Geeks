import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import {Button, AppBar, Toolbar, IconButton, Typography, Paper} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import Slide from '@material-ui/core/Slide';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'; 
import './SpeechToText.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      backgroundColor: '#262626'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function SpeechToText() {


    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [copy, setCopy] = useState(false)
    const [copied, setCopied] = useState(false)
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCopyClick = () => {
        setCopy(true);
      };

    const handleCopyClose = () => {
        setCopy(false);
      };

    const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition();

    useEffect(() => {
        if (finalTranscript !== '') {
         console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
      }
     
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }
    const listenContinuously = () => {
    SpeechRecognition.startListening({
        continuous: true,
        language: 'en-GB',
    });
    };

    console.log(transcript);

    return (
        <div className="speechToText">
          <div className="textInfo2">
            <div className="textLeft2">
              {/* <img src={convert} alt="" /> */}
            </div>
            <div className="textRight2">
              <p>
                Introducing voice typing. <br/>
                Now you just have to speak and we will convert it into text for you!<br />
                Get started by clicking the button below.
              </p>
            </div>
          </div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Voice Typing
          </Button>



            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                        Voice Typing
                </Typography>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
            </Toolbar>
            </AppBar>  


            <div className="convertVoice" >
                <div className="recorder">
                    {' '}
                    {listening ? <MicIcon /> : <MicOffIcon />}
                    <div className="buttonsContainer">
                        <Button type="button" onClick={listenContinuously}>Listen</Button>
                        <Button type="button" onClick={SpeechRecognition.stopListening}>Stop</Button>
                        <Button type="button" onClick={resetTranscript}>Clear</Button>
                    </div>
                </div>
                <div className="recodedText">
                    <Paper elevation={3} className="textPaper">
                            <CopyToClipboard text={transcript}
                                onCopy={() => setCopied(true)}>
                                    <IconButton aria-label="delete"  onClick={handleCopyClick}>
                                        <FileCopyIcon fontSize="large"/>
                                    </IconButton>
                            </CopyToClipboard>
                            <p>{transcript}</p>
                    </Paper>
                </div>
            </div>
            

             
                
            </Dialog>
            <Snackbar open={copy} autoHideDuration={6000} onClose={handleCopyClose}>
                <Alert onClose={handleCopyClose} severity="success" style={{backgroundColor: '#262626', color: '#ec4c4c'}}>
                Copied to Clipboard
                </Alert>
            </Snackbar>
            
        </div>
    )
}

export default SpeechToText


