// get person age
export const getAge = (dateString: string) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// declination
export const declination = () => {
  const titles = ['год', 'года', 'лет'];
  const cases = [2, 0, 1, 1, 1, 2];
  return (number: number) => {
    const title =
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    return `${number} ${title}`;
  };
};
