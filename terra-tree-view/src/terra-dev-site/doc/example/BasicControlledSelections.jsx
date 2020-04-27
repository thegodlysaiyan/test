import React from 'react';
import TreeViewBase from '../../TreeViewBase';

export default class BasicControlledSelections extends React.Component {
  constructor(props) {
    super(props);
    this.handleFolderExpand = this.handleFolderExpand.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnUnselect = this.handleOnUnselect.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.handleOnUnselectAll = this.handleOnUnselectAll.bind(this);
    this.state = {
      f_2_data_loaded: false,
      userAction: '',
      actionId: '',
      allItemsSelected: false,
      currentSelections: ['i1', 'f1', 'f3_i1', 'f3_i2'],
    };
  }

  handleFolderExpand(id) {
    switch (id) {
      case 'f2':
        this.setState({ f_2_data_loaded: true });
        break;
      default:
        break;
    }
  }

  handleOnSelect(selectionObj) {
    this.setState({
      userAction: 'Select Item/Folder',
      actionId: selectionObj.actionId,
      allItemsSelected: selectionObj.allItemsSelected,
      currentSelections: selectionObj.currentSelections,
    });
  }

  handleOnUnselect(selectionObj) {
    this.setState({
      userAction: 'Unselect Item/Folder',
      actionId: selectionObj.actionId,
      allItemsSelected: selectionObj.allItemsSelected,
      currentSelections: selectionObj.currentSelections,
    });
  }

  handleOnSelectAll(selectionObj) {
    this.setState({
      userAction: 'Select All',
      actionId: selectionObj.actionId,
      allItemsSelected: selectionObj.allItemsSelected,
      currentSelections: selectionObj.currentSelections,
    });
  }

  handleOnUnselectAll(selectionObj) {
    this.setState({
      userAction: 'Unselect All',
      actionId: selectionObj.actionId,
      allItemsSelected: selectionObj.allItemsSelected,
      currentSelections: selectionObj.currentSelections,
    });
  }

  render() {
    let folder2Contents = null;
    if (this.state.f_2_data_loaded) {
      folder2Contents = <TreeViewBase.Item id="f2_i1" text="Folder 2 / Item 1" />;
    }
    const allSelectedStr = `${this.state.allItemsSelected} `;
    const currentSelectionsStr = this.state.currentSelections.toString().replace(/,/g, ', ');
    const onSelectPropStr = '{this.handleOnSelect}';
    const onUnselectPropStr = '{this.handleOnUnselect}';
    const onSelectAllPropStr = '{this.handleOnSelectAll}';
    const onUnselectAllPropStr = '{this.handleOnUnselectAll}';
    const isAllSelectedPropStr = '{this.state.allItemsSelected}';
    const selectedIdsPropStr = '{this.state.currentSelections}';
    return (
      <div>
        <h1>TreeView - Independent Parent/Child Selection Model</h1>
        <div>
          This page shows how the the Base TreeView component selection
          model works where parent and child selection is independent of each other.
          This selection model is in effect when you use the &lt;TreeViewBase&gt; component, which
          is considered `controlled`. This means that the consuming application has total control
          over the selections within the &lt;TreeViewBase&gt; component. The &lt;TreeViewBase&gt;
          component does not maintain state of which items are selected. It relies totally on
          props passed in by the consuming application to mark items as selected. This particular
          application component does not really do much to control the selections.  It simply takes
          the list of selected ids that it receives from the TreeView component in the callback
          functions, updates its state and passes the list to the component as props.
          So, ultimately, selecting or unselecting one item has no
          effect on the selection state of other items in the component.  You probably would not use
          the compoent this way, but it shows what the basic `controlled` behavior looks like.
          <ul>
            <li>
              When the user checks the checkbox for a folder to mark it as selected, then the
              selection state of its children will <u>not</u> automatically be changed.
            </li>
            <li>
              When the user unchecks the checkbox for a folder to mark it as
              unselected, then the selection state of its children will <u>not</u> automatically be
              changed.
            </li>
            <li>
              When a folder is marked as selected and one of its descendants is
              unselected by the user, then the selection state of the folder
              will <u>not</u> automatically be changed.
            </li>
            <li>
              When a folder is marked as unselected and the user selects all of
              its children, then the selection state of the folder will <u>not</u> automatically be
              changed.
            </li>
            <li>
              When the user checks the `select-all` checkbox on the Tree View header,
              then the selection state of all folders and leaf items at all levels
              will <u>not</u> automatically be changed.
            </li>
            <li>
              When the user unchecks the `select-all` checkbox on the Tree View
              header, then the selection state of all folders and leaf items at all levels
              will <u>not</u> automatically be changed.
            </li>
            <li>
              When the `select-all` checkbox is checked and the user unselects
              any folder or leaf item, then the selection state of the `select-all` checkbox
              will <u>not</u> automatically be changed.
            </li>
            <li>
              When the `select-all` checkbox is unchecked and the user manually
              selects all folders and leaf items, then the selection state of the `select-all`
              checkbox will <u>not</u> automatically be changed.
            </li>
          </ul>
          <p>
            Note that you can toggle the selection by clicking anywhere on the row of a folder or
            leaf item except when you click on the expand/collapse chevron.
          </p>
        </div>
        <br />
        <div
          style={{
              width: '300px',
              height: '300px',
          }}
        >
          <TreeViewBase
            onExpand={this.handleFolderExpand}
            onSelect={this.handleOnSelect}
            onUnselect={this.handleOnUnselect}
            onSelectAll={this.handleOnSelectAll}
            onUnselectAll={this.handleOnUnselectAll}
            title="Test TreeView - Independent Selection"
            selectionEnabled
            selectedIds={this.state.currentSelections}
            isAllSelected={this.state.allItemsSelected}
          >
            <TreeViewBase.Item id="i1" text="Item 1" />
            <TreeViewBase.Item id="i2" text="Item 2" />
            <TreeViewBase.Folder id="f1" text="Folder 1" >
              <TreeViewBase.Item id="f1_i1" text="Folder 1 / Item 1" />
              <TreeViewBase.Item id="f1_i2" text="Folder 1 / Item 2" />
              <TreeViewBase.Folder id="f1a" text="Folder 1a">
                <TreeViewBase.Item id="f1a_i1" text="Folder 1a / Item 1" />
                <TreeViewBase.Item id="f1a_i2" text="Folder 1a / Item 2" />
              </TreeViewBase.Folder>
              <TreeViewBase.Folder id="f1b" text="Folder 1b">
                <TreeViewBase.Item id="f1b_i1" text="Folder 1b / Item 1" />
                <TreeViewBase.Item id="f1b_i2" text="Folder 1b / Item 2" />
                <TreeViewBase.Folder id="f_1ba" text="Folder 1ba with extra text to cause truncation">
                  <TreeViewBase.Item id="f1ba_i1" text="Folder 1ba / Item 1" />
                  <TreeViewBase.Item id="f1ba_i2" text="Folder 1ba / Item 2 with extra text to cause truncation" />
                </TreeViewBase.Folder>
              </TreeViewBase.Folder>
            </TreeViewBase.Folder>
            <TreeViewBase.Folder id="f2" text="Folder 2" >
              {folder2Contents}
            </TreeViewBase.Folder>
            <TreeViewBase.Folder id="f3" text="Folder 3">
              <TreeViewBase.Item id="f3_i1" text="Folder 3 / Item 1" />
              <TreeViewBase.Item id="f3_i2" text="Folder 3 / Item 2" />
            </TreeViewBase.Folder>
          </TreeViewBase>
        </div>
        <div>
          <h3>Selection Action Log</h3>
          <div>
            The TreeView component above is configured with the onSelect, onUnselect,
            onSelectAll and onUnselectAll callback props. Those callback functions
            are passed a selection object which this page logs below. The
            selection object consists of the following:
            <ul>
              <li>
                User Action: the action that the user took: Select, Unselect, Select All, Unselect
                All.
              </li>
              <li>
                actionID: the id of the folder or leaf item that triggered the callback.
              </li>
              <li>
                isAllSelected: indicator as to whether the `select all` checkbox is marked as
                selected.
              </li>
              <li>
                currentSelections: array of the ids for all of the folders and leaf items
                that are currently selected.
              </li>
            </ul>
          </div>
          <div style={{ border: '1px solid black', padding: '5px' }}>
            <p>User Action: {this.state.userAction}</p>
            <p>Action ID: {this.state.actionId}</p>
            <p>Select-All Checkbox Checked?: {allSelectedStr}</p>
            <p>Current Selected IDs: {currentSelectionsStr}</p>
          </div>
        </div>
        <h2>Sample Code:</h2>
        <div>
          In the usage example below, the TreeView component is configured with
          the following features;
          <ul>
            <li>The `controlled` selection model is in effect because the &lt;TreeViewBase&gt;
              component is used and the `selectionEnabled` prop is set to true.
            </li>
            <li>The title `Test Tree` is displayed in the component header.</li>
            <li>
              The Select-All checkbox is initially not checked because the `isAllSelected` prop
              is initially set to false. The following folders/items are marked as selected
              because the `currentSelections` prop is initiall set to an array with ids:
              `i1`, `f1`, `f3_i1`, `f3_i2`.
              <ul>
                <li>`Item 1`</li>
                <li>
                  `Folder 1`, Note that none of its descendants are marked as selected since the
                  application is in control of the selections.
                </li>
                <li>
                  `Folder 3 / Item 1` and `Folder 3 / Item 2`, note that
                  `Folder 3` is not marked as selected when the component
                  is initially rendered because the application is in control of the selections.
                </li>
              </ul>
            </li>
            <li>
              the application is informed when the following occurs via the
              callback props provided.
              <ul>
                <li>onSelect: when a folder or leaf item is selected</li>
                <li>onUnselect: when a folder or leaf item is unselected</li>
                <li>
                  onSelectAll: when the user checks the `select all` checkbox in the
                  component&apos;s header
                </li>
                <li>
                  onUnselectAll: when the user unchecks the `select all` checkbox in the
                  component&apos;s header
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* eslint-disable react/jsx-indent, max-len */}
        <code>
          &lt;TreeViewBase<br />
            <span style={{ marginLeft: '10px' }} >onSelect={onSelectPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onUnselect={onUnselectPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onSelectAll={onSelectAllPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onUnselectAll={onUnselectAllPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >title=&quot;Test Tree&quot;</span><br />
            <span style={{ marginLeft: '10px' }} >selectionEnabled</span><br />
            <span style={{ marginLeft: '10px' }} >isAllSelected={isAllSelectedPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >selectedIds={selectedIdsPropStr}</span><br />
          &gt;<br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeViewBase.Item id=&quot;i1&quot; text=&quot;Item 1&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeViewBase.Item id=&quot;i2&quot; text=&quot;Item 2&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeViewBase.Folder id=&quot;f1&quot; text=&quot;Folder 1&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Item id=&quot;f1_i1&quot; text=&quot;Folder 1 / Item 1&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Item id=&quot;f1_i2&quot; text=&quot;Folder 1 / Item 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Folder id=&quot;f1a&quot; text=&quot;Folder 1a&quot;&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f1a_i1&quot; text=&quot;Folder 1a / Item 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f1a_i2&quot; text=&quot;Folder 1a / Item 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Folder id=&quot;f1b&quot; text=&quot;Folder 1b&quot;&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f1b_i1&quot; text=&quot;Folder 1b / Item 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f1b_i2&quot; text=&quot;Folder 1b / Item 2&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Folder id=&quot;f_1ba&quot; text=&quot;Folder 1ba with extra text to cause truncation&quot;&gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeViewBase.Item id=&quot;f1ba_i1&quot; text=&quot;Folder 1ba / Item 1&quot; /&gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeViewBase.Item id=&quot;f1ba_i2&quot; text=&quot;Folder 1ba / Item 2 with extra text to cause truncation&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeViewBase.Folder id=&quot;f2&quot; text=&quot;Folder 2&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Item id=&quot;f2_i1&quot; text=&quot;Folder 2 / Item 1&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeViewBase.Folder id=&quot;f3&quot; text=&quot;Folder 3&quot;&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Item id=&quot;f3_i1&quot; text=&quot;Folder 3 / Item 1&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Item id=&quot;f3_i2&quot; text=&quot;Folder 3 / Item 2&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
          &lt;/TreeViewBase&gt;<br />
        </code>
        {/* eslint-enable react/jsx-indent, max-len */}
      </div>
    );
  }
}
