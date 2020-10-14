import React, { useRef, useEffect, useState } from "react"
import PropTypes from "prop-types"

function Canvas(props) {
    const { width, color, isErasing } = props

    const canvasRef = useRef(null)
    const [mContext, setContext] = useState({})
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        context.scale(2, 2)
        context.lineCap = "round"
        contextRef.current = context
        setContext(context)
    }, [])

    useEffect(() => {
        mContext.strokeStyle = color
        mContext.lineWidth = width
        mContext.current = {
            ...mContext.current,
            ...mContext,
        }
    }, [color, mContext, width])

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    const draw = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent
        if (!isDrawing) {
            return
        }

        if (isDrawing) {
            if (isErasing) {
                mContext.globalCompositeOperation = "destination-out"
                mContext.arc(offsetX, offsetY, 8, 0, Math.PI * 2, false)
                mContext.fill()
            } else {
                mContext.globalCompositeOperation = "source-over"
                contextRef.current.lineTo(offsetX, offsetY)
                contextRef.current.stroke()
            }
        }
    }

    return <canvas onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} ref={canvasRef} />
}

Canvas.propTypes = {
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    isErasing: PropTypes.bool.isRequired,
}

Canvas.defaultProps = {
    isErasing: false,
}

export default Canvas
