import {fromString} from 'html-to-text';

const options = {
  wordwrap: false,
  ignoreHref: true,
  ignoreImage: true
};

export default htmlString => 
  fromString(htmlString, options)
    .split('\n\n')
    .map((d,id) => { 
      const [front,back] = d.split(' - ');
      return {front, back, id: id+1, level: 0};
    });
