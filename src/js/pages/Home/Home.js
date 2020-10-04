import React from 'react';
import Text from '../../components/Text/Text';

export default () => {
  return (
    <div className="page-home">
      <Text
        text="Alfy Hushairi is a design-oriented front-end developer. He strives to build immersive and beautiful web applications through carefully crafted code and user-centric design."
        className="font-header home-header"
      />
      <br></br>
      <Text
        text="Alfy currently works at Accedo as a Software Developer using vanilla Javascript and React in the development of the Channel 4 application."
        className="font-subtitle home-subtitle-one"
      />
      <Text
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus justo purus, sed tempor diam iaculis eu. Duis a molestie magna, vitae blandit dolor. Ut tempor aliquam metus a dapibus. Cras dictum lectus mi, vel iaculis leo rutrum sed. Phasellus  a nulla sed porttitor. Phasellus ullamcorper est in augue ullamcorper dapibus. Donec bibendum."
        className="font-subtitle home-subtitle-two"
      />
    </div>
  );
};
