let text = document.querySelectorAll('.small-text')
let items = document.querySelectorAll('.carousel .item');
let isEnabled = true;
const dots = document.querySelectorAll('.dot')
let currentItem = previous = 0;


function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
	previous = currentItem
	console.log(currentItem)
}

const activeDot = n =>{
  for(dot of dots){
    dot.classList.remove('active');
  }
  dots[n].classList.add('active');
}

dots.forEach((item, indexDot) =>{
  item.addEventListener('click', ()=>{
		index = indexDot;
		activeDot(index);
		hideItem('to-left', previous)
		changeCurrentItem(index)
		showItem('from-right', index)
  })
})
dots.forEach((item, indexDot) =>{
    item.addEventListener('touchstart', ()=>{
          index = indexDot;
          activeDot(index);
          hideItem('to-left', previous)
          changeCurrentItem(index)
          showItem('from-right', index)
    })
  })

function hideItem(direction) {
	isEnabled = false;
    text[currentItem].classList.add(direction,'hide');
    text[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active',direction);
        this.classList.remove('hide');

	});
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	activeDot(currentItem);

    text[currentItem].classList.add(direction);
	items[currentItem].classList.add('next', direction);                
	items[currentItem].addEventListener('animationend', function() { 
		items[currentItem].classList.remove('next', direction);
		items[currentItem].classList.add('active');
        text[currentItem].classList.remove(direction);
        text[currentItem].classList.add('active');	
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}


const swipedetect = (el) => {
  
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

var el = document.querySelector('.carousel');
swipedetect(el);