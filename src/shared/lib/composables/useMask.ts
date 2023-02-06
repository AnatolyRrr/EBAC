export const useMask = () => {
  const phoneMask = (inputPhone: string, codeCountry: string) => {
    const value = inputPhone.replace(/\D+/g, "");
    let result = "";
    let numberLength;

    if (codeCountry === "+7") {
      numberLength = 10;
    }

    if (codeCountry === "+55") {
      numberLength = 8;
    }

    if (codeCountry === "+996") {
      numberLength = 9;
    }

    if (numberLength) {
      for (let i = 0; i < value.length && i < numberLength; i++) {
        if (numberLength === 10) {
          switch (i) {
            case 3:
              result += "-";
              break;
            case 6:
              result += "-";
              break;
            case 8:
              result += "-";
              break;
            default:
              break;
          }
          result += value[i];
        }

        if (numberLength === 8) {
          switch (i) {
            case 4:
              result += "-";
              break;
            default:
              break;
          }
          result += value[i];
        }

        if (numberLength === 9) {
          switch (i) {
            case 3:
              result += "-";
              break;
            default:
              break;
          }
          result += value[i];
        }
      }
      return result;
    }
  };

  return {
    phoneMask,
  };
};
