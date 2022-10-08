let answers = ["Ofcourse Dummy", 
                   "In the near future", 
                   "Without a doubt", 
                   "Definitely",
                   "hmm interesting", 
                   "As I see it, yes", 
                   "May be , may be not", 
                   "Unfortunately no", 
                   "Yes",
                   "Just Forget about it", 
                   "I can see it comming",
                   "My sources say no", 
                   "I need the devil himself for this answer",
                   "Very doubtful", 
                   "Roz Subha Suraj ko jal do ...ho jayega", 
                   "Ask again later", 
                   "yes hihihihi"
                   ];
    
    window.onload = function() {
       let answer = document.getElementById("answer");
       let hotspot = document.getElementById("answers");
       let textBox = document.getElementById("textBox");
       
       hotspot.addEventListener("click", function() {
         if (textBox.value.length < 1) {
           alert('Enter a textBox!');
         } else {
           let num = Math.floor(Math.random() * Math.floor(answers.length));
           answer.innerText = answers[num];
         }
       });
    };