// hamburger menu

// scroll reveal

// indonesia map
document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map", {
    center: [-2.5, 118],
    zoom: 5,
    minZoom: 5,
    maxZoom: 5,
    worldCopyJump: false,
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
      color: "b;ack",
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
