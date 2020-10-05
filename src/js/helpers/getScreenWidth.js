import $ from "jquery";

export default () => {
  let screenWidth = 0;
  if ($("#inner-wrapper").width()) {
    screenWidth = $("#inner-wrapper").width();
  }
  return (screenWidth - window.innerWidth);
};