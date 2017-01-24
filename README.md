zRS - v4.0.0
=====

zRS is a responsive javascript slider that can be implemented onto your web pages. It is backwards compatable to IE9.

Initialisation
---

To initialise a slider simply use the following code:

	var slider = new zRS('#slider', {
    
        ...options
    
    });
    
Initialisation will accept either an element object or a string, for example:

    var element = document.getElementById('slider');

    var slider = new zRS(element, {
    
        ...options
    
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

Automated Features
---

zRS has a few features that will be utilised if you structure your HTML in a specific way, depending on which attributes or elements you use, behaviour varies.

#### zRS-src

By putting the attribute `zRs-src` or `zRS-srcset` on an element you will enable zRS's lazy loading feature.

**Example:**

    <img zRS-src="images/1.jpg" alt="zRS4" />
    
zRS will automatically load the image for the next slide before it transitions, it will wait until the image has been loaded before it transitions to achieve a smooth effect. If the next slide contains multiple images then it will load **ALL** the images before it transitions.

---

#### zRS-srcset

`zRS-srcset` allows you to load in specific images based on the elements size. It's format is the same as the html attribute `srcset`. `zRS-srcset` currently doesn't support retina screen checking and various other options.

**Example**

    <img zRS-srcset="images/1.jpg 600w, images/2.jpg 300w" />

The expected behaviour of the example above is: `1.jpg` will be used when the slide with is above `600px` width and not below `300px` width. `2.jpg` will be used when the slide width is below `300px`. 

---

#### Background Images

If the element you add `zRS-src` or `zRS-srcset` to is not an image then zRS will lazy load the image and set it as a `background-image` instead. The same rules apply as with normal images, zRS will load them all before transitioning. 

**Example:**

    <div zRS-src"images/1.jpg"></div>

These methods can be combined to create a slide with a lazy loaded background image that contains other images, all of which will be loaded into the document when they're needed.

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
    direction: 'forward',
    keyboardControls: true,
    alignment: 0,
    visibleSlides: 1,
    setVisibleSlides: null,
    drag: true,
    infinite: true,
    verbose: false,
    freeStyle: false,
    friction: 0.35
    
Further details on each option can be found below.

#### Transition _(string)_

The transition option allows you to switch between a number of supported transitions. 

**Supported Options:** `'fade', 'slide'`

**Default Value:** `'fade'`

Example:

    transition: 'fade'

Using an unsupported transition option will result in a console warning and the transtiion will revert to `'fade'`

---

#### Inner _(string | element object)_

The inner option allows you to set a custom selector or element object for the inner element of the slider.

**Default Value:** `'.zRS__inner'`

**Example:**

    inner: '.zRS__inner'

If the inner element cannot be found then a error will be logged and the slider will fail to initialise.

---

#### Slides _(string)_

The slides option allows you to set a custom class that appears on your slides after the slider has finished it's initialisation. This can be used to customise the appearance of your slides once loaded.

**Default Value:** `'zRS__slide'`

**Example:** 

    slides: 'slider__slide'

---

#### Controls _(array[string | element object])_

The controls option allows you to specify elements, that when clicked, will transition the slider forwards and backwards. The first item in the array corresponds to the _forward_ action and the second item in the array if for the _previous_.

**Default Value:** `[]`

**Example:**

    controls: ['.zRS__nav--next', '.zRS__nav--prev']

---

#### Pager _(string | element object)_

The pager option allows you to select a pager container. This container will then be populated with `<a>` tags which will serve as another means of navigating the slider. 
If elements are placed within the pager element specified these will instead be used and the `<a>` tags will not be created. This allows you to have full control over the pager.

**Default Value:** `null`

**Example:**

    pager: '.zRS__pager'

The pager which is relevant to the current slide will have an `is-active` class on it.

If you're using custom pager elements and there aren't an equal amount of custom elements as there are slides, a warning will be logged. 

---

#### Delay _(int)_

The delay option allows you to specify the timing between automatic slide transitions in ms.

**Default Value:** `5000`

**Example:**

    delay: 6000

Setting the delay option to `-1` will stop the slider from automatically transitioning.

---

#### Speed _(int)_

The speed option controls the speed in which the transition animations play in ms.

**Default Value:** `1000`

**Example:**

    speed: 500
    
For instant transitions just set speed to `0` with the `fade` transition.

---

#### Slide By _(int)_

The slide by option allows you to set the amount of slides you wish to transition forwards or backwards by when either event is fired.
 
**Default Value:** `1`

**Example:**

    slideBy: 2

---

#### Direction _(string)_

The direction option allows you to control which way the slider transitions automatically.

**Supported Options:** `'forward'`, `'reverse'`

**Default Value:** `'forward'`

**Example:** 

    direction: 'reverse'

Setting `slideBy` to a negative number also has the same effect.

---

#### Keyboard Controls _(bool)_

Turn keyboard controls on or off. When they're enabled then you can navigate using the arrow keys on your keyboard.

**Default Value:** `true`

**Example:** 

    keyboardControls: false

---

#### Alignment _(string | float)_

The align option allows you to align the slides along the x axis. It accepts a number between `0 - 1` or a one of the following strings: `'left'` `'center'` `'right'`

**Default Value** `0`

**Example**

    alignment: 0.5,
    alignment: 'center'

---

#### Visible Slides _(float)_

The visible slides option allows you to set the amount of slides visible in the container at any one time. This option accepts decimal places to show less of the slides that are not the current slide. This option is only supported with the `slide` transition currently.

**Default Value** `1.0`

**Example**

    visibleSlides: 1.5
    
---

#### Set Visible Slides _({int: int})_

Set visible slides allows you to alter the amount of visible slides depending on the current width of the browser window. For example on desktop you may have `3` visible slides, however on mobile you may only want `1`. The key is the width of the window in px and the value is the amount of visible slides. If the window is larger than the highest key then it will use your `visibleSlides` value.

**Default Value** `null`

**Example**

    setVisibleSlides: {
    
    	600: 2,
    	400: 1.5
    
    }
    
---

#### Drag _(bool)_

The drag option allows you to turn off the dragging functionality for `slide` on desktop browsers.

**Default Value** `true`

**Example**

    drag: false
    
---

#### Infinite _(bool)_

The infinite option will change the way the `slide` transition functions. By default the slider will loop infinitely. To turn this off simply set this option to false.

**Default Value** `true`

**Example**

    infinite: false
    
---

#### Verbose _(bool)_

zRS comes with a bunch of warnings and information that can help you debug why the slider may not be behaving as you're expecting. By setting this option to `true` you will see logs in your console that will point you in the right direction.

**Default Value** `false`

**Example**

    verbose: true
    
---

#### Free Style _(bool)_

By default the `slide` transition will snap to the nearest slide, to disable this functionality simple set this option to `true`

**Default Value** `false`

**Example**

    freeStyle: true
    
---

#### Friction _(float)_

The friction option determins two things, how easy it is to flick to the next slide and how far/long the slider will take to slow down once it's been flicked. Increase or decrease the friction as you see fit to get the feeling you're after.
 
 **Default Value** `0.35`
 
 **Example**
 
    friction: 0.5
    
 ---

Events
------

zRS fires numerous events while it's running, you can hook into these events to further customise how your application interacts with zRS and add extra functionality.

**Supported Events:** `play`, `pause`, `load`, `before`, `after`, `imgLoad`.

All events are fired on the container element, so you need to listen to this element for the events.

**Example:**

    var element = document.getElementById('slider'),
        slider = new zRS(element, {});
        
    element.addEventListener('load', function(e) {
        
        console.log('Slider loaded!');
        
    });

Further details on all the events can be found below.

---

#### Play Event

The `play` event will fire every time the slider starts to resume it's normal automated cycle. (This includes when the window is re-focused as the slider pauses when the window isn't active).

**Example:**

    element.addEventListener('play', function(e) {
        
        console.log('Slider playing!');
        
    });
    
---    

#### Pause Event

The `pause` event will fire every time the slider is paused from it's normal automated cycle. (The slider will automatically pause when you inspect element or take your focus away from your window).

**Example:**

    element.addEventListener('pause', function(e) {
        
        console.log('Slider paused');
        
    });
    
 ---

#### Load Event

The `load` event will fire once per slider when it's first initialised.

**Example:**

    element.addEventListener('load', function(e) {
        
        console.log('Slider loaded!');
        
    });
    
---

#### Before Event

The `before` event will fire as a transition starts, this event passes through data that includes your current slide and your target slide.

**Data:**

- `e.detail.current` _(int)_
- `e.detail.currentSlide` _(element object)_
- `e.detail.target` _(int)_
- `e.detail.targetSlide` _(element object)_

**Example:** 

    element.addEventListener('before', function(e) {
        
        console.log('Before slider transtiion!', e.detail);
        
    });
    
---

#### After Event

The `after` event will fire after a transition finishes, this event passes through data that includes your current slide and your previous slide.

**Data:**

- `e.detail.current` _(int)_
- `e.detail.currentSlide` _(element object)_
- `e.detail.prev` _(int)_
- `e.detail.prevSlide` _(element object)_

**Example:** 

    element.addEventListener('after', function(e) {
        
        console.log('After slider transtiion!', e.detail);
        
    });
    
---
    
#### Image Load Event

The `imgLoad` event will fire after an image has been lazy loaded in by zRS. This event passes through data including, the image element loaded, the slide and the load time. This event can easily be used to animate in lazy loaded images.

**Data**

- `e.detail.element` _(element object)_
- `e.detail.slide` _(element object)_ 
- `e.detail.loadTime` _(int)_

**Example:** 

    element.addEventListener('imgLoad', function(e) {
        
        console.log('Image Loaded!', e.detail);
        
    });

zRS API
---

zRS supports numerous methods that can be called at anytime to manipulate how the slider functions, or to retrieve data, after it's been initialised.

**Supported Methods:** `next`, `prev`, `pause`, `play`, `transTo`, `jumpTo`, `currentSlide`.

**Example:**

    var element = document.getElementById('slider'),
        slider = new zRS(element, {});
        
    element.addEventListener('click', function(e) {
    
        e.preventDefault();
        
        slider.next();
    
    });
    
The above example is simple enough, when the slider element is clicked it will transition to the next slide.

See below for explanations and examples of all the methods.

#### Next

The `next` method will transition the slider to the next slide.

**Example:**

    slider.next();

---

#### Prev

The `prev` method will transition the slider to the previous slide.

**Example:**

    slider.prev();

---

#### Pause

The `pause` method will pause the slider.

**Example:**

    slider.pause();

---

#### Play

The `play` method will resume the sliders automatic cycle.

**Example:**

    slider.play();

---

#### Trans To

The `transTo` method will transition the slider to the specified slide.

**Parameters:**

- `target` _(int)_

**Example:**

    slider.transTo(3);

---

#### Jump To

The `jumpTo` method will instantly jump the slider to the specified slide.

**Parameters:**

- `target` _(int)_

**Example:**

    slider.jumpTo(2);

---

#### Current Slide

The `currentSlide` method will return the sliders current slide _(int)_.

**Example:**

    slider.currentSlide();

---

#####Release History

https://github.com/WsCandy/zRS4/releases