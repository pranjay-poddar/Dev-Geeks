//variables banalo textbox ke, noteslist ke aur add button ke
const text1 = $('#myText');
const list = $('#noteslist');
const addbtn = $('#addBt');

//jab add button pe click ho toh kaam shuru hojaye
$('#addBt').click(function (event1) {
    event1.preventDefault();
    const text11 = $('#myText').val(); //textbox ki value uthake variable me daal li

    const divNote = $("<div></div>"); //new div tag which will store the note and btns
    divNote.css({
        display: 'flex',
        flexDirection: 'row'
    }); //display flex dedi

    const delBtn = $("<button></button>", { id: 'delBtn' }); //naya delete button for every note
    delBtn.text("Remove Note"); //delete button ke andar likh ke aayga

    const note = $("<p></p>"); //naya note banaya
    note.text(text11); //note ko text diya

    //edit krne ke liye textbox aur save btn banaya aur display none set kardiya
    const edittext = $("<textarea></textarea>", { row: '2', cols: '100' });
    const savBtn = $("<button></button>", { id: 'saveBtn' });
    savBtn.text("Update");
    edittext.css({ display: "none", resize: "none", fontFamily: 'Oxygen', fontSize: "22px" });
    savBtn.css({ display: "none" });

    //naye div me saari cheeze append kardi, fir us div ko note list me append kardiya
    $('#myText').val("");
    divNote.append(note, edittext, savBtn, delBtn);
    $('#noteslist').append(divNote);

    //agar delbtn chale toh kya ho
    delBtn.click(function () {
        divNote.remove();
    });

    //agar paragraph pe click karu toh kya ho
    $('p').click(function () {

        //saare bande uthake variable me daal liye
        const newText = $(this).parent().children("textarea");
        const updBtn = $(this).parent().children("#saveBtn");
        const oldText = $(this);
        const deleteBtn = $(this).parent().children("#delBtn");

        //ab textbox aur update button ki display flex kardi
        //aur <p> tag aur delete button ki display none kardi
        newText.css('display', 'flex');
        newText.val($(this).text()); //textbox me wahi text daaldiya jo note tha, to edit
        updBtn.css('display', 'flex');

        oldText.css('display', 'none');
        deleteBtn.css('display', 'none');

        //update button pe kya hona chahiye
        updBtn.click(function (event2) {
            event2.preventDefault();
            const nwtxt = newText.val(); //textbox me input ko uthaya
            oldText.text(nwtxt);       //aur old text me daaldiya
            newText.val("");      //textbox ko khali kardiya
            newText.css('display', 'none'); //ab textbox aur update button ki display
            updBtn.css('display', 'none');   // ko none set kardiya

            oldText.css('display', 'flex'); //aur p tag aur delete ko wapas show kardiya
            deleteBtn.css('display', 'flex');
        });


    });

});