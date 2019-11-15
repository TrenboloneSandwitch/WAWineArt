export class LanguageSelector {
    constructor(width) {
        this.width = width;


    }

    getLanguageObject() {
        const containers = {
            active: 'desktop',
            hidden: 'mobile'
        }

        if (window.innerWidth < this.width) {
            containers.active = 'mobile';
            containers.hidden = 'desktop'
        }

        return {
            active: document.querySelector(`.language-selector--${containers.active}`),
            hidden: document.querySelector(`.language-selector--${containers.hidden}`)
        }
    }

    placeLanguageSelector() {
        // Acces DOM for language selector
        const {
            active,
            hidden
        } = this.getLanguageObject();
        // Apply logic for displayin and placing element into the page

        if (hidden.style.display != 'none') hidden.style.display = 'none';
        if (active.style.display == 'none') active.style.display = 'block';
        if (active.childElementCount > 1) return;

        active.innerHTML = `
            <a href="#cz" class="lang active"> 
            <span class="flag-icon flag-icon-cz"></span></a> / 
            <a href="#gb" class="lang">
            <span class="flag-icon flag-icon-gb"></span></a>
          `;

        this.setListeners(active);
    }

    setListeners(el) {
        const selectors = el.querySelectorAll('.lang');
        selectors.forEach(selector => clickListener(selector));

        function clickListener(selector) {
            selector.addEventListener('click', (e) => {
                e.preventDefault();
                let cls = selector.classList;
                if (cls.contains('active')) return;

                selector.classList.add('active');
                setActivity(selector);
                console.log(selector.href)
            })
        }

        function setActivity(sel) {
            selectors.forEach(el => {
                if(el === sel) return;
                el.classList.remove('active'); 
            })
        }
    }
}