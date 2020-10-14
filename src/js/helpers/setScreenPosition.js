import $ from "jquery";

export default (value, animate) => {
  if (animate) {
    $("#outer-wrapper")
      .stop()
      .animate({ scrollTop: value }, 500, "swing");
  } else {
    $("#outer-wrapper").scrollTop(value);
  }
};
