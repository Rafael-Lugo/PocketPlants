const Light_Icon = {
    "Full Sun": "/assets/icons/light_full-sun.svg",
    "Partial Shade": "/assets/icons/light_partial-shade.svg",
    "Full Shade": "/assets/icons/light_full-shade.svg",
};

const Water_Icon = {
    "Low": "/assets/icons/water_low.svg",
    "Medium": "/assets/icons/water_medium.svg",
    "High": "/assets/icons/water_high.svg",
};

export function getLightIconSrc(lightNeed) {
    return Light_Icon[lightNeed] ?? null;
}

export function getWaterIconSrc(waterNeed) {
    return Water_Icon[waterNeed] ?? null;
}