import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selector";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


export const AuthGuard:CanActivateFn = (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> => {
        const router:Router = inject(Router);
        const store: Store<AppState> = inject(Store)
        return store.pipe(
            select(isLoggedIn),
            tap((isLoggedIn)=>{  // To handle the side effects
                if(!isLoggedIn){
                    router.navigateByUrl("/login");
                }
            })
        )
    }
    // constructor(private state: State<AppState>, private router: Router){

    // }
    /*canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean>{
           return this.state.pipe(
                select(isLoggedIn),
                tap((isLoggedIn)=>{
                    if(!isLoggedIn){
                        this.router.navigateByUrl("/login");
                    }
                })
            )
        }*/
