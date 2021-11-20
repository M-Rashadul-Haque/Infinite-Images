
// API -> Unsplash


//Global variables
const count = 5;
const apiKey = "NwDI7m2fIxIknX5TJGpbA5O6R1Hux-HMk3dGznF4QwM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let imgArray = [];

// Fetch image

async function fetchImage() {
    try {
        showPreloader();
        const response = await fetch(apiUrl);

        imgArray = await response.json();
        hidePreloader();

        renderImage();
    } catch (error) {
        console.log(error);
    }
}

// fetchImage();

//Assistant function

function setAttr(el, attr) {
    for (let item in attr) {
        el.setAttribute(item, attr[item]);
    }
}

//Render image

function renderImage() {
    imgArray.forEach((image) => {
        const anchor = document.createElement("a");

        setAttr(anchor, {
            href: image.links.html,
            target: "_blank",
        });

        //Create img tag for image
        const img = document.createElement("img");

        setAttr(img, {
            src: image.urls.regular,
            alt: image.alt_description,
            title: image.alt_description,
        });

        //View image setup
        anchor.appendChild(img);
        const imageHolder = document.querySelector(".image-holder");
        imageHolder.appendChild(anchor);
    });
}

//Control rendering images
function controller() {
    const button = document.querySelector(".btn");
    const initState = document.querySelector('.init-images');
    button.addEventListener("click", ()=>{
        fetchImage();
        initState.hidden = true;
    });
}

// preloader settings
function showPreloader() {
  const preloader = document.querySelector(".preloader");
  const image = document.querySelector(".image-holder");
  preloader.hidden = false;
  image.hidden = true;
}

function hidePreloader() {
    const preloader = document.querySelector(".preloader");
    const image = document.querySelector(".image-holder");

        preloader.hidden = true;
        image.hidden = false;
    
}

function main() {
    controller();
}
main();
