import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.scss',
})
export class PlanCardComponent {
  selectedPlan: 'StandardAds' | 'Standard' | 'Premium' = 'StandardAds';

  plans = [
    {
      planTitle: 'Standard with ads',
      resolutionTitle: '1080p',
      monthlyPrice: 6.99,
      vsQuality: 'Good',
      resolution: '1080p (Full HD)',
      supportedDevices: ['TV', 'computer', 'mobile phone', 'tablet'],
      shareNum: 2,
      downloadDevices: 2,
      ads: 'A few ad breaks',
    },
  ];
}
