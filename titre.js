function dessineLigne(x1, y1, x2, y2, ctx, temps, i=0) {
	if (i < 10) {
		ctx.beginPath()
		ctx.moveTo(x1 + (x2 - x1) * i / 10, y1 + (y2 - y1) * i / 10)
		ctx.lineTo(x1 + (x2 - x1) * (i + 1) / 10, y1 + (y2 - y1) * (i + 1) / 10)
		ctx.stroke()
		setTimeout(dessineLigne, Math.floor(temps / 10), x1, y1, x2, y2, ctx, temps, i + 1)
	}
}

function calculMultiplication(func) {
  var func = func.replace(/ /g, '')
  var partFunc = ''
  var funcListe = []
  if (func == "") {
    return 0
  } else {
    for (var i = 0 ; i < func.length ; i++) {
      if (func[i] == '*') {
        funcListe.push(partFunc)
        funcListe.push('*')
        partFunc = ''
      } else if (func[i] == '/') {
        funcListe.push(partFunc)
        funcListe.push('/')
        partFunc = ''
      } else {
        partFunc += func[i]
      }
    }
    funcListe.push(partFunc)
    
    for (var i = 0 ; i < funcListe.length - 2 ; i += 2) {
      if (funcListe[i + 1] == '*') {
        funcListe[i + 2] = parseFloat(funcListe[i]) * parseFloat(funcListe[i + 2])
      } else {
        funcListe[i + 2] = parseFloat(funcListe[i]) / parseFloat(funcListe[i + 2])
      }
    }
    return parseFloat(funcListe[funcListe.length - 1]).toFixed(100)
  }
}

function calculSansParenthese(func) {
  var func = func.replace(/ /g, '')
  if (func == "") {
    return func
  } else {
    if (func[0] == '-') {
      func = '0' + func
    }
    func = func.replace(/\/-/g, 'caca').replace(/\*-/g, 'pipi').replace(/-/g, '+-').replace(/caca/, '/-').replace(/pipi/, '*-')
    var funcListe = func.split('+')
    var total = 0
    for (var i = 0 ; i < funcListe.length ; i++) {
      total += parseFloat(calculMultiplication(String(funcListe[i])))
    }
    return total.toFixed(100)
  }
}

function calculSansExposant(func) {
  var partFunc = ''
  var nbOuverte = 0
  var indiceDebut = 0
  var indiceFin = 0
  var funcListe = []
  for (var i = 0 ; i < func.length ; i++) {
    if (func[i] == '(') {
      if (nbOuverte == 0) {
        indiceDebut = i
      }
      nbOuverte ++
    } else if (func[i] == ')') {
      nbOuverte --
      if (nbOuverte == 0) {
        partFunc = ''
        for (var j = indiceFin ; j < indiceDebut ; j++) {
          partFunc += func[j]
        }
        funcListe.push(partFunc)
        partFunc = ''
        for (var j = indiceDebut + 1 ; j < i ; j++) {
          partFunc += func[j]
        }
        if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 2) == "ln") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 2)
          funcListe.push(Math.log(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 4) == "log2") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 4)
          funcListe.push(Math.log2(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 5) == "log10") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 5)
          funcListe.push(Math.log10(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 3) == "log") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 3)
          funcListe.push(Math.log(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 3) == "abs") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 3)
          funcListe.push(Math.abs(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 4) == "acos") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 4)
          funcListe.push(Math.acos(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 4) == "asin") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 4)
          funcListe.push(Math.asin(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 4) == "atan") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 4)
          funcListe.push(Math.atan(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 3) == "cos") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 3)
          funcListe.push(Math.cos(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 3) == "sin") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 3)
          funcListe.push(Math.sin(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 3) == "tan") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 3)
          funcListe.push(Math.tan(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 3) == "exp") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 3)
          funcListe.push(Math.exp(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else if (funcListe[funcListe.length - 1].substring(funcListe[funcListe.length - 1].length - 4) == "sqrt") {
          funcListe[funcListe.length - 1] = funcListe[funcListe.length - 1].substring(0, funcListe[funcListe.length - 1].length - 4)
          funcListe.push(Math.sqrt(calculSansParenthese(String(getFunc(partFunc)))).toFixed(100))
        } else {
       	  funcListe.push(calculSansParenthese(String(getFunc(partFunc))))
        }
        i += 1
        indiceFin = i
      }
    }
  }
  partFunc = ''
  for (var j = indiceFin ; j < func.length ; j++) {
    partFunc += func[j]
  }
  funcListe.push(partFunc)
  return calculSansParenthese(String(funcListe.join('')))
}

function getFunc(func, valeur = 'x') {
  var func = func.replace(/ /g, '').replaceAll('log10', 'grosCaca').replaceAll('exp', 'grosZizi').replaceAll('log2', 'grosProut').replaceAll('x', '(' + valeur + ')').replaceAll(')(', ')*(').replaceAll('0(', '0*(').replaceAll('0a', '0*a').replaceAll('0b', '0*b').replaceAll('0c', '0*c').replaceAll('0d', '0*d').replaceAll('0e', '0*e').replaceAll('0f', '0*f').replaceAll('0g', '0*g').replaceAll('0h', '0*h').replaceAll('0i', '0*i').replaceAll('0j', '0*j').replaceAll('0k', '0*k').replaceAll('0l', '0*l').replaceAll('0m', '0*m').replaceAll('0n', '0*n').replaceAll('0o', '0*o').replaceAll('0p', '0*p').replaceAll('0q', '0*q').replaceAll('0r', '0*r').replaceAll('0s', '0*s').replaceAll('0t', '0*t').replaceAll('0u', '0*u').replaceAll('0v', '0*v').replaceAll('0w', '0*w').replaceAll('0x', '0*x').replaceAll('0y', '0*y').replaceAll('0z', '0*z').replaceAll('1(', '1*(').replaceAll('1a', '1*a').replaceAll('1b', '1*b').replaceAll('1c', '1*c').replaceAll('1d', '1*d').replaceAll('1e', '1*e').replaceAll('1f', '1*f').replaceAll('1g', '1*g').replaceAll('1h', '1*h').replaceAll('1i', '1*i').replaceAll('1j', '1*j').replaceAll('1k', '1*k').replaceAll('1l', '1*l').replaceAll('1m', '1*m').replaceAll('1n', '1*n').replaceAll('1o', '1*o').replaceAll('1p', '1*p').replaceAll('1q', '1*q').replaceAll('1r', '1*r').replaceAll('1s', '1*s').replaceAll('1t', '1*t').replaceAll('1u', '1*u').replaceAll('1v', '1*v').replaceAll('1w', '1*w').replaceAll('1x', '1*x').replaceAll('1y', '1*y').replaceAll('1z', '1*z').replaceAll('2(', '2*(').replaceAll('2a', '2*a').replaceAll('2b', '2*b').replaceAll('2c', '2*c').replaceAll('2d', '2*d').replaceAll('2e', '2*e').replaceAll('2f', '2*f').replaceAll('2g', '2*g').replaceAll('2h', '2*h').replaceAll('2i', '2*i').replaceAll('2j', '2*j').replaceAll('2k', '2*k').replaceAll('2l', '2*l').replaceAll('2m', '2*m').replaceAll('2n', '2*n').replaceAll('2o', '2*o').replaceAll('2p', '2*p').replaceAll('2q', '2*q').replaceAll('2r', '2*r').replaceAll('2s', '2*s').replaceAll('2t', '2*t').replaceAll('2u', '2*u').replaceAll('2v', '2*v').replaceAll('2w', '2*w').replaceAll('2x', '2*x').replaceAll('2y', '2*y').replaceAll('2z', '2*z').replaceAll('3(', '3*(').replaceAll('3a', '3*a').replaceAll('3b', '3*b').replaceAll('3c', '3*c').replaceAll('3d', '3*d').replaceAll('3e', '3*e').replaceAll('3f', '3*f').replaceAll('3g', '3*g').replaceAll('3h', '3*h').replaceAll('3i', '3*i').replaceAll('3j', '3*j').replaceAll('3k', '3*k').replaceAll('3l', '3*l').replaceAll('3m', '3*m').replaceAll('3n', '3*n').replaceAll('3o', '3*o').replaceAll('3p', '3*p').replaceAll('3q', '3*q').replaceAll('3r', '3*r').replaceAll('3s', '3*s').replaceAll('3t', '3*t').replaceAll('3u', '3*u').replaceAll('3v', '3*v').replaceAll('3w', '3*w').replaceAll('3x', '3*x').replaceAll('3y', '3*y').replaceAll('3z', '3*z').replaceAll('4(', '4*(').replaceAll('4a', '4*a').replaceAll('4b', '4*b').replaceAll('4c', '4*c').replaceAll('4d', '4*d').replaceAll('4e', '4*e').replaceAll('4f', '4*f').replaceAll('4g', '4*g').replaceAll('4h', '4*h').replaceAll('4i', '4*i').replaceAll('4j', '4*j').replaceAll('4k', '4*k').replaceAll('4l', '4*l').replaceAll('4m', '4*m').replaceAll('4n', '4*n').replaceAll('4o', '4*o').replaceAll('4p', '4*p').replaceAll('4q', '4*q').replaceAll('4r', '4*r').replaceAll('4s', '4*s').replaceAll('4t', '4*t').replaceAll('4u', '4*u').replaceAll('4v', '4*v').replaceAll('4w', '4*w').replaceAll('4x', '4*x').replaceAll('4y', '4*y').replaceAll('4z', '4*z').replaceAll('5(', '5*(').replaceAll('5a', '5*a').replaceAll('5b', '5*b').replaceAll('5c', '5*c').replaceAll('5d', '5*d').replaceAll('5e', '5*e').replaceAll('5f', '5*f').replaceAll('5g', '5*g').replaceAll('5h', '5*h').replaceAll('5i', '5*i').replaceAll('5j', '5*j').replaceAll('5k', '5*k').replaceAll('5l', '5*l').replaceAll('5m', '5*m').replaceAll('5n', '5*n').replaceAll('5o', '5*o').replaceAll('5p', '5*p').replaceAll('5q', '5*q').replaceAll('5r', '5*r').replaceAll('5s', '5*s').replaceAll('5t', '5*t').replaceAll('5u', '5*u').replaceAll('5v', '5*v').replaceAll('5w', '5*w').replaceAll('5x', '5*x').replaceAll('5y', '5*y').replaceAll('5z', '5*z').replaceAll('6(', '6*(').replaceAll('6a', '6*a').replaceAll('6b', '6*b').replaceAll('6c', '6*c').replaceAll('6d', '6*d').replaceAll('6e', '6*e').replaceAll('6f', '6*f').replaceAll('6g', '6*g').replaceAll('6h', '6*h').replaceAll('6i', '6*i').replaceAll('6j', '6*j').replaceAll('6k', '6*k').replaceAll('6l', '6*l').replaceAll('6m', '6*m').replaceAll('6n', '6*n').replaceAll('6o', '6*o').replaceAll('6p', '6*p').replaceAll('6q', '6*q').replaceAll('6r', '6*r').replaceAll('6s', '6*s').replaceAll('6t', '6*t').replaceAll('6u', '6*u').replaceAll('6v', '6*v').replaceAll('6w', '6*w').replaceAll('6x', '6*x').replaceAll('6y', '6*y').replaceAll('6z', '6*z').replaceAll('7(', '7*(').replaceAll('7a', '7*a').replaceAll('7b', '7*b').replaceAll('7c', '7*c').replaceAll('7d', '7*d').replaceAll('7e', '7*e').replaceAll('7f', '7*f').replaceAll('7g', '7*g').replaceAll('7h', '7*h').replaceAll('7i', '7*i').replaceAll('7j', '7*j').replaceAll('7k', '7*k').replaceAll('7l', '7*l').replaceAll('7m', '7*m').replaceAll('7n', '7*n').replaceAll('7o', '7*o').replaceAll('7p', '7*p').replaceAll('7q', '7*q').replaceAll('7r', '7*r').replaceAll('7s', '7*s').replaceAll('7t', '7*t').replaceAll('7u', '7*u').replaceAll('7v', '7*v').replaceAll('7w', '7*w').replaceAll('7x', '7*x').replaceAll('7y', '7*y').replaceAll('7z', '7*z').replaceAll('8(', '8*(').replaceAll('8a', '8*a').replaceAll('8b', '8*b').replaceAll('8c', '8*c').replaceAll('8d', '8*d').replaceAll('8e', '8*e').replaceAll('8f', '8*f').replaceAll('8g', '8*g').replaceAll('8h', '8*h').replaceAll('8i', '8*i').replaceAll('8j', '8*j').replaceAll('8k', '8*k').replaceAll('8l', '8*l').replaceAll('8m', '8*m').replaceAll('8n', '8*n').replaceAll('8o', '8*o').replaceAll('8p', '8*p').replaceAll('8q', '8*q').replaceAll('8r', '8*r').replaceAll('8s', '8*s').replaceAll('8t', '8*t').replaceAll('8u', '8*u').replaceAll('8v', '8*v').replaceAll('8w', '8*w').replaceAll('8x', '8*x').replaceAll('8y', '8*y').replaceAll('8z', '8*z').replaceAll('9(', '9*(').replaceAll('9a', '9*a').replaceAll('9b', '9*b').replaceAll('9c', '9*c').replaceAll('9d', '9*d').replaceAll('9e', '9*e').replaceAll('9f', '9*f').replaceAll('9g', '9*g').replaceAll('9h', '9*h').replaceAll('9i', '9*i').replaceAll('9j', '9*j').replaceAll('9k', '9*k').replaceAll('9l', '9*l').replaceAll('9m', '9*m').replaceAll('9n', '9*n').replaceAll('9o', '9*o').replaceAll('9p', '9*p').replaceAll('9q', '9*q').replaceAll('9r', '9*r').replaceAll('9s', '9*s').replaceAll('9t', '9*t').replaceAll('9u', '9*u').replaceAll('9v', '9*v').replaceAll('9w', '9*w').replaceAll('9x', '9*x').replaceAll('9y', '9*y').replaceAll('9z', '9*z').replaceAll(')0', ')*0').replaceAll('a0', 'a*0').replaceAll('b0', 'b*0').replaceAll('c0', 'c*0').replaceAll('d0', 'd*0').replaceAll('e0', 'e*0').replaceAll('f0', 'f*0').replaceAll('g0', 'g*0').replaceAll('h0', 'h*0').replaceAll('i0', 'i*0').replaceAll('j0', 'j*0').replaceAll('k0', 'k*0').replaceAll('l0', 'l*0').replaceAll('m0', 'm*0').replaceAll('n0', 'n*0').replaceAll('o0', 'o*0').replaceAll('p0', 'p*0').replaceAll('q0', 'q*0').replaceAll('r0', 'r*0').replaceAll('s0', 's*0').replaceAll('t0', 't*0').replaceAll('u0', 'u*0').replaceAll('v0', 'v*0').replaceAll('w0', 'w*0').replaceAll('x0', 'x*0').replaceAll('y0', 'y*0').replaceAll('z0', 'z*0').replaceAll(')1', ')*1').replaceAll('a1', 'a*1').replaceAll('b1', 'b*1').replaceAll('c1', 'c*1').replaceAll('d1', 'd*1').replaceAll('e1', 'e*1').replaceAll('f1', 'f*1').replaceAll('g1', 'g*1').replaceAll('h1', 'h*1').replaceAll('i1', 'i*1').replaceAll('j1', 'j*1').replaceAll('k1', 'k*1').replaceAll('l1', 'l*1').replaceAll('m1', 'm*1').replaceAll('n1', 'n*1').replaceAll('o1', 'o*1').replaceAll('p1', 'p*1').replaceAll('q1', 'q*1').replaceAll('r1', 'r*1').replaceAll('s1', 's*1').replaceAll('t1', 't*1').replaceAll('u1', 'u*1').replaceAll('v1', 'v*1').replaceAll('w1', 'w*1').replaceAll('x1', 'x*1').replaceAll('y1', 'y*1').replaceAll('z1', 'z*1').replaceAll(')2', ')*2').replaceAll('a2', 'a*2').replaceAll('b2', 'b*2').replaceAll('c2', 'c*2').replaceAll('d2', 'd*2').replaceAll('e2', 'e*2').replaceAll('f2', 'f*2').replaceAll('g2', 'g*2').replaceAll('h2', 'h*2').replaceAll('i2', 'i*2').replaceAll('j2', 'j*2').replaceAll('k2', 'k*2').replaceAll('l2', 'l*2').replaceAll('m2', 'm*2').replaceAll('n2', 'n*2').replaceAll('o2', 'o*2').replaceAll('p2', 'p*2').replaceAll('q2', 'q*2').replaceAll('r2', 'r*2').replaceAll('s2', 's*2').replaceAll('t2', 't*2').replaceAll('u2', 'u*2').replaceAll('v2', 'v*2').replaceAll('w2', 'w*2').replaceAll('x2', 'x*2').replaceAll('y2', 'y*2').replaceAll('z2', 'z*2').replaceAll(')3', ')*3').replaceAll('a3', 'a*3').replaceAll('b3', 'b*3').replaceAll('c3', 'c*3').replaceAll('d3', 'd*3').replaceAll('e3', 'e*3').replaceAll('f3', 'f*3').replaceAll('g3', 'g*3').replaceAll('h3', 'h*3').replaceAll('i3', 'i*3').replaceAll('j3', 'j*3').replaceAll('k3', 'k*3').replaceAll('l3', 'l*3').replaceAll('m3', 'm*3').replaceAll('n3', 'n*3').replaceAll('o3', 'o*3').replaceAll('p3', 'p*3').replaceAll('q3', 'q*3').replaceAll('r3', 'r*3').replaceAll('s3', 's*3').replaceAll('t3', 't*3').replaceAll('u3', 'u*3').replaceAll('v3', 'v*3').replaceAll('w3', 'w*3').replaceAll('x3', 'x*3').replaceAll('y3', 'y*3').replaceAll('z3', 'z*3').replaceAll(')4', ')*4').replaceAll('a4', 'a*4').replaceAll('b4', 'b*4').replaceAll('c4', 'c*4').replaceAll('d4', 'd*4').replaceAll('e4', 'e*4').replaceAll('f4', 'f*4').replaceAll('g4', 'g*4').replaceAll('h4', 'h*4').replaceAll('i4', 'i*4').replaceAll('j4', 'j*4').replaceAll('k4', 'k*4').replaceAll('l4', 'l*4').replaceAll('m4', 'm*4').replaceAll('n4', 'n*4').replaceAll('o4', 'o*4').replaceAll('p4', 'p*4').replaceAll('q4', 'q*4').replaceAll('r4', 'r*4').replaceAll('s4', 's*4').replaceAll('t4', 't*4').replaceAll('u4', 'u*4').replaceAll('v4', 'v*4').replaceAll('w4', 'w*4').replaceAll('x4', 'x*4').replaceAll('y4', 'y*4').replaceAll('z4', 'z*4').replaceAll(')5', ')*5').replaceAll('a5', 'a*5').replaceAll('b5', 'b*5').replaceAll('c5', 'c*5').replaceAll('d5', 'd*5').replaceAll('e5', 'e*5').replaceAll('f5', 'f*5').replaceAll('g5', 'g*5').replaceAll('h5', 'h*5').replaceAll('i5', 'i*5').replaceAll('j5', 'j*5').replaceAll('k5', 'k*5').replaceAll('l5', 'l*5').replaceAll('m5', 'm*5').replaceAll('n5', 'n*5').replaceAll('o5', 'o*5').replaceAll('p5', 'p*5').replaceAll('q5', 'q*5').replaceAll('r5', 'r*5').replaceAll('s5', 's*5').replaceAll('t5', 't*5').replaceAll('u5', 'u*5').replaceAll('v5', 'v*5').replaceAll('w5', 'w*5').replaceAll('x5', 'x*5').replaceAll('y5', 'y*5').replaceAll('z5', 'z*5').replaceAll(')6', ')*6').replaceAll('a6', 'a*6').replaceAll('b6', 'b*6').replaceAll('c6', 'c*6').replaceAll('d6', 'd*6').replaceAll('e6', 'e*6').replaceAll('f6', 'f*6').replaceAll('g6', 'g*6').replaceAll('h6', 'h*6').replaceAll('i6', 'i*6').replaceAll('j6', 'j*6').replaceAll('k6', 'k*6').replaceAll('l6', 'l*6').replaceAll('m6', 'm*6').replaceAll('n6', 'n*6').replaceAll('o6', 'o*6').replaceAll('p6', 'p*6').replaceAll('q6', 'q*6').replaceAll('r6', 'r*6').replaceAll('s6', 's*6').replaceAll('t6', 't*6').replaceAll('u6', 'u*6').replaceAll('v6', 'v*6').replaceAll('w6', 'w*6').replaceAll('x6', 'x*6').replaceAll('y6', 'y*6').replaceAll('z6', 'z*6').replaceAll(')7', ')*7').replaceAll('a7', 'a*7').replaceAll('b7', 'b*7').replaceAll('c7', 'c*7').replaceAll('d7', 'd*7').replaceAll('e7', 'e*7').replaceAll('f7', 'f*7').replaceAll('g7', 'g*7').replaceAll('h7', 'h*7').replaceAll('i7', 'i*7').replaceAll('j7', 'j*7').replaceAll('k7', 'k*7').replaceAll('l7', 'l*7').replaceAll('m7', 'm*7').replaceAll('n7', 'n*7').replaceAll('o7', 'o*7').replaceAll('p7', 'p*7').replaceAll('q7', 'q*7').replaceAll('r7', 'r*7').replaceAll('s7', 's*7').replaceAll('t7', 't*7').replaceAll('u7', 'u*7').replaceAll('v7', 'v*7').replaceAll('w7', 'w*7').replaceAll('x7', 'x*7').replaceAll('y7', 'y*7').replaceAll('z7', 'z*7').replaceAll(')8', ')*8').replaceAll('a8', 'a*8').replaceAll('b8', 'b*8').replaceAll('c8', 'c*8').replaceAll('d8', 'd*8').replaceAll('e8', 'e*8').replaceAll('f8', 'f*8').replaceAll('g8', 'g*8').replaceAll('h8', 'h*8').replaceAll('i8', 'i*8').replaceAll('j8', 'j*8').replaceAll('k8', 'k*8').replaceAll('l8', 'l*8').replaceAll('m8', 'm*8').replaceAll('n8', 'n*8').replaceAll('o8', 'o*8').replaceAll('p8', 'p*8').replaceAll('q8', 'q*8').replaceAll('r8', 'r*8').replaceAll('s8', 's*8').replaceAll('t8', 't*8').replaceAll('u8', 'u*8').replaceAll('v8', 'v*8').replaceAll('w8', 'w*8').replaceAll('x8', 'x*8').replaceAll('y8', 'y*8').replaceAll('z8', 'z*8').replaceAll(')9', ')*9').replaceAll('a9', 'a*9').replaceAll('b9', 'b*9').replaceAll('c9', 'c*9').replaceAll('d9', 'd*9').replaceAll('e9', 'e*9').replaceAll('f9', 'f*9').replaceAll('g9', 'g*9').replaceAll('h9', 'h*9').replaceAll('i9', 'i*9').replaceAll('j9', 'j*9').replaceAll('k9', 'k*9').replaceAll('l9', 'l*9').replaceAll('m9', 'm*9').replaceAll('n9', 'n*9').replaceAll('o9', 'o*9').replaceAll('p9', 'p*9').replaceAll('q9', 'q*9').replaceAll('r9', 'r*9').replaceAll('s9', 's*9').replaceAll('t9', 't*9').replaceAll('u9', 'u*9').replaceAll('v9', 'v*9').replaceAll('w9', 'w*9').replaceAll('x9', 'x*9').replaceAll('y9', 'y*9').replaceAll('z9', 'z*9').replaceAll('pi', String(Math.PI)).replaceAll('e', String(Math.E)).replaceAll('grosCaca', 'log10').replaceAll('grosProut', 'log2').replaceAll('grosZizi', 'exp')
  var partFuncExposant = ''
  var partFuncDebut = ''
  var nbFermee = 0
  for (i = func.length - 1 ; i >= 0 ; i--) {
    if ((func[i] == '+' || func[i] == '*' || func[i] == '/') && nbFermee == 0) {
      partFuncExposant = ''
    } else if (func[i] == '-' && func[i - 1] != '^' && nbFermee == 0) {
      partFuncExposant = ''
    } else if (func[i] == ')') {
      nbFermee ++
      partFuncExposant = func[i] + partFuncExposant
    } else if (func[i] == '(') {
      nbFermee --
      partFuncExposant = func[i] + partFuncExposant
    } else if (func[i] == '^' && nbFermee == 0) {
      var j = i - 1
      while (j >= 0 && ((func[j] != '+' && func[j] != '-' && func[j] != '^' && func[j] != '*' && func[j] != '/') || nbFermee != 0)) {
        if (func[j] == ')') {
          nbFermee ++
        } else if (func[j] == '(') {
          nbFermee --
        }
        partFuncDebut = func[j] + partFuncDebut
        j --
      }
      break
    } else {    
      partFuncExposant = func[i] + partFuncExposant
    }
  }
  if (i != -1) {
    return calculSansExposant(String(getFunc(func.substring(0, j + 1) + String(Math.pow(parseFloat(getFunc(partFuncDebut)), parseFloat(getFunc(partFuncExposant))).toFixed(100)) + func.substring(j + 1 + String(partFuncDebut + '^' + partFuncExposant).length))))
  } else {
    return calculSansExposant(func)
  }
}

function dessineFonction(x1, x2, func, ctx, i = 0) {
	if (i < 100) {
		ctx.beginPath()
		ctx.moveTo(60 + (x1 + (x2 - x1) * i / 100) * 30, 240 - 30 * Number(getFunc(func, x1 + (x2 - x1) * i / 100)))
		ctx.lineTo(60 + (x1 + (x2 - x1) * (i + 1) / 100) * 30, 240 - 30 * Number(getFunc(func, x1 + (x2 - x1) * (i + 1) / 100)))
		ctx.stroke()
		setTimeout(dessineFonction, 1, x1, x2, func, ctx, i + 1)
	}
}

function draw_titre() {
	var ctx = document.getElementById('titre').getContext('2d')

	draw_titre_grille(ctx)
}

function draw_titre_grille(ctx) {
	ctx.lineWidth = 0.5
	ctx.strokeStyle = 'rgb(122,122,122)'
	for (i = 1 ; i <= 9 ; i ++) {
		setTimeout(dessineLigne, i * 50, 0, i * 30 + 0.5, 600, i * 30 + 0.5, ctx, 100)
	}
	for (j = 1 ; j <= 19 ; j ++) {
		setTimeout(dessineLigne, j * 50 + 400, j * 30 + 0.5, 0, j * 30 + 0.5, 300, ctx, 50)
	}

	setTimeout(draw_titre_fleche, 1500, ctx)
}

function draw_titre_fleche(ctx) {
	ctx.lineWidth = 2
	ctx.strokeStyle = 'rgb(0,0,0)'
	dessineLigne(0, 240, 600, 240, ctx, 200)
	dessineLigne(60, 300, 60, 0, ctx, 100)
	setTimeout(function() {
		ctx.beginPath()
		ctx.moveTo(50, 10)
		ctx.lineTo(60,0)
		ctx.lineTo(70,10)
		ctx.moveTo(590, 230)
		ctx.lineTo(600,240)
		ctx.lineTo(590,250)
		ctx.stroke()
	}, 250)

	setTimeout(function() {
		dessineLesFonctions(ctx)
	}, 300)
}

function dessineLesFonctions(ctx) {
	dessineFonction(0.001, 3, 'log(x) + 2.1', ctx)
	dessineFonction(0.001, 3, 'log(x) + 4.1', ctx)
	dessineFonction(1.5, 3.5, '-2sqrt(1 - (x - 2.5)^2) + 2.1', ctx)
	dessineFonction(3.5, 5.5, '-abs(2(x - 4.5)^3) + 2.1', ctx)
	dessineFonction(5.5, 7.5, '-sqrt(1-((x - 7.5)/2)^2) + 1.1', ctx)
	dessineFonction(5.5, 7.5, 'sqrt(1-((x - 7.5)/2)^2) + 1.1', ctx)
	dessineFonction(7.5, 10.5, '4.622abs(x - 9)^2 - 5.266abs(x - 9) + 1.6', ctx)
	dessineFonction(10.5, 12.5, 'sqrt(1-(x - 11.5)^2) + 1.1', ctx)
	dessineFonction(10.5, 12.5, '-sqrt(1-(x - 11.5)^2) + 1.1', ctx)
	dessineFonction(12.5, 12.65, '(1 / (x-12.4)^4) / 5000 + 0.1', ctx)
	dessineFonction(13, 15, '-1/(x - 12.3)^2 + 2.1', ctx)
	setTimeout(reset, 10000, ctx)
}
/*
function reset(ctx, xBas = 0, xHaut = 0) {
	xHautAncien = xHaut
	xBasAncien = xBas
	xHaut += 100 + Math.floor(Math.random() * 100)
	xBas = xHaut + Math.floor(Math.random() * 100) - 50
	if (xHautAncien < 600 || xBasAncien < 600) {
		ctx.fillStyle = 'white'
		ctx.beginPath()
		ctx.moveTo(xHautAncien, 0)
		ctx.lineTo(xBasAncien, 300)
		ctx.lineTo(xHaut, 0)
		ctx.fill()
		setTimeout(function() {
			ctx.beginPath()
			ctx.moveTo(xHaut, 0)
			ctx.lineTo(xBas, 300)
			ctx.lineTo(xBasAncien, 300)
			ctx.fill()
		}, 500)
		setTimeout(reset, 1000, ctx, xBas, xHaut)
	} else {
		ctx.clearRect(0, 0, 600, 300)
		setTimeout(draw_titre, 2000)
	}
}
*/

function reset(ctx, i = 1) {
	if (0.1*i*i < 336) {
		ctx.fillStyle = 'white'
		ctx.beginPath()
		ctx.arc(300, 150, Math.floor(0.1*i*i), 0, 2 * Math.PI, false)
		ctx.fill()
		setTimeout(reset, 1, ctx, i + 1)
	} else {
		ctx.fillStyle = 'white'
		ctx.beginPath()
		ctx.arc(300, 150, Math.floor(0.1*i*i), 0, 2 * Math.PI, false)
		ctx.fill()
		setTimeout(draw_titre, 1000)
	}
}