
/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            catIndex:0,
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            catIndex: 1,
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            catIndex: 2,
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            catIndex: 3,
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            catIndex: 4,
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminFormView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
        adminFormView.render();
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
        adminFormView.render();
    },

    updateCat: function () {
        catView.render();
        catListView.render();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

var adminFormView = {
    init: function () {
        // store pointers to our DOM elements for easy access later
        this.formDisplay = false;
        this.adminButtonElem = document.getElementById('adminbutton');
        this.adminFormElem = document.getElementById('adminform');
        this.catNameElem = document.getElementById('catnametextid');
        this.catCountElem = document.getElementById('catclickstextid');
        this.catURLElem = document.getElementById('caturltextid');
        this.saveButtonElem = document.getElementById('savebutton');
        this.cancelButtonElem = document.getElementById('cancelbutton');

        this.adminFormElem.style.display = 'none';
        var self = this;
        // on click, display admin form
        this.adminButtonElem.addEventListener('click', function () {
            self.formDisplay = true;  
            self.render();
        });

        this.cancelButtonElem.addEventListener('click', function () {
            self.formDisplay = false;
            self.adminFormElem.style.display = 'none';
        });

        this.saveButtonElem.addEventListener('click', function (e) {
            self.formDisplay = false;
            var cat = octopus.getCurrentCat();

            cat.clickCount = self.catCountElem.value
            cat.name = self.catNameElem.value
            cat.imgAttribution = self.catURLElem.value
            model[cat.catIndex] = cat;
            octopus.updateCat();
            self.adminFormElem.style.display = 'none';
            e.preventDefault();
        });

    },

    render: function () {
        // update the DOM elements with values from the current cat
        if (this.formDisplay == true) this.adminFormElem.style.display = 'block';
        var currentCat = octopus.getCurrentCat();
        this.catCountElem.value = currentCat.clickCount;
        this.catNameElem.value = currentCat.name;
        this.catURLElem.value = currentCat.imgAttribution;
    }
};
// make it go!
octopus.init();
