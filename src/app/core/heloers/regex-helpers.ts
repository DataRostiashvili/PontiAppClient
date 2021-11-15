export class RegexHelpers
{
    public static  IsOnlyDigits(input: string) : boolean {
        let reg = /^\d+$/;
        return reg.test(input);
    }
}
