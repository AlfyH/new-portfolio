import React from 'react';
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

  $(function () {
    $(".font-subtitle").each(function () {
      const str = $(this).html();
      const regex = /Accedo/gi;
      const replaced_text = str.replace(
        regex,
        "<a href='https://www.accedo.tv' target='_blank'>Accedo</a>"
      );
      $(this).html(replaced_text);
    });
    $(".font-subtitle").each(function () {
      const str = $(this).html();
      const regex = /Channel 4/gi;
      const replaced_text = str.replace(
        regex,
        "<a href='https://www.channel4.com' target='_blank'>Channel 4</a>"
      );
      $(this).html(replaced_text);
    });
  });

export default () => {
  return (
    <div id="page-home" className="page-home">
      <div id="home-text-wrapper" className="home-text-wrapper">
        <Text text={string.home.header} className="font-header home-header" />
        <Text
          text={string.home.description1}
          className="font-subtitle home-subtitle-one"
        />
        <Text
          isList
          list={[one, two, three]}
          className="font-subtitle home-last-subtitle home-subtitle-one"
        />
      </div>
    </div>
  );
};
