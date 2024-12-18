// search

let searchElement = document.querySelector('.searchInput');

const search = () => {
  console.log(searchElement.value);

  searchElement.value = "";
}


// calculate the price

let priceElement = document.querySelector('.currentPrice');
let countElement = document.querySelector('.currentCount');
let price = Number(priceElement.textContent);
let count = Number(countElement.textContent);
let newPrice = price;

const incrementCount = () => {
  count++;
  newPrice = count * price;
  priceElement.textContent = newPrice;
  countElement.textContent = count;
}

const decrementCount = () => {
  if (count == 0) {
    return;
  }
  count--;
  newPrice = count * price;
  priceElement.textContent = newPrice;
  countElement.textContent = count;
}

// Item carousel

document.querySelectorAll(".item-carousel").forEach(carousel => {
  const items = carousel.querySelectorAll(".carousel-item");
  const buttons = carousel.querySelectorAll(".carousel-btn");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      items.forEach(item => item.classList.remove("carousel-item-selected"));
      buttons.forEach(button => button.classList.remove("carousel-btn-selected"));

      items[i].classList.add("carousel-item-selected");
      button.classList.add("carousel-btn-selected");
    })
  });
})

const slides = document.querySelectorAll(".carousel-item");

let counter = 0;

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`
})

const items = document.querySelectorAll(".carousel-item");
const buttons = document.querySelectorAll(".carousel-btn");


const goPrev = () => {
  if (counter > 0) {
    counter--;

    items.forEach(item => item.classList.remove("carousel-item-selected"));
    buttons.forEach(button => button.classList.remove("carousel-btn-selected"));

    items[counter].classList.add("carousel-item-selected");
    buttons[counter].classList.add("carousel-btn-selected");
  }

}

const goNext = () => {
  if (counter < slides.length - 1) {
    counter++;

    items.forEach(item => item.classList.remove("carousel-item-selected"));
    buttons.forEach(button => button.classList.remove("carousel-btn-selected"));

    items[counter].classList.add("carousel-item-selected");
    buttons[counter].classList.add("carousel-btn-selected");
  }
}

// First carousel

const firstCarousel = document.querySelector(".first-carousel");
const firstCarouselSlides = firstCarousel.querySelectorAll(".item-card");
let width = firstCarouselSlides[0].offsetWidth;

let lengthItems = firstCarouselSlides.length;
const moveSlides = ((width + 8) * lengthItems) - (firstCarousel.offsetWidth - 70);
const firstViewItems = Math.round(firstCarousel.offsetWidth / width);

let firstCarouselCounter = 0;
let pxMove = 0;

const slideImage = () => {
  firstCarouselSlides.forEach((slide) => {
    slide.style.transform = `translateX(-${firstCarouselCounter * (width + 15)}px)`;
    slide.style.transition = `1s`;
  })
}

const firstCarouselPrev = () => {
  if (firstCarouselCounter > 0) {
    firstCarouselCounter--;
    slideImage();
    pxMove -= (width + 15);
  }

}

const firstCarouselNext = () => {
  if (pxMove >= moveSlides) {
    return;
  }
    firstCarouselCounter++;
    slideImage();
    pxMove += (width + 15);
    console.log(pxMove);
}

const firstCarouselNextSlide = () => {
  if (pxMove >= moveSlides) {
    return;
  }
    firstCarouselCounter++;
    slideImage();
    pxMove += (width + 15);
}


// Second carousel

const secondCarousel = document.querySelector(".second-carousel");
const secondCarouselSlides = secondCarousel.querySelectorAll(".item-card");
let secondWidth = secondCarouselSlides[0].offsetWidth;
let lengthSecondItems = secondCarouselSlides.length;
const moveSecondSlides = ((secondWidth + 8) * lengthSecondItems) - (secondCarousel.offsetWidth - 70);
const secondViewItems = Math.round(secondCarousel.offsetWidth / secondWidth);

let secondCarouselCounter = 0;
let secondPxMove = 0;


const slideImageSecond = () => {
  secondCarouselSlides.forEach((slide) => {
    slide.style.transform = `translateX(-${secondCarouselCounter * (secondWidth + 15)}px)`;
    slide.style.transition = `1s`;
  })
}


const secondCarouselPrev = () => {
  if (secondCarouselCounter > 0) {
    secondCarouselCounter--;
    slideImageSecond();
    secondPxMove -= (secondWidth + 15);
  }

}

const secondCarouselNext = () => {
  if (secondPxMove >= moveSecondSlides) {
    return;
  }
    secondCarouselCounter++;
    slideImageSecond();
    secondPxMove += (secondWidth + 15);
    console.log(secondPxMove);
}

const secondCarouselNextSlide = () => {
  if (secondPxMove >= moveSecondSlides) {
    return;
  }
    secondCarouselCounter++;
    slideImageSecond();
    secondPxMove += (secondWidth + 15);
  }

// Dropdown menu

const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle('open')
  const isOpen = dropDownMenu.classList.contains('open');

  toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars';
}


// touch events - slide

let slideItems = document.querySelectorAll('.all-items .item-card');

let isDragging = false,
startPos = 0,
currentTranslate = 0,
prevTranslate = 0,
animationID = 0;

slideItems.forEach((item, index) => {
  const slideImages = item.querySelectorAll('.item-card');

  slideImages.forEach((slideImage) => {
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
  })
  
  // Touch events
  item.addEventListener('touchstart', touchStart)
  item.addEventListener('touchend', touchEnd)
  item.addEventListener('touchmove', touchMove)

})

function touchStart(event) {
    startPos = getPositionX(event);
    isDragging = true;

    event.target.classList.add('active');
}

function touchEnd(event) {
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    if (event.target.classList.contains('active')){
      if(movedBy < -5) {
        if (event.target.parentElement.parentElement.classList.contains('first-carousel')){
        firstCarouselNextSlide();
        } else {
          secondCarouselNextSlide();
        }
      }

      if(movedBy > 5) {
        if (event.target.parentElement.parentElement.classList.contains('first-carousel')){
          firstCarouselPrev();
          } else {
            secondCarouselPrev();
          }
      }
    }

}

function touchMove(event) {
    if(isDragging){
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

function getPositionX(event) {
return event.type.includes('mouse')
  ? event.pageX
  : event.touches[0].clientX;
}


// Send email

let nameInput = document.querySelector('.nameInput');
let phoneInput = document.querySelector('.phoneInput');

(function () {
  emailjs.init("XdfHOHhItx1fZdzQU");
})();

function SendMail() {

  if (nameInput.value == '' || phoneInput.value == '') {
    return;
  }
  let message = `Поръчахте ${count} броя на стойност ${newPrice} лв.`;
  event.preventDefault();
  const params = {
    from_name: document.querySelector(".nameInput").value,
    phone: document.querySelector(".phoneInput").value,
    message: message,
  };

  document.querySelector(".nameInput").value = "";
  document.querySelector(".phoneInput").value = "";

  console.log(params);

  emailjs.send("service_ckorg0p","template_qxe4dgr", params).then(
    function (res) {
      alert("✔ You have successfully sent a message. ✔");
    },
    function (error) {
      alert("❌ Something went wrong. Try again later. ❌");
    }
  );
}