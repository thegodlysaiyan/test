import React from 'react';
import TreeView from '../../src/TreeView';

describe('TreeView', () => {
  const defaultRender = <TreeView />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Prop Tests
  it('should use the default value when no value is given', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.find('.tree-view').text()).toEqual('default');
  });

  // Structure Tests
  it('should have the class tree-view', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('tree-view');
  });
});
