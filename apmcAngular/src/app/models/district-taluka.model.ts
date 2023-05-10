
export interface DistrictTaluka {
  state: string;
  districts: {
    name: string;
    talukas: string[]
  }[];
}