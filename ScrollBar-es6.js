!(function(options){
  let count = 0
  
  function preventDefault(event){
    if(event.preventDefault){
      event.preventDefault()
    }
    else{
      event.returnValue = false
    }
  }
  function ScrollBar(options){
    count++
    this.content = document.querySelector(options.el)

    this.getDom()

    this.contentHeight = this.content.scrollHeight
    this.containerHeight = this.container.clientHeight
    this.oldY//初始鼠标拖动位置，只点击无拖动无效
    this.oldTranslateY = 0//mousemove前的滚动条位置
    this.newTranslateY//mousemove后的滚动条位置
    this.dist//鼠标拖动距离
    this.thumbHeight = this.target.clientHeight//滚动条高度
    this.moveDist = options.moveDist//一次滑轮滑动距离
    this.availableDist = this.containerHeight - this.thumbHeight//滚动条可拉动距离

    this.hasScroll = false//判断是否滑动过

    this.init()       
  }
  ScrollBar.prototype.init = function(){
    this.scroll()
    this.wheel()
  }
  ScrollBar.prototype.getDom = function(){
    this.container = document.querySelectorAll('.scrollbar-container')[count-1]
    this.target = document.querySelectorAll(`.scroll-thumb`)[count-1]
    this.target.classList.add(`thum${count}`)

  }

  ScrollBar.prototype.scroll = function(){
    let callback = this.moveCallback.bind(this)
    let event
    this.target.addEventListener('mousedown', (e) => {
      console.log('down')
      event = window.event || e
      preventDefault(event)
      this.target.classList.remove('scroll-scroll-ani')
      this.content.classList.remove('scroll-scroll-ani')
      window.addEventListener('mousemove', callback)
    })
    window.addEventListener('mouseup', () => {
      console.log('up')
      window.removeEventListener('mousemove', callback)
      if(!this.hasScroll){
        return
      }
      this.oldY = undefined

      this.oldTranslateY = this.newTranslateY
    })
  }

  ScrollBar.prototype.wheel = function(){
    let event
    this.container.addEventListener('mousewheel', (e) => {
      event = window.event || e

      this.target.classList.add('scroll-scroll-ani')
      this.content.classList.add('scroll-scroll-ani')

      this.newTranslateY = event.wheelDelta < 0 ? this.oldTranslateY + this.moveDist: this.oldTranslateY - this.moveDist

      if(this.newTranslateY >= this.availableDist){
        if(this.newTranslateY >= this.containerHeight){
          return
        }
        this.newTranslateY = this.availableDist

      }
      else if(this.newTranslateY <= 0){
        if(this.newTranslateY <= -this.moveDist){
          return
        }
        this.newTranslateY = 0

      }

      preventDefault(event)
      this.oldTranslateY = this.newTranslateY
      this.move()
    })
    this.container.addEventListener('DOMMouseScroll', (e)=>{
      event = window.event || e

      this.target.classList.add('scroll-scroll-ani')
      this.content.classList.add('scroll-scroll-ani')


      this.newTranslateY = event.detail < 0 ? this.oldTranslateY - this.moveDist: this.oldTranslateY + this.moveDist

      if(this.newTranslateY >= this.availableDist){
        if(this.newTranslateY >= this.containerHeight){
          return
        }
        this.newTranslateY = this.availableDist

      }
      else if(this.newTranslateY <= 0){
        if(this.newTranslateY <= -this.moveDist){
          return
        }
        this.newTranslateY = 0

      }

      preventDefault(event)
      this.oldTranslateY = this.newTranslateY
      this.move()
    })
  }

  ScrollBar.prototype.moveCallback = function(e){
    requestAnimationFrame(()=>{
      this.handler(e)
    })
  }
  ScrollBar.prototype.handler = function(event){

    if(!this.oldY){
      this.hasScroll = true
      this.oldY = event.screenY
      return
    }

    this.dist = event.screenY - this.oldY
    if(this.oldTranslateY + this.dist >= this.availableDist){
      this.newTranslateY = this.availableDist
      this.move()
      return 
    }
    if(this.oldTranslateY + this.dist <= 0){
      this.newTranslateY = 0
      this.move()
      return 
    }
    this.newTranslateY = this.oldTranslateY + this.dist

    this.move()
  }
  ScrollBar.prototype.move = function(){
    this.target.style.transform = `translateY(${this.newTranslateY}px)`
    this.content.style.transform = `translateY(${-(this.contentHeight - this.containerHeight)*(this.newTranslateY/this.availableDist)}px`       
  }

  window.ScrollBar = ScrollBar
})()