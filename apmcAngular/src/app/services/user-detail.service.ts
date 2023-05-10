import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { map } from 'rxjs';
import { DistrictTaluka } from '../models/district-taluka.model';
import { UserDetail } from '../models/user-detail.model';

@Injectable({providedIn:'root'})
export class UserDetailService{

  constructor(private http: HttpClient){

  }

  addUserDetail(userDetail: UserDetail){
    return this.http.post<UserDetail>(environment.ApiURL+'userDetail', userDetail);
  }

  getDetailByUserId(userId: number){
    return this.http.get<UserDetail>(environment.ApiURL+'userDetail/'+userId);
  }

  getDistrictList(){
    return this.http.get<DistrictTaluka>('../../assets/district-taluka.json').pipe(
      map(res => res.districts.map(district => district.name))
    );
  }

  getTalukaList(district: string){
    return this.http.get<DistrictTaluka>('../../assets/district-taluka.json').pipe(
      map(data => {
        const districtData = data.districts.filter(item => item.name.toLowerCase() === district.toLowerCase())[0];
        if (districtData) {
          return {
            district: districtData.name,
            talukas: districtData.talukas
          };
        } else {
          return null;
        }
      })
    );

  }

}