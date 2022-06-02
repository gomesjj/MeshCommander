/** 
* @description Set of short commonly used methods for handling HTML elements
* @author Ylian Saint-Hilaire
* @version v0.0.1b
*/

// Add startsWith for IE browser
if (!String.prototype.startsWith) { String.prototype.startsWith = function (str) { return this.lastIndexOf(str, 0) === 0; }; }
if (!String.prototype.endsWith) { String.prototype.endsWith = function (str) { return this.indexOf(str, this.length - str.length) !== -1; }; }

// Quick UI functions, a bit of a replacement for jQuery
//function Q(x) { if (document.getElementById(x) == null) { console.log('Invalid element: ' + x); } return document.getElementById(x); }                            // "Q"
function Q(x) { return document.getElementById(x); }                            // "Q"
function QS(x) { try { return Q(x).style; } catch (x) { } }                     // "Q" style
function QE(x, y) { try { Q(x).disabled = !y; } catch (x) { } }                 // "Q" enable
function QV(x, y) { try { QS(x).display = (y ? '' : 'none'); } catch (x) { } }  // "Q" visible
function QA(x, y) { Q(x).innerHTML += y; }                                      // "Q" append
function QH(x, y) { Q(x).innerHTML = y; }                                       // "Q" html

// Move cursor to end of input box
function inputBoxFocus(x) { Q(x).focus(); var v = Q(x).value; Q(x).value = ''; Q(x).value = v; }

// Binary encoding and decoding functions
function ReadShort(v, p) { return (v.charCodeAt(p) << 8) + v.charCodeAt(p + 1); }
function ReadShortX(v, p) { return (v.charCodeAt(p + 1) << 8) + v.charCodeAt(p); }
function ReadInt(v, p) { return (v.charCodeAt(p) * 0x1000000) + (v.charCodeAt(p + 1) << 16) + (v.charCodeAt(p + 2) << 8) + v.charCodeAt(p + 3); } // We use "*0x1000000" instead of "<<24" because the shift converts the number to signed int32.
function ReadSInt(v, p) { return (v.charCodeAt(p) << 24) + (v.charCodeAt(p + 1) << 16) + (v.charCodeAt(p + 2) << 8) + v.charCodeAt(p + 3); }
function ReadIntX(v, p) { return (v.charCodeAt(p + 3) * 0x1000000) + (v.charCodeAt(p + 2) << 16) + (v.charCodeAt(p + 1) << 8) + v.charCodeAt(p); }
function ShortToStr(v) { return String.fromCharCode((v >> 8) & 0xFF, v & 0xFF); }
function ShortToStrX(v) { return String.fromCharCode(v & 0xFF, (v >> 8) & 0xFF); }
function IntToStr(v) { return String.fromCharCode((v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF); }
function IntToStrX(v) { return String.fromCharCode(v & 0xFF, (v >> 8) & 0xFF, (v >> 16) & 0xFF, (v >> 24) & 0xFF); }
function MakeToArray(v) { if (!v || v == null || typeof v == 'object') return v; return [v]; }
function SplitArray(v) { return v.split(','); }
function Clone(v) { return JSON.parse(JSON.stringify(v)); }
function EscapeHtml(x) { if (typeof x == 'string') return x.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;'); if (typeof x == 'boolean') return x; if (typeof x == 'number') return x; }
function NoBreak(v) { return v.split(' ').join('&nbsp;'); }

// Move an element from one position in an array to a new position
function ArrayElementMove(arr, from, to) { arr.splice(to, 0, arr.splice(from, 1)[0]); };

// Print object for HTML
function ObjectToStringEx(x, c) {
    var r = "";
    if (x != 0 && (!x || x == null)) return "(Null)";
    if (x instanceof Array) { for (var i in x) { r += '<br />' + gap(c) + "Item #" + i + ': ' + ObjectToStringEx(x[i], c + 1); } }
    else if (x instanceof Object) { for (var i in x) { r += '<br />' + gap(c) + i + ' = ' + ObjectToStringEx(x[i], c + 1); } }
    else { r += EscapeHtml(x); }
    return r;
}

// Print object for console
function ObjectToStringEx2(x, c) {
    var r = "";
    if (x != 0 && (!x || x == null)) return "(Null)";
    if (x instanceof Array) { for (var i in x) { r += '\r\n' + gap2(c) + "Item #" + i + ': ' + ObjectToStringEx2(x[i], c + 1); } }
    else if (x instanceof Object) { for (var i in x) { r += '\r\n' + gap2(c) + i + ' = ' + ObjectToStringEx2(x[i], c + 1); } }
    else { r += EscapeHtml(x); }
    return r;
}

// Create an ident gap
function gap(c) { var x = ''; for (var i = 0; i < (c * 4) ; i++) { x += '&nbsp;'; } return x; }
function gap2(c) { var x = ''; for (var i = 0; i < (c * 4) ; i++) { x += ' '; } return x; }

// Print an object in html
function ObjectToString(x) { return ObjectToStringEx(x, 0); }
function ObjectToString2(x) { return ObjectToStringEx2(x, 0); }

// Convert a hex string to a raw string
function hex2rstr(d) {
    if (typeof d != 'string' || d.length == 0) return '';
    var r = '', m = ('' + d).match(/../g), t;
    while (t = m.shift()) r += String.fromCharCode('0x' + t);
    return r
}

// Convert decimal to hex
function char2hex(i) { return (i + 0x100).toString(16).substr(-2).toUpperCase(); }

// Convert a raw string to a hex string
function rstr2hex(input) {
    var r = '', i;
    for (i = 0; i < input.length; i++) { r += char2hex(input.charCodeAt(i)); }
    return r;
}

// UTF-8 encoding & decoding functions
function encode_utf8(s) { return unescape(encodeURIComponent(s)); }
function decode_utf8(s) { return decodeURIComponent(escape(s)); }

// Convert a string into a blob
function data2blob(data) {
    var bytes = new Array(data.length);
    for (var i = 0; i < data.length; i++) bytes[i] = data.charCodeAt(i);
    var blob = new Blob([new Uint8Array(bytes)]);
    return blob;
}

// Generate random numbers
function random(max) { return Math.floor(Math.random() * max); }

// Trademarks
function trademarks(x) { return x.replace(/\(R\)/g, '&reg;').replace(/\(TM\)/g, '&trade;'); }

// Format
function format(format) { var args = Array.prototype.slice.call(arguments, 1); return format.replace(/{(\d+)}/g, function (match, number) { return typeof args[number] != 'undefined' ? args[number] : match; }); };

// Returns a UEFI boot parameter in binary
function makeUefiBootParam(type, data, len, vendorid) {
    if (typeof data == 'number') { if (len == 1) { data = String.fromCharCode(data & 0xFF); } if (len == 2) { data = ShortToStrX(data); } if (len == 4) { data = IntToStrX(data); } }
    return ShortToStrX(vendorid ? vendorid : 0x8086) + ShortToStrX(type) + IntToStrX(data.length) + data;
}