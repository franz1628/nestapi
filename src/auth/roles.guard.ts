// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean { const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler()); 
    if (!requiredRoles) { 
      return true; // No roles required, allow access. 
    } 
    const request = context.switchToHttp().getRequest(); 
    console.log('Headers:', request.headers);
    const user = request.user; 
    console.log('Required Roles:', requiredRoles); 
    console.log('User in RolesGuard:', user); 
    return requiredRoles.some((role) => user?.role === role); 
  }
}
