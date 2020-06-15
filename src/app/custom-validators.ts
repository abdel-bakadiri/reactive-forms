import { AbstractControl, ValidatorFn } from "@angular/forms";

export function rating(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value < 0 || c.value > 5) {
    return { rang: true };
  }
  return null;
}
export function ratingParms(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value < min || c.value > max) return { rang: true };
    return null;
  };
}

// * filed acros validator
export function matchEmail(
  firstEmail: string,
  secondeEmail: string
): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.get(firstEmail).value !== c.get(secondeEmail).value) {
      return { match: true };
    }
    return null;
  };
}
