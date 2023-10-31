function Slider(sldrId) {
	let id = document.getElementById(sldrId);
	if (id) {
		this.sldrRoot = id;
	} else {
		this.sldrRoot = document.querySelector('.slider');
	};

	this.sldrList = this.sldrRoot.querySelector('.slider-list');
	this.sldrElements = this.sldrList.querySelectorAll('.slider-element');
	this.sldrElemFirst = this.sldrList.querySelector('.slider-element');
	this.leftArrow = this.sldrRoot.querySelector('.slider-arrow-left');
	this.rightArrow = this.sldrRoot.querySelector('.slider-arrow-right');
	this.indicatorDots = this.sldrRoot.querySelector('.slider-dots');

	this.options = Slider.defaults;
	Slider.initialize(this)
};

Slider.defaults = {
	loop: true,     
	arrows: true,   
	dots: true      
};

Slider.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			this.leftArrow.style.display = 'none';
		};
		this.rightArrow.style.display = 'block';
	};
	
	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); 
        this.dotOff(this.currentElement);
	}
};

Slider.prototype.elemNext = function(num) {
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement === this.elemCount - 1) {
			this.rightArrow.style.display = 'none'
		};
		this.leftArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); 
        this.dotOff(this.currentElement);
	}
};

Slider.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;';
};

Slider.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;';
};

Slider.initialize = function(that) {
	that.elemCount = that.sldrElements.length;

	that.currentElement = 0;

	if(that.elemCount <= 1) {
		that.options.auto = false;
        that.options.arrows = false; that.options.dots = false;
		that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none';
	};
	if(that.elemCount >= 1) {
		that.sldrElemFirst.style.opacity = '1';
	};

	if(!that.options.loop) {
		that.leftArrow.style.display = 'none';
		that.options.auto = false;
	}

	if(that.options.arrows) {
		that.leftArrow.addEventListener('click', function() {
            that.elemPrev();
		});
		that.rightArrow.addEventListener('click', function() {
            that.elemNext();
		});
	}
	else {
		that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none';
	};

	if(that.options.dots) {
		let sum = '', diffNum;
		for(let i = 0; i < that.elemCount; i++) {
			sum += '<span class="dot"></span>';
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.sldrRoot.querySelectorAll('.dot');
		for(let n = 0; n < that.elemCount; n++) {
			that.indicatorDotsAll[n].addEventListener('click', function(){
				diffNum = Math.abs(n - that.currentElement);
				if(n < that.currentElement) {
					that.elemPrev(diffNum);
				}
				else if(n > that.currentElement) {
					that.elemNext(diffNum);
				}
			});
		};
		that.dotOff(0);
		for(let i = 1; i < that.elemCount; i++) {
			that.dotOn(i)
		}
	}
};