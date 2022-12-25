import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  routerEventSubscription;
  
  title = 'frontend';
  activeMenu = 1;

  ngOnInit() {
    this.routerEventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url
        console.log(url);
        if (url.split('?')[0].match(/parents/)) {
          this.activeMenu = 1
        } else if (url.split('?')[0].match(/childrens/)) {
          this.activeMenu = 2
        } else if (url.split('?')[0].match(/calculation/)) {
          this.activeMenu = 3
        } else {
          this.activeMenu = 1
        }
      }
    });
  }

  isActive(index: number) {
    return this.activeMenu === index;
  }
}
