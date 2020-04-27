import React from 'react';

/**
 * Method to determine if a row id is in the array of selected row ids.
 *
 * @returns {Boolean} - indicating whether the row id is in the selected row list.
 * @param {String Array} selectionsArray - the array of selected row ids
 * @param {String} id - the id to look for in the array.
 */
const isIdInSelectionsArray = (selectionsArray, id) => {
  let result = false;
  if (selectionsArray) {
    result = selectionsArray.indexOf(id) > -1;
  }
  return result;
};

/**
 * Method to add an id to an array of selected row ids.
 *
 * @returns N/A
 * @param {String Array} selectionsArray - reference to the array of selected row ids which is
 *      updated directly.
 * @param {String} id - the id to add to the array.
 */
const addIdToSelectionsArray = (selectionsArray, id) => {
  if (!isIdInSelectionsArray(selectionsArray, id)) {
    selectionsArray.push(id);
  }
};

/**
 * Method to determine whether the children prop array has vaild child objects. In some instances
 * the children prop may consist of empty arrays and they are not considered valid children.
 *
 * @returns boolean - indicating whether there are valid children in the children prop. If
 *    the children only contains empty arrays, then there are no valid children.
 * @param {React Nodes} children - the TreeView children prop.
 */
const hasValidChildren = (children) => {
  let returnVal = false;
  if (children) {
    if (children instanceof Array) {
      for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        if (child instanceof Array) {
          if (child.length > 0) {
            returnVal = true;
            break;
          }
        } else if (child) {
          returnVal = true;
          break;
        }
      }
    } else {
      returnVal = true;
    }
  }
  return returnVal;
};

/**
 * Method to add descendant row ids for a folder that is selected to the list of selected row ids.
 * Used to manage selections in the default multi-row selection model.
 * This method is recursive since folder rows can have sub-folders.
 *
 * @returns N/A
 * @param {React Nodes} children - the TreeView or TreeViewFolder children prop.
 * @param {Boolean} parentIsSelected - indicates whether the parent folder to the children parameter
 *      is selected.
 * @param {String Array} selectionsArray - reference to the array of selected row ids which is
 *      updated directly.
 * @param {Boolean} initialList - indication as to whether the list of selections for the initial
 *      render is being built.
 */
const pushDownSelection = (children, parentIsSelected, selectionsArray, initialList) => {
  if (!children) {
    return;
  }
  const childArray = React.Children.toArray(children);
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    if (child === null || (child instanceof Array && child.length === 0)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (parentIsSelected || (initialList && child.props.isInitiallySelected)) {
      addIdToSelectionsArray(selectionsArray, child.props.id);
    }
    if (typeof child.props.openFolders !== 'undefined') {
      // Child is a Folder
      pushDownSelection(
        child.props.children,
        isIdInSelectionsArray(selectionsArray, child.props.id),
        selectionsArray,
        initialList,
      );
    }
  }
};

/**
 * Method to add folder row ids to the list of selected row ids when all of the direct children of
 * the folder are selected.
 * Used to manage selections in the default multi-row selection model.
 * This method is recursive since folder rows can have sub-folders.
 *
 * @returns {Boolean} - indication as to whether all of the children of the folder or root are
 *      selected.
 * @param {React Nodes} children - the TreeView or TreeViewFolder children prop.
 * @param {String Array} selectionsArray - reference to the array of selected row ids which is
 *      updated directly.
 */
const pullUpSelection = (children, selectionsArray) => {
  if (!children || !hasValidChildren(children)) {
    return false;
  }
  let allChildrenSelected = false;
  let selectedChildrenCount = 0;
  const childArray = React.Children.toArray(children);
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    if (typeof child.props.openFolders !== 'undefined' && !isIdInSelectionsArray(selectionsArray, child.props.id)) {
      const markAsSelected = pullUpSelection(child.props.children, selectionsArray);
      if (markAsSelected) {
        addIdToSelectionsArray(selectionsArray, child.props.id);
      }
    }
    if (isIdInSelectionsArray(selectionsArray, child.props.id)) {
      selectedChildrenCount += 1;
    }
  }
  if (selectedChildrenCount === childArray.length) {
    allChildrenSelected = true;
  }
  return allChildrenSelected;
};

/**
 * Method to get the list of row ids for rows that are currently selected based on the rules for
 * default multi-row selection model. This is called by the TreeView component on initial
 * construction and when the user makes selections.
 *
 * @returns N/A
 * @param {React Nodes} children - the TreeView children prop.
 * @param {Boolean} selectAllProp - indicates whether the Select-All checkbox is checked.
 * @param {String Array} selectionsArray - reference to the array of selected row ids which is
 *      updated directly.
 * @param {Boolean} initialList - indication as to whether the list of selections for the initial
 *      render is being built.
 */
const getCurrentSelections = (children, selectAllProp, selectionsArray, initialList) => {
  let selectAll = selectAllProp;
  pushDownSelection(children, selectAllProp, selectionsArray, initialList);
  selectAll = pullUpSelection(children, selectionsArray);
  if (selectAll && !isIdInSelectionsArray(selectionsArray, '_TreeViewSelectAll_') &&
       hasValidChildren(children)) {
    selectionsArray.push('_TreeViewSelectAll_');
  }
};

/**
 * Method to remove an id from an array of selected ids.
 *
 * @returns N/A
 * @param {String Array} selectionsArray - reference to the array of selected ids which is updated
 *      directly.
 * @param {String} id - the id to remove from the array.
 */
const removeIdFromSelections = (selectionsArray, id) => {
  const index = selectionsArray.indexOf(id);
  if (index > -1) {
    selectionsArray.splice(index, 1);
  }
};

/**
 * Method to remove row ids from the list of selected ids based on the rules fo rthe default
 * multi-row selection model when the user unselects a row or unchecks the Select-All checkbox.
 * This method is recursive since when a folder is unselected, all of its descendants must be
 * marked as unselected.
 *
 * @returns {Boolean} - indication as to whether a match for the unselectId parameter was found.
 *      Once the match is found the iterations of the method can end.
 * @param {React Nodes} children - the TreeView or TreeViewFolder children prop.
 * @param {String Array} selectionsArray - reference to the array of selected row ids which is
 *      updated directly.
 * @param {String} unselectId - the id of the row that was unselected.
 * @param {Boolean} ancestorWasUnselected - indication as to whether an ancestor of the rows being
 *      processed in this iteration of the method was unselected to trigger the process.
 */
const pushDownUnselection = (children, selectionsArray, unselectId, ancestorWasUnselected) => {
  if (!children) {
    return false;
  }
  const childArray = React.Children.toArray(children);
  let matchFound = false;
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    let descendantWasUnselected = false;
    if (ancestorWasUnselected) {
      removeIdFromSelections(selectionsArray, child.props.id);
    }
    if (typeof child.props.openFolders !== 'undefined') {
      // Child is a Folder
      const unselectDescendants = ancestorWasUnselected || child.props.id === unselectId;
      descendantWasUnselected =
        pushDownUnselection(child.props.children, selectionsArray, unselectId, unselectDescendants);
      if (descendantWasUnselected) {
        removeIdFromSelections(selectionsArray, child.props.id);
      }
    }
    if (descendantWasUnselected || child.props.id === unselectId) {
      matchFound = true;
      break;
    }
  }
  return matchFound;
};

/**
 * Method to remove row ids from the list of selected ids based on the rules fo rthe default
 * multi-row selection model when the user unselects a row or unchecks the Select-All checkbox.
 *
 * @returns N/A
 * @param {React Nodes} children - the TreeView children prop.
 * @param {String Array} selectionsArray - reference to the array of selected row ids which is
 *      updated directly.
 * @param {String} unselectId - the id of the row that was unselected.
 */
const processUnselection = (children, selectionsArray, unselectId) => {
  removeIdFromSelections(selectionsArray, unselectId);
  pushDownUnselection(children, selectionsArray, unselectId, false);
  removeIdFromSelections(selectionsArray, '_TreeViewSelectAll_');
};

/**
 * Method to find the row id for the first visible selected row if there is one.
 *
 * @returns {String} - the row id for the first visible selected row.
 * @param {String Array} selectionsArray - reference to the array of selected row ids.
 * @param {String Array} visibleIdArray - flattened list of row ids for visible rows.
 */
const getFirstVisibleSelection = (selectionsArray, visibleIdArray) => {
  for (let i = 0; i < visibleIdArray.length; i += 1) {
    if (isIdInSelectionsArray(selectionsArray, visibleIdArray[i])) {
      return visibleIdArray[i];
    }
  }
  return '';
};

/**
 * Method to find the row id for the first row that has the isInitiallySelected prop set to true.
 * This method is used to ensure that only one row is initially marked as selected when the default
 * single-row selection model is in use.
 *
 * @returns {String} - the row id for the first row that has the isInitiallySelected prop set to
 *      true. Returns null if no rows qualify.
 * @param {React Nodes} children - the TreeView children prop.
 */
const getInitialSingleSelection = (children) => {
  if (!children) {
    return null;
  }
  let selectedId = null;
  const childArray = React.Children.toArray(children);
  for (let i = 0; i < childArray.length; i += 1) {
    const child = childArray[i];
    if (child.props.isInitiallySelected) {
      selectedId = child.props.id;
    } else if (typeof child.props.openFolders !== 'undefined') {
      // Child is a Folder
      selectedId = getInitialSingleSelection(child.props.children);
    }
    if (selectedId) {
      break;
    }
  }
  return selectedId;
};

/**
 * Method to extract the text from a React Node Object. This is used when the application assigns
 * a React Node to the text prop of the TreeView component for formatting the text. To build the
 * tooltip for the row, the unformatted text must be extracted from the React Node.
 * This method is recursive since a React Node Object may contain other React Node Objects.
 *
 * @returns {String} - the unformatted text extracted from the React Node.
 * @param {String} textString - the string to be used as a starting point. Extracted text is
 *      concatenated onto the end of this string.
 * @param {React Node} obj - the React Node Object from whech the text is to be extracted.
 */
const getTextStringFromObject = (textString, obj) => {
  let resultString = textString;
  if (typeof obj.props.children === 'string') {
    resultString += obj.props.children;
  } else if (obj.props.children.length) {
    for (let i = 0; i < obj.props.children.length; i += 1) {
      if (typeof obj.props.children[i] === 'string') {
        resultString += obj.props.children[i];
      } else if (typeof obj.props.children[i] === 'object') {
        resultString = getTextStringFromObject(resultString, obj.props.children[i]);
      }
    }
  } else if (typeof obj.props.children === 'object') {
    resultString = getTextStringFromObject(resultString, obj.props.children);
  }
  return resultString;
};

const TreeViewSelectionUtils = {
  addIdToSelectionsArray,
  isIdInSelectionsArray,
  pushDownSelection,
  pullUpSelection,
  hasValidChildren,
  getCurrentSelections,
  removeIdFromSelections,
  pushDownUnselection,
  processUnselection,
  getFirstVisibleSelection,
  getInitialSingleSelection,
  getTextStringFromObject,
};

export default TreeViewSelectionUtils;
