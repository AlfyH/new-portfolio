import $ from "jquery";

export default () => {
  let screenPosition = 0;
  if ($("#outer-wrapper").scrollTop())
  {
    screenPosition = $("#outer-wrapper").scrollTop();
  }

  return screenPosition;
};

