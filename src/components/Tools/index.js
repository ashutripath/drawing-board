import React from "react"
import PropTypes from "prop-types"
import { Popover, Button, Tooltip } from "antd"
import "antd/dist/antd.css"

import PenIcon from "../Icons/PenIcon"
import { ToolTypes, PENTYPES } from "../../constants/ToolTypes"

function Tools(props) {
    const { onToolChange, setToolWidth, selectedTool } = props

    function handleHighlighterSelection() {
        onToolChange(ToolTypes.HIGHTLIGHTER)
        setToolWidth(5)
    }

    function handlePenSelection(e, pen) {
        onToolChange(ToolTypes.PEN)
        setToolWidth(pen.width)
    }

    function handleEraserSelection() {
        onToolChange(ToolTypes.ERASER)
    }

    const content = (
        <div className="tools-pen__elements">
            {PENTYPES.map((pen, index) => {
                return (
                    <div className="tools-pen__varaint" key={index} onClick={(e) => handlePenSelection(e, pen)}>
                        <p>{pen.label}</p>
                        <PenIcon fill="blue" className="pen" />
                    </div>
                )
            })}
        </div>
    )

    return (
        <div className="tools">
            <p className="tools-heading">Tools</p>
            <div className="tools-container">
                <Tooltip placement="top" title={<span>Highlighter</span>}>
                    <Button
                        className="tools-hightligher"
                        type={selectedTool === ToolTypes.HIGHTLIGHTER && "primary"}
                        onClick={handleHighlighterSelection}
                    >
                        <PenIcon fill="violet" />
                    </Button>
                </Tooltip>

                <Tooltip placement="top" title={<span>Pen</span>}>
                    <Popover placement="bottom" content={content} title="Pen Sizes" trigger="click">
                        <Button className="tools-pen" type={selectedTool === ToolTypes.PEN && "primary"}>
                            <PenIcon fill="blue" />
                        </Button>
                    </Popover>
                </Tooltip>

                <Tooltip placement="top" title={<span>Eraser</span>} onClick={handleEraserSelection}>
                    <div className="tools-eraser">
                        <Button className="tools-pen" type={selectedTool === ToolTypes.ERASER && "primary"}>
                            Eraser
                        </Button>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

Tools.propTypes = {
    onToolChange: PropTypes.func.isRequired,
    setToolWidth: PropTypes.func.isRequired,
    selectedTool: PropTypes.object.isRequired,
}

export default Tools
