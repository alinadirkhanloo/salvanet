import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { GenericClass } from 'app/core/models/genericClass.model';
import { IDropdown } from 'core/interfaces/dropdown/dropdonw.interface';
import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';

import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICource } from 'app/core/interfaces/course.interface';
import { CourseService } from '../cources.service';
import { SharedService } from 'app/shared/services/shared.service';
import { IProfile } from 'app/core/interfaces/profile.interface';
import { PersonComponent } from 'app/core/components/user-find-box/person/person.component';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.css']
})
export class CoursesEditComponent extends GenericClass implements OnInit,OnDestroy {
  user=null;
  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  profile$!:Observable<IProfile>;
  types: IDropdown[] = [
    {key:'فرهنگي و تربيتی',value:1},
    {key:'بصيرتي و سياسي',value:2},
    {key:'ساير',value:3}
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private courseService: CourseService,
    private shService:SharedService,private modalService: NgbModal,
    private route: ActivatedRoute, private router:Router
  ) {
    super();
    this.editForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(36)]],
      executor: ['', [Validators.required, Validators.maxLength(36)]],
      duration : ['', [Validators.required, Validators.maxLength(36)]],
      year : ['', [Validators.required, Validators.maxLength(36)]],
      type: ['', [Validators.required, Validators.maxLength(36)]],
      degreeYear:['', [Validators.required, Validators.maxLength(36)]],
      id:-1,
      profileId:-1
    });
    this.profile$ = this.shService.profile$;
  }



  ngOnInit(): void {

    this.subscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadById(params['id']);
      }
    });
  }

  ngOnDestroy(): void {}

  loadById(id:number|string) {
    this.subscription = this.courseService.readById(id).subscribe({
      next:(result)=>{
        this.setDataToForm(result);
      },
      error:(err)=> {
        this.shService.showError();
      }
    });
  }

  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as ICource[]);
  }

  redirectToRegistration(){
    this.router.navigateByUrl('/pages/person/new');
  }

  opemPersonFilter() {
    const modalRef = this.modalService.open(PersonComponent, { fullscreen: true });
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      console.log(result);
      this.user=result;

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }

  submit(profileId:number) {

    this.disableButton = true;

    if (this.editForm.valid) {
      this.editForm.controls['profileId'].setValue(profileId);
      let rest$ = !this.updateMode?this.courseService.create(this.editForm.value) : this.courseService.update(this.editForm.value.id,this.editForm.value);
      this.subscription =rest$.subscribe({
        next: (result) => {
          this.shService.showError();
          this.disableButton = false;
        },
        error: (error) => {
            this.disableButton = false;
        }
      });
    }
  }

  cancle(){
    this.router.navigate(['pages/cources']);
  }

  get fullName(){
    return this.user?`${this.user?.firstName} ${this.user?.lastName}`:'';
  }
}
