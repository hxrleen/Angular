import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface PersonalData {
  id: string;
  name: string;
  dob: string;
  address: string;
  designation: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private personalDataSubject = new BehaviorSubject<PersonalData[]>(
    this.getDataFromLocalStorage('personalData')
  );
  personalData$ = this.personalDataSubject.asObservable();

  private personalformDataSubject = new BehaviorSubject<any>({});
  personalformData$ = this.personalformDataSubject.asObservable();

  private familyformDataSubject = new BehaviorSubject<any>({});
  familyformData$ = this.familyformDataSubject.asObservable();

  private educationformDataSubject = new BehaviorSubject<any>({});
  educationformData$ = this.educationformDataSubject.asObservable();

  private experienceformDataSubject = new BehaviorSubject<any>({});
  experienceformData$ = this.experienceformDataSubject.asObservable();

  private familyDataSubject = new BehaviorSubject<any[]>(
    this.getDataFromLocalStorage('familyData')
  );
  familyData$ = this.familyDataSubject.asObservable();

  private educationDataSubject = new BehaviorSubject<any[]>(
    this.getDataFromLocalStorage('educationData')
  );
  educationData$ = this.educationDataSubject.asObservable();

  private experienceDataSubject = new BehaviorSubject<any[]>(
    this.getDataFromLocalStorage('experienceData')
  );
  experienceData$ = this.experienceDataSubject.asObservable();

  private getDataFromLocalStorage(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  private setDataToLocalStorage(key: string, data: any[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private updateData(
    subject: BehaviorSubject<any[]>,
    key: string,
    newData: any
  ): void {
    const updatedData = [...subject.value, newData];
    subject.next(updatedData);
    this.setDataToLocalStorage(key, updatedData);
  }

  private doesIdExist(subject: BehaviorSubject<any[]>, id: string): boolean {
    return subject.value.some((item) => item.id === id);
  }

  updatePersonalData(newData: PersonalData): void {
    if (this.doesIdExist(this.personalDataSubject, newData.id)) {
      alert(`The ID already exists in personalData.`);
    } else {
      this.updateData(this.personalDataSubject, 'personalData', newData);
      alert('Data submitted successfully!');
    }
  }

  updateFamilyData(newData: any): void {
    this.updateData(this.familyDataSubject, 'familyData', newData);
  }

  updateEducationData(newData: any): void {
    this.updateData(this.educationDataSubject, 'educationData', newData);
  }

  updateExperienceData(newData: any): void {
    this.updateData(this.experienceDataSubject, 'experienceData', newData);
  }

  //delete---------------------------------------------------------------

  deletePersonalData(id: string): void {
    if (confirm('Are you sure?')) {
      const updatedData = this.personalDataSubject.value.filter(
        (item) => item.id !== id
      );
      this.personalDataSubject.next(updatedData);
      this.setDataToLocalStorage('personalData', updatedData);
      alert('Data deleted successfully!');
    }
  }

  deleteFamilyData(id: string): void {
    if (confirm('Are you sure?')) {
      const updatedData = this.familyDataSubject.value.filter(
        (item) => item.id !== id
      );
      this.familyDataSubject.next(updatedData);
      this.setDataToLocalStorage('familyData', updatedData);
      alert('Data deleted successfully!');
    }
  }

  deleteExperienceData(id: string): void {
    if (confirm('Are you sure?')) {
      const updatedData = this.experienceDataSubject.value.filter(
        (item) => item.employeeId !== id
      );
      this.experienceDataSubject.next(updatedData);
      this.setDataToLocalStorage('experienceData', updatedData);
      alert('Data deleted successfully!');
    }
  }

  deleteEducationData(id: string): void {
    if (confirm('Are you sure?')) {
      const updatedData = this.educationDataSubject.value.filter(
        (item) => item.employeeId !== id
      );
      this.educationDataSubject.next(updatedData);
      this.setDataToLocalStorage('educationData', updatedData);
      alert('Data deleted successfully!');
    }
  }

  //edit------------------------------------------------------------

  setPersonalFormData(formData: any): void {
    this.personalformDataSubject.next(formData);
  }

  setFamilyFormData(formData: any): void {
    this.familyformDataSubject.next(formData);
  }

  setEducationFormData(formData: any): void {
    this.educationformDataSubject.next(formData);
  }

  setExperienceFormData(formData: any): void {
    this.experienceformDataSubject.next(formData);
  }
}
