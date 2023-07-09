const grid = document.querySelector('.grid-container');
const colorPicker = document.querySelector('#color-picker');
const gridSize = document.querySelector('#grid-size');

gridSize.addEventListener('change', (e)=>{
    gridMeasure = e.target.value;
    console.log(gridMeasure);
    

    const cont = document.querySelector('.grid-container');
    cont.innerHTML = '';

    for(i=1; i<=gridMeasure*gridMeasure;i++){
        const buttons = document.createElement('button');
        buttons.classList.add('grid-blocks')
        buttons.style.width = `${420/gridMeasure}px`;
        buttons.style.height = `${420/gridMeasure}px`;
        grid.appendChild(buttons);
    }

        const btns = document.querySelectorAll('.grid-blocks');

    const inputFeedback = document.querySelector('.live-input-feeder');
    inputFeedback.textContent=`${gridMeasure} x ${gridMeasure}`

    const resetBtn = document.querySelector('#reset');
    const eraseBtn = document.querySelector('#erase');
    const drawBtn = document.querySelector('#draw');
    var eraseBtnValue = 0;
    var drawBtnValue = 1;
    drawBtn.classList.add('drawing');
    eraseBtn.classList.remove('erasing');

    function forErasing(){
        eraseBtnValue=1;
        drawBtnValue=0;
        drawBtn.classList.remove('drawing');
        eraseBtn.classList.add('erasing');
    }
    function forDrawing(){
        drawBtnValue=1;
        eraseBtnValue=0;
        drawBtn.classList.add('drawing');
        eraseBtn.classList.remove('erasing');
    }

    resetBtn.addEventListener('click', (e)=>{
        resetBtn.classList.add('clearing');
        drawBtn.classList.remove('drawing');
        eraseBtn.classList.remove('erasing');
        btns.forEach(btn => {  
            btn.style.backgroundColor = '';
        })
        setTimeout(()=>{
            resetBtn.classList.remove('clearing');
            forDrawing();
        },500);
    })
    eraseBtn.addEventListener('click', (e)=>{
        forErasing();
    });
    drawBtn.addEventListener('click', (e)=>{
        forDrawing();
    });

    btns.forEach(btn => {
        btn.addEventListener('click', (e)=>{

            if(eraseBtnValue > 0){
                btn.style.backgroundColor = '';
            }
            else {
                btn.style.backgroundColor = colorPicker.value;
            }
        })
    });
});


