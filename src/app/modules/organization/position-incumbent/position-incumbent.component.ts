import { OrganizationService } from './../organization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonComponent } from 'app/core/components/user-find-box/person/person.component';
import { PositionService } from '../positions/position.service';

@Component({
  selector: 'app-position-incumbent',
  templateUrl: './position-incumbent.component.html',
  styleUrls: ['./position-incumbent.component.css']
})
export class PositionIncumbentComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  label='';
  positionLabel='';
  positionId=0;
  userId=0;
  position=null;
  user=null;
  constructor(
    private poService: PositionService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private acModal:NgbActiveModal
  ) {
  }


  ngOnInit(): void {
    this.poService.readById(this.positionId).subscribe(res=>{
      this.position = res;
    });
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


  submit() {
      this.position.holdsById = this.user.id;
      let rest = this.poService.update(this.position);
      let restSub =rest.subscribe({
        next: (result) => {
          this.acModal.close(true);
        },
        error: (error) => {
          this.acModal.close(false);
        },
        complete() {
          restSub.unsubscribe();
        }
      });

  }

  cancle(){
    this.acModal.dismiss();
  }

  get fullName(){
    return this.user?`${this.user?.firstName} ${this.user?.lastName}`:'';
  }
}
