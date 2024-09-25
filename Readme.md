# MMM-WasteCollectionWuerzburg

This is a Magic Mirror module to display waste collection dates of Würzburg on your [Magic Mirror}[https://github.com/MagicMirrorOrg/MagicMirror] displays.

It uses [OpenData Platform Würzburg][https://opendata.wuerzburg.de] and its [Waste collection API endpoint][https://opendata.wuerzburg.de/explore/dataset/abfallkalender-wuerzburg/api].

![Screenshot](mmm-wastecollectionwuerzburg.png)

# Table of Contents
* [How to use](#how-to-use)
* [Configuration Options](#configuration-options)

### How to use
1. Clone this repo into your Magic Mirrors modules directory with the following command: git clone https://github.com/mercredo/MMM-WasteCollectionWuerzburg.git.
2. Install all the npm modules with *npm install*.
3. Insert module config into Magic Mirror config.

### Configuration Options
| Option | Description |
|---|---|
| title | Title to display at the top of the module. <br><br> |
| districts | Specify Würzburg districts to be displayed. <br><br> |
| categories | Specify Waste Collection categories to be displayed. <br><br> |
| updateInterval | Data refresh interval in milliseconds. <br><br> **Default:** 604800*1000 |
| showTypes | Print out waste type names. <br><br> **Default:** true |
| showDistrict | Print out district name. Recommended if you select multiple districts. <br><br> **Default:** false |
| showYear | Display year in date column. **Default:** false |
| rowsMax | How many rows to be displayed. **Default:** 5