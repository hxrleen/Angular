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

    this.initializeSlider('tenure1', 'slider-label1');
    this.initializeSlider('tenure2', 'slider-label2');
  }

  experienceFormSubmit(): void {
    if (this.experienceFormData.employeeId === '') {
      alert('Please select a valid Employee ID.');
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

  onRoleChange(
    event: Event,
    role: string,
    roleArray: 'roles1' | 'roles2'
  ): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.experienceFormData[roleArray].push(role);
    } else {
      const index = this.experienceFormData[roleArray].indexOf(role);
      if (index !== -1) {
        this.experienceFormData[roleArray].splice(index, 1);
      }
    }
  }
}
