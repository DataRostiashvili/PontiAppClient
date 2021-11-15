import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {

  transform(value: string | undefined, characterLimit: number): string| undefined{
    let res =  value?.substring(0, characterLimit);
    if(value!.length > characterLimit)
    {
      res?.concat('...');
    }

    return res;
  }

}
