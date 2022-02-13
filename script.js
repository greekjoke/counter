"use strict";

/* Counter scripts. */

function pad(n, width, z) {
  z = z || '0'
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

function MakeCoutner(opt) {
  opt = opt || {}
  
  const maxColors = opt.maxColors || 7
  const maxDigits = opt.maxDigits || 5  
  const con = $(opt.container || "#digits")
  const digits = []
  let cache = {}
  let timer = null
  let coutner = 0
  const stat = {}

  con.html('')
  for(let i=0; i < maxDigits; i++) {
    const e = $('<span class="d">0</span>')
    con.append(e)
    digits.push(e)
  }
  
  return {    
    isRun: function() {
      return timer != null
    },
    start: function(rate) {            
      this.stop()
      
      rate = Math.floor(rate || 500)
      coutner = 0            
      cache = {}
      stat.periodFrame = 0
      stat.periodStart = new Date()

      this.render()
      
      const that = this
      timer = setInterval(function() {        
        coutner++     
        that.render()
        
        // calculate statistics
        stat.periodFrame++
        const t = new Date()
        if ((t.getTime() - stat.periodStart.getTime()) >= 1000) {
          stat.periodStart = t
          stat.fps = stat.periodFrame
          stat.periodFrame = 0
          //console.log('fps', stat.fps)
        }        

      }, rate)      
    },
    stop: function() {      
      if (timer != null) {
        clearInterval(timer)
        timer = null
      }
    },
    render: function() {      
      const s = pad(coutner, maxDigits)
      const n = Math.min(s.length, maxDigits)
      for(let i=0; i < n; i++) {
        const w = s[s.length - i - 1]
        const c = parseInt(w) % maxColors
        const e = digits[maxDigits - i - 1]
        if (cache[i] === w) continue
        cache[i] = w
        if (i == 0) {
          e.attr('data-color', c)
        }
        e.html(w)        
      }
    }
  }
}

