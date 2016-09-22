import React from 'react';
import * as Hover from '../../redux_util/hover_text';

export const Tool = ({sort}) => (
  <div dangerouslySetInnerHTML={{__html: Hover["Hover"][sort]()}} />
);
