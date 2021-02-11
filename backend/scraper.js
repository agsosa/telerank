const scrapeIt = require("scrape-it");
const fs = require('fs');
var _ = require('lodash');

const languages = ["en", "es"];
const types = ["channels", "groups"];

function capitalizeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function parseCategory(str) {
    let result = str.split(" ")[str.split(" ").length-1].toLowerCase();
    return capitalizeStr(result);
}

const scrapeTelegramInfo = () => {
    return scrapeIt("https://t.me/s/"+username, 
    {
        title: ".tgme_channel_info_header_title span"
        , username: ".tgme_channel_info_header_username"
        , desc: ".tgme_channel_info_description"
        , members: { selector: ".tgme_channel_info_counters span", eq: 0, convert: x => parseInt(x) }
        , image: {
                selector: ".tgme_page_photo_image img", attr: "src"
            }
    })/*.then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`)
        console.log(data)
    });*/
}

const scrapeTelegramChannels = async (onResult) => {
    types.forEach(async type => {
        languages.forEach(async lang => {
            let base_url = "https://telegramchannels.me/"+lang+"/"+type+"?category=all&sort=newest&page=";
            let page = 1;
            let all_entries = [];

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

                for(page = 1; page < max_pages; page++) { // process every page
                    promises.push(scrapeIt(base_url+page, 
                        {
                            entries: {
                                listItem: "div.media-card",
                                name: "entries",
                                data: { 
                                    category:  {selector: ".card-label", convert: x => parseCategory(x) },
                                    username: { selector: "a", attr: "href", convert: x => x.split("/")[x.split("/").length-1]},
                                }
                            }
                        }).then(({ data, response }) => {
                            data.entries.forEach(q => {
                                q.type = capitalizeStr(type);
                                q.language = lang;
                                all_entries.push(q);
                            });
                        }));
                }

                await Promise.allSettled(promises);
            });
            // -------- END AWAIT

            console.log("all_entries length before dedupe = "+all_entries.length);
            all_entries = _.uniqBy(all_entries, 'username'); // remove duplicated usernames
            console.log("all_entries length after dedupe = "+all_entries.length);
            
            console.log("- Scraping "+lang+"_"+type+" done. TOTAL ENTRIES: "+all_entries.length);
            let filename = type+"_"+lang+"_"+Date.now()+".json";
            console.log("- Exporting results to "+filename);
            fs.writeFile(filename, JSON.stringify(all_entries), (err) => {
                if (err) {
                    throw err;
                }
            });

        });
    });
}

const scrapeItExample = () => {
    scrapeTelegramChannels();
}

exports.test = scrapeItExample;