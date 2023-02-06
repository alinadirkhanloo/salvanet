import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


	constructor() { }

	ngOnInit(): void {
        document.body.setAttribute('data-headerbg','color_3');
        document.body.setAttribute('data-nav-headerbg', 'color_13');
        document.body.setAttribute('data-sibebarbg', 'color_13');
	}


    themeSettings(attributeName, attributeVal) {
        document.body.setAttribute(attributeName, attributeVal);
        
        if(attributeName == 'direction') {
            document.getElementsByTagName('html')[0].setAttribute('dir', attributeVal);
            document.getElementsByTagName('html')[0].setAttribute('class', attributeVal);
        }
    }
	

}

