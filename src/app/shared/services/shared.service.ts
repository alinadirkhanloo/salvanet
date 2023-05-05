import { IProfile } from './../../core/interfaces/profile.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;
  returnUrl = new BehaviorSubject<string>('');

  private profileSubject:BehaviorSubject<IProfile> =  new BehaviorSubject<IProfile>(null);
  profile$!:Observable<IProfile>;

  constructor(private toastr: ToastrService) {
    this.profile$ = this.profileSubject.asObservable();
   }

  getProfile():IProfile{
    return this.profileSubject.value;
  }

  setProfile(profile:IProfile) {
    this.profileSubject.next(profile);
  }


  showSuccess(str:string='اطلاعات ثبت شد',time:number = 1000) {
    this.toastr.success('',str,{timeOut:time} );
  }

  showError(str:string='خطا در ثبت اطلاعات') {
    this.toastr.error('', str);
  }


  toggleSidebarClass() {
	return this.navSidebarClass = !this.navSidebarClass  ;
  }
  toggleHamburgerClass() {
	return this.hamburgerClass = !this.hamburgerClass  ;
  }


  public createLazyUrl(id: string, lazyUrl: string | [string, string]): string
  {
    if (lazyUrl instanceof Array)
    {
      return `${lazyUrl[0]}/${id}/${lazyUrl[1]}`;
    }
    return `${lazyUrl}/${id}`;
  }

  public omitObject(keys: string[], obj: Object): Object
  {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([k]) => !keys.includes(k))
    );
  }

}
