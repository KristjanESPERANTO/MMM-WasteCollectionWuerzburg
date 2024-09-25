# Waste Collection Wuerzburg as Magic Mirror Module
## MMM-WasteCollectionWuerzburg

This is a Magic Mirror module to display Waste Collection dates of Würzburg on your Magic Mirror displays.

![Screenshot](mmm-wastecollectionwuerzburg.png)

# Table of Contents
* [How to use](#how-to-use)
* [Configuration Options](#configuration-options)
* [License](#license)    

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
| updateInterval | Data reffresh interval in milliseconds. <br><br> **Default:** 604800*1000 |
| showTypes | Print out waste type names. <br><br> **Default:** true |
| showDistrict | Print out district name. Recommended if you select multiple districts. <br><br> **Default:** false |
| showYear | Display year in date column. **Default:** false |
| rowsMax | How many rows to be displayed. **Default:** 5 

### License
The MIT License (MIT)
=====================

Copyright © 2021 Brian Towles

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**

