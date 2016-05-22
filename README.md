zRS - v4.0.0
=====

zRS is a responsive javascript slider that can be implemented onto your webpages.

Initialisation
---

To initialise a slider simply use the following code:

	var slider = new zRS('#slider', {
    
        //options
    
    });
    
Initialisation will accept either an element object or a string, for example:

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
    direction: 'forward'
    
Further details on each option can be found below.

#### Transition _(string)_

The transition option allows you to switch between a number of supported transitions. 

Supported Options: `'fade'`

Default Value: `'fade'`

Example:

    transition: 'fade'

Using an unsupported transition option will result in a console warning and the transtiion will revert to `'fade'`

---

#### Inner _(string | element object)_

The inner option allows you to set a custom selector or element object for the inner element of the slider.

Default Value: `'.zRS__inner'`

Example:

    inner: '.zRS__inner'

If the inner element cannot be found then a error will be logged and the slider will fail to initialise.

---

#### Slides _(string)_

The slides option allows you to set a custom class that appears on your slides after the slider has finished it's initialisation. This can be used to customise the appearance of your slides once loaded.

Default Value `'zRS__slide'`

Example: 

    slides: 'slider__slide'

---

#### Controls _(array[string | element object])_

The controls option allows you to specify elements, that when clicked, will transition the slider forwards and backwards. The first item in the array corresponds to the _forward_ action and the second item in the array if for the _previous_.

Default Value: `[]`

Example:

    controls: ['.zRS__nav--next', '.zRS__nav--prev']

---

#### Pager _(string | element object)_

The pager option allows you to select a pager container. This container will then be populated with `<a>` tags which will serve as another means of navigating the slider. 
If elements are placed within the pager element specified these will instead be used and the `<a>` tags will not be created. This allows you to have full control over the pager.

Default Value: `null`

Example:

    pager: '.zRS__pager'

The pager which is relevant to the current slide will have an `is-active` class on it.

If you're using custom pager elements and there aren't an equal amount of custom elements as there are slides, a warning will be logged. 

---

#### Delay _(int)_

The delay option allows you to specify the timing between automatic slide transitions in ms.

Default Value: `5000`

Example:

    delay: 6000

Setting the delay option to `-1` will stop the slider from automatically transitioning.

---

#### Speed _(int)_

The speed option controls the speed in which the transition animations play in ms.

Default Value: `1000`

Example:

    speed: 500
    
For instant transitions just set speed to `0` with the `fade` transition.

---

#### Slide By _(int)_

The slide by option allows you to set the amount of slides you wish to transition forwards or backwards by when either event is fired.
 
Default Value: `1`

Example:

    slideBy: 2

---

#### Direction _(string)_

The direction option allows you to control which way the slider transitions automatically.

Supported Options: `'forward'`, `'reverse'`

Default Value: `'forward'`

Example: 

    direction: 'reverse'

Setting `slideBy` to a negative number also has the same effect.

---

Events
------

zRS fires numerous events while it's running, you can hook into these events to further customise how your application interacts with zRS and add extra functionality.

Supported Events `play`, `pause`, `load`, `before`, `after`.

All events are fired on the container element, so you need to listen to this element for the events.

Example:

    var element = document.getElementById('slider'),
        zRS = new zRS(element, {});
        
    element.addEventListener('load', function(e) {
        
        console.log('Slider loaded!');
        
    });

Further details on all the events can be found below.

#### Play Event

The `play` event will fire every time the slider starts to resume it's normal automated cycle. (This includes when the window is re-focused as the slider pauses when the window isn't active).

Example:

    element.addEventListener('play', function(e) {
        
        console.log('Slider playing!');
        
    });

---

#### Pause Event

The `pause` event will fire every time the slider is paused from it's normal automated cycle. (The slider will automatically pause when you inspect element or take your focus away from your window).

Example:

    element.addEventListener('pause', function(e) {
        
        console.log('Slider paused');
        
    });

---

#### Load Event

The `load` event will fire once per slider when it's first initialised.

Example:

    element.addEventListener('load', function(e) {
        
        console.log('Slider loaded!');
        
    });
    
---

#### Before Event

The `before` event will fire as a transition starts, this event passes through data that includes your current slide and your target slide.

Data:

- `e.detail.current` _(int)_
- `e.detail.currentSlide` _(element object)_
- `e.detail.target` _(int)_
- `e.detail.targetSlide` _(element object)_

Example: 

    element.addEventListener('before', function(e) {
        
        console.log('Before slider transtiion!', e.detail);
        
    });

#### After Event

The `after` event will fire after a transition finishes, this event passes through data that includes your current slide and your previous slide.

Data:

- `e.detail.current` _(int)_
- `e.detail.currentSlide` _(element object)_
- `e.detail.prev` _(int)_
- `e.detail.prevSlide` _(element object)_

Example: 

    element.addEventListener('after', function(e) {
        
        console.log('After slider transtiion!', e.detail);
        
    });

#####Release History

https://github.com/WsCandy/zRS4/releases