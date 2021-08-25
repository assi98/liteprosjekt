//@flow
import * as React from 'react';
import { SearchOutput } from '../src/index.js';
import { shallow, mount } from 'enzyme';
import {Artikkel, artikkelservice} from "../src/service";

describe('SearchOutput test', () => {
  const wrapper = shallow(<SearchOutput match={{params: {search: "sok"}}}/>);



  it('initially', () => {
    let instance = SearchOutput.instance();
    expect(typeof instance).toEqual('object');
    jest.spyOn(artikkelservice, 'searchCases').mockResolvedValue([]);
    wrapper.update();
    if (instance) expect(wrapper.debug()).toMatchSnapshot();
  });

  it('after load', () => {
    // $flow-disable-line
    let articles: Artikkel[] = [new Artikkel('Sport','sok', 'brodtekst', 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225627/Pomeranian-On-White-01.jpg','enalt', '1','meg')];

    jest.spyOn(artikkelservice, 'searchCases').mockResolvedValue(articles);
    wrapper.update();
    let instance = SearchOutput.instance();
    expect(typeof instance).toEqual('object');
    if (instance) {
      instance.forceUpdate();
      instance.articles[0] = articles[0];
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});
