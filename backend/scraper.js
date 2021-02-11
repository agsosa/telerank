const scrapeIt = require("scrape-it");
const fs = require('fs');
var _ = require('lodash');

const languages = ["en", "es"];
const types = ["channels", "groups"];

function capitalizeStr(str) { // "flavio" -> "Flavio"
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function parseCategory(str) { // Parse category string from telegramchannels.me cards
    let result = str.split(" ")[str.split(" ").length-1].toLowerCase();
    return capitalizeStr(result);
}

const scrapeTelegramInfo = (username) => { // Returns a promise
    /*return scrapeIt("https://t.me/s/"+username, 
    {
        title: ".tgme_channel_info_header_title span"
        , username: ".tgme_channel_info_header_username"
        , desc: ".tgme_channel_info_description"
        , members: { selector: ".tgme_channel_info_counters span", eq: 0, convert: x => parseInt(x) }
        , image: {
                selector: ".tgme_page_photo_image img", attr: "src"
            }
    })*//*.then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`)
        console.log(data)
    });*/
    scrapeIt("https://t.me/"+username, 
    {
        title: ".tgme_page_title span"
        , desc: ".tgme_page_description"
        , members: { selector: ".tgme_page_extra", convert: x => {
            x = x.split(" ")[0]
            return parseInt(x);
        }}
        , image: {
                selector: ".tgme_page_photo_image", attr: "src"
            }
    }).then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`)
        console.log(data)
    });
}

const scrapeTelegramChannels = async (onResult) => { // scrape telegramchannels.me
    let g_promises = [];
    let result_entries = [];

    types.forEach(async type => {
        languages.forEach(async lang => {
            // g_promise start
            let g_promise = new Promise( async (resolve,reject) => {
                let base_url = "https://telegramchannels.me/"+lang+"/"+type+"?category=all&sort=newest&page=";
                let page = 1;
                let added = 0;

                console.log("Language "+lang+" Type "+type);

                // ---------- START AWAIT (GET MAX PAGES -> LOOP UNTIL MAX_PAGES FETCHING EVERY ENTRY ON EACH PAGE)
                await scrapeIt(base_url+page, // get max pages
                {
                    pagination: {
                        listItem: ".pagination-list li",
                        data: "a",
                    }
                }).then(async ({ data, response }) => { // loop max_pages
                    let max_pages = parseInt(data.pagination[data.pagination.length-1]);
                    console.log("Found max_pages = "+max_pages);

                    let promises = [];

                    // Process media-card for every page
                    for(page = 1; page < max_pages; page++) {
                        promises.push(scrapeIt(base_url+page, 
                            {
                                entries: {
                                    listItem: "div.media-card",
                                    name: "entries",
                                    data: { 
                                        category:  {selector: ".card-label", convert: x => parseCategory(x) },
                                        username: { selector: "a", attr: "href", convert: x => x.split("/")[x.split("/").length-1].toLowerCase()},
                                    }
                                }
                            }).then(({ data, response }) => {
                                data.entries.forEach(q => {
                                    q.type = capitalizeStr(type);
                                    q.language = lang;
                                    result_entries.push(q);
                                    added++;
                                });
                            }));
                    }

                    await Promise.allSettled(promises);
                });
                // -------- END AWAIT

                console.log("Scraping "+lang+"_"+type+" done. Added "+added+" entries");

                resolve();
            }); // end g_promise

            g_promises.push(g_promise);
        }); // end languages.foreach
    }); // end types.foreach

    await Promise.allSettled(g_promises);

    result_entries = _.uniqBy(result_entries, 'username'); // remove duplicated usernames
    console.log(">> scrapeTelegramChannels is done. Total Entries = "+result_entries.length);

    if (onResult) onResult(result_entries);
}

const scrapeItExample = () => {
    //scrapeTelegramInfo();
    //scrapeTelegramChannels();
}


exports.test = scrapeItExample;