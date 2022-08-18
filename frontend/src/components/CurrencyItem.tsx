import React from 'react'

const CurrencyItem = (props: any) => {
    return (
        <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-blue-400 border-blue-500 border-2 rounded-xl py-8 lg:py-12 px-4 text-center text-white">
            <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl">
                {props.data.name}
            </h3>
        </div>
    )
}

export default CurrencyItem;