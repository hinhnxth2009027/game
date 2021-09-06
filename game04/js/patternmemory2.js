(function () {
    var f = {
        controls: {touch: {}},
        core: {},
        display: {animation: {}, font: {}, graphics: {}, svg: {}, text: {}},
        encode: {},
        hash: {},
        language: {},
        io: {},
        math: {path: {}},
        net: {},
        platform: {audio: {}, graphics: {}, input: {}, io: {}, net: {}},
        sounds: {},
        util: {}
    };
    window.nogic = f;
    f.platform.Preload = function (a, b, d, c, e, h, f, g, j, l, m, n) {
        this.parameters = f;
        null == this.parameters && (this.parameters = {});
        this.extraParameters = g;
        null == this.extraParameters && (this.extraParameters = {});
        this.extraParameters.forceCoversWholeBrowser ? (a.style.position = "absolute", a.style.left = "0px", a.style.top = "0px", a.width = document.documentElement.clientWidth, a.height = document.documentElement.clientHeight) : this.extraParameters.forceCanvasSize && (a.width = a.clientWidth, a.height = a.clientHeight);
        this.canvas = a;
        this.canvasContext = a.getContext("2d");
        a.setAttribute("tabIndex", 0);
        this.widths = b;
        this.heights = d;
        this.aspectRatioFixeds = c;
        this.backgroundColor = e;
        this.backgroundOutsideColor = h;
        this.backgroundFillStyle = "rgba(" + (e >>> 16 & 255) + "," + (e >>> 8 & 255) + "," + (e & 255) + "," + (e >>> 24 & 255) / 255 + ")";
        this.backgroundOutsideFillStyle = "rgba(" + (h >>> 16 & 255) + "," + (h >>> 8 & 255) + "," + (h & 255) + "," + (h >>> 24 & 255) / 255 + ")";
        this.updateCurrentScreenSizeIndex(a.clientWidth, a.clientHeight);
        this.canvasWidth = a.width;
        this.canvasHeight = a.height;
        this.canvasClientWidth = a.clientWidth;
        this.canvasClientHeight = a.clientHeight;
        this.createScreenTransform(b[this.currentScreenSizeIndex], d[this.currentScreenSizeIndex], a.width, a.height, a.clientWidth, a.clientHeight);
        this.filesFolder = j;
        this.useMergedAssets = l;
        this.mergedJavaScriptsPath = m;
        this.splashScreenPath = n
    };
    f.platform.Preload.prototype.updateCurrentScreenSizeIndex = function (a, b) {
        var d, c, e, h;
        d = Number.POSITIVE_INFINITY;
        for (h = 0; h < this.widths.length; h++) c = a / this.widths[h], e = b / this.heights[h], c = c < e ? b / (this.heights[h] * c) : a / (this.widths[h] * e), c < d && (this.currentScreenSizeIndex = h, d = c)
    };
    f.platform.Preload.prototype.createScreenTransform = function (a, b, d, c, e, h) {
        var k;
        d = e / d;
        c = h / c;
        k = new f.platform.Preload.Matrix;
        k.scale(d, c);
        c = k.createInverse();
        d = Math.min(e / a, h / b);
        a = (e - d * a) / 2;
        b = (h - d * b) / 2;
        this.overallTransform = new f.platform.Preload.Matrix;
        this.overallTransform.translate(a, b);
        this.overallTransform.scale(d, d);
        this.overallTransformInverse = this.overallTransform.createInverse();
        this.screenTransform = this.overallTransform.clone();
        this.screenTransform.preConcatenate(c);
        this.screenTransformInverse = this.screenTransform.createInverse()
    };
    f.platform.Preload.prototype.initialize = function (a) {
        this.checkBrowser() && (this.checkRunningLocally(), this.programEntryPointClassName = a, this.showSplashScreen())
    };
    f.platform.Preload.prototype.checkBrowser = function () {
        if (this.checkBrowserIsIE9OrBelow()) return alert("Internet Explorer 9 or below is not supported, please update to version 10 or above."), !1;
        if (!1 == this.extraParameters.allowRunInAndroidDefaultBrowser && this.checkBrowserIsAndroidStock()) return alert("The default browser on Android is not supported, please download another browser such as Chrome, Firefox or Opera from Play Store."), !1;
        try {
            new ArrayBuffer(0)
        } catch (a) {
            alert("This browser is not supported. Please use the latest version of Internet Explorer, Firefox, Chrome, Safari, or Opera.")
        }
        return !0
    };
    f.platform.Preload.prototype.checkBrowserIsIE9OrBelow = function () {
        var a;
        a = /\bMSIE\b\s*(\d+)\.\d+\b/.exec(navigator.userAgent);
        return null != a && 9 >= a[1]
    };
    f.platform.Preload.prototype.checkBrowserIsAndroidStock = function () {
        return !/\bAndroid\b/.test(navigator.userAgent) || /\bChrome\b/.test(navigator.userAgent) || /\bFirefox\b/.test(navigator.userAgent) ? !1 : !0
    };
    f.platform.Preload.prototype.checkRunningLocally = function () {
        if ("http" == document.location.href.substr(0, 4)) return !0;
        alert("Loading from the local computer may or may not work, depending on the browser you are using and the security settings. If there are any problems, try using another web browser or loading from a web server.")
    };
    f.platform.Preload.prototype.showSplashScreen = function () {
        this.canvasContext.save();
        this.canvasContext.fillStyle = this.aspectRatioFixeds[this.currentScreenSizeIndex] ? this.backgroundOutsideFillStyle : this.backgroundFillStyle;
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.restore();
        this.loadSplashScreen()
    };
    f.platform.Preload.prototype.loadSplashScreen = function () {
        this.useMergedAssets ? this.loadMergedSplashScreen() : this.loadNormalSplashScreen()
    };
    f.platform.Preload.prototype.loadNormalSplashScreen = function () {
        var a = this, b, d, c;
        null == this.splashScreenPath ? this.loadSplashScreenFinished(!1, b) : (d = function () {
            a.loadSplashScreenFinished(!0, b)
        }, c = function () {
            a.loadSplashScreenFinished(!1, b)
        }, b = new Image, b.crossOrigin = "Anonymous", b.onload = d, b.onerror = c, b.onabort = c, b.src = this.splashScreenPath)
    };
    f.platform.Preload.prototype.loadMergedSplashScreen = function () {
        var a = this, b, d, c;
        null == this.splashScreenPath ? this.loadSplashScreenFinished(!1, b) : (d = function () {
            a.loadMergedSplashScreenFinished(!0, b)
        }, c = function () {
            a.loadMergedSplashScreenFinished(!1, b)
        }, b = new Image, b.crossOrigin = "Anonymous", b.onload = d, b.onerror = c, b.onabort = c, b.src = this.splashScreenPath)
    };
    f.platform.Preload.prototype.loadMergedSplashScreenFinished = function (a, b) {
        var d = this, c, e, h, f, g, j, l;
        if (a) {
            j = function () {
                d.loadSplashScreenFinished(!0, g)
            };
            l = function () {
                d.loadSplashScreenFinished(!1, g)
            };
            c = this.readDataFromImagePixels(b);
            for (e = 0; e < c.length;) {
                h = c[e++];
                if (0 == h) break;
                h = c[e++] << 24 | c[e++] << 16 | c[e++] << 8 | c[e++];
                f = c[e++] << 24 | c[e++] << 16 | c[e++] << 8 | c[e++];
                this.utf8BytesToString(c, e, h);
                e += h;
                g = new Image;
                g.onload = j;
                g.onerror = l;
                g.onabort = l;
                g.src = "data:image/png;base64," + this.base64Encode(c, e, f);
                e += f
            }
        } else this.loadSplashScreenFinished(!1, b)
    };
    f.platform.Preload.prototype.readDataFromImagePixels = function (a, b) {
        void 0 == b && (b = 1);
        var d, c, e, h, f;
        d = document.createElement("canvas");
        d.width = a.width * b;
        d.height = a.height * b;
        c = d.getContext("2d");
        c.globalCompositeOperation = "copy";
        c.mozImageSmoothingEnabled = !1;
        c.webkitImageSmoothingEnabled = !1;
        c.msImageSmoothingEnabled = !1;
        c.imageSmoothingEnabled = !1;
        c.drawImage(a, 0, 0, a.width, a.height, 0, 0, d.width, d.height);
        e = c.getImageData(0, 0, d.width, d.height);
        c = this.readDataFromImageData(e, d.width, d.height, b, 0, 4);
        h = c[0] << 24 | c[1] << 16 | c[2] << 8 | c[3];
        c = this.readDataFromImageData(e, d.width, d.height, b, 4, 4);
        f = c[0] << 24 | c[1] << 16 | c[2] << 8 | c[3];
        c = this.readDataFromImageData(e, d.width, d.height, b, 9, h);
        d = this.calculateCRC32(c);
        return f != d ? this.readDataFromImagePixels(a, b + 2) : c
    };
    f.platform.Preload.prototype.readDataFromImageData = function (a, b, d, c, e, f) {
        var k, g, j, l;
        d = (c - 1) / 2;
        k = 3 * (b / c);
        j = Array(f);
        g = 4 * d + e % k % 3 + 4 * Math.floor(e % k / 3) * c;
        e = d + Math.floor(e / k) * c;
        for (l = 0; l < f; l++) k = 4 * e * b + g, j[l] = a.data[k], g++, 3 == g % 4 && (g += 4 * (c - 1) + 1), g >= 4 * b && (g = 4 * d, e += c);
        return j
    };
    f.platform.Preload.prototype.calculateCRC32 = function (a) {
        var b = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117],
            d = a.length, c = 4294967295, e;
        for (e = 0; e < d; e++) c = b[(c ^ a[e]) & 255] ^ c >>> 8;
        return c ^ 4294967295
    };
    f.platform.Preload.prototype.loadSplashScreenFinished = function (a, b) {
        var d = this;
        a && (null != b && 0 < b.width && 0 < b.height) && (this.splashScreenImage = b, this.drawSplashScreenImage(), this.checkCanvasResizeTimerID = setInterval(function () {
            d.checkCanvasResize()
        }, 1));
        null != this.mergedJavaScriptsPath ? this.loadMergedJavaScripts() : (this.mainClass = f.platform.AppManager, this.mainClass.preloadAssets(this.filesFolder, this.useMergedAssets, this.canvas, this.widths, this.heights, this.aspectRatioFixeds, this.backgroundColor, this.backgroundOutsideColor, this.parameters, this.extraParameters, this.programEntryPointClassName, function () {
            d.preloadAssetsFinished()
        }))
    };
    f.platform.Preload.prototype.drawSplashScreenImage = function () {
        this.canvasContext.save();
        this.canvasContext.transform(this.screenTransform._a, this.screenTransform._b, this.screenTransform._c, this.screenTransform._d, this.screenTransform._tx, this.screenTransform._ty);
        this.canvasContext.drawImage(this.splashScreenImage, 0, 0);
        this.canvasContext.restore()
    };
    f.platform.Preload.prototype.checkCanvasResize = function () {
        if (this.extraParameters.forceCoversWholeBrowser && (this.canvas.width != document.documentElement.clientWidth || this.canvas.height != document.documentElement.clientHeight)) this.canvas.width = document.documentElement.clientWidth, this.canvas.height = document.documentElement.clientHeight;
        this.canvas.width == this.canvasWidth && this.canvas.height == this.canvasHeight && this.canvas.clientWidth == this.canvasClientWidth && this.canvas.clientHeight == this.canvasClientHeight || (this.updateCurrentScreenSizeIndex(this.canvas.clientWidth, this.canvas.clientHeight), this.canvasContext.save(), this.canvasContext.fillStyle = this.aspectRatioFixeds[this.currentScreenSizeIndex] ? this.backgroundOutsideFillStyle : this.backgroundFillStyle, this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height), this.canvasContext.restore(), this.createScreenTransform(this.widths[this.currentScreenSizeIndex], this.heights[this.currentScreenSizeIndex], this.canvas.width, this.canvas.height, this.canvas.clientWidth, this.canvas.clientHeight), this.drawSplashScreenImage(), this.canvasWidth = this.canvas.width, this.canvasHeight = this.canvas.height, this.canvasClientWidth = this.canvas.clientWidth, this.canvasClientHeight = this.canvas.clientHeight)
    };
    f.platform.Preload.prototype.loadMergedJavaScripts = function () {
        var a = this, b, d;
        if (".js" == this.mergedJavaScriptsPath.substr(this.mergedJavaScriptsPath.length - 3)) {
            try {
                b = new XMLHttpRequest
            } catch (c) {
                b = new ActiveXObject("Msxml2.XMLHTTP")
            }
            b.onreadystatechange = function () {
                4 == this.readyState && a.loadMergedJavaScriptsJSFinished(this)
            };
            b.open("GET", this.mergedJavaScriptsPath, !0);
            b.responseType = "text";
            b.send(null)
        } else d = new Image, d.crossOrigin = "Anonymous", d.onload = function () {
            a.loadMergedJavaScriptsPNGFinished(d)
        }, d.src = this.mergedJavaScriptsPath
    };
    f.platform.Preload.prototype.loadMergedJavaScriptsJSFinished = function (a) {
        var b = this;
        this.mainClass = window.eval(a.responseText);
        this.mainClass.preloadAssets(this.filesFolder, this.useMergedAssets, this.canvas, this.widths, this.heights, this.aspectRatioFixeds, this.backgroundColor, this.backgroundOutsideColor, this.parameters, this.extraParameters, this.programEntryPointClassName, function () {
            b.preloadAssetsFinished()
        })
    };
    f.platform.Preload.prototype.loadMergedJavaScriptsPNGFinished = function (a) {
        var b = this;
        a = this.readDataFromImagePixels(a);
        a = this.utf8BytesToString(a, 0, a.length);
        this.mainClass = window.eval(a);
        this.mainClass.preloadAssets(this.filesFolder, this.useMergedAssets, this.canvas, this.widths, this.heights, this.aspectRatioFixeds, this.backgroundColor, this.backgroundOutsideColor, this.parameters, this.extraParameters, this.programEntryPointClassName, function () {
            b.preloadAssetsFinished()
        })
    };
    f.platform.Preload.prototype.preloadAssetsFinished = function () {
        clearInterval(this.checkCanvasResizeTimerID)
    };
    f.platform.Preload.prototype.sendMessage = function (a, b) {
        this.mainClass.sendMessage(a, b)
    };
    f.platform.Preload.prototype.utf8BytesToString = function (a, b, d) {
        var c = "", e, f, k, g;
        for (g = b; g < b + d; g++) e = a[g], 224 <= e ? (f = a[++g], k = a[++g], e = (e & 15) << 12 | (f & 63) << 6 | k & 63) : 127 < e && (f = a[++g], e = (e & 31) << 6 | f & 63), c += String.fromCharCode(e);
        return c
    };
    f.platform.Preload.prototype.base64Encode = function (a, b, d) {
        var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), e, f, k, g, j;
        e = "";
        for (j = b; j < b + d; j += 3) f = a[j], k = j + 1 < b + d ? a[j + 1] : 0, g = j + 2 < b + d ? a[j + 2] : 0, e += c[f >> 2], e += c[(f & 3) << 4 | k >> 4], e += j + 1 < b + d ? c[(k & 15) << 2 | g >> 6] : "=", e += j + 2 < b + d ? c[g & 63] : "=";
        return e
    };
    f.platform.Preload.Matrix = function (a, b, d, c, e, f) {
        void 0 === a && (a = 1);
        void 0 === b && (b = 0);
        void 0 === d && (d = 0);
        void 0 === c && (c = 1);
        void 0 === e && (e = 0);
        void 0 === f && (f = 0);
        this._a = a;
        this._b = b;
        this._c = d;
        this._d = c;
        this._tx = e;
        this._ty = f;
        return this
    };
    f.platform.Preload.Matrix.prototype.concatenate = function (a) {
        var b = this._b * a._a + this._d * a._b, d = this._a * a._c + this._c * a._d,
            c = this._b * a._c + this._d * a._d, e = this._a * a._tx + this._c * a._ty + this._tx,
            f = this._b * a._tx + this._d * a._ty + this._ty;
        this._a = this._a * a._a + this._c * a._b;
        this._b = b;
        this._c = d;
        this._d = c;
        this._tx = e;
        this._ty = f
    };
    f.platform.Preload.Matrix.prototype.preConcatenate = function (a) {
        var b = a._b * this._a + a._d * this._b, d = a._a * this._c + a._c * this._d,
            c = a._b * this._c + a._d * this._d, e = a._a * this._tx + a._c * this._ty + a._tx,
            f = a._b * this._tx + a._d * this._ty + a._ty;
        this._a = a._a * this._a + a._c * this._b;
        this._b = b;
        this._c = d;
        this._d = c;
        this._tx = e;
        this._ty = f
    };
    f.platform.Preload.Matrix.prototype.translate = function (a, b) {
        this.concatenate(new f.platform.Preload.Matrix(1, 0, 0, 1, a, b))
    };
    f.platform.Preload.Matrix.prototype.scale = function (a, b) {
        var d = new f.platform.Preload.Matrix(a, 0, 0, b, 0, 0);
        this.concatenate(d)
    };
    f.platform.Preload.Matrix.prototype.createInverse = function () {
        var a = this._a * this._d - this._b * this._c, b;
        if (0 == a) return null;
        b = new f.platform.Preload.Matrix;
        b._a = this._d / a;
        b._b = -this._b / a;
        b._c = -this._c / a;
        b._d = this._a / a;
        b._tx = (this._c * this._ty - this._d * this._tx) / a;
        b._ty = (this._b * this._tx - this._a * this._ty) / a;
        return b
    };
    f.platform.Preload.Matrix.prototype.clone = function () {
        return new f.platform.Preload.Matrix(this._a, this._b, this._c, this._d, this._tx, this._ty)
    };
    f.initialize = function (a, b, d) {
        var c, e, h, k, g, j, l, m;
        c = document.getElementsByTagName("script");
        c = c[c.length - 2].src;
        c = null == d || null == d.filesFolder ? /(.*)\/js\//.exec(c)[1] : d.filesFolder;
        e = c + "/assets/__.png";
        h = c + "/assets/_.png";
        null == d || null == d.backgroundColor ? k = -1 : (g = parseInt(d.backgroundColor.substr(1, 2), 16), j = parseInt(d.backgroundColor.substr(3, 2), 16), l = parseInt(d.backgroundColor.substr(5, 2), 16), k = 4278190080 | g << 16 | j << 8 | l);
        null == d || null == d.backgroundOutsideColor ? g = -16777216 : (g = parseInt(d.backgroundOutsideColor.substr(1, 2), 16), j = parseInt(d.backgroundOutsideColor.substr(3, 2), 16), l = parseInt(d.backgroundOutsideColor.substr(5, 2), 16), g = 4278190080 | g << 16 | j << 8 | l);
        m = new f.platform.Preload(a, [600], [400], [!0], k, g, b, d, c, !0, e, h);
        m.initialize("com.novelgames.spgames.patternmemory2.Main");
        return {
            sendMessage: function (a, b) {
                m.sendMessage(a, b)
            }
        }
    }
})();