import { Injectable } from "@angular/core";
import { ApiService } from "../services/services.service";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private readonly service: ApiService, private readonly router: Router) { }

    canActivate(): Observable<boolean> | boolean {
        return this.service.verificarLogin().pipe(
            tap(valid => {
              if (!valid) {
                this.router.navigateByUrl('/login')
              }
            })
          );
    }
}
