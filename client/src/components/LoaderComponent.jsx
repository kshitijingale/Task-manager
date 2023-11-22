import React from 'react'

const LoaderComponent = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50 bg-gray-500 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-solid"></div>
        </div>
    )
}

export default LoaderComponent
