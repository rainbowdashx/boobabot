'use strict';



const Discord = require('discord.js');
const { default: fetch } = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const client = new Discord.Client();
client.on('ready', () => {
    console.log('I am ready!');
});
client.on('message', async message => {
    if (message.content === 'booba') {
        let result = await fetch("https://booba.tv/").then(res => res.text());

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://booba.tv/");
        let bodyHTML = await page.evaluate(() => document.body.innerHTML);

        const $ = cheerio.load(bodyHTML);
        let out = [];
        $("#grid a").each(function () {
            out.push($(this).attr("href"));
        });

        out = out.join(" ");

        message.channel.send(out);
    }
});

client.login('ODM1OTc1NTgxNDA0NjI3MDA0.YIXQ7g.TUrjeDrWfgg8vN0vtp_epvpDKRU');