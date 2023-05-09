import { map } from 'rxjs';
// eslint-disable-next-line require-jsdoc
export function usernameExistsValidator(authService) {
    return (control) => {
        return authService.getusername(control.value).pipe(map(res => {
            return res ? { usernameExists: true } : null;
        }));
    };
}
//# sourceMappingURL=UsernameValidator.js.map