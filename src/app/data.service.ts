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
  // Personal data
  private personalDataSubject = new BehaviorSubject<PersonalData[]>(
    this.getDataFromLocalStorage('personalData')
  );
  personalData$ = this.personalDataSubject.asObservable();
  private personalformDataSubject = new BehaviorSubject<any>({});
  personalformData$ = this.personalformDataSubject.asObservable();

  // Family data
  private familyformDataSubject = new BehaviorSubject<any>({});
  familyformData$ = this.familyformDataSubject.asObservable();
  public familyDataSubject = new BehaviorSubject<any[]>(
    this.getDataFromLocalStorage('familyData')
  );
  familyData$ = this.familyDataSubject.asObservable();

  // Education data
  private educationformDataSubject = new BehaviorSubject<any>({});
  educationformData$ = this.educationformDataSubject.asObservable();
  private educationDataSubject = new BehaviorSubject<any[]>(
    this.getDataFromLocalStorage('educationData')
  );
  educationData$ = this.educationDataSubject.asObservable();

  // Experience data
  private experienceformDataSubject = new BehaviorSubject<any>({});
  experienceformData$ = this.experienceformDataSubject.asObservable();
  private experienceformDataSource = new BehaviorSubject<any>({});
  experienceData: any[] = [];
  private experienceDataSubject = new BehaviorSubject<any[]>(
    this.getDataFromLocalStorage('experienceData')
  );
  experienceData$ = this.experienceDataSubject.asObservable();

  // Get local storage data
  private getDataFromLocalStorage(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  // Set local storage data
  private setDataToLocalStorage(key: string, data: any[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Update data function
  private updateData(
    subject: BehaviorSubject<any[]>,
    key: string,
    newData: any
  ): void {
    const updatedData = [...subject.value, newData];
    subject.next(updatedData);
    this.setDataToLocalStorage(key, updatedData);
  }

  // Personal data methods
  updatePersonalData(newData: PersonalData): void {
    if (this.doesIdExist(this.personalDataSubject, newData.id)) {
      alert(`The ID already exists in personalData.`);
    } else {
      this.updateData(this.personalDataSubject, 'personalData', newData);
      alert('Data submitted successfully!');
    }
  }

  public doesIdExist(subject: BehaviorSubject<any[]>, id: string): boolean {
    return subject.value.some((item) => item.id === id);
  }

  // Family data methods
  updateFamilyData(newData: any): void {
    const index = this.familyDataSubject.value.findIndex(
      (item) => item.id === newData.id
    );
    if (index !== -1) {
      const updatedData = [...this.familyDataSubject.value];
      updatedData[index] = newData;
      this.familyDataSubject.next(updatedData);
      this.setDataToLocalStorage('familyData', updatedData);
      alert('Data updated successfully!');
    } else {
      this.addFamilyData(newData);
    }
  }

  addFamilyData(newData: any): void {
    if (this.doesIdExist(this.familyDataSubject, newData.id)) {
      alert(`The ID already exists in familyData.`);
    } else {
      const updatedData = [...this.familyDataSubject.value, newData];
      this.familyDataSubject.next(updatedData);
      this.setDataToLocalStorage('familyData', updatedData);
      alert('New data added successfully!');
    }
  }

  // Education data methods
  updateEducationData(newData: any): void {
    const index = this.educationDataSubject.value.findIndex(
      (item) => item.employeeId === newData.employeeId
    );
    if (index !== -1) {
      const updatedData = [...this.educationDataSubject.value];
      updatedData[index] = newData;
      this.educationDataSubject.next(updatedData);
      this.setDataToLocalStorage('educationData', updatedData);
      alert('Data updated successfully!');
    } else {
      this.addEducationData(newData);
    }
  }

  addEducationData(newData: any): void {
    if (this.doesEmployeeIdExistInEducation(newData.employeeId)) {
      alert(`The ID already exists in educationData.`);
    } else {
      const updatedData = [...this.educationDataSubject.value, newData];
      this.educationDataSubject.next(updatedData);
      this.setDataToLocalStorage('educationData', updatedData);
      alert('New data added successfully!');
    }
  }

  doesEmployeeIdExistInEducation(employeeId: string): boolean {
    return this.educationDataSubject.value.some(
      (item) => item.employeeId === employeeId
    );
  }

  // Experience data methods
  updateExperienceData(newData: any): void {
    if (this.doesEmployeeIdExist(newData.employeeId)) {
      this.updateExperienceDataById(newData);
    } else {
      this.updateData(this.experienceDataSubject, 'experienceData', newData);
    }
  }

  updateExperienceDataAtIndex(index: number, updatedData: any): void {
    this.experienceData[index] = updatedData;
    this.experienceformDataSource.next(updatedData);
  }

  private doesEmployeeIdExist(employeeId: string): boolean {
    return this.experienceDataSubject.value.some(
      (item) => item.employeeId === employeeId
    );
  }

  private updateExperienceDataById(updatedData: any): void {
    const updatedExperienceData = this.experienceDataSubject.value.map((item) =>
      item.employeeId === updatedData.employeeId ? updatedData : item
    );
    this.experienceDataSubject.next(updatedExperienceData);
    this.setDataToLocalStorage('experienceData', updatedExperienceData);
    alert('Data updated successfully!');
  }

  // Delete methods
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

  // Edit methods
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
