const Light_Icon = {
  "Full Sun": "/symbol/light_full-sun.svg",
  "Partial Shade": "/symbol/light_partial-shade.svg",
  "Full Shade": "/symbol/light_full-shade.svg",
};

const Water_Icon = {
  Low: "/symbol/water_low.svg",
  Medium: "/symbol/water_medium.svg",
  High: "/symbol/water_high.svg",
};

const Fertiliser_Icon = {
  Spring: "/symbol/spring.svg",
  Summer: "/symbol/summer.svg",
  Autumn: "/symbol/autumn.svg",
  Winter: "/symbol/winter.svg",
};

export function getLightIconSrc(lightNeed) {
  return Light_Icon[lightNeed] ?? null;
}

export function getWaterIconSrc(waterNeed) {
  return Water_Icon[waterNeed] ?? null;
}

export function getFertiliserIconSrc(fertiliserSeasons) {
  return Fertiliser_Icon[fertiliserSeasons] ?? null;
}
