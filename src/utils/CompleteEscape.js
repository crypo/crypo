/**
 * @providesModule CompleteEscape
 */

module.exports = function(a) {
  var b = new Array(),
    fromChar = new Array();

  for(var x = 0; x < a.length; x++)
  {
    b[x] = a.charAt(x);
  }

  fromChar['a'] = '61';
  fromChar['b'] = '62';
  fromChar['c'] = '63';
  fromChar['d'] = '64';
  fromChar['e'] = '65';
  fromChar['f'] = '66';
  fromChar['g'] = '67';
  fromChar['h'] = '68';
  fromChar['i'] = '69';
  fromChar['j'] = '6A';
  fromChar['k'] = '6B';
  fromChar['l'] = '6C';
  fromChar['m'] = '6D';
  fromChar['n'] = '6E';
  fromChar['o'] = '6F';
  fromChar['p'] = '70';
  fromChar['q'] = '71';
  fromChar['r'] = '72';
  fromChar['s'] = '73';
  fromChar['t'] = '74';
  fromChar['u'] = '75';
  fromChar['v'] = '76';
  fromChar['w'] = '77';
  fromChar['x'] = '78';
  fromChar['y'] = '79';
  fromChar['z'] = '7A';
  fromChar['A'] = '41';
  fromChar['B'] = '42';
  fromChar['C'] = '43';
  fromChar['D'] = '44';
  fromChar['E'] = '45';
  fromChar['F'] = '46';
  fromChar['G'] = '47';
  fromChar['H'] = '48';
  fromChar['I'] = '49';
  fromChar['J'] = '4A';
  fromChar['K'] = '4B';
  fromChar['L'] = '4C';
  fromChar['M'] = '4D';
  fromChar['N'] = '4E';
  fromChar['O'] = '4F';
  fromChar['P'] = '50';
  fromChar['Q'] = '51';
  fromChar['R'] = '52';
  fromChar['S'] = '53';
  fromChar['T'] = '54';
  fromChar['U'] = '55';
  fromChar['V'] = '56';
  fromChar['W'] = '57';
  fromChar['X'] = '58';
  fromChar['Y'] = '59';
  fromChar['Z'] = '5A';
  fromChar['0'] = '30';
  fromChar['1'] = '31';
  fromChar['2'] = '32';
  fromChar['3'] = '33';
  fromChar['4'] = '34';
  fromChar['5'] = '35';
  fromChar['6'] = '36';
  fromChar['7'] = '37';
  fromChar['8'] = '38';
  fromChar['9'] = '39';
  fromChar['*'] = '2A';
  fromChar['/'] = '2F';
  fromChar['_'] = '5F';
  fromChar['+'] = '2B';
  fromChar['-'] = '2D';
  fromChar['@'] = '40';
  fromChar['.'] = '2E';

  for(var x = 0; x < b.length; x++) {
    b[x] = (b[x] == escape(b[x]))
      ? (fromChar[b[x]])
      : escape(b[x]).replace(/%/,'');
  }

  return b.join('');
}
