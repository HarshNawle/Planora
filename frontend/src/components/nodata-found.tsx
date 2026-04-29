import React from 'react'

interface NoDataFound {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

const NoDataFound = ({
  title,
  description,
  buttonText,
  buttonAction
}: NoDataFound) => {
  return (
    <div className='flex flex-col items-center justify-center h-full' >
      {/* Add Image Later */}
      
      <h3 className='text-lg font-semibold' >No Data Found</h3>
    </div>
  )
}

export default NoDataFound