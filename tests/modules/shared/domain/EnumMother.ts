
export class EnumMother {
  public static random = (validValues: any[]) => {
    const randomNumber = Math.floor(Math.random() * validValues.length);
    return validValues[randomNumber];
  };
}
