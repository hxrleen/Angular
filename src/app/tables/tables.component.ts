import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
    ]),
  ],
})
export class TablesComponent implements OnInit {
  personalDataArray: any[] = [];
  familyDataArray: any[] = [];
  educationDataArray: any[] = [];
  experienceDataArray: any[] = [];

  constructor(private dataService: DataService) {}

  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }

  expand() {
    this.collapsed = false;
  }

  collapse() {
    this.collapsed = true;
  }

  ngOnInit(): void {
    this.dataService.personalData$.subscribe(
      (data) => (this.personalDataArray = data)
    );
    this.dataService.familyData$.subscribe(
      (data) => (this.familyDataArray = data)
    );
    this.dataService.educationData$.subscribe(
      (data) => (this.educationDataArray = data)
    );
    this.dataService.experienceData$.subscribe(
      (data) => (this.experienceDataArray = data)
    );
  }

  //delete-------------------------------------------------------------

  deletePersonalData(id: string): void {
    this.dataService.deletePersonalData(id);
  }

  deleteFamilyData(id: string): void {
    this.dataService.deleteFamilyData(id);
  }

  deleteEducationData(id: string): void {
    this.dataService.deleteEducationData(id);
  }

  deleteExperienceData(id: string): void {
    this.dataService.deleteExperienceData(id);
  }

  //edit----------------------------------------------------------------

  editPersonalData(formData: any): void {
    this.dataService.setPersonalFormData(formData);
  }

  editFamilyData(formData: any): void {
    this.dataService.setFamilyFormData(formData);
  }

  editEducationData(formData: any): void {
    this.dataService.setEducationFormData(formData);
  }

  editExperienceData(formData: any): void {
    this.dataService.setExperienceFormData(formData);
  }
}
