import FormField from '@/components/FormField'
import React from 'react'

function APIPane() {
    


  return (
    <div className='w-full h-screen border p-12'>
        <div className='text-black font-inter font-light mb-10'>Connected APIs</div>
        <div>
            <FormField
            label={"API Key"}
            errorMessage={""}
            onChange={() => console.log("hello")}
            />
        </div>
    </div>
  )
}

export default APIPane