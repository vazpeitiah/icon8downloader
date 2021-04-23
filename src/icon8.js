const cheerio = require("cheerio");
const axios = require("axios");

const ICON8_BASE = "https://icons8.com";
const ICONS_PREFIX = "/icons";
const SET_PREFIX = "/set";
const DEFAULT_SIZE = "2x";

icon8 = {};

icon8.getIconsForAnyCategory = async (keywords, size) => {
    iconList = [];
    try {
        const url = ICON8_BASE + ICONS_PREFIX + SET_PREFIX + "/" + keywords;
        const response = await axios.get(url,  {'mode': 'no-cors'});
        const $ = cheerio.load(response.data);
        const icons = $(".grid-icon");
        icons.each(function () {
            icon = $(this).find(".grid-icon__link .app-icon img").prop("src");
            title = $(this).find(".grid-icon__title").text();
            category = icon.split("/").filter(a=> a != 'https:' && a != 'img.icons8.com' && a != '2x' && a != '')[0];
            if (typeof icon !== "undefined") {
                icon = icon.replace(DEFAULT_SIZE, size);
                iconList.push(
                    { "title": title.trim(), "url": icon, "category": category }
                );
                
            }
        });
    } catch (err) {
        console.error(err);
    }
    return iconList;
}

icon8.getIconsByCategory = async (keywords, size, cat) => {
    iconList = [];
    try {
        const url = ICON8_BASE + ICONS_PREFIX + SET_PREFIX + "/" + keywords;
        const response = await axios.get(url,  {'mode': 'no-cors'});
        const $ = cheerio.load(response.data);
        const icons = $(".grid-icon");
        icons.each(function () {
            icon = $(this).find(".grid-icon__link .app-icon img").prop("src");
            title = $(this).find(".grid-icon__title").text();
            category = icon.split("/").filter(a=> a != 'https:' && a != 'img.icons8.com' && a != '2x' && a != '')[0];
            console.log(category)
            if (typeof icon !== "undefined") {
                icon = icon.replace(DEFAULT_SIZE, size);
                if (category === cat){
                    iconList.push(
                        { "title": title.trim(), "url": icon, "category": category }
                    );
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
    return iconList;
}

module.exports = icon8;