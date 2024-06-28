import images from "./data.js";
const search =document.getElementById("search");
const galleryimages=document.getElementById("galleryimages");
const close = document.getElementById("closebutton");
const lightbox = document.getElementById("lightbox");
const lightboximage = document.getElementById("lightboximage");
const prev = document.getElementById("prevbutton");
const next = document.getElementById("nextbutton");
const imageindex = document.getElementById("imageindex");
const imagetitle = document.getElementById("imagetitle");
const imagecategory = document.getElementById("imagecategory");
const nextimages = document.getElementById("nextimages");
console.log(document.querySelector("div"));
let currentImageIndex = 0;
images.forEach((category)=>{
    
    console.log(Object.keys(category));
    category[Object.keys(category)[0]].forEach((image)=>{
        const img=document.createElement('img');
        const container = document.createElement("div");
        img.classList.add("images");
        const title = document.createElement("p");
        const categories = document.createElement("p");
        title.classList.add("titles");
        categories.classList.add("categorie");
        container.classList.add("containers");
        title.innerHTML=image.name;
        categories.innerHTML=image.category;
        img.src=image.src;
        img.alt=image.name;
        img.dataset.index = image.id;
        img.setAttribute("loading","lazy");
        img.setAttribute("draggable","false");
        img.setAttribute("data-lightbox","gridImage");
        container.append(img,title,categories);
        galleryimages.append(container);
    });
});
search.addEventListener("input",(e)=>{
    const val=e.target.value.toLowerCase();
    galleryimages.innerHTML="";
    const newImages=images.map((c)=>{
        return c[Object.keys(c)[0]].filter((image)=>{
            return(
            image.name.toLowerCase().includes(val)||image.category.toLowerCase().includes(val)
        );
        });
      
    });
    console.log(newImages);
newImages.forEach((category)=>{
    
   
    category.forEach((image)=>{
        const img=document.createElement('img');
        const container = document.createElement("div");
        img.classList.add("images");
        const title = document.createElement("p");
        const categories = document.createElement("p");
        title.classList.add("titles");
        categories.classList.add("categorie");
        container.classList.add("containers");
        title.innerHTML=image.name;
        categories.innerHTML=image.category;
        img.src=image.src;
        img.alt=image.name;
        img.setAttribute("loading","lazy");
        img.setAttribute("draggable","false");
        img.setAttribute("data-lightbox","gridImage");
        container.append(img,title,categories);
        galleryimages.append(container);
    });
});

});



galleryimages.addEventListener("click", (e) => {
    console.log(e.target.classList);
  if (e.target.classList.contains("images")) {
    const index = e.target.dataset.index;
    currentImageIndex = parseInt(index);
    console.log(index);
    
    openLightbox(currentImageIndex);
  }
});
const findImageById = (data, targetId) => {

  for (const obj of data) {
    for (const key in obj) {
      const images = obj[key];
      const foundImage = images.find(image => image.id === targetId);
      if (foundImage) {
        return foundImage;
      }
    }
  }
  return null;
};
const openLightbox = (index) => {
  
  console.log(images);
  lightbox.classList.remove("hidden");
  lightbox.classList.add("openlightbox");
  console.log(index);
  const image = findImageById(images, index);
  console.log(image);
  const length=getTotalImagesLength(images);
  lightboximage.src = image.src;
  lightboximage.alt = image.name;
  lightboximage.dataset.index = image.id;
  imageindex.textContent = `${index} of ${length}`;
  imagetitle.textContent = image.name;
  imagecategory.textContent = image.category;
  if (currentImageIndex === length) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
  if (currentImageIndex === 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }
  
};

const closelightbox = () => {
  lightbox.classList.remove("openlightbox");
  lightbox.classList.add("hidden");
};
const getTotalImagesLength = (data) => {
  let totalLength = 0;
  for (const obj of data) {
    for (const key in obj) {
      totalLength += obj[key].length;
    }
  }
  return totalLength;
};

const nextImage = () => {
  const length=getTotalImagesLength(images);
  if (currentImageIndex < length) {
    currentImageIndex++;
    if (currentImageIndex === length) {
      next.classList.add("disabled");
    } else {
      next.classList.remove("disabled");
    }
    if (currentImageIndex === 1) {
      prev.classList.add("disabled");
    } else {
      prev.classList.remove("disabled");
    }
    const image=findImageById(images,currentImageIndex);
    lightboximage.src = image.src;
    lightboximage.alt = image.name;
    lightboximage.dataset.index = image.id;
    imageindex.textContent = `${currentImageIndex} of ${length}`;
    imagetitle.textContent = image.name;
    imagecategory.textContent = image.category;
    
  }
};

const prevImage = () => {
  const length=getTotalImagesLength(images);
  if (currentImageIndex > 1) {
    currentImageIndex--;
    if (currentImageIndex === 1) {
      prev.classList.add("disabled");
    } else {
      prev.classList.remove("disabled");
    }
    if (currentImageIndex === length) {
      next.classList.add("disabled");
    } else {
      next.classList.remove("disabled");
    }
    const image=findImageById(images,currentImageIndex);
    lightboximage.src = image.src;
    lightboximage.alt = image.name;
    lightboximage.dataset.index = image.id;
    imageindex.textContent = `${currentImageIndex} of ${length}`;
    imagetitle.textContent = image.name;
    imagecategory.textContent = image.category;
    
  }
};

const setCurrentImage = (index) => {
  currentImageIndex = index;
  openLightbox(currentImageIndex);
};

close.addEventListener("click", closelightbox);
next.addEventListener("click", nextImage);
prev.addEventListener("click", prevImage);
