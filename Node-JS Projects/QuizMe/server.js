const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()
require('dotenv').config();

const quizSchema = mongoose.Schema({
    quiz_name : String,
    due_date : String,
    time : String,
    questions : [],
    submissions : []
})

const questionSchema = mongoose.Schema({
    question_text : String,
    option1 : String,
    option2 : String,
    option3 : String,
    option4 : String,
    answer : String
})

const submissionSchema = mongoose.Schema({
    username : String,
    submission_date : String,
    score : String
})

const quiz = mongoose.model('quiz' , quizSchema) 
const question = mongoose.model('question' , questionSchema) 
const submission = mongoose.model('submission' , submissionSchema) 

// Connection to database
mongoose.connect( process.env.MONGODB_LINK
 , {useNewUrlParser : true})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
  }))

app.use(express.static('public'))

app.get('/' , (req,res)=>{

    quiz.findOne({quiz_name : req.query.quiz } ,(err,doc)=>{
        if(!doc){
            res.redirect('/404')
            
        }
        else{

            var now = new Date()
            var due_date = new Date(doc.due_date)

            if(now<due_date){
            res.render('welcome' , {quiz_name : req.query.quiz})
            }
            else{
                res.redirect('/due_date_passed')
            }
        }
    })

    
    
})

app.get('/home' , (req,res)=>{

    if(!(req.query.username)){
        res.redirect('/?quiz='+req.query.quiz)
        return
    }


    var orders = [
        [1,2,3,4],
        [2,3,4,1],
        [3,4,1,2],
        [4,1,2,3]
    ]

    var order = orders[Math.floor(Math.random() * 4)]

    quiz.findOne({quiz_name : req.query.quiz} , (err,doc)=>{
        var questions = doc.questions

        //Randomize the order of options

        for(var i=0; i<questions.length; i++){
             var x = Math.floor(Math.random() * 4)

             if(x==1){

                var temp = questions[i]['option1']
                questions[i]['option1'] =  questions[i]['option2']
                questions[i]['option2'] = temp

             }
             else if(x==2){

                var temp = questions[i]['option3']
                questions[i]['option3'] =  questions[i]['option4']
                questions[i]['option4'] = temp

             }
             else if(x==3){

                var temp = questions[i]['option1']
                questions[i]['option1'] =  questions[i]['option3']
                questions[i]['option3'] = temp

             }
             else{

                var temp = questions[i]['option2']
                questions[i]['option2'] =  questions[i]['option4']
                questions[i]['option4'] = temp

             }
             
        }

        console.log(questions);
        res.render('home' , {all_questions : questions , username : req.query.username , quiz_name : req.query.quiz , time : doc.time , positions : order })
    })

    
})

app.get('/result' , (req,res)=>{
    res.render('result')
})


app.get('/admin' , (req,res)=>{

    quiz.find({} , (err,docs)=>{
        res.render('admin' , {quizzes : docs})
    })
    
})

app.get('/new_quiz' , (req,res)=>{
    res.render('new_quiz' )
})



app.post('/new_quiz' , (req,res)=>{
      
    let no_of_questions = (Object.keys(req.body).length - 2)/5
    
    var questions = []
    for(var i=1; i<=no_of_questions; i++){
        var new_question = new question({
            question_text : req.body['question_text'+i],
            option1 : req.body['option'+i+'_1'],
            option2 : req.body['option'+i+'_2'],
            option3 : req.body['option'+i+'_3'],
            option4 : req.body['option'+i+'_4']
        })

        questions.push(new_question)
    }

    var new_quiz = new quiz({
        quiz_name : req.body.quiz_name,
        due_date : req.body.due_date,
        time : req.body.time,
        questions : questions,
        submissions : []
        })

    new_quiz.save()
    res.redirect('/quiz_created?quiz='+req.body.quiz_name)
})

app.post('/save_response' , (req,res)=>{

    var now = new Date()

    var answers = req.body.answers.split(',')

     for(var i=0; i<answers.length; i++){
         answers[i] = answers[i].replace('<seperation>',',')
     }

     quiz.findOne({ quiz_name : req.body.quiz} , (err,doc)=>{

        if(doc && (now > new Date(doc.due_date)) ){
            res.redirect('/due_date_passed')
            return

        }

         var correct_answers = []

         for(var i=0; i<doc.questions.length; i++){
             correct_answers.push(doc.questions[i].option1)
         }


         var points = 0;

         for(var i=0; i<doc.questions.length; i++){
                if(answers[i] === correct_answers[i])
                points++
         }

         var new_submission = new submission({
             username : req.body.username,
             score :  ((points/doc.questions.length)*100).toString(),
             submission_date : new Date().toLocaleString()
         })

         quiz.findOneAndUpdate({ quiz_name : req.body.quiz} , {$push : { submissions : new_submission} } ,  (err,doc)=>{
                if(err)
                console.log(err);
                else
                res.render('result' , {
                    username : req.body.username,
                    quiz_name : req.body.quiz,
                    correct : points,
                    incorrect : doc.questions.length - points,
                    total : doc.questions.length,
                    score :  ((points/doc.questions.length)*100).toString()

                })

                
         })


     })
})


app.get('/save_response' , (req,res)=>{
     res.redirect('/')
})


app.get('/quiz_created' , (req,res)=>{
       
    res.render('quiz_created' , {link : req.query.quiz})
})

app.get('/due_date_passed' , (req,res)=>{
      res.render('due_date_passed')
})

app.get('/404' , (req,res)=>{
    res.render('404')
})

app.get('/view_submissions' , (req,res)=>{

    

    quiz.findOne({quiz_name : req.query.quiz} , (err,doc)=>{
        if(err)
        console.log(err);
        else
        {
            res.render('view_submissions' , { submissions : doc.submissions })
        }
    })
    
})

// Server started on port 3000
app.listen(process.env.PORT || 3000)