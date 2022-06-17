import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GrtDataService } from '../../../../services/grt-data';
import { ApiCrudService } from '../../../../services/api-crud-service';
import { ErrorService } from '../../../../services/error-service';
import { IClaims } from '../../../models/claims.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public claim: { [P in keyof IClaims]: '' };
  public person_suffixes: string;
  public person_titles: string;
  public us_states: string;
  public form: FormGroup;
  public errors: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private grt: GrtDataService,
    private formBuilder: FormBuilder,
    private api: ApiCrudService,
    private errorService: ErrorService
  ) { }

  getClaim(): void {

    this.activatedRoute.params.subscribe(({ id }): void => {
      if (id) {
        this.api.retrieve(`/api/v1/claims/${id}`).then((data: any) => {
          this.claim = data;
          this.setFormValues({
            detail: { values: data }
          });
        }).catch(error => {
          console.warn(error);
        })
      }
    })
  }

  setFormValues({ detail: { values } }: any): Promise<any> {

    return (
      new Promise(resolve => {
        Object.entries(values).forEach(
          ([key, value]): void => {
            const control = this.form.controls[key];
            if (control) {
              control.setValue(value);
            }
          })
        resolve('Done')
      }));
  }

  initFormBuilder(): void {

    this.form = this.formBuilder.group({
      name_title: ["", [Validators.required]],
      first_name: ["", [
        (control: AbstractControl) => this.errorService.validateRequired(control, {
          required: 'First name is required',
          summary: 'First Name'
        })
      ]],
      middle_name: "",
      last_name: "",
      suffix: "",
      ssn: "",
      description: "",
      claim_date: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
    })
  }

  submitForm({ detail: { values } }: any): void {

    const { id = undefined } = (this.claim || {});

    this.setFormValues({
      detail: { values: { ...values } }
    }).then(_ => {

      const {
        valid, errors
      } = this.errorService.validateForm(values, this.form);

      this.errors = errors;

      if (valid) {
        const promise = (id)
          ? this.api.update(`/api/v1/claims/${id}`, values)
          : this.api.create(`/api/v1/claims`, values);
        promise.then(_ => {
          this.router.navigate([
            '/claims'
          ]);
        }).catch(error => {
          console.warn(error)
        })
      }
    });
  }

  ngOnInit(): void {

    this.getClaim();
    this.initFormBuilder();

    this.grt.get(
      "person-suffixes",
      "person-titles",
      "us-states").subscribe(({
        personTitle,
        personSuffix,
        usStates
      }: { [key: string]: string }): void => {
        this.person_suffixes = personSuffix;
        this.person_titles = personTitle;
        this.us_states = usStates;
      });
  }
}
