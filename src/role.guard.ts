import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class RoleGuard implements CanActivate{

    private rolepassed:string;
    constructor(role:string){
    
        this.rolepassed=role;
    }
    canActivate(context: ExecutionContext): boolean {
        const ctx=context.switchToHttp();
        const request=ctx.getRequest();

        if(request.user.role==this.rolepassed)
        return true;

        return false;
    }
}