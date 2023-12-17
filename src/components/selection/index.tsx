import { useState, useEffect } from 'react';
import './selection.scss'

type SelectionBox = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};

export const Selection = () => {
    const [selecting, setSelecting] = useState(false);
    const [selectionBox, setSelectionBox] = useState<SelectionBox | {}>({});

    useEffect(() => {
        const handleMouseUpDocument = () => {
            if (selecting) {
                setSelecting(false);
            }
        };

        const handleMouseMoveDocument = (e) => {
            if (selecting) {
                const { clientX, clientY } = e;
                setSelectionBox((prevBox) => ({
                    ...prevBox,
                    endX: clientX,
                    endY: clientY,
                }));
            }
        };

        document.addEventListener('mouseup', handleMouseUpDocument);
        document.addEventListener('mousemove', handleMouseMoveDocument);

        return () => {
            document.removeEventListener('mouseup', handleMouseUpDocument);
            document.removeEventListener('mousemove', handleMouseMoveDocument);
        };
    }, [selecting]);

    const handleMouseDown = (e) => {
        setSelecting(true);
        const { clientX, clientY } = e;
        setSelectionBox({
            startX: clientX,
            startY: clientY,
            endX: clientX,
            endY: clientY,
        });
    };

    const handleMouseMove = (e) => {
        if (selecting) {
            const { clientX, clientY } = e;
            setSelectionBox((prevBox) => ({
                ...prevBox,
                endX: clientX,
                endY: clientY,
            }));
        }
    };

    const handleMouseUp = () => {
        setSelecting(false);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="selection"
        >
            {selecting && (
                <div
                    className="selection-box"
                    style={{
                        left: Math.min(selectionBox.startX, selectionBox.endX),
                        top: Math.min(selectionBox.startY, selectionBox.endY),
                        width: Math.abs(selectionBox.endX - selectionBox.startX),
                        height: Math.abs(selectionBox.endY - selectionBox.startY),
                    }}
                />
            )}
        </div>
    );
};