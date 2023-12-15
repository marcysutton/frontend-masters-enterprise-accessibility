import React from 'react';
import * as ReactAriaLiveAnnouncer from '@react-aria/live-announcer';

const itemData = ['Paddle Boards', 'Bikes', 'Skis'];
const initialState = {
	draggedFrom: null,
	draggedTo: null,
	isDragging: false,
	originalOrder: [],
	updatedOrder: [],
};

const ReorderableListItem = React.forwardRef(({ name, index, callbackFn, ...props }, ref) => {
	const handleKeyDown = (event) => {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			event.preventDefault();
		}
	};
	return (
		<li
			data-position={index}
			draggable="true"
			onDragStart={props.onDragStart}
			onDragOver={props.onDragOver}
			onDrop={props.onDrop}
			className={props.isReordering && props.isReordering.draggedTo === Number(index) ? 'dropArea' : ''}>
			<span className="text">{name}</span>
			<button
				aria-label={`Reorder ${name} from position ${index + 1}`}
				className="edit"
				onKeyDown={handleKeyDown}
				onKeyUp={(event) => {
					callbackFn(event, index);
				}}
				ref={ref}>
				<span className="icon-sort"></span>
			</button>
		</li>
	);
});
const announce = (message) => {
	// ReactAriaLiveAnnouncer.announce(message, 'polite')

	ReactAriaLiveAnnouncer.announce(message, 'assertive');
};
const ReorderableList = () => {
	const [items, setItems] = React.useState(itemData);

	const [isEditing, setIsEditing] = React.useState(false);
	const [isReordering, setIsReordering] = React.useState(initialState);

	const listButtonRefs = React.useRef([]);

	const toggleEditMode = () => {
		setIsEditing(!isEditing);
		if (isEditing) {
			announce('Stopped editing');
		} else {
			announce('Edit Mode activated');
		}
	};
	const onDragStart = (event) => {
		if (!isEditing) return;

		const initialPosition = Number(event.currentTarget.dataset.position);

		setIsReordering({
			...isReordering,
			draggedFrom: initialPosition,
			isDragging: true,
			originalOrder: items,
		});

		// Note: this is only for Firefox.
		event.dataTransfer.setData('text/html', '');
	};
	const onDragOver = (event) => {
		if (!isEditing) return;
		event.preventDefault();

		let newList = isReordering.originalOrder;
		const draggedFrom = isReordering.draggedFrom;
		const draggedTo = Number(event.currentTarget.dataset.position);
		const itemDragged = newList[draggedFrom];
		const remainingItems = newList.filter((item, index) => index !== draggedFrom);

		newList = [...remainingItems.slice(0, draggedTo), itemDragged, ...remainingItems.slice(draggedTo)];

		if (draggedTo !== isReordering.draggedTo) {
			setIsReordering({
				...isReordering,
				updatedOrder: newList,
				draggedTo: draggedTo,
			});
		}
	};
	const onDrop = () => {
		if (!isEditing) return;
		setItems(isReordering.updatedOrder);
		setIsReordering({
			...isReordering,
			draggedFrom: null,
			draggedTo: null,
			isDragging: false,
		});
	};
	const itemCallbackFn = (event, itemIndex) => {
		let messageRead = false;

		if (event.key === 'ArrowDown') {
			if (itemIndex < items.length) {
				let nextIndex = itemIndex + 1;
				let tmpArray = items.slice();
				tmpArray.splice(nextIndex, 0, tmpArray.splice(itemIndex, 1).pop());
				setItems(tmpArray);
				announce(`${tmpArray[nextIndex]} moved to position ${nextIndex + 1}`);

				listButtonRefs.current[nextIndex].focus();
			}
		} else if (event.key === 'ArrowUp') {
			if (itemIndex > 0) {
				let prevIndex = itemIndex - 1;
				let tmpArray = items.slice();
				tmpArray.splice(prevIndex, 0, tmpArray.splice(itemIndex, 1).pop());
				setItems(tmpArray);
				announce(`${tmpArray[prevIndex]} moved to position ${prevIndex + 1}`);

				listButtonRefs.current[prevIndex].focus();
			}
		}
	};

	React.useEffect(() => {
		console.log('Dragged From: ', isReordering && isReordering.draggedFrom);
		console.log('Dropping Into: ', isReordering && isReordering.draggedTo);
	}, [isReordering]);

	React.useEffect(() => {
		console.log('List updated!');
	}, [items]);
	return (
		<div className={`sortable-list-group ${isEditing ? `active` : null}`}>
			<button id="edit-list" onClick={toggleEditMode}>
				<span className="editingText">Exit edit mode</span>
				<span className="defaultText">Edit gear list</span>
			</button>
			<ul
				className="sortable-list"
				aria-roledescription="Sortable List"
				role={`${isEditing ? `application` : `group`}`}>
				{items.map((item, index) => {
					return (
						<ReorderableListItem
							callbackFn={itemCallbackFn}
							key={index}
							name={item}
							index={index}
							onDragStart={onDragStart}
							onDragOver={onDragOver}
							onDrop={onDrop}
							isReordering={isReordering}
							ref={(ref) => listButtonRefs.current.push(ref)}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default ReorderableList;
