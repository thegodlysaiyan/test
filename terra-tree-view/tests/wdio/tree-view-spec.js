Terra.describeViewports('TreeView', ['tiny', 'medium', 'large'], () => {
  describe('Default', () => {
    before(() => browser.url('/#/raw/tests/terra-tree-view/default-tree-view'));

    it('validates the element', () => {
      Terra.validates.element();
    });
  });
});
