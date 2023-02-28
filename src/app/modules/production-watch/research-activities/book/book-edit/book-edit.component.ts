import { SharedService } from 'shared/services/shared.service';
import { IBook } from 'app/core/interfaces/book.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router:Router,private shService:SharedService
  ) {
    // ITeaching 
    this.editForm = this._formBuilder.group({
      type: ['', [Validators.required, Validators.maxLength(36)]],
      title: ['', [Validators.required, Validators.maxLength(36)]],
      publicationId: ['', [Validators.required, Validators.maxLength(24)]],
      publicationYear: ['', [Validators.required, Validators.maxLength(24)]],
      id:-1
    });
  }

  ngOnInit(): void { 
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadBook(params['id']);
      }
    });
  }


  loadBook(id:number|string) {
    let res = this.bookService.readById(id).subscribe({
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
    this.editForm.setValue(entityData as IBook[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.bookService.update(this.editForm.value.id,this.editForm.value):this.bookService.create(this.editForm.value) ;
      let restSub =rest.subscribe({
        next: (result) => {
          this.disableButton = false;
          this.router.navigate(['pages/case-history/research-activities/book']);
          this.shService.showSuccess();
        },
        error: (error) => {
            this.disableButton = false;
            this.shService.showError();
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){
    this.router.navigate(['pages/case-history/research-activities/book']);
  }


}
