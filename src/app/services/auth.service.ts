import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router: Router) { 

  }
  apiurl='http://localhost:3000/user';

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }

LoginUser(email: string, password: string) {
  return this.http.get<any[]>(this.apiurl).pipe(
    map((allUsers) => {
      const foundUser = allUsers.find(user => 
        user.email === email && user.password === password
      );

      if (!foundUser) {
        throw new Error('Email or password is incorrect');
      }

      return {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email
      };
    })
  );
}

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userId');
  }
  
}
