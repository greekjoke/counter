"use strict";

/* Counter scripts. */

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function MakeCoutner(opt) {
  opt = opt || {}
  
  const maxColors = opt.maxColors || 7
  const maxDigits = opt.maxDigits || 5  
  const con = $(opt.container || "#digits")
  const digits = []
  var timer = null;
  var coutner = 0;
    
  con.html('')
  for(var i=0; i < maxDigits; i++) {
    const e = $('<span class="d">0</span>')
    con.append(e)
    digits.push(e)
  }
  
  return {    
    isRun: function() {
      return timer != null;
    },
    start: function(rate) {      
      const that = this
      this.stop()
      rate = Math.floor(rate || 500)
      coutner = 0      
      $('body').addClass('run')
      
      this.render()
      timer = setInterval(function() {        
        coutner++
        that.render()
      }, rate)      
    },
    stop: function() {
      $('body').removeClass('run')
      if (timer != null) {
        clearInterval(timer)
        timer = null
      }
    },
    render: function() {
      const s = pad(coutner, maxDigits)
      const n = Math.min(s.length, maxDigits)
      for(var i=0; i < n; i++) {
        const w = s[s.length - i - 1]
        const c = parseInt(w) % maxColors
        const e = digits[maxDigits - i - 1];
        if (i == 0) {
          e.attr('data-color', c)
        }
        e.html(w)
      }
    }
  }
}

