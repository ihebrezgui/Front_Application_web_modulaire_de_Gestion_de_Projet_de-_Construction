import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject the router
  const role = localStorage.getItem('role'); // Get the user's role from localStorage

  if (role) {
    // Check if the route requires a specific role
    const requiredRole = route.data['role'];
    if (requiredRole && requiredRole !== role) {
      // Redirect to an access-denied page if the roles don't match
      router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  }

  // If no role is found, redirect to the login page
  router.navigate(['/utilisateur']);
  return false;
};
