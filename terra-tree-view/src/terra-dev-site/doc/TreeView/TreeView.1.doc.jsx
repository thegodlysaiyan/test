import React from 'react';
import DocTemplate from 'terra-doc-template';
import ReadMe from '../../../../docs/README.md';
import { name } from '../../../../package.json';

// Component Source
import TreeViewSrc from '!raw-loader!../../../../src/TreeView';

// Example Files
import DefaultTreeView from '../example/DefaultTreeView';
import DefaultTreeViewSrc from '!raw-loader!../../../../src/terra-dev-site/doc/example/DefaultTreeView.jsx';

const DocPage = () => (
  <DocTemplate
    packageName={name}
    readme={ReadMe}
    srcPath={`https://github.com/cerner/terra-core/tree/master/packages/${name}`}
    examples={[
      {
        title: 'Default TreeView',
        example: <DefaultTreeView />,
        source: DefaultTreeViewSrc,
      },
    ]}
    propsTables={[
      {
        componentName: 'TreeView',
        componentSrc: TreeViewSrc,
      },
    ]}
  />
);

export default DocPage;
