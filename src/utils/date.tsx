const ONE_DAY = 24 * 60 * 60 * 1000;

const isSameDate = (date1: Date | string, date2: Date | string) => {
  return (
    // eslint-disable-next-line eqeqeq
    new Date(date1).setHours(0, 0, 0, 0) == new Date(date2).setHours(0, 0, 0, 0)
  );
};

export { ONE_DAY, isSameDate };
