import React from 'react';
import Button from 'terra-button';
import Select from 'terra-form-select';
import Checkbox from 'terra-form-checkbox';
import TreeView from '../../TreeView';
import SingleSelectTreeView from '../../SingleSelectTreeView';
import TreeViewExpandCollapseFolderUtils from '../../TreeViewExpandCollapseFolderUtils';

export default class VolumeTest extends React.Component {
  constructor(props) {
    super(props);
    this.handleFolderExpand = this.handleFolderExpand.bind(this);
    this.handleFolderCollapse = this.handleFolderCollapse.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleCollapseAll = this.handleCollapseAll.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnUnselect = this.handleOnUnselect.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.handleOnUnselectAll = this.handleOnUnselectAll.bind(this);
    this.handleFolderDepthSelect = this.handleFolderDepthSelect.bind(this);
    this.handleNumFoldersSelect = this.handleNumFoldersSelect.bind(this);
    this.handleNumItemsSelect = this.handleNumItemsSelect.bind(this);
    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleSingleRootCheckboxChange = this.handleSingleRootCheckboxChange.bind(this);
    this.handleSingleSelectionCheckboxChange = this.handleSingleSelectionCheckboxChange.bind(this);
    this.openFolders = [];
    this.folderIdArray = [];
    this.getContents = this.getContents.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getFolders = this.getFolders.bind(this);
    this.state = {
      folderDepth: 1,
      itemsAtEachLevel: 3,
      foldersAtEachLevel: 3,
      singleRootExpansion: false,
      singleSelection: false,
      inputFolderDepth: '1',
      inputFoldersAtEachLevel: '3',
      inputItemsAtEachLevel: '3',
      inputSingleRootExpansion: false,
      inputSingleSelection: false,
      renderCount: 1,
      userAction: 'Initial Page Load',
      startTime: new Date(),
      // renderType: 'render',
    };
  }

  componentDidMount() {
    const stopTime = new Date();
    const respTime = stopTime - this.state.startTime;
    const respTimeElem = document.getElementById('respTime');
    respTimeElem.innerText = respTime;
  }

  componentDidUpdate() {
    const stopTime = new Date();
    const respTime = stopTime - this.state.startTime;
    const respTimeElem = document.getElementById('respTime');
    respTimeElem.innerText = respTime;
  }

  getContents() {
    this.folderIdArray = [];
    const itemRows = this.getItems('root');
    const folderRows = this.getFolders('root', 1);
    let treeComponent = null;
    if (this.state.singleSelection) {
      treeComponent = (
        <SingleSelectTreeView
          onExpand={this.handleFolderExpand}
          onCollapse={this.handleFolderCollapse}
          onExpandAll={this.handleExpandAll}
          onCollapseAll={this.handleCollapseAll}
          onSelect={this.handleOnSelect}
          onUnselect={this.handleOnUnselect}
          onSelectAll={this.handleOnSelectAll}
          onUnselectAll={this.handleOnUnselectAll}
          singleRootFolderExpansion={this.state.singleRootExpansion}
          title="Test TreeView - Volume Test"
          selectionEnabled
          key={this.state.renderCount}
        >
          {itemRows}
          {folderRows}
        </SingleSelectTreeView>
      );
    } else {
      treeComponent = (
        <TreeView
          onExpand={this.handleFolderExpand}
          onCollapse={this.handleFolderCollapse}
          onExpandAll={this.handleExpandAll}
          onCollapseAll={this.handleCollapseAll}
          onSelect={this.handleOnSelect}
          onUnselect={this.handleOnUnselect}
          onSelectAll={this.handleOnSelectAll}
          onUnselectAll={this.handleOnUnselectAll}
          singleRootFolderExpansion={this.state.singleRootExpansion}
          title="Test TreeView - Volume Test"
          selectionEnabled
          key={this.state.renderCount}
        >
          {itemRows}
          {folderRows}
        </TreeView>
      );
    }
    return treeComponent;
  }

  getItems(folderName) {
    const items = [];
    for (let i = 1; i < (this.state.itemsAtEachLevel + 1); i += 1) {
      const itemId = `${folderName}_i${i}`;
      const itemDesc = `${itemId}  description`;
      items.push(<TreeView.Item id={itemId} text={itemId} description={itemDesc} key={itemId} />);
    }
    return items;
  }

  getFolders(folderName, level) {
    const folders = [];
    for (let i = 1; i < (this.state.foldersAtEachLevel + 1); i += 1) {
      const folderId = `${folderName}_f${i}`;
      TreeViewExpandCollapseFolderUtils.addIdToFoldersArray(this.folderIdArray, folderId);
      const folderDesc = `${folderId} description`;
      const subItems = this.getItems(folderId);
      const nextLevel = level + 1;
      const subFolders = (nextLevel) > this.state.folderDepth ?
        null : this.getFolders(folderId, nextLevel);
      const isFolderOpen =
          TreeViewExpandCollapseFolderUtils.isIdInFoldersArray(this.openFolders, folderId);
      const folder = (
        <TreeView.Folder
          id={folderId}
          text={folderId}
          description={folderDesc}
          key={folderId}
          isInitiallyOpen={isFolderOpen}
        >
          {subItems}
          {subFolders}
        </TreeView.Folder>
      );
      folders.push(folder);
    }
    return folders;
  }

  handleFolderDepthSelect(value) {
    this.setState({
      inputFolderDepth: value,
    });
  }

  handleNumFoldersSelect(value) {
    this.setState({
      inputFoldersAtEachLevel: value,
    });
  }

  handleNumItemsSelect(value) {
    this.setState({
      inputItemsAtEachLevel: value,
    });
  }

  handleSingleRootCheckboxChange() {
    this.setState({
      inputSingleRootExpansion: !this.state.inputSingleRootExpansion,
    });
  }

  handleSingleSelectionCheckboxChange() {
    this.setState({
      inputSingleSelection: !this.state.inputSingleSelection,
    });
  }

  handleUpdateButtonClick() {
    this.setState({
      folderDepth: parseInt(this.state.inputFolderDepth, 10),
      itemsAtEachLevel: parseInt(this.state.inputItemsAtEachLevel, 10),
      foldersAtEachLevel: parseInt(this.state.inputFoldersAtEachLevel, 10),
      singleRootExpansion: this.state.inputSingleRootExpansion,
      singleSelection: this.state.inputSingleSelection,
      userAction: 'Update Parameters',
      renderCount: this.state.renderCount + 1,
      startTime: new Date(),
    });
  }

  handleOnSelect(selectionObj) {
    this.setState({
      userAction: 'Select Item/Folder',
      actionId: selectionObj.actionId,
      startTime: new Date(),
    });
  }

  handleOnUnselect(selectionObj) {
    this.setState({
      userAction: 'Unselect Item/Folder',
      actionId: selectionObj.actionId,
      startTime: new Date(),
    });
  }

  handleOnSelectAll(selectionObj) {
    this.setState({
      userAction: 'Select All',
      actionId: selectionObj.actionId,
      startTime: new Date(),
    });
  }

  handleOnUnselectAll(selectionObj) {
    this.setState({
      userAction: 'Unselect All',
      actionId: selectionObj.actionId,
      startTime: new Date(),
    });
  }

  handleFolderExpand(id) {
    TreeViewExpandCollapseFolderUtils.addIdToFoldersArray(this.openFolders, id);
    this.setState({
      userAction: 'Expand folder',
      actionId: id,
      startTime: new Date(),
    });
  }

  handleFolderCollapse(id) {
    TreeViewExpandCollapseFolderUtils.removeIdFromFoldersArray(this.openFolders, id);
    this.setState({
      userAction: 'Collapse folder',
      actionId: id,
      startTime: new Date(),
    });
  }

  handleExpandAll() {
    this.openFolders = this.folderIdArray.slice(0);
    this.setState({
      userAction: 'Expand all folders',
      actionId: 'N/A',
      startTime: new Date(),
    });
  }

  handleCollapseAll() {
    this.openFolders = [];
    this.setState({
      userAction: 'Collapse all folders',
      actionId: 'N/A',
      startTime: new Date(),
    });
  }

  render() {
    let itemCount = 0;
    let folderCount = 0;
    /* eslint-disable no-restricted-properties */
    for (let i = 0; i <= this.state.folderDepth; i += 1) {
      itemCount += Math.pow(this.state.foldersAtEachLevel, i) * this.state.itemsAtEachLevel;
      if (i < this.state.folderDepth) {
        folderCount += Math.pow(this.state.foldersAtEachLevel, i) * this.state.foldersAtEachLevel;
      }
    }
    /* eslint-enable  no-restricted-properties */
    const totalRows = itemCount + folderCount;
    return (
      <div>
        <h1>TreeView - Volume Test Page</h1>
        <div>
          This page allows you to configure a TreeView component with varying values for the
          following characteristics and to see how much time it takes to generate the component
          and how long it takes to perform user actions such as selecting/unselecting a row,
          expanding/collapsing a folder, selecting/unselecting all rows, and expanding/collapsing
          all folders.
          <ul>
            <li>
              Folder Depth: the depth of subfolders to be created.  You can select a value between
              1 and 4.  If you choose 1, only root level folders will be created and each root
              level folder will only contain leaf items.  If you choose 2, then each root level
              folder will contain subfolders and leaf items, but the subfolders will only contain
              leaf items.
            </li>
            <li>
              Folders At Each Level: the number of folders to create at the root level and in each
              subfolder up to the folder depth.
            </li>
            <li>
              Leaf Items At Each Level: the number of leaf items to create at the root level and in
              each folder.
            </li>
            <li>
              Single Root Level Folder Expansion: whether the singleRootFolderExpansion prop will be
              turned on for the component.  If turned on, only one root level folder can be open at
              a time.
            </li>
            <li>
              Single Selection: whether single row selection or multi-row selection will be used.
            </li>
          </ul>
        </div>
        <br />
        <div
          style={{
              width: '300px',
              height: '300px',
          }}
        >
          {this.getContents()}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <div style={{ marginRight: '10px' }}>
            Folder Depth:
            <Select defaultValue={this.state.inputFolderDepth} onSelect={this.handleFolderDepthSelect} style={{ width: '100px' }}>
              <Select.Option value="1" display="1" />
              <Select.Option value="2" display="2" />
              <Select.Option value="3" display="3" />
              <Select.Option value="4" display="4" />
            </Select>
          </div>
          <div style={{ marginRight: '10px' }}>
            Folders At Each Level:
            <Select defaultValue={this.state.inputFoldersAtEachLevel} onSelect={this.handleNumFoldersSelect} style={{ width: '100px' }}>
              <Select.Option value="0" display="0" />
              <Select.Option value="1" display="1" />
              <Select.Option value="2" display="2" />
              <Select.Option value="3" display="3" />
              <Select.Option value="4" display="4" />
              <Select.Option value="5" display="5" />
              <Select.Option value="6" display="6" />
              <Select.Option value="7" display="7" />
              <Select.Option value="8" display="8" />
              <Select.Option value="9" display="9" />
              <Select.Option value="10" display="10" />
            </Select>
          </div>
          <div style={{ marginRight: '10px' }}>
            Leaf Items At Each Level:
            <Select defaultValue={this.state.inputItemsAtEachLevel} onSelect={this.handleNumItemsSelect} style={{ width: '100px' }}>
              <Select.Option value="0" display="0" />
              <Select.Option value="1" display="1" />
              <Select.Option value="2" display="2" />
              <Select.Option value="3" display="3" />
              <Select.Option value="4" display="4" />
              <Select.Option value="5" display="5" />
              <Select.Option value="6" display="6" />
              <Select.Option value="7" display="7" />
              <Select.Option value="8" display="8" />
              <Select.Option value="9" display="9" />
              <Select.Option value="10" display="10" />
            </Select>
          </div>
          <div style={{ marginRight: '10px' }}>
            <Checkbox
              labelText="Single Root Level Folder Expansion"
              isInline
              checked={this.state.inputSingleRootExpansion}
              onChange={this.handleSingleRootCheckboxChange}
            />
          </div>
          <div style={{ marginRight: '10px' }}>
            <Checkbox
              labelText="Single Selection"
              isInline
              checked={this.state.inputSingleSelection}
              onChange={this.handleSingleSelectionCheckboxChange}
            />
          </div>
          <div>
            <Button onClick={this.handleUpdateButtonClick} text="Update" type="submit" />
          </div>
        </div>
        <div>
          <h3>Action Log</h3>
          <div style={{ border: '1px solid black', padding: '5px' }}>
            <p>Number of Leaf Items: {itemCount}</p>
            <p>Number of Folders: {folderCount}</p>
            <p>Total rows: {totalRows}</p>
            <p>User Action: {this.state.userAction}</p>
            <p>Action ID: {this.state.actionId}</p>
            <p>Response Time: <span id="respTime" /> ms </p>
          </div>
        </div>
      </div>
    );
  }
}
