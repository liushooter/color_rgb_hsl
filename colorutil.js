var ColorUtil = (function() {
  function rgb2hsl({R,G,B}) {
    var H, S, L;
    var var_R = (R / 255);
    var var_G = (G / 255);
    var var_B = (B / 255);

    var var_Min = Math.min(var_R, var_G, var_B) //Min. value of RGB
    var var_Max = Math.max(var_R, var_G, var_B) //Max. value of RGB
    var del_Max = var_Max - var_Min //Delta RGB value

    var L = (var_Max + var_Min) / 2

    if (del_Max == 0) //This is a gray, no chroma...
    {
      H = 0
      S = 0
    }
    else //Chromatic data...
    {
      if (L < 0.5) S = del_Max / (var_Max + var_Min)
      else S = del_Max / (2 - var_Max - var_Min)

      var del_R = (((var_Max - var_R) / 6) + (del_Max / 2)) / del_Max
      var del_G = (((var_Max - var_G) / 6) + (del_Max / 2)) / del_Max
      var del_B = (((var_Max - var_B) / 6) + (del_Max / 2)) / del_Max

      if (var_R == var_Max) H = del_B - del_G
      else if (var_G == var_Max) H = (1 / 3) + del_R - del_B
      else if (var_B == var_Max) H = (2 / 3) + del_G - del_R

      if (H < 0) H += 1
      if (H > 1) H -= 1
    }
    return {
      H,
      S,
      L
    };
  }

  function Hue_2_RGB(v1, v2, vH) {
    if (vH < 0) vH += 1;
    if (vH > 1) vH -= 1;
    if ((6 * vH) < 1) return (v1 + (v2 - v1) * 6 * vH);
    if ((2 * vH) < 1) return (v2);
    if ((3 * vH) < 2) return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
    return v1;
  }

  function hsl2rgb({
    H,
    S,
    L
  }) {
    var R, G, B;
    if (S == 0) {
      R = L * 255;
      G = L * 255;
      B = L * 255;
    }
    else {
      var var_2, var_1;
      if (L < 0.5) var_2 = L * (1 + S);
      else var_2 = (L + S) - (S * L);

      var_1 = 2 * L - var_2;

      R = Math.round(255 * Hue_2_RGB(var_1, var_2, H + (1 / 3)));
      G = Math.round(255 * Hue_2_RGB(var_1, var_2, H));
      B = Math.round(255 * Hue_2_RGB(var_1, var_2, H - (1 / 3)));
    }
    return {
      R,
      G,
      B
    };
  }

  function hex2rgb(hex) {
    if (hex.indexOf('#') != -1) {
      hex = hex.substr(1, 6);
    }
    var R = parseInt(hex.substr(0, 2), 16);
    var G = parseInt(hex.substr(2, 2), 16);
    var B = parseInt(hex.substr(4, 2), 16);
    return {
      R,
      G,
      B
    };
  }

  function rgb2hex({
    R,
    G,
    B
  }) {
    return '#' + dec2hex(R) + dec2hex(G) + dec2hex(B);
  }

  function dec2hex(dec) {
    return (dec + 0x100).toString(16).substr(1, 2).toUpperCase();
  }

  return {
    rgb2hsl,
    hsl2rgb,
    hex2rgb,
    rgb2hex
  }
})();
