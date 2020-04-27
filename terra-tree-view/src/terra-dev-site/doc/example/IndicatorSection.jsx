import React from 'react';
import IconFolder from 'terra-icon/lib/icon/IconFolder';
import IconPaperFolded from 'terra-icon/lib/icon/IconPaperFolded';
import IconOverDue from 'terra-icon/lib/icon/IconOverDue';
import TreeView from '../../TreeView';

export default class IndicatorSection extends React.Component {
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
    const folderIndicator = (
      <div>
        <IconFolder />
      </div>
    );
    const leafIndicator = (
      <div>
        <IconPaperFolded />
      </div>
    );
    const f2Indicator = (
      <div>
        <IconFolder style={{ marginRight: '5px' }} />
        <IconOverDue />
      </div>
    );
    const leafDraftIndicator = (
      <div>
        <IconPaperFolded />
        <strong style={{ color: 'red', marginLeft: '2px' }}>Draft</strong>
      </div>
    );
    const draftIndicator = (
      <div>
        <strong style={{ color: 'red' }}>Draft</strong>
      </div>
    );
    const folderPropStr = '{folderIndicator}';
    const leafPropStr = '{leafIndicator}';
    const draftPropStr = '{draftTextIndicator}';
    return (
      <div>
        <h1>TreeView Structure - Indicator Section Usage</h1>
        <div>
          This page shows how the indicators section of folders and leaf items can be
          populated in the TreeView component. The `indicators` prop can be provided on the
          TreeView.Folder and TreeView.Item tags.  The prop must consist of a react node.
          For example, the node could be a DIV element that contains zero, one or more
          Terra Icons. You can also include styled text in the indicator section if desired.
          In this example:
          <ul>
            <li>the folders show a Terra IconFolder icon</li>
            <li>the leaf items show a Terra IconPaperFolded icon</li>
            <li>Folder 2 also shows the Terra Overdue icon</li>
            <li>Item 1 shows styled text in addition to the Terra IconPaperFolder icon</li>
            <li>Item 2 shows only styled text in the indicator section</li>
            <li>
              Folder 4 has the isEmpty prop set to false, but it has no children, so the
              chevon is displayed assuming that the children will be supplied later.
            </li>
            <li>Folder 5 has the isEmpty prop set to true, so no chevron is displayed</li>
          </ul>
        </div>
        <br />
        <div
          style={{
              width: '300px',
              height: '300px',
          }}
        >
          <TreeView
            title="Test TreeView - Indicator Section"
            onExpand={this.handleFolderExpand}
            onCollapse={this.handleFolderCollapse}
            onExpandAll={this.handleExpandAll}
            onCollapseAll={this.handleCollapseAll}
          >
            <TreeView.Item id="i1" text="Item 1" indicators={leafDraftIndicator} />
            <TreeView.Item id="i2" text="Item 2" indicators={draftIndicator} />
            <TreeView.Folder id="f1" text="Folder 1" indicators={folderIndicator} >
              <TreeView.Item id="f1_i1" text="Folder 1 / Item 1" indicators={leafIndicator} />
              <TreeView.Item id="f1_i2" text="Folder 1 / Item 2" indicators={leafIndicator} />
              <TreeView.Folder id="f1a" text="Folder 1a" indicators={folderIndicator} >
                <TreeView.Item id="f1a_i1" text="Folder 1a / Item 1" indicators={leafIndicator} />
                <TreeView.Item id="f1a_i2" text="Folder 1a / Item 2" indicators={leafIndicator} />
              </TreeView.Folder>
              <TreeView.Folder id="f1b" text="Folder 1b" indicators={folderIndicator} >
                <TreeView.Item id="f1b_i1" text="Folder 1b / Item 1" indicators={leafIndicator} />
                <TreeView.Item id="f1b_i2" text="Folder 1b / Item 2" indicators={leafIndicator} />
                <TreeView.Folder id="f1ba" text="Folder 1ba" indicators={folderIndicator} >
                  <TreeView.Item id="f1ba_i1" text="Folder 1ba / Item 1" indicators={leafIndicator} />
                  <TreeView.Item id="f1ba_i2" text="Folder 1ba / Item 2" indicators={leafIndicator} />
                </TreeView.Folder>
              </TreeView.Folder>
            </TreeView.Folder>
            <TreeView.Folder id="f2" text="Folder 2" indicators={f2Indicator} >
              <TreeView.Item id="f2_i1" text="Folder 2 / Item 1" indicators={leafIndicator} />
            </TreeView.Folder>
            <TreeView.Folder id="f3" text="Folder 3" indicators={folderIndicator} >
              <TreeView.Item id="f3_i1" text="Folder 3 / Item 1" indicators={leafIndicator} />
              <TreeView.Item id="f3_i2" text="Folder 3 / Item 2" indicators={leafIndicator} />
            </TreeView.Folder>
            <TreeView.Folder id="f4" text="Folder 4" indicators={folderIndicator} />
            <TreeView.Folder id="f5" text="Folder 5" indicators={folderIndicator} isEmpty />
          </TreeView>
        </div>
        <h3>Expand/Collapse Action Log</h3>
        <p>
          The TreeView component above is configured with the onExpand
          onCollapse callback props. Those callback functions
          are passed the id of the folder that the user expanded/collapsed.
          The user action and id of the folder that was last expanded or
          collapsed is logged here. The TreeView component is also configured with the
          onExpandAll and onCollapseAll callback props. Those callback functions are
          not passed any parameters and they log the user actions here.
        </p>
        <div style={{ border: '1px solid black', padding: '5px' }}>
          <p id="userAction">User Action: {this.state.userAction}</p>
          <p id="actionId">Action ID: {this.state.actionId}</p>
        </div>
        <h2>Sample Code:</h2>
        {/* eslint-disable react/jsx-indent, max-len */}
        <code>
          const folderIndicator = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;IconFolder /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          const leafIndicator = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;IconPaperFolded /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
        const draftTextIndicator = (<br />
            <span style={{ marginLeft: '10px' }} >&lt;div&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;strong/&gt;DRAFT&lt;/strong&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/div&gt;</span><br />
          );<br />
          . . .<br />
          &lt;TreeView title=&quot;Test Tree - Indicator Section&quot; onexpand={onExpandPropStr} onCollapse={onCollapsePropStr} onExpandAll={onExpandAllPropStr} onCollapseAll={onCollapseAllPropStr}&gt;<br />
        <span style={{ marginLeft: '10px' }} >&lt;TreeView.Item id=&quot;i1&quot; text=&quot;Item 1&quot; indicators={draftPropStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f1&quot; text=&quot;Folder 1&quot; indicators={folderPropStr} &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f1_i1&quot; text=&quot;Folder 1 / Item 1&quot; indicators={leafPropStr} /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
          &lt;/TreeView&gt;<br />
        </code>
        {/* eslint-enable react/jsx-indent, max-len */}
      </div>
    );
  }
}
