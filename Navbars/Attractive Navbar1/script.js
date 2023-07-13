class NavbarHeaderComponent {
    constructor() {
      this.navLinks = null;
      this.indicator = null;
    }
  
    ngOnInit() {
      this.navLinks = document.querySelectorAll('.list > a');
      this.indicator = document.querySelector('.indicator');
  
      const indicatorPosition = localStorage.getItem('indicatorPosition');
      if (indicatorPosition) {
        this.indicator.style.transform = `translateX(${indicatorPosition}px)`;
      }
  
      this.navLinks.forEach((link) => {
        link.addEventListener('click', this.moveIndicator.bind(this));
      });
    }
  
    moveIndicator(event) {
      const link = event.currentTarget;
      const parent = link.parentElement;
      const linkRect = link.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const indicator = this.indicator;
      const offsetLeft = linkRect.left - parentRect.left;
  
      localStorage.setItem('indicatorPosition', parent.offsetLeft.toString());
  
      indicator.style.transform = `translateX(${parent.offsetLeft}px)`;
      localStorage.setItem('activeTabIndex', parent.dataset.tabIndex);
    }
  }
  
  const navbarHeaderComponent = new NavbarHeaderComponent();
  navbarHeaderComponent.ngOnInit();
  