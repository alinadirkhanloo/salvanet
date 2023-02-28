import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:any;
  avatarLable='';

	constructor(private auth:AuthService) { }

	ngOnInit(): void {
        document.body.setAttribute('data-headerbg','color_3');
        document.body.setAttribute('data-nav-headerbg', 'color_13');
        document.body.setAttribute('data-sibebarbg', 'color_13');
        if(this.auth.getUser() !== null) {
          this.user = JSON.parse(this.auth.getUser()?.idToken);
          this.avatarLable = this.user.firstName[0];
        }
        
	}


    themeSettings(attributeName, attributeVal) {
        document.body.setAttribute(attributeName, attributeVal);

        if(attributeName == 'direction') {
            document.getElementsByTagName('html')[0].setAttribute('dir', attributeVal);
            document.getElementsByTagName('html')[0].setAttribute('class', attributeVal);
        }
    }

    logout(){
        this.auth.logout();
    }


}

