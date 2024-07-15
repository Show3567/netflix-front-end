import { Component, Input, input } from '@angular/core';
import { Plan } from 'src/app/services/interfaces/plan.interface';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.scss',
})
export class PlanCardComponent {
  selectedPlan: 'Standard with ads' | 'Standard' | 'Premium' =
    'Standard with ads';

  plan = input<Plan>({
    id: 1,
    planTitle: 'Standard with ads',
    resolutionTitle: '1080p',
    monthlyPrice: 6.99,
    vsQuality: 'Good',
    resolution: '1080p (Full HD)',
    supportedDevices: ['TV', 'computer', 'mobile phone', 'tablet'],
    shareNum: 2,
    downloadDevices: 2,
    ads: 'A few ad breaks',
  });

  // plans: Plan[] = [
  //   {
  //     id: 1,
  //     planTitle: 'Standard with ads',
  //     resolutionTitle: '1080p',
  //     monthlyPrice: 6.99,
  //     vsQuality: 'Good',
  //     resolution: '1080p (Full HD)',
  //     supportedDevices: ['TV', 'computer', 'mobile phone', 'tablet'],
  //     shareNum: 2,
  //     downloadDevices: 2,
  //     ads: 'A few ad breaks',
  //   },
  //   {
  //     id: 2,
  //     planTitle: 'Standard',
  //     resolutionTitle: '1080p',
  //     monthlyPrice: 15.49,
  //     vsQuality: 'Good',
  //     resolution: '1080p (Full HD)',
  //     supportedDevices: ['TV', 'computer', 'mobile phone', 'tablet'],
  //     shareNum: 2,
  //     downloadDevices: 2,
  //     ads: 'No ads',
  //   },
  //   {
  //     id: 3,
  //     planTitle: 'Premium',
  //     resolutionTitle: '4K + HDR',
  //     monthlyPrice: 22.99,
  //     vsQuality: 'Best',
  //     resolution: '4K (Ultra HD) + HR',
  //     spatialAudio: 'Incuded',
  //     supportedDevices: ['TV', 'computer', 'mobile phone', 'tablet'],
  //     shareNum: 4,
  //     downloadDevices: 6,
  //     ads: 'A few ad breaks',
  //   },
  // ];
}
