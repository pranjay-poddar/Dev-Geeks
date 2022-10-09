// class Stack{
//     constructor(){
//         this.arr = [];
//         this.top = -1;
//     }
// }

// class Solution 
// {
    //Function to evaluate a postfix expression.
    function evaluatePostfix(S)
    {
        S = S.replaceAll(' ', '');
        const stack = [];
        let top = -1;
        
        //iterating over the given string.
        for (let i = 0; i<S.length; ++i)
        {
            //if current character is an operand, we push it to the stack.
            if (S.charCodeAt(i)>=48 && S.charCodeAt(i)<58)
            {
                stack.push(parseInt(S.charCodeAt(i) - 48));
                top++;
            }
            //else current character is an operator.
            else
            {
                //we pop and store the values of first two elements of stack.
                let val1 = stack[top]; 
                stack.pop();
                top--;
                let val2 = stack[top]; 
                stack.pop();
                top--;
                
                //we perform required operation and push the result in stack.
                if(S[i] == '+'){
                    stack.push(val2 + val1);
                    top++;
                }
                else if(S[i] == '-'){
                    stack.push(val2 - val1);
                    top++;
                }
                else if(S[i] == '*'){
                    stack.push(val2 * val1);
                    top++;
                }
                else if(S[i] == '/'){
                    stack.push(Math.floor(val2 / val1));
                    top++;
                }
            }
        }
        //returning the top element of the stack.
        if(stack[top] == -0)
            return 0;
        return stack[top]; 
    }
// }

const btn = document.querySelector('#evaluate-button');

btn.onclick = function(){
    let inputVal = document.querySelector("#insert-expression").value;
    let outputVal = evaluatePostfix(inputVal);
    let outputAreaField = document.querySelector(".output-area");
    outputAreaField.value = outputVal;
    console.log(outputVal);
}


     


