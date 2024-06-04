import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface PersonalData {
  id: string;
  // Other fields...
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private personalDataSubject = new BehaviorSubject<PersonalData[]>(
    this.getDataFromLocalStorage('personalData')
  );
  personalData$ = this.personalDataSubject.asObservable();

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

  private getDataFromLocalStorage<T>(key: string): T[] {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]') as T[];
    } catch (error) {
      console.error(
        `Error parsing data from localStorage for key: ${key}`,
        error
      );
      return [];
    }
  }

  private setDataToLocalStorage<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private updateData<T>(
    subject: BehaviorSubject<T[]>,
    key: string,
    newData: T
  ): void {
    const updatedData = [...subject.value, newData];
    subject.next(updatedData);
    this.setDataToLocalStorage(key, updatedData);
  }

  private doesIdExist<T extends { id: string }>(
    subject: BehaviorSubject<T[]>,
    id: string
  ): boolean {
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
}
