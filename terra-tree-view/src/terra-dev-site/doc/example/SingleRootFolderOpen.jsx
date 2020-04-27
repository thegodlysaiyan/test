import React from 'react';
import TreeView from '../../TreeView';

export default class SingleRootFolderOpen extends React.Component {
  constructor(props) {
    super(props);
    this.handleFolderExpand = this.handleFolderExpand.bind(this);
    this.handleFolderCollapse = this.handleFolderCollapse.bind(this);
    this.state = {
      userAction: '',
      actionId: '',
    };
  }

  handleFolderExpand(id) {
    this.setState({
      userAction: 'Expand folder',
      actionId: id,
    });
  }

  handleFolderCollapse(id) {
    this.setState({
      userAction: 'Collapse folder',
      actionId: id,
    });
  }

  render() {
    const onExpandPropStr = '{this.handleFolderExpand}';
    const onCollapsePropStr = '{this.handleFolderCollapse}';
    return (
      <div>
        <h1>TreeView - Single Root Level Folder Can Be Opened Manually At One Time</h1>
        <p>
          This page shows the feature where only one root level folder can be expanded at a time.
          You can simply turn this feature on by including the `singleRootFolderExpansion` prop to
          the TreeView root component.  When the TreeView
          component is initially rendered, at most one root level folder will be expanded based on
          the `isInitiallyOpen` prop configured on folders.  Then when the component has a root
          level folder expended and the user expands another folder, the previously expanded
          folder will collapse.
        </p>
        <p>
          When the option to allow only a single root level folder to be
          expanded at a time is being used, the Expand All and Collapse All buttons will not be
          available on the TreeView header.
        </p>
        <br />
        <div
          style={{
              width: '450px',
              height: '400px',
          }}
        >
          <TreeView
            title="Test TreeView - Single Root Level Folder Open at One Time"
            singleRootFolderExpansion
            onExpand={this.handleFolderExpand}
            onCollapse={this.handleFolderCollapse}
          >
            <TreeView.Item id="i1" text="Item 1" />
            <TreeView.Item id="i2" text="Item 2" />
            <TreeView.Folder id="f1" text="Folder 1" >
              <TreeView.Item id="f1_i1" text="Folder 1 / Item 1" />
              <TreeView.Item id="f1_i2" text="Folder 1 / Item 2" />
              <TreeView.Folder id="f1a" text="Folder 1a" >
                <TreeView.Item id="f1a_i1" text="Folder 1a / Item 1" />
                <TreeView.Item id="f1a_i2" text="Folder 1a / Item 2" />
              </TreeView.Folder>
              <TreeView.Folder id="f1b" text="Folder 1b" >
                <TreeView.Item id="f1b_i1" text="Folder 1b / Item 1" />
                <TreeView.Item id="f1b_i2" text="Folder 1b / Item 2" />
                <TreeView.Folder id="f1ba" text="Folder 1ba" >
                  <TreeView.Item id="f1ba_i1" text="Folder 1ba / Item 1" />
                  <TreeView.Item id="f1ba_i2" text="Folder 1ba / Item 2" />
                </TreeView.Folder>
              </TreeView.Folder>
            </TreeView.Folder>
            <TreeView.Folder id="f2" text="Folder 2" >
              <TreeView.Item id="f2_i1" text="Folder 2 / Item 1" />
              <TreeView.Item id="f2_i2" text="Folder 2 / Item 2" />
              <TreeView.Folder id="f2a" text="Folder 2a" isInitiallyOpen >
                <TreeView.Item id="f2a_i1" text="Folder 2a / Item 1" />
                <TreeView.Item id="f2a_i2" text="Folder 2a / Item 2" />
              </TreeView.Folder>
            </TreeView.Folder>
            <TreeView.Folder id="f3" text="Folder 3" isInitiallyOpen >
              <TreeView.Item id="f3_i1" text="Folder 3 / Item 1" />
              <TreeView.Item id="f3_i2" text="Folder 3 / Item 2" />
            </TreeView.Folder>
          </TreeView>
        </div>
        <div>
          <h3>Expand/Collapse Action Log</h3>
          <p>
            The TreeView component above is configured with the onExpand
            onCollapse callback props. Those callback functions
            are passed the id of the folder that the user expanded/collapsed.
            The user action and id of the folder that was last expanded or
            collapsed is logged here.
          </p>
          <div style={{ border: '1px solid black', padding: '5px' }}>
            <p id="userAction">User Action: {this.state.userAction}</p>
            <p id="actionId">Action ID: {this.state.actionId}</p>
          </div>
        </div>
        <h2>Sample Code:</h2>
        <div>
          In code for the above TreeView component is shown here. It is configured with
          the following features;
          <ul>
            <li>
              The singleRootFolderExpansion prop is set for the TreeView component, which means
              that only one root level folder can be open/expanded at one time. If one folder is
              expanded and the user clicks on the chevron for another folder to expand it, the
              first folder will collapse when the second folder expands. Note that the component
              header will not show the Expand All and Collapse All buttons with this configuration.
            </li>
            <li>
              Both Folder 2a and Folder 3 are configured with the isInitiallyOpen prop. But since
              the component is configured with the singleRootFolderExpansion prop, only one of the
              root folders can be expanded when the component is initially rendered. Because of
              that, only root Folder 2 is expanded since it is first hierarchically.
            </li>
            <li>Selection is not enabled since the selectionEnabled prop is not used.</li>
            <li>
              The title `Test TreeView - Single Root Level Folder Open at One Time` is displayed in
              the component header.
            </li>
            <li>
              The application is informed when the following occurs via the
              callback props provided.
              <ul>
                <li>onExpand: when a folder is expanded by the user clicking on the chevron.</li>
                <li>onCollapse: when a volder is collapsed by the user clicking on the chevron.</li>
              </ul>
            </li>
          </ul>
        </div>
        {/* eslint-disable react/jsx-indent, max-len */}
        <code>
          &lt;TreeView<br />
            <span style={{ marginLeft: '10px' }} >title=&quot;Test Tree&quot;</span><br />
            <span style={{ marginLeft: '10px' }} >singleRootFolderExpansion</span><br />
            <span style={{ marginLeft: '10px' }} >onexpand={onExpandPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onCollapse={onCollapsePropStr}</span><br />
          &gt;<br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Item id=&quot;i1&quot; text=&quot;Item 1&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Item id=&quot;i2&quot; text=&quot;Item 2&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f1&quot; text=&quot;Folder 1&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f1_i1&quot; text=&quot;Folder 1 / Item 1&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f1_i2&quot; text=&quot;Folder 1 / Item 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Folder id=&quot;f1a&quot; text=&quot;Folder 1a&quot;&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1a_i1&quot; text=&quot;Folder 1a / Item 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1a_i2&quot; text=&quot;Folder 1a / Item 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeView.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Folder id=&quot;f1b&quot; text=&quot;Folder 1b&quot;&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1b_i1&quot; text=&quot;Folder 1b / Item 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1b_i2&quot; text=&quot;Folder 1b / Item 2&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Folder id=&quot;f_1ba&quot; text=&quot;Folder 1ba&quot;&gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1ba_i1&quot; text=&quot;Folder 1ba / Item 1&quot; /&gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1ba_i2&quot; text=&quot;Folder 1ba / Item 2&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;/TreeView.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f2&quot; text=&quot;Folder 2&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f2_i1&quot; text=&quot;Folder 2 / Item 1&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f2_i2&quot; text=&quot;Folder 2 / Item 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Folder id=&quot;f2a&quot; text=&quot;Folder 2a&quot; isInitiallyOpen&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f2a_i1&quot; text=&quot;Folder 2a / Item 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f2a_i2&quot; text=&quot;Folder 2a / Item 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f3&quot; text=&quot;Folder 3&quot; isInitiallyOpen &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f3_i1&quot; text=&quot;Folder 3 / Item 1&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f3_i2&quot; text=&quot;Folder 3 / Item 2&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
          &lt;/TreeView&gt;<br />
        </code>
        {/* eslint-enable react/jsx-indent, max-len */}
      </div>
    );
  }
}
