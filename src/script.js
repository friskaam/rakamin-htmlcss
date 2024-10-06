// hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

let lastScrollTop = 0;
const header = document.getElementById('header');

window.onscroll = function () {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    header.classList.add('translate-y-[-100%]');
  } else {
    header.classList.remove('translate-y-[-100%]');
  }

  lastScrollTop = currentScrollTop;

  const startSection = document.getElementById('start');
  const startPosition = startSection.getBoundingClientRect().top;

  if (startPosition <= 0) {
    header.classList.remove('border-b', 'shadow');
  } else {
    header.classList.add('border-b', 'shadow');
  }
};


// carousel
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

function nextSlide() {
  currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
  showSlide(currentSlide);
}

document.getElementById('prevBtn').addEventListener('click', () => {
  currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
  showSlide(currentSlide);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  nextSlide();
});

showSlide(currentSlide);

setInterval(nextSlide, 2000);

// scroll reveal

// indonesia map
document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map", {
    center: [-2.5, 118],
    zoom: 4,
    minZoom: 3
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  const southWest = L.latLng(-11.0, 95.0);
  const northEast = L.latLng(6.0, 141.0);
  const bounds = L.latLngBounds(southWest, northEast);

  map.setMaxBounds(bounds);

  map.on("drag", function () {
    map.panInsideBounds(bounds);
  });

  L.rectangle(
    [
      [90, -180],
      [-90, 180],
    ],
    {
      color: "black",
      weight: 0,
      fill: true,
      fillColor: "black",
      fillOpacity: 1,
    }
  ).addTo(map);

  fetch("indonesia-prov.geojson")
    .then((response) => response.json())
    .then((data) => {
      const geojsonLayer = L.geoJSON(data, {
        style: {
          fillColor: "black",
          color: "orange",
          weight: 2,
          opacity: 1,
          fillOpacity: 1,
        },
        onEachFeature: (feature, layer) => {
          layer.on("mouseover", () => {
            layer.setStyle({ fillColor: "orange" });
            layer.bindTooltip(feature.properties.Propinsi).openTooltip();
          });

          layer.on("mouseout", () => {
            layer.setStyle({ fillColor: "black" });
            layer.closeTooltip();
          });

          layer.on("click", () => {
            layer.closeTooltip();
          });
        },
      }).addTo(map);
    })
    .catch((err) => console.error("Error loading GeoJSON:", err));
});
