"use strict";

import Tinkerforge from 'tinkerforge'


const con = new Tinkerforge.IPConnection();
con.connect('localhost', 4223, console.error);
