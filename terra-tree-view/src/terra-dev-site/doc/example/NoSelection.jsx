import React from 'react';
import TreeView from '../../TreeView';

export default class NoSelection extends React.Component {
  constructor(props) {
    super(props);
    this.handleFolderExpand = this.handleFolderExpand.bind(this);
    this.handleFolderCollapse = this.handleFolderCollapse.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleCollapseAll = this.handleCollapseAll.bind(this);
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

  handleExpandAll() {
    this.setState({
      userAction: 'Expand all folders',
      actionId: 'N/A',
    });
  }

  handleCollapseAll() {
    this.setState({
      userAction: 'Collapse all folders',
      actionId: 'N/A',
    });
  }

  render() {
    const onExpandPropStr = '{this.handleFolderExpand}';
    const onCollapsePropStr = '{this.handleFolderCollapse}';
    const onExpandAllPropStr = '{this.handleExpandAll}';
    const onCollapseAllPropStr = '{this.handleCollapseAll}';
    const item1TextStr = '{item1Text}';
    const folder2TextStr = '{folder2Text}';
    const folder4TextStr = '{folder4Text}';
    const item1Text = (<span><strong><span style={{ color: 'red' }}>(Draft)</span> -</strong> Item 1</span>);
    const folder2Text = (<span>Folder 2 <i style={{ color: 'gray' }}><strong>(Empty)</strong></i></span>);
    const folder4Text = (<span>Folder 4 <i style={{ color: 'gray' }}><strong>(Children to be filled in later)</strong></i></span>);
    const rule = {
      draftIndicator: 1,
      name: 'Folder 1',
    };
    return (
      <div>
        <h1>TreeView - Selection not enabled</h1>
        <p>
          This page shows how the the TreeView component can be configured
          without selection enabled. This can simply be done by omitting
          the `selectionEnabled` prop from the TreeView root component.
          NOTE: in this example, Folder 4 has no children, so when you expand
          the folder, the chevron changes from pointing right to pointing down
          but no additional data is shown.
        </p>
        <p>
          This page also shows and example of setting the `text` prop with a React node. This
          allows you to format the text that is displayed on the folder or item row. In the
          example below, Item 1 and Folder 2 have React nodes for their `text` props causing
          their text to be formatted.
        </p>
        <p>
          In the example below, Item 1 and Folder 2 also show the usage of the `description` prop.
          That prop provides additional information over what the `text` prop provides and is
          included in the tooltip when you hover the mouse over the folder or item.
        </p>
        <br />
        <div
          style={{
              width: '300px',
              height: '300px',
          }}
        >
          <TreeView
            title="Test TreeView - No Selection"
            onExpand={this.handleFolderExpand}
            onCollapse={this.handleFolderCollapse}
            onExpandAll={this.handleExpandAll}
            onCollapseAll={this.handleCollapseAll}
          >
            <TreeView.Item id="i1" text={item1Text} description="Description text" />
            <TreeView.Item id="i2" text="Item 2" />
            <TreeView.Folder id="f1" text={<span>{rule.draftIndicator === 1 && <strong> (Draft) </strong>} {rule.name}</span>} >
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
            <TreeView.Folder id="f2" text={folder2Text} description="Description text" isEmpty />
            <TreeView.Folder id="f3" text="Folder 3" isInitiallyOpen >
              <TreeView.Item id="f3_i1" text="Folder 3 / Item 1" />
              <TreeView.Item id="f3_i2" text="Folder 3 / Item 2" />
            </TreeView.Folder>
            <TreeView.Folder id="f4" text={folder4Text} description="Description text" />
          </TreeView>
        </div>
        <div>
          <h3>Expand/Collapse Action Log</h3>
          <p>
            The TreeView component above is configured with the onExpand
            onCollapse callback props. Those callback functions
            are passed the id of the folder that the user expanded/collapsed.
            The user action and id of the folder that was last expanded or
            collapsed is logged here.  The TreeView component is also configured with the
            onExpandAll and onCollapseAll callback props. Those callback functions are
            not passed any parameters and they log the user actions here.
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
            <li>Selection is not enabled since the selectionEnabled prop is not used.</li>
            <li>
              The title `Test TreeView - No Selection` is displayed in the component header.
            </li>
            <li>
              The application is informed when the following occurs via the
              callback props provided.
              <ul>
                <li>onExpand: when a folder is expanded by the user clicking on the chevron.</li>
                <li>onCollapse: when a volder is collapsed by the user clicking on the chevron.</li>
                <li>
                  onExpandAll: when all folders are expanded by the user clicking on the Expand
                  All button.
                </li>
                <li>
                  onCollapseAll: when all folders are collapsed by the user clicking on the
                  Collapse All button.
                </li>
              </ul>
            </li>
            <li>
              Folder 2 is configured with the isEmpty prop set to true, so the folder chevron is not
              displayed.
            </li>
            <li>
              Folder 3 is expanded on initial render because it is configured with the
              isInitiallyOpen prop.
            </li>
            <li>
              Item 1 and Folder 2 have React nodes for the `text` prop allowing for formatted text.
            </li>
            <li>
              Item 1 and Folder 2 also have the `description` prop set. The description text is
              included as part of the tooltip.
            </li>
            <li>
              Folder 4 is configured with the isEmpty prop set to false but it has no children, so
              the folder chevron is displayed. But when you expand the folder, no additional rows
              are shown.
            </li>
          </ul>
        </div>
        {/* eslint-disable react/jsx-indent, max-len */}
        <code>
          const item1Text = (&lt;span&gt;&lt;strong&gt;&lt;span style=&#123;&#123; color: &apos;red&apos; &#125;&#125;&gt;(Draft)&lt;/span&gt; -&lt;/strong&gt; Item 1&lt;/span&gt;);<br />
          const folder2Text = (&lt;span&gt;Folder 2 &lt;i style=&#123;&#123; color: &apos;gray&apos; &#125;&#125;&gt;&lt;strong&gt;(Empty)&lt;/strong&gt;&lt;/i&gt;&lt;/span&gt;);<br />
          . . .<br />
          &lt;TreeView<br />
            <span style={{ marginLeft: '10px' }} >title=&quot;Test Tree&quot;</span><br />
            <span style={{ marginLeft: '10px' }} >onexpand={onExpandPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onCollapse={onCollapsePropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onExpandAll={onExpandAllPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onCollapseAll={onCollapseAllPropStr}</span><br />
          &gt;<br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Item id=&quot;i1&quot; text=&quot;{item1TextStr}&quot; description=&quot;Description text&quot; /&gt;</span><br />
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
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f2&quot; text={folder2TextStr} description=&quot;Description text&quot; isEmpty /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f3&quot; text=&quot;Folder 3&quot; isInitiallyOpen &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f3_i1&quot; text=&quot;Folder 3 / Item 1&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f3_i2&quot; text=&quot;Folder 3 / Item 2&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f4&quot; text={folder4TextStr} description=&quot;Description text&quot; /&gt;</span><br />
          &lt;/TreeView&gt;<br />
        </code>
        {/* eslint-enable react/jsx-indent, max-len */}
      </div>
    );
  }
}
