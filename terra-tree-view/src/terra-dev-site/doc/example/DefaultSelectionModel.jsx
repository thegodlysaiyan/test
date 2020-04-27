import React from 'react';
import TreeView from '../../TreeView';

export default class DefaultSelectionModel extends React.Component {
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
      allItemsSelected: '',
      currentSelections: '',
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
      folder2Contents = <TreeView.Item id="f2_i1" text="Folder 2 / Item 1" />;
    }
    const allSelectedStr = `${this.state.allItemsSelected} `;
    const currentSelectionsStr = this.state.currentSelections.toString().replace(/,/g, ', ');
    const onSelectPropStr = '{this.handleOnSelect}';
    const onUnselectPropStr = '{this.handleOnUnselect}';
    const onSelectAllPropStr = '{this.handleOnSelectAll}';
    const onUnselectAllPropStr = '{this.handleOnUnselectAll}';
    return (
      <div>
        <h1>TreeView - Default Selection Model</h1>
        <div>
          This page shows how the the TreeView component default selection
          model works. To use the default selection model, you should use the &lt;TreeView&gt;
          component, which is considered `uncontrolled`.  This means that the consuming application
          component has no control over the selections within the &lt;TreeView&gt; component.  The
          component manages the selections itself. The rules for the default selection modeal are
          as follows:
          <ul>
            <li>
              When the user checks the checkbox for a folder to mark it as selected,
              then all of its descendants at all levels must automatically be marked
              as selected as well.
            </li>
            <li>
              When the user unchecks the checkbox for a folder to mark it as
              unselected, then all of its descendants at all levels must
              automatically be marked as unselected as well.
            </li>
            <li>
              When a folder is marked as selected and one of its descendants is
              unselected by the user, then the folder must be automatically marked
              as unselected.  If that folder is a sub-folder and its parent folder
              was marked as selected, then the parent folder must automatically be
              marked as unselected, and so on up the tree hierarchy.
            </li>
            <li>
              When a folder is marked as unselected and the user selects all of
              its children, then the folder must be automatically marked as selected.
            </li>
            <li>
              When the user checks the `select-all` checkbox on the Tree View header,
              then all folders and leaf items at all levels must automatically be
              marked as selected.
            </li>
            <li>
              When the user unchecks the `select-all` checkbox on the Tree View
              header, then all folders and leaf items at all levels must
              automatically be marked as unselected.
            </li>
            <li>
              When the `select-all` checkbox is checked and the user unselects
              any folder or leaf item, then the `select-all` checkbox must
              automatically be unchecked.
            </li>
            <li>
              When the `select-all` checkbox is unchecked and the user manually
              selects all folders and leaf items, then the `select-all` checkbox
              must automatically be checked.
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
          <TreeView
            onExpand={this.handleFolderExpand}
            onSelect={this.handleOnSelect}
            onUnselect={this.handleOnUnselect}
            onSelectAll={this.handleOnSelectAll}
            onUnselectAll={this.handleOnUnselectAll}
            title="Test TreeView - Default Selection Model"
            selectionEnabled
          >
            <TreeView.Item id="i1" text="Item 1" />
            <TreeView.Item id="i2" text="Item 2" />
            <TreeView.Folder id="f1" text="Folder 1" description="Description text" >
              <TreeView.Item id="f1_i1" text="Folder 1 / Item 1" description="Description text" />
              <TreeView.Item id="f1_i2" text="Folder 1 / Item 2" />
              <TreeView.Folder id="f1a" text="Folder 1a" isInitiallyOpen >
                <TreeView.Item id="f1a_i1" text="Folder 1a / Item 1" />
                <TreeView.Item id="f1a_i2" text="Folder 1a / Item 2" />
                <TreeView.Folder id="f_1aa" text="Folder 1aa with extra text to cause truncation" description="Description text" >
                  <TreeView.Item id="f1aa_i1" text="Folder 1aa / Item 1" />
                  <TreeView.Item id="f1aa_i2" text="Folder 1aa / Item 2 with extra text to cause truncation" description="Description text" />
                </TreeView.Folder>
              </TreeView.Folder>
              <TreeView.Folder id="f1b" text="Folder 1b">
                <TreeView.Item id="f1b_i1" text="Folder 1b / Item 1" isInitiallySelected />
                <TreeView.Item id="f1b_i2" text="Folder 1b / Item 2" />
                <TreeView.Folder id="f_1ba" text="Folder 1ba with extra text to cause truncation" isInitiallySelected >
                  <TreeView.Item id="f1ba_i1" text="Folder 1ba / Item 1" />
                  <TreeView.Item id="f1ba_i2" text="Folder 1ba / Item 2 with extra text to cause truncation" />
                  <TreeView.Folder id="f_1baa" text="Folder 1baa" >
                    <TreeView.Item id="f1baa_i1" text="Folder 1baa / Item 1" />
                    <TreeView.Item id="f1baa_i2" text="Folder 1baa / Item 2" />
                  </TreeView.Folder>
                </TreeView.Folder>
              </TreeView.Folder>
            </TreeView.Folder>
            <TreeView.Folder id="f2" text="Folder 2" >
              {folder2Contents}
            </TreeView.Folder>
            <TreeView.Folder id="f3" text="Folder 3">
              <TreeView.Item id="f3_i1" text="Folder 3 / Item 1" />
              <TreeView.Item id="f3_i2" text="Folder 3 / Item 2" />
              <TreeView.Folder id="f3a" text="Folder 3a" >
                <TreeView.Item id="f3a_i1" text="Folder 3a / Item 1" isInitiallySelected />
                <TreeView.Item id="f3a_i2" text="Folder 3a / Item 2" isInitiallySelected />
              </TreeView.Folder>
            </TreeView.Folder>
          </TreeView>
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
                isAllSelected: indicator as to whether all items in the tree are selected.
              </li>
              <li>
                currentSelections: array of the ids for all of the folders and leaf items
                that are currently selected.
              </li>
            </ul>
          </div>
          <div style={{ border: '1px solid black', padding: '5px' }}>
            <p id="userAction">User Action: {this.state.userAction}</p>
            <p id="actionId">Action ID: {this.state.actionId}</p>
            <p id="allSelectedStr">Are All Selected?: {allSelectedStr}</p>
            <p id="currentSelectionsStr">Current Selected IDs: {currentSelectionsStr}</p>
          </div>
        </div>
        <h2>Sample Code:</h2>
        <div>
          In the usage example below, the TreeView component is configured with
          the following features;
          <ul>
            <li>The title `Test Tree` is displayed in the component header.</li>
            <li>`Folder 1` and `Folder 1a` are initially open due to the isInitiallyOpen prop on
              `Folder 1a`.  Other folders are initially open so that all selected folders/items
              are visible.
            </li>
            <li>
              Selection is enabled with the default selection model. When the
              component is initially rendered, the following folders/items are
              marked as selected due to the isInitiallySelected props assigned.
              <ul>
                <li>`Folder 1b / Item 1`</li>
                <li>
                  `Folder 1ba`, this causes all of its descendants to be marked as
                  selected as well when the component is initially rendered so
                  that it adheres to the rules of the default selection model.
                </li>
                <li>
                  `Folder 3a / Item 1` and `Folder 3a / Item 2`, this causes
                  `Folder 3a` to be marked as selected as well when the component
                  is initially rendered so that it adheres to the rules of the
                  default selection model.
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
            <li>
              Folder 1, Folder 1 / Item 1, Folder 1aa, and Folder 1aa / Item 2 have the
              `description` prop set. The description text is included as par of the tooltip
              for the row.
            </li>
          </ul>
        </div>
        {/* eslint-disable react/jsx-indent, max-len */}
        <code>
          &lt;TreeView<br />
            <span style={{ marginLeft: '10px' }} >onSelect={onSelectPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onUnselect={onUnselectPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onSelectAll={onSelectAllPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >onUnselectAll={onUnselectAllPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >title=&quot;Test Tree&quot;</span><br />
            <span style={{ marginLeft: '10px' }} >selectionEnabled</span><br />
          &gt;<br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Item id=&quot;i1&quot; text=&quot;Item 1&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Item id=&quot;i2&quot; text=&quot;Item 2&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f1&quot; text=&quot;Folder 1&quot; description=&quot;Description text&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f1_i1&quot; text=&quot;Folder 1 / Item 1&quot; description=&quot;Description text&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f1_i2&quot; text=&quot;Folder 1 / Item 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Folder id=&quot;f1a&quot; text=&quot;Folder 1a&quot; isInitiallyOpen &gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1a_i1&quot; text=&quot;Folder 1a / Item 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1a_i2&quot; text=&quot;Folder 1a / Item 2&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Folder id=&quot;f_1aa&quot; text=&quot;Folder 1aa with extra text to cause truncation&quot; description=&quot;Description text&quot; &gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1aa_i1&quot; text=&quot;Folder 1aa / Item 1&quot; /&gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1aa_i2&quot; text=&quot;Folder 1aa / Item 2 with extra text to cause truncation&quot; description=&quot;Description text&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;/TreeView.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeView.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Folder id=&quot;f1b&quot; text=&quot;Folder 1b&quot;&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1b_i1&quot; text=&quot;Folder 1b / Item 1&quot; isInitiallySelected /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f1b_i2&quot; text=&quot;Folder 1b / Item 2&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Folder id=&quot;f_1ba&quot; text=&quot;Folder 1ba with extra text to cause truncation&quot; isInitiallySelected &gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1ba_i1&quot; text=&quot;Folder 1ba / Item 1&quot; /&gt;</span><br />
                  <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1ba_i2&quot; text=&quot;Folder 1ba / Item 2 with extra text to cause truncation&quot; /&gt;</span><br />
                  <span style={{ marginLeft: '30px' }} >&lt;TreeView.Folder id=&quot;f_1baa&quot; text=&quot;Folder 1baa&quot; &gt;</span><br />
                    <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1baa_i1&quot; text=&quot;Folder 1baa / Item 1&quot; /&gt;</span><br />
                    <span style={{ marginLeft: '40px' }} >&lt;TreeView.Item id=&quot;f1baa_i2&quot; text=&quot;Folder 1baa / Item 2&quot; /&gt;</span><br />
                  <span style={{ marginLeft: '30px' }} >&lt;/TreeView.Folder&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;/TreeView.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f2&quot; text=&quot;Folder 2&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f2_i1&quot; text=&quot;Folder 2 / Item 1&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeView.Folder id=&quot;f3&quot; text=&quot;Folder 3&quot;&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f3_i1&quot; text=&quot;Folder 3 / Item 1&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Item id=&quot;f3_i2&quot; text=&quot;Folder 3 / Item 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeView.Folder id=&quot;f3a&quot; text=&quot;Folder 3a&quot;&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f3a_i1&quot; text=&quot;Folder 3a / Item 1&quot; isInitiallySelected /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeView.Item id=&quot;f3a_i2&quot; text=&quot;Folder 3a / Item 2&quot; isInitiallySelected /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeView.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeView.Folder&gt;</span><br />
          &lt;/TreeView&gt;<br />
        </code>
        {/* eslint-enable react/jsx-indent, max-len */}
      </div>
    );
  }
}
