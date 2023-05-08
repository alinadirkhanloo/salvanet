import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environment/environment';
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

  private profileSubject: BehaviorSubject<IProfile> = new BehaviorSubject<IProfile>(null);
  profile$!: Observable<IProfile>;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.profile$ = this.profileSubject.asObservable();
  }

  getProfile(): IProfile {
    return this.profileSubject.value;
  }

  setProfile(profile: IProfile) {
    this.profileSubject.next(profile);
  }


  showSuccess(str: string = 'اطلاعات ثبت شد', time: number = 1000) {
    this.toastr.success('', str, { timeOut: time });
  }

  showError(str: string = 'خطا در دریافت اطلاعات') {
    this.toastr.error('', str);
  }


  toggleSidebarClass() {
    return this.navSidebarClass = !this.navSidebarClass;
  }
  toggleHamburgerClass() {
    return this.hamburgerClass = !this.hamburgerClass;
  }


  public createLazyUrl(id: string, lazyUrl: string | [string, string]): string {
    if (lazyUrl instanceof Array) {
      return `${lazyUrl[0]}/${id}/${lazyUrl[1]}`;
    }
    return `${lazyUrl}/${id}`;
  }

  public omitObject(keys: string[], obj: Object): Object {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([k]) => !keys.includes(k))
    );
  }


  getCountryDivision(page?: number, size?: number, sort?: string, concatUrl: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set("sort", sort ? sort : '');
    return this.http.get(`${environment.baseUrl}/countryDivision/subDivisionsView`);
  }

  setCountryRegion(item:any,concatUrl: string = ''): Observable<any> {
    const rg = {
      id: null,
      code: item.code,
      name:  item.name,
      fullAddress: item.name,
      typeId: 1,
      superDivisionId: null
    }
    return this.http.post(`${environment.baseUrl}/countryDivision`,rg);
  }

}
