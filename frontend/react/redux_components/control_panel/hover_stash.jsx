import React from 'react';
import { Tool } from './tool';
import ReactTooltip from "react-tooltip";

export const HoverStash = () => (
  <div>
    <ReactTooltip id='heapSort'>
      <Tool sort={'heapSort'} />
    </ReactTooltip>
    <ReactTooltip id='quickSortRec'>
      <Tool sort={'quickSortRec'} />
    </ReactTooltip>
    <ReactTooltip id='mergeSortIter'>
      <Tool sort={'mergeSortIter'} />
    </ReactTooltip>
    <ReactTooltip id='bubbleSort'>
      <Tool sort={'bubbleSort'} />
    </ReactTooltip>
    <ReactTooltip id='radixSort'>
      <Tool sort={'radixSort'} />
    </ReactTooltip>
    <ReactTooltip id='jsSort'>
      <Tool sort={'jsSort'} />
    </ReactTooltip>
    <ReactTooltip id='countingSort'>
      <Tool sort={'countingSort'} />
    </ReactTooltip>
    <ReactTooltip id="max-length">Maximium Array Length</ReactTooltip>
    <ReactTooltip id="min-length">Minimum Array Length</ReactTooltip>
    <ReactTooltip id="num-tests">Number of Tests</ReactTooltip>
  </div>
);
