import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AuthStatus } from "../interfaces/auth-status.enum";

export const isAuthGuard: CanActivateFn = (route,state) => {

  const authService = inject( AuthService );
  const router = inject( Router );

  if(authService.authStatus() === AuthStatus.authenticated){
    return true;
  }

  router.navigate(['/login']);
  return false;
};


