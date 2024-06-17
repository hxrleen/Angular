import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experienceFormData: any = { employeeId: '', roles1: [], roles2: [] };
  personalDataIds: string[] = [];

  constructor(private renderer: Renderer2, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.personalData$.subscribe((personalData) => {
      this.personalDataIds = personalData.map((data) => data.id);
    });

    this.dataService.experienceformData$.subscribe((formData) => {
      this.experienceFormData = { ...formData };

      if (!Array.isArray(this.experienceFormData.roles1)) {
        this.experienceFormData.roles1 = [];
      }
      if (!Array.isArray(this.experienceFormData.roles2)) {
        this.experienceFormData.roles2 = [];
      }

      // console.log(this.experienceFormData);
      this.updateSliderUI('tenure1', formData.tenure1);
      this.updateSliderUI('tenure2', formData.tenure2);
      this.updateRoleCheckboxes();
    });

    this.initializeSlider('tenure1', 'slider-label1');
    this.initializeSlider('tenure2', 'slider-label2');
  }

  experienceFormSubmit(): void {
    if (this.experienceFormData.employeeId === '') {
      alert('select a valid employee id');
      return;
    }
    this.dataService.updateExperienceData(this.experienceFormData);
    this.experienceFormData = { employeeId: '', roles1: [], roles2: [] };
    alert('Data submitted successfully!');
  }

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

  updateRoleCheckboxes(): void {
    // console.log('role1', this.experienceFormData.roles1);
    // console.log('role2', this.experienceFormData.roles2);

    const roles1Checkboxes = document.querySelectorAll(
      'input[name="roles1"]'
    ) as NodeListOf<HTMLInputElement>;
    roles1Checkboxes.forEach((checkbox) => {
      // console.log('checkbox:', checkbox.value);
      checkbox.checked = this.experienceFormData.roles1.includes(
        checkbox.value
      );
    });

    const roles2Checkboxes = document.querySelectorAll(
      'input[name="roles2"]'
    ) as NodeListOf<HTMLInputElement>;
    roles2Checkboxes.forEach((checkbox) => {
      // console.log('checkbox', checkbox.value);
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
    // console.log('updated Roles1:', this.experienceFormData.roles1);
    // console.log('updated Roles2:', this.experienceFormData.roles2);
  }
}
