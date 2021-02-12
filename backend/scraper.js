const scrapeIt = require("scrape-it");
const fs = require('fs');
var _ = require('lodash');
const { response } = require("express");

const languages = ["es"]; //en
const _types = ["channels", "groups"];


// TODO: ADD TIMEOUT
// TODO: A VECES SE QUEDA EN EN_GROUPS DONE (NO TERMINA LOS EN CHANNELS)
function capitalizeStr(str) { // "flavio" -> "Flavio"
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function parseCategory(str) { // Parse category string from telegramchannels.me cards
    let result = str.split(" ")[str.split(" ").length-1].toLowerCase();
    return capitalizeStr(result);
}

let attempt = 0;

const getTelegramInfo = (username) => { // Returns a promise ({ data, response }) response.statusCode
    /*return new Promise(async (resolve,reject) => {
        let retries = 0;
        
*/
        return scrapeIt("https://t.me/"+username, 
        {
            // data object:
            title: ".tgme_page_title span"
            , description: ".tgme_page_description"
            , members: { selector: ".tgme_page_extra", convert: x => {
                x = x.split(" ")[0]
                return parseInt(x);
            }}
            , image: {
                    selector: ".tgme_page_photo_image", attr: "src"
                }
        });


   // });
}

const scrapeTelegramChannels = async (onResult) => { // scrape telegramchannels.me
    let g_promises = [];
    let result_entries = [];

    _types.forEach(async type => {
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

exports.getTelegramInfo = getTelegramInfo;
exports.scrapeTelegramChannels = scrapeTelegramChannels;