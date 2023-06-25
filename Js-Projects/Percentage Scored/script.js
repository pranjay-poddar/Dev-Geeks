var percentage = document.getElementById('percentage');
var total_page_height = document.documentElement.scrollHeight;
var viewport_height = window.innerHeight;

window.addEventListener('scroll', function ()
{
    percentage.innerText = Math.round((Math.round(this.pageYOffset) / (total_page_height - viewport_height)) * 100);
})