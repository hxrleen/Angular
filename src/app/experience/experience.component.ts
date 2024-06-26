import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experienceFormData: any = { id: '', roles1: [], roles2: [] };
  personalDataIds: string[] = [];

  constructor(private renderer: Renderer2, private dataService: DataService) {}

  ngOnInit(): void {
    //for personal id in dropdown
    this.dataService.personalData$.subscribe((personalData) => {
      this.personalDataIds = personalData.map((data) => data.id);
    });

    //experience data
    this.dataService.experienceformData$.subscribe((formData) => {
      this.experienceFormData = { ...formData };

      // roles1 and roles2
      if (!Array.isArray(this.experienceFormData.roles1)) {
        this.experienceFormData.roles1 = [];
      }
      if (!Array.isArray(this.experienceFormData.roles2)) {
        this.experienceFormData.roles2 = [];
      }

      this.updateSliderUI('tenure1', formData.tenure1);
      this.updateSliderUI('tenure2', formData.tenure2);
      this.updateRoleCheckboxes();
    });

    this.initializeSlider('tenure1', 'slider-label1');
    this.initializeSlider('tenure2', 'slider-label2');
  }

  experienceFormSubmit(): void {
    const form = this.isValidFormData(this.experienceFormData);
    if (this.experienceFormData.id === '') {
      alert('Select a valid employee id');
      return;
    }

    if (this.isValidFormData(this.experienceFormData)) {
      const existingIndex = this.dataService.experienceData.findIndex(
        (entry) => entry.id === this.experienceFormData.id
      );

      if (existingIndex !== -1) {
        this.dataService.updateExperienceDataAtIndex(
          existingIndex,
          this.experienceFormData
        );
      } else {
        this.dataService.updateExperienceData(this.experienceFormData);
        this.experienceFormData = { id: '', roles1: [], roles2: [] };
      }
    } else {
      alert('Please fill out all fields.');
    }
  }

  //slider

  initializeSlider(sliderId: string, labelId: string): void {
    const slider = document.getElementById(sliderId) as HTMLInputElement;
    const span = document.getElementById(labelId);

    if (slider && span) {
      this.updateSliderLabel(slider, span);

      slider.oninput = () => {
        this.updateSliderLabel(slider, span);
      };
    }
  }

  updateSliderUI(sliderId: string, value?: number): void {
    const slider = document.getElementById(sliderId) as HTMLInputElement;
    if (slider && value !== undefined) {
      slider.value = value.toString();
      const span = document.getElementById(`${sliderId}-label`);
      if (span) {
        this.updateSliderLabel(slider, span);
      }
    }
  }

  updateSliderLabel(slider: HTMLInputElement, span: HTMLElement): void {
    let marginValue = parseInt(slider.value) * 5 - 4;
    if (parseInt(slider.value) === 20) {
      marginValue -= 6;
      if (screen.width < 993) {
        marginValue -= 6;
      }
    }
    this.renderer.setStyle(span, 'margin-left', `${marginValue}%`);

    let _yrsTxt = parseInt(slider.value) < 10 ? 'yr.' : 'yrs.';
    span.innerHTML = `${slider.value} ${_yrsTxt}`;
  }

  //checkbox

  updateRoleCheckboxes(): void {
    const roles1Checkboxes = document.querySelectorAll(
      'input[name="roles1"]'
    ) as NodeListOf<HTMLInputElement>;
    roles1Checkboxes.forEach((checkbox) => {
      checkbox.checked = this.experienceFormData.roles1.includes(
        checkbox.value
      );
    });

    const roles2Checkboxes = document.querySelectorAll(
      'input[name="roles2"]'
    ) as NodeListOf<HTMLInputElement>;
    roles2Checkboxes.forEach((checkbox) => {
      checkbox.checked = this.experienceFormData.roles2.includes(
        checkbox.value
      );
    });
  }

  onRoleChange(
    event: Event,
    role: string,
    roleArray: 'roles1' | 'roles2'
  ): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      if (!this.experienceFormData[roleArray].includes(role)) {
        this.experienceFormData[roleArray].push(role);
      }
    } else {
      const index = this.experienceFormData[roleArray].indexOf(role);
      if (index !== -1) {
        this.experienceFormData[roleArray].splice(index, 1);
      }
    }
  }

  private isValidFormData(data: any): boolean {
    return (
      data.id &&
      data.lastcomp1 &&
      data.tenure1 &&
      data.lastcomp2 &&
      data.tenure2 &&
      Array.isArray(data.roles1) &&
      data.roles1.length > 0 &&
      Array.isArray(data.roles2) &&
      data.roles2.length > 0
    );
  }
}
