const button=document.querySelector("button");
const data=document.getElementById("text1");

button.addEventListener("click",() =>{
    fetch("https://leprosy-payment.herokuapp.com/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            { id: 1,quantity:1 ,amount:data.value*100}
          ],
        }),
      })
        .then(res => {
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
           
          window.location = url
        })
        .catch(e => {
          console.error(e.error)
        })
})
