import { IBook } from 'app/core/interfaces/book.interface';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent {

  bookEditForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute
  ) {
    // ITeaching 
    this.bookEditForm = this._formBuilder.group({
      type: ['', [Validators.required, Validators.maxLength(36)]],
      title: ['', [Validators.required, Validators.maxLength(36)]],
      publicationName: ['', [Validators.required, Validators.maxLength(24)]],
      publicationYear: ['', [Validators.required, Validators.maxLength(24)]],
      publicationId:-1,
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
    let res = this.bookService.getById(id).subscribe({
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
    this.bookEditForm.setValue(entityData as IBook[]);
  }

  submit() {

    this.disableButton = true;

    if (this.bookEditForm.valid) {
      let rest = this.updateMode?this.bookService.insert(this.bookEditForm.value) : this.bookService.update(this.bookEditForm.value.id,this.bookEditForm.value);
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

  cancle(){}


}
