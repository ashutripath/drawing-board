import React, { useState } from "react"

import Canvas from "./components/Canavas"
import Tools from "./components/Tools"
import { ToolTypes } from "./constants/ToolTypes"

import "./static/scss/index.scss"

function App() {
    const [toolType, setToolType] = useState(ToolTypes.HIGHTLIGHTER)
    const [width, setWidth] = useState(3)

    function handleToolChange(toolType) {
        setToolType(toolType)
    }

    function handleToolWidthChange(toolWidth) {
        setWidth(toolWidth)
    }

    return (
        <div className="App">
            <Tools onToolChange={handleToolChange} setToolWidth={handleToolWidthChange} selectedTool={toolType} />
            <Canvas width={width} color={toolType.color} isErasing={toolType === ToolTypes.ERASER} />
        </div>
    )
}

export default App
