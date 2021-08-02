import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '@app/_models/user';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';



const users: User[] = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {


    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        //wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authnticate') && method === 'post':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    //pass through any request not handle above request
                    return next.handle(request);
            }
        }
        // route functions
        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.lastName,
                lastName: user.lastName,

            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }
        // helper functions
        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: unauthorized } });
        }
        function isLoggedIn() {
            return headers.get('Authorization') === `Basic ${window.btoa('test:test')}`;
        }



    }
}

export let fakeBackendProvider = {
    // use fake backend in place of http service for backend-less dev
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};


