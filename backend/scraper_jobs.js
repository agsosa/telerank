const scraper = require('./scraper');
const firebase = require('./firebase');
const database = require('./database');

function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}

const initialize = () => {

    console.log("scraper_jobs initialized");

    Job_FindNewChannels();

 //   const usernames = ["ofertify","BitMEXSniper","cgpers","thebull_crypto"];
}

const Job_UpdateChannelsInfo = () => {
    // Grab existing entries from database then update info with 
}

let attempt = 0;

/*const Job_FindNewChannels = async () => {
    let promises = [];

    console.log("Running Job_FindNewChannels()");

    firebase.getAllEntries((saved_entries) => {
        //console.log("saved_entries = "+JSON.stringify(saved_entries));
        saved_entries = [];
        console.log("Loaded "+saved_entries.length+" entries from database");
        scraper.scrapeTelegramChannels(async (entries) => {
            console.log("looping entries size = "+roughSizeOfObject(entries)+" bytes");
            
            for(let i = 0; i < entries.length; i++) {
                let q = entries[i];

                if (promises.length >= 2) {
                    await Promise.allSettled(promises); // Wait for all current requests
                    promises = [];
                }

                let found = saved_entries && saved_entries.length > 0 && saved_entries.find(e => e.username == q.username);
                if (!found) {

                    let prom = scraper.getTelegramInfo(q.username).then(({data, response}) => {
                        attempt++;
                        if (response.statusCode == 200) {
                            //console.log("result = "+JSON.stringify(data));
                            //console.log("saving "+q.username+" to database");
                            if (Number.isNaN(data.members)) {
                                console.log("ERROR NUMBER IS NAN attempt = "+attempt+" username = "+q.username+" type = "+q.type);
                            }

                            q.title = data.title;
                            q.description = data.description;
                            q.members = data.members;
                            q.image = data.image;
                            q.created_date = Date.now();
                            q.updated_date = Date.now();
                            q.likes = 0;
                            q.dislikes = 0;
                            q.featured = false;

                            //console.log(q.image);

                            // save to database
                            //firebase.addEntry(q);
                        }
                        else {
                            console.log("status code = "+response.statusCode+" for "+q.username);
                        }
                    });

                    promises.push(prom);
                }

            }
            
        });
    });
}*/

const Job_FindNewChannels = async () => {
    let promises = [];

    console.log("Running Job_FindNewChannels()");

    database.GetAllEntries((db_entries) => {
        scraper.scrapeTelegramChannels(async (scraped_entries) => {
            let new_entries = scraped_entries.filter(q => !db_entries.find(d => d.username == q.username));
            console.log("Found "+new_entries.length+" / "+scraped_entries.length+" new entries.");

            for(let i = 0; i < new_entries.length; i++) {
                let q = new_entries[i];
                
                await new Promise((resolve, reject) => {
                    scraper.getTelegramInfo(q.username).then(({data, response}) => {
                        if (response.statusCode == 200 && data && data.members && !Number.isNaN(data.members)) {
                            q.title = data.title;
                            q.description = data.description;
                            q.members = data.members;
                            q.image = data.image;
                            q.created_date = Date.now();
                            q.updated_date = Date.now();
                            q.likes = 0;
                            q.dislikes = 0;
                            q.featured = false;

                            console.log("Success "+JSON.stringify(q));

                            database.AddEntry(q, () => resolve());
                        }
                        else {
                            console.log("Failed getTelegramInfo for "+q.username+" response.statusCode = "+response.statusCode+" data = "+JSON.stringify(data));
                            resolve();
                        }
                    })
                })
            }
            
            console.log("Job_FindNewChannels is done")
        })
    })
}
/*
        scraper.scrapeTelegramChannels(async (entries) => {
            for(let i = 0; i < entries.length; i++) {
                let q = entries[i];

                await new Promise((resolve, reject) => { // TODO: ADD TIMEOUT, FAILED CHECK/RETRY ETC.
                    console.log("Executing telegram.py for "+q.username)
                    const spawn = require("child_process").spawn;

                    const pythonProcess = spawn('python', ["./telegram_single.py", q.username]);
                
                    pythonProcess.stdout.setEncoding("latin1");
                
                    pythonProcess.stdout.on('data', (res) => {
                        //let parsed = JSON.parse(data);
                        data = JSON.parse(res);

                        if (!data || !data.members || Number.isNaN(data.members)) {
                            console.log("Received invalid data from Python "+data+" "+data.members+" "+toString(Number.isNaN(data.members)));
                            resolve();
                        }
                        
                        q.title = data.title;
                        q.description = data.description;
                        q.members = data.members;
                        q.image = data.image;
                        q.created_date = Date.now();
                        q.updated_date = Date.now();
                        q.likes = 0;
                        q.dislikes = 0;
                        q.featured = false;

                        console.log("final q = "+JSON.stringify(q));

                        database.AddEntry(q, () => resolve());

                    // resolve();
                    });
                });
            }
        });

        */


exports.initialize = initialize;