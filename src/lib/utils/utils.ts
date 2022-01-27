export const preventEvent = async (event: any) => {
  // this part is for stopping parent forms to trigger their submit
  if (event) {
    // sometimes not true, e.g. React Native
    if (typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    if (typeof event.stopPropagation === 'function') {
      // prevent any outer forms from receiving the event too
      event.stopPropagation();
    }
  }
};

type ImagePath = 'emblems';

export const getImagePath = (id: string, type: ImagePath) => {
  return `/images/${type}/${id}.png`;
};

export const getWinRate = (wins: number, losses: number) => {
  return ((100 * wins) / (wins + losses)).toFixed();
};
