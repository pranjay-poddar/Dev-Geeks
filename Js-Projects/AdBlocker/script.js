function adDetector()
{
    // wrapping the function in timeout giving time for adblocker
    setTimeout(function()
    {
        document.body.innerHTML += `<div class="adsbygoogle" id="test-ad"></div>`;
        const testAd = document.getElementById('test-ad');
        //passing testad will get all css properties in Js object
        const testAdStyle = getComputedStyle(testAd);
    
        
        if(testAdStyle.display === "none")
        {
            //create banner using div and print the message
            const banner = document.createElement('div');
            banner.innerHTML= `<h2> Ad Blocker detected</h2>
            <p> Using Advertising on this site</p>`
             

            banner.setAttribute('class','alert');
            banner.style = "background: black; color: yellow"; 
            document.body.prepend(banner);
           
        }
           
    
        else
          console.log("No Ad Blocker detected");
    
    },1000)

}

//function call
adDetector()