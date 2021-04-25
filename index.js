'use strict';

const Discord = require('discord.js');
const { default: fetch } = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var Storage = require('node-storage');
var store = new Storage('boobas.txt');

const client = new Discord.Client();
client.on('ready', async () => {
    setInterval(async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://booba.tv/");
        let bodyHTML = await page.evaluate(() => document.body.innerHTML);

        const $ = cheerio.load(bodyHTML);
        let out = [];
        let temp = [];
        let boobaStore = store.get('boobas');
        if ($("#grid a").length > 0) {
            $("#grid a").each(function () {
                let href = $(this).attr("href");
                temp.push(href);
                if (boobaStore.indexOf(href) === -1) {
                    out.push(href);
                }

            });
            store.put('boobas', temp);
        }
        if (out.length > 0) {
            out = out.join("\n");
            out = "New Boobas \n" + out;
        } else {
            out = "No new booba :( :(";
        }
        try {
            let toSay = out;
            /*    client.guilds.cache.map((guild) => {
                    let found = 0
                    guild.channels.cache.map((c) => {
                        if (found === 0) {
                            if (c.type === "text") {
                                c.send(toSay);
                                found = 1;
                            }
                        }
                    });
                });*/

            client.channels.cache.get("835998143857950751").send(out);
        }
        catch (err) {
            console.log("Could not send message to a (few) guild(s)!");
        }
    }, 10 * 60 * 1000);
});

client.on('message', async message => {
    if (message.content === 'booba') {
        message.channel.send('show booba');
    }
});

client.login('');
