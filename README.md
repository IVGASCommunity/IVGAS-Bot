# IVGAS-Bot
Bot for the IVGAS Discord by @BreakTruth

## Installation
1. Install [node.js](https://nodejs.org/en/)
2. clone this git
3. open the `package.json` file and find the **dependencies**. now go to your terminal and write `npm -i ` + all the names of the packages separated by spaces. In the case of `discord.js` & `discord.js-commando` it is slightly different as we are using the master version. To download those you do still `npm -i ` but this time you get the content of the string after the name. For example `npm -i github:hydrabolt/discord.js`, and for normal packages `npm -i sqlite`.
4. make a file in the main directory called `token.js` and write in it `module.exports = "";`, and in the quotation marks you put the bot token.
5. to run the bot just write `npm start` in your command-line. If you have something like `nodemon` which allows it to reexecute the bot when files are added/removed/saved, instead of doing that every time you ahve changes, you would do `nodemon index.js`.
