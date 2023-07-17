function see(){
     const username = document.getElementById('username').value;
     const originusername = username.split(' ').join('')
     fetch(`https://api.github.com/users/${originusername}`)
     .then((response) => response.json())
     .then((data)=>{
          document.getElementById('details').innerHTML = `<br> Name: ${data.name}<br>` + `<br>location: ${data.location}<br>` + `<br>Profile Photo <br><img src="${data.avatar_url} width=100px height=100px alt="${originusername}"<br>"></img>` + `<br> Bio: ${data.bio}<br>` + `<br>Company: ${data.company}<br>` + `<br>URL: <a href='https://github.com/${username}'>${data.html_url}</a>`
          console.log(data);
          // document.getElementById('details').innerHTML = myobj
     })
}