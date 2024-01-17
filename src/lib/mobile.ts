import isMobile from "ismobilejs";

const userAgent = navigator.userAgent;

export const mobileDevice = (width: number) =>
  width < 960 // || isMobile(userAgent).any;
