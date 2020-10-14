import React, { useState } from 'react';
import $ from 'jquery';
import Text from '../../components/Text/Text';
import string from '../../../configs/strings.json';

const {
  home: {
    descriptionList: {
      one,
      two,
      three
    }
  } 
} = string;

const homeHeight = {
  page: 0,
  text: 0
};

export default () => {
  const [ height, setHeight ] = useState(false);

  const windowResized = () => {
    homeHeight.page = $("#page-home").height();
    homeHeight.text = $("#home-text-wrapper").height();
    if (homeHeight.text > homeHeight.page - 90) {
      setHeight(true);
    } else {
      setHeight(false);
    }
  }

  $(window).on("load", () => {
    window.addEventListener("resize", windowResized);
    homeHeight.page = $("#page-home").height();
    homeHeight.text = $("#home-text-wrapper").height();
    if (homeHeight.text > homeHeight.page - 90) {
      setHeight(true);
    } else {
      setHeight(false);
    }
  });

  return (
    <div id="page-home" className="page-home">
      <div id="home-text-wrapper" className="home-text-wrapper">
        <Text text={string.home.header} className="font-header home-header" />
        <br></br>
        {/* <Text
          text={string.home.description1}
          className="font-subtitle home-subtitle-one"
        /> */}
        <Text
          text={string.home.description2}
          className="font-subtitle home-subtitle-one"
        />
        <Text
          isList
          list={[one, two, three]}
          className="font-subtitle home-subtitle-one"
        />
        <Text
          text={string.home.description3}
          className="font-subtitle home-subtitle-two"
          style={height ? { marginBottom: "20vh" } : {}}
        />
      </div>
    </div>
  );
};
