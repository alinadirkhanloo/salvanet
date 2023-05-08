import { CoursesService } from './../courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ICource } from 'app/core/interfaces/course.interface';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.css']
})
export class CoursesEditComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private courseService: CoursesService,
    private route: ActivatedRoute, private router:Router
  ) {

    this.editForm = this._formBuilder.group({
      organaization: ['', [Validators.required, Validators.maxLength(36)]],
      year: ['', [Validators.required, Validators.maxLength(36)]],
      duration : ['', [Validators.required, Validators.maxLength(36)]],
      title: ['', [Validators.required, Validators.maxLength(36)]],
      id:-1
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadById(params['id']);
      }
    });
  }


  loadById(id:number|string) {
    let res = this.courseService.readById(id).subscribe({
      next:(result)=>{
        this.setDataToForm(result);
      },
      error(err) {

      },
      complete() {
        res.unsubscribe();
      },
    });
  }

  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as ICource[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = !this.updateMode?this.courseService.create(this.editForm.value) : this.courseService.update(this.editForm.value.id,this.editForm.value);
      let restSub =rest.subscribe({
        next: (result) => {
          this.disableButton = false;
        },
        error: (error) => {
            this.disableButton = false;
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){
    this.router.navigate(['pages/case-history/education-records']);
  }


}
