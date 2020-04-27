import React from 'react';
import TreeViewBase from '../../TreeViewBase';
import TreeViewSelectionUtils from '../../TreeViewSelectionUtils';

export default class ApplicationControlledSelections extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnUnselect = this.handleOnUnselect.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.handleOnUnselectAll = this.handleOnUnselectAll.bind(this);
    this.state = {
      userAction: '',
      actionId: '',
      allItemsSelectedBeforeAdjustment: false,
      currentSelectionsBeforeAdjustment: [],
      allItemsSelected: false,
      currentSelections: [],
    };
  }

  handleOnSelect(selectionObj) {
    const adjustedSelectionsArray = selectionObj.currentSelections.slice();
    switch (selectionObj.actionId) {
      case 'f1':
        TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f1_d1');
        TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f1_d2');
        break;
      case 'f2':
        TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f2_d1');
        TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f2_d2');
        break;
      case 'f1_d1':
        if (TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'f1_d2')) {
          TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f1');
        }
        break;
      case 'f1_d2':
        if (TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'f1_d1')) {
          TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f1');
        }
        break;
      case 'f2_d1':
        if (TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'f2_d2')) {
          TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f2');
        }
        break;
      case 'f2_d2':
        if (TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'f2_d1')) {
          TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f2');
        }
        break;
      default:
        break;
    }
    const adjustedAllItemsSelected =
      TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'd1') &&
      TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'd2') &&
      TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'f1') &&
      TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'f2');
    this.setState({
      userAction: 'Select Item/Folder',
      actionId: selectionObj.actionId,
      allItemsSelectedBeforeAdjustment: selectionObj.allItemsSelected,
      currentSelectionsBeforeAdjustment: selectionObj.currentSelections,
      allItemsSelected: adjustedAllItemsSelected,
      currentSelections: adjustedSelectionsArray,
    });
  }

  handleOnUnselect(selectionObj) {
    const adjustedSelectionsArray = selectionObj.currentSelections.slice();
    switch (selectionObj.actionId) {
      case 'f1':
        TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f1_d1');
        TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f1_d2');
        break;
      case 'f2':
        TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f2_d1');
        TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f2_d2');
        break;
      case 'f1_d1':
        TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f1');
        break;
      case 'f1_d2':
        TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f1');
        break;
      case 'f2_d1':
        TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f2');
        break;
      case 'f2_d2':
        TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f2');
        break;
      default:
        break;
    }
    const adjustedAllItemsSelected =
      TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'd1') &&
      TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'd2') &&
      TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'f1') &&
      TreeViewSelectionUtils.isIdInSelectionsArray(adjustedSelectionsArray, 'f2');
    this.setState({
      userAction: 'Unselect Item/Folder',
      actionId: selectionObj.actionId,
      allItemsSelectedBeforeAdjustment: selectionObj.allItemsSelected,
      currentSelectionsBeforeAdjustment: selectionObj.currentSelections,
      allItemsSelected: adjustedAllItemsSelected,
      currentSelections: adjustedSelectionsArray,
    });
  }

  handleOnSelectAll(selectionObj) {
    const adjustedSelectionsArray = selectionObj.currentSelections.slice();
    TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'd1');
    TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'd2');
    TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f1');
    TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f1_d1');
    TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f1_d2');
    TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f2');
    TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f2_d1');
    TreeViewSelectionUtils.addIdToSelectionsArray(adjustedSelectionsArray, 'f2_d2');
    const adjustedAllItemsSelected = true;
    this.setState({
      userAction: 'Select All',
      actionId: selectionObj.actionId,
      allItemsSelectedBeforeAdjustment: selectionObj.allItemsSelected,
      currentSelectionsBeforeAdjustment: selectionObj.currentSelections,
      allItemsSelected: adjustedAllItemsSelected,
      currentSelections: adjustedSelectionsArray,
    });
  }

  handleOnUnselectAll(selectionObj) {
    const adjustedSelectionsArray = selectionObj.currentSelections.slice();
    TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'd1');
    TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'd2');
    TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f1');
    TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f1_d1');
    TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f1_d2');
    TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f2');
    TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f2_d1');
    TreeViewSelectionUtils.removeIdFromSelections(adjustedSelectionsArray, 'f2_d2');
    const adjustedAllItemsSelected = false;
    this.setState({
      userAction: 'Unselect All',
      actionId: selectionObj.actionId,
      allItemsSelectedBeforeAdjustment: selectionObj.allItemsSelected,
      currentSelectionsBeforeAdjustment: selectionObj.currentSelections,
      allItemsSelected: adjustedAllItemsSelected,
      currentSelections: adjustedSelectionsArray,
    });
  }

  render() {
    const allSelectedPriorToAdjustmentStr = `${this.state.allItemsSelectedBeforeAdjustment} `;
    const currentSelectionsPriorToAdjustmentStr = this.state.currentSelectionsBeforeAdjustment.toString().replace(/,/g, ', ');
    const allSelectedStr = `${this.state.allItemsSelected} `;
    const currentSelectionsStr = this.state.currentSelections.toString().replace(/,/g, ', ');
    const onSelectPropStr = '{this.handleOnSelect}';
    const onUnselectPropStr = '{this.handleOnUnselect}';
    const onSelectAllPropStr = '{this.handleOnSelectAll}';
    const onUnselectAllPropStr = '{this.handleOnUnselectAll}';
    const selectedIdsPropStr = '{this.state.currentSelections}';
    const isAllSelectedPropStr = '{this.state.allItemsSelected}';
    return (
      <div>
        <h1>TreeView - Application Controlled Selection Example</h1>
        <div>
          This page shows an example of how an application can fully control the selections in the
          TreeView component. It uses the &lt;TreeViewBase&gt; component so that it can have full
          control of the selections. It provides callback functions for the onSelect, onUnselect,
          onSelectAll and onUnselectAll props so that it is informed when the user checks or
          unchecks any of the checkboxes within the TreeView component. The callback functions
          receive an object containing the id of the item acted upon, an indication of whether the
          `select-all` checkbox is currently checked
          and an array containing a list of ids for the items that are currently selected. Then,
          based on some rules, it modifies the list of selected ids, keeps the list in its state
          and passes that list back to the TreeView component in its props when it is re-rendered
          due to the state change. The rules that the page uses to manage the selections are as
          follows:
          <ul>
            <li>
              The data added to the TreeView component consists of folders, documents and document
              versions. Folders are represented as a &lt;TreeViewBase.Folder&gt; component.
              Documents are also represented as a &lt;TreeViewBase.Folder&gt; component. And,
              document versions are represented as a &lt;TreeViewBase.Item&gt; component. So, a
              folder can contain documents or other folders and documents can contain versions.
            </li>
            <li>
              This page manages the selections such that the selection of folders and documents is
              independent of the selection of versions. Otherwise, the selection of folders and
              documents mimics the default selection model.
            </li>
            <li>
              When the user checks the checkbox for a folder to mark it as selected, then all of
              its descendant folders and documents at all levels are automatically marked as
              selected as well. However, the selection status of any descendant versions is
              not changed.
            </li>
            <li>
              When the user unchecks the checkbox for a folder to mark it as unselected, then all of
              its descendant folders and documents at all levels are automatically marked as
              unselected as well. However, the selection status of any descendant versions is
              not changed.
            </li>
            <li>
              When a folder is marked as selected and one of its descendant folders or documents
              is unselected by the user, then the folder is automatically marked as unselected.
              If that folder is a sub-folder and its parent folder was marked as selected, then
              the parent folder is automatically unselected, and so on up the tree hierarchy.
              However, if one of the folder&apos; descendant versions is unselected by the user,
              then there is no effect on the folder or its ancestor folders, and there is no
              effect on a document when the user unselects any of its versions.
            </li>
            <li>
              When a folder is marked as unselected and the user selects all of its children
              folders and documents, then the folder is automatically marked as selected. This
              could cause ancestor folders to be marked as selected as well. However, there is no
              effect on the selection status of any versions in the hierarchy, and there is no
              effect on a document when the user selects all of its versions.
            </li>
            <li>
              When the user checks the `select-all` checkbox on the TreeView component header,
              then all folders and documents are automatically marked as selected. However, the
              selection status of any versions is not changed.
            </li>
            <li>
              When the user unchecks the `select-all` checkbox on the TreeView component header,
              then all folders and documents are automatically marked as unselected. However, the
              selection status of any versions is not changed.
            </li>
            <li>
              When the `select-all` checkbox is checked and the user unselects
              any folder or document, then the `select-all` checkbox is automatically
              unchecked.  However, if the user unselects any version, it has no effect on the
              selection status of the `select-all` checkbox.
            </li>
            <li>
              When the `select-all` checkbox is unchecked and the user manually
              selects all folders and documents, then the `select-all` checkbox is automatically
              checked. However, if the user selects any version, it has no effect on the
              selection status of the `select-all` checkbox.
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
            onSelect={this.handleOnSelect}
            onUnselect={this.handleOnUnselect}
            onSelectAll={this.handleOnSelectAll}
            onUnselectAll={this.handleOnUnselectAll}
            title="Test TreeView - Application Controlled Selections"
            selectionEnabled
            selectedIds={this.state.currentSelections}
            isAllSelected={this.state.allItemsSelected}
          >
            <TreeViewBase.Folder id="d1" text="Document 1" >
              <TreeViewBase.Item id="d1_v1" text="Document 1 / Version 1" />
              <TreeViewBase.Item id="d1_v2" text="Document 1 / Version 2" />
            </TreeViewBase.Folder>
            <TreeViewBase.Folder id="d2" text="Document 2" >
              <TreeViewBase.Item id="d2_v1" text="Document 2 / Version 1" />
              <TreeViewBase.Item id="d2_v2" text="Document 2 / Version 2" />
            </TreeViewBase.Folder>
            <TreeViewBase.Folder id="f1" text="Folder 1" >
              <TreeViewBase.Folder id="f1_d1" text="Folder 1 / Document 1" >
                <TreeViewBase.Item id="f1_d1_v1" text="Folder 1 / Document 1 / Version 1" />
                <TreeViewBase.Item id="f1_d1_v2" text="Folder 1 / Document 1 / Version 2" />
              </TreeViewBase.Folder>
              <TreeViewBase.Folder id="f1_d2" text="Folder 1 / Document 2" >
                <TreeViewBase.Item id="f1_d2_v1" text="Folder 1 / Document 2 / Version 1" />
                <TreeViewBase.Item id="f1_d2_v2" text="Folder 1 / Document 2 / Version 2" />
              </TreeViewBase.Folder>
            </TreeViewBase.Folder>
            <TreeViewBase.Folder id="f2" text="Folder 2">
              <TreeViewBase.Folder id="f2_d1" text="Folder 2 / Document 1" >
                <TreeViewBase.Item id="f2_d1_v1" text="Folder 2 / Document 1 / Version 1" />
                <TreeViewBase.Item id="f2_d1_v2" text="Folder 2 / Document 1 / Version 2" />
              </TreeViewBase.Folder>
              <TreeViewBase.Folder id="f2_d2" text="Folder 2 / Document 2" >
                <TreeViewBase.Item id="f2_d2_v1" text="Folder 2 / Document 2 / Version 1" />
                <TreeViewBase.Item id="f2_d2_v2" text="Folder 2 / Document 2 / Version 2" />
              </TreeViewBase.Folder>
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
            The callback functions log the Select-All checkbox status received from the TreeView
            component and also the Select-All checkbox status that is set in the page&apos;s state
            after it makes adjustments to the selections. The callback functions log the list of
            current selected ids as received from the TreeView component and also the list of
            current selected ids that is set in the page&apos;s state after it makes adjustments
            to the selections.
          </div>
          <div style={{ border: '1px solid black', padding: '5px' }}>
            <p>User Action: {this.state.userAction}</p>
            <p>Action ID: {this.state.actionId}</p>
            <p>
              Select-All Checkbox Checked prior to adjustment?: {allSelectedPriorToAdjustmentStr}
            </p>
            <p>Current Selected IDs prior to adjustment: {currentSelectionsPriorToAdjustmentStr}</p>
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
            <li>
              The selections are controlled by this application page by setting the `selectedIds`
              and `isAllSelected` props from the application component&apos;s state.
            </li>
            <li>The title `Test Tree` is displayed in the component header.</li>
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
            <span style={{ marginLeft: '10px' }} >selectedIds={selectedIdsPropStr}</span><br />
            <span style={{ marginLeft: '10px' }} >isAllSelected={isAllSelectedPropStr}</span><br />
          &gt;<br />
        <span style={{ marginLeft: '10px' }} >&lt;TreeViewBase.Folder id=&quot;d1&quot; text=&quot;Document 1&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Item id=&quot;d1_v1&quot; text=&quot;Document 1 / Version 1&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Item id=&quot;d1_v2&quot; text=&quot;Document 1 / Version 2&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeViewBase.Folder id=&quot;d2&quot; text=&quot;Document 2&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Item id=&quot;d2_v1&quot; text=&quot;Document 2 / Version 1&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Item id=&quot;d2_v2&quot; text=&quot;Document 2 / Version 2&quot; /&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeViewBase.Folder id=&quot;f1&quot; text=&quot;Folder 1&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Folder id=&quot;f1_d1&quot; text=&quot;Folder 1 / Document 1&quot; &gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f1_d1_v1&quot; text=&quot;Folder 1 / Document 1 / Version 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f1_d1_v2&quot; text=&quot;Folder 1 / Document 1 / Version 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Folder id=&quot;f1_d2&quot; text=&quot;Folder 1 / Document 2&quot; &gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f1_d2_v1&quot; text=&quot;Folder 1 / Document 2 / Version 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f1_d2_v2&quot; text=&quot;Folder 1 / Document 2 / Version 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;TreeViewBase.Folder id=&quot;f2&quot; text=&quot;Folder 2&quot; &gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Folder id=&quot;f2_d1&quot; text&quot;Folder 2 / Document 1&quot; &gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f2_d1_v1&quot; text=&quot;Folder 2 / Document 1 / Version 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f2_d1_v2&quot; text=&quot;Folder 2 / Document 1 / Version 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;TreeViewBase.Folder id=&quot;f2_d2&quot; text=&quot;Folder 2 / Document 2&quot; &gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f2_d2_v1&quot; text=&quot;Folder 2 / Document 2 / Version 1&quot; /&gt;</span><br />
                <span style={{ marginLeft: '30px' }} >&lt;TreeViewBase.Item id=&quot;f2_d2_v2&quot; text=&quot;Folder 2 / Document 2 / Version 2&quot; /&gt;</span><br />
              <span style={{ marginLeft: '20px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
            <span style={{ marginLeft: '10px' }} >&lt;/TreeViewBase.Folder&gt;</span><br />
          &lt;/TreeViewBase&gt;<br />
        </code>
        {/* eslint-enable react/jsx-indent, max-len */}
      </div>
    );
  }
}
