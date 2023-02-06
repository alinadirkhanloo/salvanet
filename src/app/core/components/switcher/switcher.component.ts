import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})
export class SwitcherComponent implements OnInit {


  themename: string;
  themedir: string;
  
  
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
      
      this.route.queryParams
      .subscribe(params => {
        // console.log(params);
        
        if(params.direction =="undefined" || params.direction == "" || params.direction == null) {
            this.themedir = 'rtl';
        } else {
            this.themedir = params.direction;
        }
        
        if(params.themename !="" && (params.themename <= 5 && params.themename > 0)) {
            this.themename = 'dezThemeSet'+params.themename;
            this.themeDemoSettings(this.themename, this.themedir);
        }
        // console.log(this.themename);
        // console.log(this.themedir);
      });
  }
  
  
    toggleswitcher: boolean = true;
    togglesthemedemo: boolean = true;
  
    toggleswitcherwindow() {
		this.toggleswitcher = !this.toggleswitcher;
	}
    
    togglesthemedemowindow() {
		this.togglesthemedemo = !this.togglesthemedemo;
	}
    
    
    themeSettings(attributeName, attributeVal) {
        document.body.setAttribute(attributeName, attributeVal);
        
        // var e = document.getElementById("theme_direction");
        // var direction= e.options[e.selectedIndex].value;
        
        // alert(direction);
        
        if(attributeName == 'direction') {
            document.getElementsByTagName('html')[0].setAttribute('dir', attributeVal);
            document.getElementsByTagName('html')[0].setAttribute('class', attributeVal);
        }
    }
    
    
    themeDemoSettings (theme, direction) {
    
    
        // alert(theme);
        // alert(direction);
        var dezThemeSet1 = {
            typography: "poppins",
            version: "light",
            layout: "vertical",
            primary: "color_14",
            headerBg: "color_1",
            navheaderBg: "color_14",
            sidebarBg: "color_12",
            sidebarStyle: "full",
            sidebarPosition: "fixed",
            headerPosition: "fixed",
            containerLayout: "full",
        };
        
        var dezThemeSet2 = {
            typography: "poppins",
            version: "light",
            layout: "vertical",
            primary: "color_4",
            headerBg: "color_1",
            navheaderBg: "color_4",
            sidebarBg: "color_4",
            sidebarStyle: "full",
            sidebarPosition: "fixed",
            headerPosition: "fixed",
            containerLayout: "full",
        };
        
        
        var dezThemeSet3 = {
            typography: "poppins",
            version: "dark",
            layout: "vertical",
            primary: "color_7",
            headerBg: "color_8",
            navheaderBg: "color_7",
            sidebarBg: "color_8",
            sidebarStyle: "full",
            sidebarPosition: "fixed",
            headerPosition: "fixed",
            containerLayout: "full",
        };
        
        var dezThemeSet4 = {
            typography: "poppins",
            version: "light",
            layout: "vertical",
            primary: "color_15",
            headerBg: "color_15",
            navheaderBg: "color_15",
            sidebarBg: "color_1",
            sidebarStyle: "full",
            sidebarPosition: "fixed",
            headerPosition: "fixed",
            containerLayout: "full",
        };
        
        var dezThemeSet5 = {
            typography: "poppins",
            version: "light",
            layout: "horizontal",
            primary: "color_11",
            headerBg: "color_1",
            navheaderBg: "color_1",
            sidebarBg: "color_11",
            sidebarStyle: "compact",
            sidebarPosition: "static",
            headerPosition: "fixed",
            containerLayout: "full",
        };
        var themeVar = eval(theme);
        
         document.body.setAttribute('data-typography', themeVar.typography);
         document.body.setAttribute('data-theme-version', themeVar.version);
         document.body.setAttribute('data-layout', themeVar.layout);
         document.body.setAttribute('data-primary', themeVar.primary);
         document.body.setAttribute('data-headerbg', themeVar.headerBg);
         document.body.setAttribute('data-nav-headerbg', themeVar.navheaderBg);
         document.body.setAttribute('data-sibebarbg', themeVar.sidebarBg);
         document.body.setAttribute('data-sidebar-style', themeVar.sidebarStyle);
         document.body.setAttribute('data-sidebar-position', themeVar.sidebarPosition);
         document.body.setAttribute('data-header-position', themeVar.headerPosition);
         document.body.setAttribute('data-container', themeVar.containerLayout);
         document.body.setAttribute('direction', direction);
            
        document.getElementsByTagName('html')[0].setAttribute('dir', direction);
        document.getElementsByTagName('html')[0].setAttribute('class', direction);

    
    
    }
    

}
