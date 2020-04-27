import React from 'react';
import TreeViewSelectionUtils from './TreeViewSelectionUtils';

/**
 * Method to determine if a folder id is in the array of folder ids.
 *
 * @returns {Boolean}
 * @param {String Array} foldersArray - the array of folder ids
 * @param {String} id - the id to look for in the array.
 */
const isIdInFoldersArray = (foldersArray, id) => {
  let result = false;
  if (foldersArray) {
    result = foldersArray.indexOf(id) > -1;
  }
  return result;
};

/**
 * Method to add an id to an array of folder ids.
 *
 * @returns N/A
 * @param {String Array} foldersArray - reference to the array of folder ids which is updated
 *      directly.
 * @param {String} id - the id to add to the array.
 */
const addIdToFoldersArray = (foldersArray, id) => {
  if (!isIdInFoldersArray(foldersArray, id)) {
    foldersArray.push(id);
  }
};

/**
 * Method to remove an id from an array of folder ids.
 *
 * @returns N/A
 * @param {String Array} foldersArray - reference to the array of folder ids which is updated
 *      directly.
 * @param {String} id - the id to remove from the array.
 */
const removeIdFromFoldersArray = (foldersArray, id) => {
  const index = foldersArray.indexOf(id);
  if (index > -1) {
    foldersArray.splice(index, 1);
  }
};

/**
 * Method to traverse the TreeView child nodes to find the list of folders that should be open on
 * initial render. This method is recursive since the a folder can contain sub-folders. The list
 * of open folders should include TreeViewFolder components that have the isInitiallyOpen prop
 * set to true, and folders that have ancestor components that are selected.
 *
 * @returns {Boolean} - indicates whether the folder being processed should be open.
 * @param {React Nodes} children - the TreeView children prop.
 * @param {String Array} openFoldersArray - reference to the array of open folder ids which is
 *      updated directly.
 * @param {String Array} selectionsArray - array of ids for rows that are selected.
 */
const getInitialOpenFolders = (children, openFoldersArray, selectionsArray) => {
  if (!children) {
    return false;
  }
  const childArray = React.Children.toArray(children);
  let parentFolderShouldBeOpen = false;
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    if (TreeViewSelectionUtils.isIdInSelectionsArray(selectionsArray, child.props.id)) {
      parentFolderShouldBeOpen = true;
    }
    if (typeof child.props.openFolders !== 'undefined') {
      // Child is a Folder
      if (child.props.isInitiallyOpen) {
        parentFolderShouldBeOpen = true;
        addIdToFoldersArray(openFoldersArray, child.props.id);
      }
      const thisFolderShouldBeOpen = getInitialOpenFolders(
        child.props.children,
        openFoldersArray,
        selectionsArray,
      );
      if (thisFolderShouldBeOpen) {
        addIdToFoldersArray(openFoldersArray, child.props.id);
        parentFolderShouldBeOpen = true;
      }
    }
  }
  return parentFolderShouldBeOpen;
};

/**
 * Method to traverse the TreeView child nodes to find the list of all folder row ids.
 * This method is recursive since the a folder can contain sub-folders.
 *
 * @returns N/A
 * @param {React Nodes} children - the TreeView children prop.
 * @param {String Array} foldersArray - reference to the array of folder ids which is
 *      updated directly.
 */
const getAllFolderIds = (children, foldersArray) => {
  if (!children) {
    return;
  }
  const childArray = React.Children.toArray(children);
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    if (typeof child.props.openFolders !== 'undefined') {
      // Child is a Folder
      addIdToFoldersArray(foldersArray, child.props.id);
      getAllFolderIds(child.props.children, foldersArray);
    }
  }
};

/**
 * Method to determine whether a row id is for a root level folder.
 *
 * @returns {Boolean} - indicating whether the id is for a root level folder.
 * @param {React Nodes} children - the TreeView children prop.
 * @param {String} id - the id of the folder to check if it is a root folder.
 */
const isARootFolder = (children, id) => {
  if (!children) {
    return false;
  }
  const childArray = React.Children.toArray(children);
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    if (typeof child.props.openFolders !== 'undefined' && child.props.id === id) {
      return true;
    }
  }
  return false;
};

/**
 * Method to remove all root level folders from a list of open folder ids except the id passed in
 * as a parameter.
 *
 * @returns N/A
 * @param {React Nodes} children - the TreeView children prop.
 * @param {String Array} openFoldersArray - reference to the array of open folder ids which is
 *      updated directly.
 * @param {String} id - id of the root level folder that is to remain open.
 */
const removeOtherRootFoldersFromOpenFolderList = (children, openFoldersArray, id) => {
  if (!children) {
    return;
  }
  const childArray = React.Children.toArray(children);
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    if (typeof child.props.openFolders !== 'undefined' && child.props.id !== id) {
      removeIdFromFoldersArray(openFoldersArray, child.props.id);
    }
  }
};

/**
 * Method to find the id for the first open root level folder.
 *
 * @returns {String} - the id of the first open root level folder, null if no root level folder is
 *      open.
 * @param {React Nodes} children - the TreeView children prop.
 * @param {String Array} openFoldersArray - reference to the array of open folder ids
 */
const findFirstOpenRootFolder = (children, openFoldersArray) => {
  if (!children) {
    return null;
  }
  const childArray = React.Children.toArray(children);
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    if (typeof child.props.openFolders !== 'undefined' && isIdInFoldersArray(openFoldersArray, child.props.id)) {
      return child.props.id;
    }
  }
  return null;
};

/**
 * Method to get a flattened list of ids for rows that are to be visible based on the list of open
 * folders. This method is recursive since a folder can contain sub-folders.
 *
 * @returns N/A
 * @param {React Nodes} children - the TreeView children prop.
 * @param {String Array} visibleIdArray - reference to the array of visible row ids, which is
 *      updated directly.
 * @param {String Array} openFoldersArray - reference to the array of open folder ids.
 */
const getFlattenedListOfVisibleIds = (children, visibleIdArray, openFoldersArray) => {
  if (!children) {
    return;
  }
  const childArray = React.Children.toArray(children);
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    visibleIdArray.push(child.props.id);
    if (typeof child.props.openFolders !== 'undefined' && isIdInFoldersArray(openFoldersArray, child.props.id)) {
      getFlattenedListOfVisibleIds(child.props.children, visibleIdArray, openFoldersArray);
    }
  }
};

/**
 * Method to determine if a row id is for the first visible row. In other words, is it the first
 * entry in a flattened list of visible row ids.
 *
 * @returns {Boolean} - indicates whether the row id passed as a parameter is for the first visible
 *      row.
 * @param {String} id - row id to check..
 */
const isFirstVisibleRow = (visibleIdArray, id) => visibleIdArray.indexOf(id) === 0;

/**
 * Method to get the row id for the next visible row after the row for row id passed in as a
 * parameter.
 *
 * @returns {String} - the id for the next visible row, null if there is none.
 * @param {String Array} visibleIds - reference to the array of visible row ids.
 * @param {String} id - id for the row from which the next visible row is to be determined.
 */
const getNextVisibleRowId = (visibleIdArray, id) => {
  let returnValue = null;
  for (let i = 0; i < visibleIdArray.length; i += 1) {
    if (visibleIdArray[i] === id) {
      if (i < visibleIdArray.length - 1) {
        returnValue = visibleIdArray[i + 1];
      }
      break;
    }
  }
  return returnValue;
};

/**
 * Method to get s list of row ids for folders that are affected by user selection of a row. This is
 * done by traversing backwords through the flattened list of visible row ids from the id that was
 * selected and finding ids for folders above it in the list until a root level folder is found.
 *
 * @class
 * @returns {String Array} - array of folder ids deemed to be affected by the selection of a row.
 * @param {String} selectedId - the id of the row that was selected.
 * @param {String Array} parentFolders - the list of ids for folders that are ancestors to the
 *      selected row. This is used as a starting point for building the ilst of affected folders.
 * @param {String Array} visibleIds - flattened list of visible row ids.
 * @param {String Array} openFolders - list of open folder ids.
 * @param {React Nodes} rootChildren - the TreeView children prop.
 */
const getAllAffectedFoldersForId = (
  selectedId,
  parentFolders,
  visibleIds,
  openFolders,
  rootChildren,
) => {
  const allAffectedFolders = parentFolders.slice(0);
  for (let i = visibleIds.indexOf(selectedId) - 1; i > -1; i -= 1) {
    if (isIdInFoldersArray(openFolders, visibleIds[i])) {
      if (isIdInFoldersArray(allAffectedFolders, visibleIds[i])) {
        break;
      } else {
        addIdToFoldersArray(allAffectedFolders, visibleIds[i]);
        if (isARootFolder(rootChildren, visibleIds[i])) {
          break;
        }
      }
    }
  }
  return allAffectedFolders;
};

/**
 * Method to get s list of row ids for folders that are affected by user selection of a row. The
 * resulting list will be folders deemed to be affected by the selected row and all folders
 * deemed to be affected by the selected row's ancestor folders.
 *
 * @class
 * @returns {String Array} - array of folder ids deemed to be affected by the selection of a row.
 * @param {String} selectedId - the id of the row that was selected.
 * @param {String Array} parentFolders - the list of ids for folders that are ancestors to the
 *      selected row.
 * @param {String Array} visibleIds - flattened list of visible row ids.
 * @param {String Array} openFolders - list of open folder ids.
 * @param {React Nodes} rootChildren - the TreeView children prop.
 */
const getAllAffectedFoldersForSelection = (
  selectedId,
  parentFolders,
  visibleIds,
  openFolders,
  rootChildren,
) => {
  let allAffectedFolders =
    getAllAffectedFoldersForId(selectedId, parentFolders, visibleIds, openFolders, rootChildren);
  for (let i = 0; i < parentFolders.length; i += 1) {
    allAffectedFolders = getAllAffectedFoldersForId(
      parentFolders[i],
      allAffectedFolders,
      visibleIds,
      openFolders,
      rootChildren,
    );
  }
  return allAffectedFolders;
};

const TreeViewExpandCollapseFolderUtils = {
  isIdInFoldersArray,
  addIdToFoldersArray,
  removeIdFromFoldersArray,
  getInitialOpenFolders,
  getAllFolderIds,
  isARootFolder,
  removeOtherRootFoldersFromOpenFolderList,
  findFirstOpenRootFolder,
  getFlattenedListOfVisibleIds,
  isFirstVisibleRow,
  getNextVisibleRowId,
  getAllAffectedFoldersForId,
  getAllAffectedFoldersForSelection,
};

export default TreeViewExpandCollapseFolderUtils;
