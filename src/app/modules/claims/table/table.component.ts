import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClaims } from '../../../models/claims.model';
import { ApiCrudService } from '../../../../services/api-crud-service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  claimId: string;

  open: boolean = false;

  items: Array<IClaims>;

  results: number = 0;

  confirmMsg: string;

  constructor(
    private route: Router,
    private api: ApiCrudService
  ) { }

  editClaim(id: string): void {
    this.route.navigate([
      '/claims', 'edit', id
    ])
  }

  confirmDelete(): void {
    this.api.delete(`/api/v1/claims/${this.claimId}`).then(({ claims }: any): void => {
      this.setClaims(claims);
    }).catch((error): void => {
      console.warn(error);
    })
    this.open = false;
  }

  cancelDelete(): void {
    this.open = false;
  }

  deleteClaim({ id, first_name, last_name }: IClaims): void {
    this.claimId = id;
    this.confirmMsg = `Are you sure would like to delete this claim for ${first_name} ${last_name}?`;
    this.open = true;
  }

  setClaims(claims: Array<IClaims>): void {
    this.items = claims;
    this.results = claims.length;
  }

  ngOnInit(): void {

    this.api.read('/api/v1/claims').then(({ claims }: any): void => {
      this.setClaims(claims);
    }).catch((error): void => {
      console.warn(error);
    });
  }

}
