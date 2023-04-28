import useMediaQuery from './useMediaQuery'

// Media Query Breakpoints
// Min
export const mqSmall = () => useMediaQuery('(min-width: 480px)');
export const mqMedium = () => useMediaQuery('(min-width: 768px)');
export const mqLarge = () => useMediaQuery('(min-width: 1024px)');
// Max
export const mqMaxSmall = () => useMediaQuery('(max-width: 479px)');
export const mqMaxMedium = () => useMediaQuery('(max-width: 767px)');
export const mqMaxLarge = () => useMediaQuery('(max-width: 1023px)');