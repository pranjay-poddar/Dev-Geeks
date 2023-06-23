var inputLabel = document.getElementById('inputLabel');
     
    function pushBtn(obj) {
         
        var pushed = obj.innerHTML;
         
        if (pushed == '=') {
            // Calculate
            inputLabel.innerHTML = eval(inputLabel.innerHTML);
             
        } else if (pushed == 'AC') {
            // All Clear
            inputLabel.innerHTML = '0';
             
        } else {
            if (inputLabel.innerHTML == '0') {
                inputLabel.innerHTML = pushed;
                 
            } else {
                inputLabel.innerHTML += pushed;   
            }
        }
    }

    function doTheJob(e) {
        // console.log(e);
        // console.log(e.key);
        let operatorsArr = ['+', '-', '*', '.', '(', ')'];
        if(operatorsArr.includes(e.key)){
            const element = document.querySelector(`.key[data-operator = "${e.key}"]`);
            element.click();
            return;
        }
        const element1 = document.querySelector(`.key[data-key = "${e.keyCode}"]`);
        const element2 = document.querySelector(`.key[data-key1 = "${e.keyCode}"]`);
        if(element1 !== null) element1.click();
        if(element2 !== null) element2.click();
    }

document.addEventListener("keydown", doTheJob);