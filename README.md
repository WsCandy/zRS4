zRS - v4.0.0
=====

zRS is a responsive javascript slider that can be implemented onto your webpages.

Initialisation
---

To initialise a slider simply use the following code:

	var slider = new zRS('#slider', {
    
        //options
    
    });
    
Initialisation will accept either a JS selector or a string, for example:

    var element = document.getElementById('slider');

    var slider = new zRS(element, {
    
        //options
    
    });
    
Initialisation will accept both classes and ID's although it's recommended you use ID's

HTML Structure
---

    <div id="slider">
        <div class="zRS__inner">
            <img zRS-src="images/1.jpg" alt="zRS4" />
            <img zRS-srcset="images/1.jpg 700w, images/2.jpg 300w" alt="zRS4" />
        </div>
    </div>

Options
---

Here is a list of all the available options and their default values:

    transition: 'fade',
    inner: '.zRS__inner',
    slides: 'zRS__slide',
    controls: [],
    pager: null,
    delay: 5000,
    speed: 1000,
    slideBy: 1,
    visibleSlides: 1,
    direction: 'forward'
    
Further details on each option can be found below.

#####Release History

https://github.com/WsCandy/zRS4/releases