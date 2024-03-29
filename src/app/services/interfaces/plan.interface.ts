export interface Plan {
  id: number;
  planTitle: string;
  resolutionTitle: string;
  monthlyPrice: number;
  vsQuality: string;
  resolution: string;
  spatialAudio?: string;
  supportedDevices: string[];
  shareNum: number;
  downloadDevices: number;
  ads: string;
}
