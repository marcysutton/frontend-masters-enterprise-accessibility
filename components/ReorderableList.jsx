import React from 'react';
import * as ReactAriaLiveAnnouncer from '@react-aria/live-announcer';

const itemData = ['Paddle Boards', 'Bikes', 'Skis'];

const ReorderableListItem = React.forwardRef(({ name, index, callbackFn, ...props }, ref) => {
	return (
		<li
			data-position={index}
			draggable="true"
			onDragStart={props.onDragStart}
			onDragOver={props.onDragOver}
			onDrop={props.onDrop}
			className={props.isReordering && props.isReordering.draggedTo === Number(index) ? 'dropArea' : ''}>
			<span className="text">{name}</span>
			<span className="icon-sort"></span>
		</li>
	);
});

const ReorderableList = () => {
	const [items, setItems] = React.useState(itemData);

	const [isReordering, setIsReordering] = React.useState(false);

	const onDragStart = (event) => {
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

		// if (event.key === 'ArrowDown') {
		//   if (itemIndex < items.length) {
		// 	let nextIndex = itemIndex + 1
		// 	let tmpArray = items.slice()
		// 	tmpArray.splice(nextIndex, 0, tmpArray.splice(itemIndex, 1).pop())
		// 	setItems(tmpArray)
		// 	announce(`${tmpArray[nextIndex]} moved to position ${nextIndex + 1}`)

		// 	listButtonRefs.current[nextIndex].focus()
		//   }
		// } else if (event.key === 'ArrowUp') {
		//   if (itemIndex > 0) {
		// 	let prevIndex = itemIndex - 1
		// 	let tmpArray = items.slice()
		// 	tmpArray.splice(prevIndex, 0, tmpArray.splice(itemIndex, 1).pop())
		// 	setItems(tmpArray)
		// 	announce(`${tmpArray[prevIndex]} moved to position ${prevIndex + 1}`)

		// 	listButtonRefs.current[prevIndex].focus()
		//   }
		// }
	};

	React.useEffect(() => {
		console.log('Dragged From: ', isReordering && isReordering.draggedFrom);
		console.log('Dropping Into: ', isReordering && isReordering.draggedTo);
	}, [isReordering]);

	React.useEffect(() => {
		console.log('List updated!');
	}, [items]);
	return (
		<div items={items} className={`sortable-list-group`}>
			<ul className="sortable-list">
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
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default ReorderableList;
