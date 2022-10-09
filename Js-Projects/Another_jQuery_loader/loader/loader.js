$('html').append(`<div class="loader" style="display:none;">
					<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"/>
					</svg>
</div>`);
const LOADER = {
    show(hex="#004466"){$(".loader").children("svg").css("fill",hex);console.warn("🚀Loader shown");$(".loader").fadeIn('fast')},
    hide(){console.warn("❌Loader hidden");$(".loader").fadeOut();}
}