//change navbar on scroll

window.addEventListener("scroll", () => {
    document.querySelector("nav").classList.toggle
    ('window-scroll', window.scrollY > 150)})


    //show/hide faqs

    const faqs = document.querySelectorAll(".faq");

    faqs.forEach((faq) => {
        faq.addEventListener("click", () => {
            faq.classList.toggle("open");
        })
    })