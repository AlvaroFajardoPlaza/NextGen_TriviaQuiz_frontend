/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


document.addEventListener("DOMContentLoaded", function() {
  const cursorDot: any = this.documentElement.querySelector("[data-cursor-dot]")
  const cursorOutline: any = this.documentElement.querySelector("[data-cursor-outline]")

  window.addEventListener("mousemove", function(e){
    const posX: number = e.clientX
    const posY: number = e.clientY

    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`

    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, {duration: 300, fill: "forwards"});

  });


})